<template>
  <div class="area-about">
    <nuxt-link :to="$i18n.path(`about`)">
      <h1>{{ $t('about.title') }}</h1>
    </nuxt-link>
  </div>
</template>

<style scoped>
.area-about {
  display: flex;
  flex-flow: row nowrap;
  padding: 1em;
}
</style>
