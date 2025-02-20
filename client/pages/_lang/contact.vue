<template>
  <div class="single single-contact ">
    <div class="indent">
      <h1>{{ $t('contact.title') }}</h1>
      <p v-html="$t('contact.p')"></p>
    </div>
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
