<template>
  <div class="single single-event indent">
    <section v-if="!event[`name_${ $i18n.locale }`]" class="loading invert">
      <p>{{ $t('loading') }}</p>
    </section>
    <h1>{{ event[`name_${ $i18n.locale }`] }}</h1>
    <section class="info">
      <small><span class="type">{{ event.type }}</span> — {{ date }} until {{ date }}</small>
    </section>
    <p class="description">{{ event[`description_${ $i18n.locale }`] }}</p>
    <img
      v-for="visual in event.visuals"
      :key="visual.id"
      :src="src(visual.url)"
    />
  </div>
</template>

<script>
import Strapi from 'strapi-sdk-javascript/build/main'
const url = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(url)

export default {
  computed: {
    date() {
      const date = new Date(this.event.from)
      return `${ date.getDay() } ${ new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date) } ${ date.getFullYear() }`
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
          event(id: ${ params.id }) {
            name_${ params.lang }
            description_${ params.lang }
            type
            from
            to
            visuals {
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
h1 {
  word-break: break-all;
}

.info {
  width: fit-content;
  margin: 1em 0 0 0;
  padding: 0.5em;
  border: 2px solid black;
}

/* .info {
  display: flex;
  justify-content: center;
  margin: 1em 0 0 0;
  padding: 0.5em 1em;
  border-radius: 100px;
  box-shadow: 5px 5px 10px blue;
} */

.info p {
  margin: 0;
}

.type {
  text-transform: capitalize;
}
</style>

