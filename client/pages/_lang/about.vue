<template>
  <div class="single single-about">
    <div class="indent">
      <h1>{{ $t('about.title') }}</h1>
      <p>{{ $t('about.p') }}</p>
      <section
        v-for="(section, index) in sections"
        :key="`single-about-section-${ index }`"
      >
        <h2>{{ section.heading }}</h2>
        <p>{{ section.p }}</p>
      </section>
    </div>
  </div>
</template>

<script>
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
  margin: 1.5em 0 -0.25em 0;
  text-transform: initial;
}
</style>
