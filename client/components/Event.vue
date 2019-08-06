<template>
  <nuxt-link :to="$i18n.path(`events/${ this.event.id }`)">
    <div class="event">
      <h2>{{ this.event[`name_${ $i18n.locale }`] }}</h2>
      <p>{{ this.date }}</p>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: ['event'],
  computed: {
    date () {
      return '8.8.2019 15:00—18:00'
    }
  }
}
</script>


<style scoped>
a {
  display: inline-block;
}

p {
  margin: 0;
  padding: 0.5rem;
  border-top: 2px solid black;
}

h2 {
  padding: 0.5rem;
}

.event {
  margin: 0 1em 0 0;
  background: white;
  border: 2px solid black;
  transition: all 500ms;
}

/* .event {
  margin: 0 -2em 0 0;
  padding: 2em 2.5em;
  background: white;
  border-radius: 100px;
  box-shadow: 1em 10px 20px blue;
} */

.event:hover, .event:active {
  transform: translateY(5px);
}

a:last-child .event {
  margin: 0;
}
</style>