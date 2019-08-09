<template>
  <header :class="{ invert: !isIndex }">
    <nuxt-link :to="$i18n.path('')">
      <logo
        color="black"
        text="true"
      />
    </nuxt-link>
    :-)
    <nav>
      <nuxt-link :to="`/${ locales[0] }${$route.fullPath.replace(/^\/[^\/]+/, '')}`">{{ locales[0] }}</nuxt-link>
      <nuxt-link :to="`/${ locales[1] }${$route.fullPath.replace(/^\/[^\/]+/, '')}`">{{ locales[1] }}</nuxt-link>
      <nuxt-link :to="`/${ locales[2] }${$route.fullPath.replace(/^\/[^\/]+/, '')}`">{{ locales[2] }}</nuxt-link>
    </nav>
  </header>
</template>

<script>
import Logo from '@/components/Logo.vue'

export default {
  components: {
    Logo
  },
  data () {
    return {
      locales: this.$store.getters['lang/locales']
    }
  },
  computed: {
    isIndex: function () {
      return this.$route.name === 'lang'
    }
  }
}
</script>


<style scoped>
header {
  box-sizing: border-box;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1em;
  background: white;
  z-index: 5;
  transition: all 500ms ease-in-out;
}

nav a {
  margin: 0 0 0 0.5em;
  padding: 0 0 0.1em 0;
  line-height: 1;
  text-transform: uppercase;
}
</style>

