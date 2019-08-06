<template>
  <div class="single-error">
    <h1>{{ $t('error') }}</h1>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>

<style scoped>
.single-error {
  margin: 3em 0 0 0;
  padding: 1em;
}
</style>
