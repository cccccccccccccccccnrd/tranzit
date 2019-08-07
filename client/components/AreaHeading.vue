<template>
  <div class="area-heading">
    <nuxt-link :to="$i18n.path(`${ site.toLowerCase() }`)">
      <h1>{{ $t(`${ site }.title`) }}</h1>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['site']
}
</script>


<style scoped>
.area-heading {
  display: flex;
  flex-flow: row nowrap;
  padding: 1em;
}
</style>
