<template>
  <div id="tranzit">
    <the-menu v-if="isMenuOpen"/>
    <the-header/>
    <main>
      <nuxt/>
    </main>
  </div>
</template>

<script>
import TheMenu from '@/components/TheMenu.vue'
import TheHeader from '@/components/TheHeader.vue'

export default {
  components: {
    TheMenu,
    TheHeader
  },
  head () {
    return {
      title: this.$i18n.messages[this.$i18n.locale].tranzit.toUpperCase()
    }
  },
  mounted () {
    this.setVh()

    window.addEventListener('resize', () => {
      this.setVh()
    })
  },
  computed: {
    isMenuOpen: function () {
      return this.$store.state.menu.open
    }
  },
  methods: {
    setVh: function () {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${ vh }px`)
    }
  }
}
</script>

<style>
/* global styles */
@font-face {
  font-family: "AnkaCoder-r";
  src: url('~assets/AnkaCoder-r.ttf');
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  height: 5px;
  width: 9px;
}

::-webkit-scrollbar-thumb {
  background: black;
}

:root {
  --color-primary: rgba(232, 228, 232, 1);
}

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
}

html {
  font-family: "AnkaCoder-r", "Breite", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 18px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  scroll-behavior: smooth;
  background: rgba(232, 228, 232, 1);
}

body {
  scrollbar-width: 2px;
  scrollbar-color: black;
}

p, ul, ol {
  font-size: 1.1em;
  font-family: "Arial", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  line-height: 1.3;
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
  width: 100%;
  height: 95vh;
}

#tranzit {
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;
}

.cursor-pointer {
  cursor: pointer;
}

.invert {
  filter: invert(100%);
}

.indent {
  max-width: 600px;
}

.single {
  padding: 1em;
  height: 95vh;
  overflow-y: auto;
}

.single-no-padding {
  padding: 0;
}

.single a {
  border-bottom: 2px solid black;
}

.single a:hover {
  border-bottom: none;
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

@media (max-width: 800px) {
  body {
    font-size: 13px;
  }
}
</style>
