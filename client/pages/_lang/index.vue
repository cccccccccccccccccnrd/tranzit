<template>
  <div>
    <section v-if="!events[0][`name_${ $i18n.locale }`]" class="loading">
      <p>{{ $t('loading') }}</p>
    </section>
    <section
      class="scroll-area"
      ref="areaVisual"
    >
      <area-visual/>
    </section>
    <section
      class="scroll-area"
    >
      <area-about/>
    </section>
    <section
      class="scroll-area"
    >
      <area-events
        :events="this.filteredList"
      />
    </section>
  </div>
</template>

<script>
import AreaVisual from '@/components/AreaVisual.vue'
import AreaAbout from '@/components/AreaAbout.vue'
import AreaEvents from '@/components/AreaEvents.vue'

import Strapi from 'strapi-sdk-javascript/build/main'
const url = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(url)

export default {
  components: {
    AreaVisual,
    AreaAbout,
    AreaEvents
  },
  data () {
    return {
      query: ''
    }
  },
  computed: {
    filteredList() {
      /* return this.restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(this.query.toLowerCase())
      }) */
      return this.events
    }
  },
  mounted () {
    const areaVisual = this.$refs.areaVisual
    const width = areaVisual.scrollWidth - areaVisual.clientWidth

    let offset = 1
    let reverse = false
    const interval = setInterval(() => {
      if (offset === width || offset === 0) {
        reverse = !reverse
      }

      if (reverse) {
        offset--
      } else {
        offset++
      }

      areaVisual.scrollLeft = offset
    }, 15)

    areaVisual.addEventListener('mouseover', () => {
      clearInterval(interval)
    })
  },
  async asyncData ({ params }) {
    const response = await strapi.request('post', '/graphql', {
      data: {
        query: `query {
          events {
            id
            name_${ params.lang }
            description_${ params.lang }
            type_${ params.lang }
            start
            end
          }
        }`
      }
    })

    await new Promise(resolve => setTimeout(resolve, 300))

    return {
      events: response.data.events
    }
  }
}
</script>

<style scoped>
.scroll-area {
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: calc(100vh / 3);
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}
</style>

