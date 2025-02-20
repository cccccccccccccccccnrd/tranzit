<template>
  <div class="single single-event">
    <div class="indent">
      <section v-if="!event[`name_${ $i18n.locale }`]" class="loading invert">
        <p>{{ $t('loading') }}</p>
      </section>
      <h2>{{ event[`name_${ $i18n.locale }`] }}</h2>
      <small class="info">
        <span class="type">{{ event[`type_${ $i18n.locale }`] }}</span> — {{ date }}
      </small>
      <vue-markdown
        class="description"
        :source="event[`description_${ $i18n.locale }`]"
      />
      <img
        v-for="visual in event.media"
        :key="visual.id"
        :src="src(visual.url)"
      />
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import Strapi from 'strapi-sdk-javascript/build/main'

const url = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(url)

export default {
  components: {
    VueMarkdown
  },
  computed: {
    date () {
      const date = new Date(this.event.start)
      if (date.getHours() === 0 && date.getMinutes() === 0) {
        return `${ date.getDate() }.${ date.getMonth() + 1 }.${ date.getFullYear() }`
      } else {
        return `${ date.getDate() }.${ date.getMonth() + 1 }.${ date.getFullYear() } ${ ('0' + date.getHours()).slice(-2) }:${ ('0' + date.getMinutes()).slice(-2) }`
      }
    }
  },
  methods: {
    src(path) {
      return `${ url }${ path }`
    }
  },
  async asyncData ({ params }) {
    const response = await strapi.request('post', '/graphql', {
      data: {
        query: `query {
          event(id: "${ params.id }") {
            name_${ params.lang }
            description_${ params.lang }
            type_${ params.lang }
            start
            end
            media {
              id
              url
            }
          }
        }`
      }
    })

    await new Promise(resolve => setTimeout(resolve, 300))

    return {
      event: response.data.event
    }
  }
}
</script>

<style scoped>
small {
  text-transform: uppercase;
  display: inline-block;
}

.info {
  margin: 1em 0 2em 0;
}
</style>

<style>
.description h2 {
  margin: 0 0 -0.5em 0;
  text-transform: initial;
}
</style>

