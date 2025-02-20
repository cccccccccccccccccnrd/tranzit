<template>
  <div class="single-index">
    <section v-if="loading" class="loading">
      <p>{{ $t('loading') }}</p>
    </section>
    <section
      class="scroll-area scroll-visual"
      ref="scrollVisual"
    >
      <area-visual/>
    </section>
    <section
      class="scroll-area"
    >
      <area-heading
        site="about"
      />
    </section>
    <section
      class="scroll-area"
      ref="scrollEvents"
    >
      <area-events
        :events="filteredList"
        ref="areaEvents"
      />
    </section>
    <section
      class="scroll-area"
    >
      <area-heading
        site="archive"
      />
    </section>
    <section
      class="scroll-area"
    >
      <area-heading
        site="contact"
      />
    </section>
  </div>
</template>

<script>
import AreaVisual from '@/components/AreaVisual.vue'
import AreaHeading from '@/components/AreaHeading.vue'
import AreaEvents from '@/components/AreaEvents.vue'

import Strapi from 'strapi-sdk-javascript/build/main'
const url = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(url)

export default {
  components: {
    AreaVisual,
    AreaHeading,
    AreaEvents
  },
  data () {
    return {
      query: ''
    }
  },
  computed: {
    loading() {
      if (this.events.length > 0) {
        return !this.events[0][`name_${ this.$i18n.locale }`]
      } else {
        return false
      }
    },
    filteredList() {
      /* return this.restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(this.query.toLowerCase())
      }) */
      return this.events
    }
  },
  mounted () {
    if (this.events.length > 0 && this.$refs.scrollEvents) {
      this.$refs.scrollEvents.scrollLeft = this.$refs.areaEvents.$el.clientWidth
    }

    const visualWidth = this.$refs.scrollVisual.scrollWidth - this.$refs.scrollVisual.clientWidth

    let offset = 1
    let reverse = false

    const interval = setInterval(() => {
      if (offset === visualWidth || offset === 0) {
        reverse = !reverse
      }

      if (reverse) {
        offset--
      } else {
        offset++
      }

      if (this.$refs.scrollVisual) this.$refs.scrollVisual.scrollLeft = offset
    }, 24)

    this.$refs.scrollVisual.addEventListener('mouseover', () => {
      clearInterval(interval)
    }, {
      once: true
    })
  },
  async asyncData ({ params }) {
    const response = await strapi.request('post', '/graphql', {
      data: {
        query: `query {
          events(limit: 20, sort: "start:desc") {
            id
            name_${ params.lang }
            type_${ params.lang }
            description_${ params.lang }
            start
            end
          }
        }`
      }
    })

    await new Promise(resolve => setTimeout(resolve, 300))

    return {
      events: response.data.events.reverse()
    }
  }
}
</script>

<style scoped>
.single-index {
  display: flex;
  flex-flow: column nowrap;
  height: 95vh;
}

.scroll-area {
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  flex: 1;
}

.scroll-visual {
  flex: 4;
}

.baseline {
  align-items: baseline;
}
</style>

