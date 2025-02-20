<template>
  <div class="single single-no-padding single-archive">
    <div
      v-if="showGallery"
      class="side side-gallery left"
    >
      <div class="top">
        <small>{{ current.name }} {{ current.year ? `(${current.year})` : '' }} {{ $t('ui.gallery') }}</small>
        <small
          @click="handleGalleryCloseClick"
          class="close"
        >{{ $t('ui.close').toUpperCase() }}</small>
      </div>
      <div
        v-if="previewType === 'image'"
        class="gallery gallery-image"
      >
        <img
          :src="`${apiUrl}${preview}`"
          class="actual"
        />
      </div>
      <div
        v-if="previewType === 'video'"
        class="gallery gallery-video"
      >
        <video
          :src="`'${apiUrl}${preview.replace('.jpg', '.mp4')}'`"
          controls
        ></video>
      </div>
      <div class="bottom">
        <div
          v-for="(image, index) in current.gallery"
          :key="`gallery-${image}-${index}`"
          :style="`background: url('${apiUrl}${image}') no-repeat center center;`"
          @click="preview = image"
          class="gallery-bottom-item"
        ></div>
      </div>
    </div>
    <div
      v-if="!showGallery"
      class="side side-browser left"
    >
      <div class="top">
        <input
          v-model.trim="term"
          type="text"
          name="search"
          :placeholder="$t('ui.search').toUpperCase()"
        >
        <div
          class="button button-tags"
          @click="showCategories = !showCategories"
          :class="{ active: showCategories }"
        ></div>
        <div
          class="button button-list"
          @click="showList = !showList"
        >
          <span>—</span>
          <span v-if="!showList">—</span>
        </div>
      </div>
      <div
        v-if="showCategories"
        class="top top-tags"
      >
        <div
          v-for="(category, index) in categories"
          :key="`search-tag-${index}`"
        >
          <input
            :id="`search-tag-${category}`"
            :value="category"
            v-model="selectedCategories"
            type="checkbox"
            class="tag"
          />
          <label
            :for="`search-tag-${category}`"
            class="tag"
            :class="{ selected: selectedCategories.includes(category) }"
          >{{category}}</label>
        </div>
      </div>
      <div
        v-if="!showList"
        class="browser"
        :class="{ 'no-categories': !showCategories }"
      >
        <archive-item
          v-for="(entry, index) in filtered"
          :key="`archive-item-${index}`"
          :entry="entry"
          @click.native="open(entry)"
        />
      </div>
      <div
        v-if="showList"
        class="browser list"
        :class="{ 'no-categories': !showCategories }"
      >
        <div
          v-for="(entry, index) in filtered"
          :key="`archive-item-${index}`"
          @click="open(entry)"
          :class="{ current: entry === current }"
          class="archive-list-item"
        >
          <small>{{ entry.name }} {{ entry.year ? `(${entry.year})` : '' }} </small>
          <small class="sub">{{ entry.sub }} </small>
        </div>
      </div>
    </div>
    <div class="side side-content right" >
      <div
        v-if="current"
        class="content"
        :style="current.project ? `height: 90vh;` : ''"
      >
        <h1>{{ current.name }}</h1>
        <div
          v-if="current.type === 'event'"
          class="info"
        >
          <small>{{ date(current.date) }}</small>
        </div>
        <vue-markdown
          class="description"
          :source="current.description"
        />
        <div class="tags">
          <div
            v-for="(category, index) in current.categories"
            :key="`archive-list-tag-${index}`"
            class="tag"
          >{{ category }}</div>
        </div>
      </div>
      <div
        v-if="current && current.project"
        class="bottom"
        @click="open(current.project)"
      >
        <small>{{ `${$t('ui.project')}: ${current.project.name}` }}</small>
        <small>↗</small>
      </div>
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import ArchiveItem from '@/components/ArchiveItem.vue'
import api from '@/api'

