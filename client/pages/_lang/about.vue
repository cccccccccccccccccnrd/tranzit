<template>
  <div class="single single-about indent">
    <h1>{{ $t('about.title') }}</h1>
    <p>THE TRANZIT PROJECT was born in 1997 as the consequence of the need of filling the social-cultural void in the city. From this point of view maybe the project started in a slightly utopian way. During the last five years parts of the initial vision have become reality.</p>
    <section
      v-for="(section, index) in sections"
      :key="`single-about-section-${ index }`"
    >
      <h2>{{ section.heading }}</h2>
      <p>{{ section.p }}</p>
    </section>
  </div>
</template>

<script>
import Strapi from 'strapi-sdk-javascript/build/main'
const url = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(url)

export default {
  data () {
    return {
      sections: this.$i18n.messages[this.$i18n.locale].about.sections
    }
  }
}
</script>

<style scoped>
h2 {
  margin: 1.5em 0 0 0;
  text-transform: initial;
}
</style>
