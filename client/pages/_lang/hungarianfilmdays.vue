<template>
  <div class="single single-hungarian-film-days indent">
    <h1>{{ $t('hungarianFilmDays.title') }}</h1>
    <p v-html="$t('hungarianFilmDays.p')"></p>
    <section
      v-for="(section, index) in sections"
      :key="`single-about-section-${ index }`"
    >
      <h2>{{ section.heading }}</h2>
      <p v-html="section.p"></p>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sections: this.$i18n.messages[this.$i18n.locale].hungarianFilmDays.sections
    }
  }
}
</script>

<style scoped>
h2 {
  margin: 1.5em 0 -0.25em 0;
  text-transform: initial;
}

@media (max-width: 375px) {
  h1 {
    word-break: break-all;
  }
}
</style>
