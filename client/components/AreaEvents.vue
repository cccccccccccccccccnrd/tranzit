<template>
  <div class="area-events">
    <event
      v-for="event in this.events"
      :key="event.id"
      :event="event"
    />
  </div>
</template>

<script>
import Event from '@/components/Event.vue'

export default {
  components: {
    Event
  },
  props: ['events']
}
</script>

<style scoped>
.area-events {
  padding: 1em;
}
</style>