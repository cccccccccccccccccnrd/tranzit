<template>
  <nuxt-link :to="$i18n.path(`events/${this.event.id}`)">
    <div class="event">
      <section>
        <small>{{ this.event[`name_${$i18n.locale}`] }}</small>
      </section>
      <section>
        <p v-if="this.event[`type_${$i18n.locale}`].startsWith('Roma')">
          2024–2026
        </p>
        <p v-else>{{ this.date }}</p>
        <p>↗</p>
      </section>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: ["event"],
  computed: {
    date() {
      const date = new Date(this.event.start);
      if (date.getHours() === 0 && date.getMinutes() === 0) {
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
      } else {
        return `${date.getDate()}.${date.getMonth() +
          1}.${date.getFullYear()} ${("0" + date.getHours()).slice(-2)}:${(
          "0" + date.getMinutes()
        ).slice(-2)}`;
      }
    }
  }
};
</script>

<style scoped>
a {
  display: inline-block;
}

p {
  margin: 0;
  padding: 0.5rem;
  text-overflow: ellipsis;
  overflow: hidden;
}

small {
  display: block;
  text-transform: uppercase;
  padding: 0.5rem;
  text-overflow: ellipsis;
  overflow: hidden;
}

h2 {
  padding: 0.5rem;
  text-overflow: ellipsis;
  overflow: hidden;
}

.event {
  min-width: 300px;
  max-width: 300px;
  margin: 0 1em 0 0;
  border: 2px solid black;
  transition: all 500ms;
}

section:nth-of-type(2) {
  display: flex;
  justify-content: space-between;
  border-top: 2px solid black;
}

/* .event {
  margin: 0 -2em 0 0;
  padding: 2em 2.5em;
  background: white;
  border-radius: 100px;
  box-shadow: 1em 10px 20px blue;
} */

a:last-child .event {
  margin: 0;
}

@media (max-width: 325px) {
  p {
    font-size: 1em;
  }
}

@media (min-width: 800px) {
  .event:hover,
  .event:active {
    max-width: 800px;
    transform: translateY(5px);
  }
}
</style>
