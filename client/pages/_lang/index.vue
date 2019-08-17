<template>
  <div>
    <section v-if="!events[0][`name_${ $i18n.locale }`]" class="loading">
      <p>{{ $t('loading') }}</p>
    </section>
    <section
      class="scroll-area"
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
      class="scroll-area invert"
      ref="scrollEvents"
    >
      <area-events
        :events="this.filteredList"
        ref="areaEvents"
      />
    </section>
    <section
      class="scroll-area invert"
    >
      <area-heading
        site="hungarianFilmDays"
      />
    </section>
  </div>
</template>

<script>
import AreaVisual from '@/components/AreaVisual.vue'
import AreaHeading from '@/components/AreaHeading.vue'
import AreaEvents from '@/components/AreaEvents.vue'

import Strapi from 'strapi-sdk-javascript/build/main'
const url = /* process.env.API_URL || */ 'http://localhost:1337'
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
    filteredList() {
      /* return this.restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(this.query.toLowerCase())
      }) */
      return this.events
    }
  },
  mounted () {
    const now = new Date()
    const closest = this.events.filter((event, index) => new Date(event.start) > now)[0]
    const index = this.events.indexOf(closest)
    if (this.$refs.scrollEvents) this.$refs.scrollEvents.scrollLeft = this.$refs.areaEvents.$el.children[index].offsetLeft - 13

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

      this.$refs.scrollVisual.scrollLeft = offset
    }, 24)

    this.$refs.scrollVisual.addEventListener('mouseover', () => {
      clearInterval(interval)
    }, {
      once: true
    })
  },
  async asyncData ({ params }) {
    const date = new Date()
    date.setDate(date.getDate() - 2)

    const response = await strapi.request('post', '/graphql', {
      data: {
        query: `query {
          events(limit: 20, sort: "start:asc", where: { 
  	        start_gte: "${ date.toISOString() }"
          }) {
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
  /* height: calc(100vh / 6); */
  height: calc(var(--vh) * 100 / 6);
  background: white;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}

.scroll-area:nth-of-type(1) {
  /* height: calc(100vh / 2); */
  height: calc(var(--vh) * 100 / 2);
}

.baseline {
  align-items: baseline;
}
</style>