export default {
  components: {
    VueMarkdown,
    ArchiveItem
  },
  data () {
    return {
      locale: this.$i18n.locale.toLowerCase(),
      apiUrl: process.env.OWN_API_URL,
      current: null,
      showGallery: false,
      showList: true,
      showCategories: true,
      term: '',
      preview: '',
      selectedCategories: [],
      categories: [],
      entries: []
    }
  },
  async mounted () {
    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 16) {
        this.showList = !this.showList
      }
    })

    const categories = await api.get('category')
    this.categories = categories.map((category) => category[`name_${this.locale}`])

    const projects = await api.get('project')
    this.projects = projects.map((project) => {
      return {
        type: 'project',
        id: project.id,
        name: project[`name_${this.locale}`],
        description: project[`description_${this.locale}`],
        concept: project[`concept_${this.locale}`],
        categories: project.category_ids.map((id) => categories.find((category) => category.id === id)[`name_${this.locale}`]),
        gallery: project.media,
        sub: this.$t('ui.project')
      }
    })

    const events = await api.get('event')
    this.events = events.map((event) => {
      const project = this.projects.filter((project) => project.id === event.project_id)[0]
      return {
        type: 'event',
        id: event.id,
        date: event.date_start,
        year: event.date_start ? event.date_start.split('-')[0] : '0000',
        name: event[`name_${this.locale}`],
        description: event[`description_${this.locale}`],
        categories: event.category_ids.map((id) => categories.find((category) => category.id === id)[`name_${this.locale}`]),
        project: project,
        projectId: event.project_id,
        gallery: event.media,
        sub: project ? `${this.$t('ui.event')} > ${project.name}` : this.$t('ui.event')
      }
    })

    this.entries = this.projects.concat(this.events)

    if (this.$route.params.id) {
      const found = this.entries.find((event) => event.id === this.$route.params.id)

      if (found) {
        this.open(found)
      } else {
        this.$router.push(this.$i18n.path('archive'))
      }
    }
  },
  computed: {
    previewType () {
      return this.preview.endsWith('-video.jpg') ? 'video' : 'image'
    },
    filtered () {
      if (this.selectedCategories.length > 0) {
        return this.entries.filter((entry) => (this.selectedCategories.filter((categories) => entry.categories.includes(categories))).length > 0).filter((entry) => entry.name.toLowerCase().includes(this.term.toLowerCase()))
      } else {
        return this.entries.filter((entry) => entry.name.toLowerCase().includes(this.term.toLowerCase()))
      }
    }
  },
  methods: {
    handleCategoryClick (category, event) {
      this.selectedCategories.push(category)
      event.target.classList.toggle('selected')
    },
    handleGalleryCloseClick () {
      this.showGallery = false
      history.pushState({}, null, this.$i18n.path('archive'))
    },
    open (entry) {
      this.current = entry
      this.showGallery = true
      this.preview = ''
      history.pushState({}, null, this.$i18n.path(`archive/${entry.id}`))
      if (this.current.gallery.length > 0) this.preview = this.current.gallery[0]
    },
    /* search () {
      this.filtered = this.entries.filter((entry) => entry.title.toLowerCase().includes(this.term.toLowerCase()))
    }, */
    asset (url) {
      if (url) {
        return require(`@/assets/${url}`)
      } else {
        return ''
      }
    },
    date (string) {
      const moment = new Date(string)
      return moment.toLocaleDateString(this.locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
  .single-archive {
    display: flex;
    overflow: hidden;
  }

  .side {
    width: 100%;
    overflow-y: auto;
  }

  .side.left {
    display: flex;
    flex-flow: column nowrap;
    border-right: 1px solid black;
  }

  .side.right {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
  }

  .side.right .content {
    padding: 1em;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .browser {
    display: flex;
    flex-flow: row wrap;
    height: 80vh;
    overflow-y: auto;
  }

  .browser.list {
    flex-flow: column nowrap;
  }

  .browser.no-categories {
    height: 90vh;
  }

  input[name="search"] {
    box-sizing: border-box;
    width: 100%;
    height: 4vh;
    margin: 0;
    padding: 0;
    font-size: 1em;
    font-family: "AnkaCoder-r", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    background: var(--color-primary);
    border: 0;
  }

  input[name="search"]:focus {
    outline: 0;
  }

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 5vh;
    padding: 1em;
    border-bottom: 1px solid black;
  }

  .top-tags {
    justify-content: flex-start;
    flex-flow: row wrap;
    align-items: center;
    height: 10vh;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .side-content .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 5vh;
    padding: 1em;
    border-top: 1px solid black;
    cursor: pointer;
  }

  .side-gallery .top .close {
    cursor: pointer;
  }

  .side-gallery small {
    margin: 0;
    font-size: 1em;
    text-transform: uppercase;
  }

  .side-gallery .gallery {
    height: 80vh;
  }

  .side-gallery .gallery-image {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .side-gallery .gallery-image .actual {
    max-width: 80%;
    height: auto;
    max-height: 70%;
  }

  .side-gallery .gallery-video {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }

  .side-gallery .gallery-video video {
    width: 90%;
  }

  .side-gallery .gallery-video video:focus {
    outline: none;
  }

  .side-gallery .bottom {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    height: 10vh;
    gap: 1px;
    /* border-top: 1px solid black; */
  }

  .gallery-bottom-item {
    height: 10vh;
    width: 100%;
    cursor: pointer;
  }

  .side-content small {
    text-transform: uppercase;
  }

  .button {
    cursor: pointer;
    user-select: none;
  }

  .button-list {
    display: flex;
    flex-flow: column nowrap;
  }

  .button-list span {
    line-height: 0.5;
  }

  .button-tags {
    height: 1em;
    width: 2em;
    margin: 0 1em 0 0;
    border-radius: 100px;
    border: 1px solid black;
  }

  .button-tags.active {
    background: black;
  }

  .archive-list-item {
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    width: 100%;
    padding: 1em 1em 0 1em;
    text-transform: uppercase;
    cursor: pointer;
  }

  .archive-list-item:last-of-type {
    padding: 1em 1em 1em 1em;
  }

  .archive-list-item.current {

  }

  .archive-list-item .sub {
    font-size: 0.8em;
  }

  .info {
    text-transform: uppercase;
  }

  .tags {
    display: flex;
    margin: 1em 0 0 0;
  }

  input[type=checkbox] {
    display: none;
  }

  .tag {
    display: flex;
    padding: 0.3em 0.6em;
    font-size: 0.8em;
    border-radius: 100px;
    border: 1px solid black;
    white-space: nowrap;
  }

  .top-tags .tag:hover, .tag.selected {
    color: var(--color-primary);
    background: black;
    cursor: pointer;
  }

  @media (max-width: 800px) {
    .single-archive {
      flex-flow: column nowrap;
    }

    .side.left {
      height: 45vh;
      border: 0;
      border-bottom: 1px solid black;
    }

    .side.right {
      height: 50vh;
    }
  }
</style>
