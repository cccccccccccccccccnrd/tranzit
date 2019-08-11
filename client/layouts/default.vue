<template>
  <div id="tranzit-house">
    <the-header/>
    <main>
      <nuxt/>
    </main>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'

export default {
  components: {
    TheHeader
  },
  head () {
    return {
      title: this.$i18n.messages[this.$i18n.locale].tranzit.toUpperCase()
    }
  },
  mounted () {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${ vh }px`)
  }
}
</script>

<style>
/* global styles */
::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 2px;
  height: 2px;
}

::-webkit-scrollbar-thumb {
  background: black;
}

html {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  scroll-behavior: smooth;
}

body {
  margin: 0;
}

p {
  font-size: 1.5em;
}

strong {
  font-weight: 500;
}

small {
  font-size: 1em;
}

h1 {
  margin: 0;
  font-size: 4em;
  font-weight: normal;
  text-transform: uppercase;
  line-height: 1;
}

h2 {
  margin: 0;
  font-size: 2em;
  font-weight: normal;
  text-transform: uppercase;
  line-height: 1;
}

h3 {
  margin: 0;
  font-size: 1em;
  font-weight: normal;
  text-transform: uppercase;
  line-height: 1;
}

a {
  color: black;
  text-decoration: none;
}

a:hover {
  border: 0;
}

img {
  max-width: 100%;
}

main {
  position: absolute;
  width: 100%;
}

.invert {
  filter: invert(100%);
}

.indent {
  max-width: 600px;
}

.single {
  margin: 3em 0 0 0;
  padding: 1em;
}

.loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: white;
}

@media (min-width: 800px) {}
</style>
