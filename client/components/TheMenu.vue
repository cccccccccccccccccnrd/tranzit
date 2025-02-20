<template>
  <div class="menu-container">
    <header>
      <nuxt-link :to="$i18n.path('')">
        <logo
          color="rgba(232, 228, 232, 1)"
          text="true"
          @click.native="closeMenu"
        />
      </nuxt-link>
      <span @click="toggleMenu" class="cursor-pointer">{{ $t('ui.close').toUpperCase() }}</span>
    </header>
    <div class="container">
      <nav>
        <nuxt-link :to="$i18n.path('about')">
          <h1 @click="toggleMenu">{{ $t('menu.about') }}</h1>
        </nuxt-link>
        <nuxt-link :to="$i18n.path('archive')">
          <h1 @click="toggleMenu">{{ $t('menu.archive') }}</h1>
        </nuxt-link>
        <nuxt-link :to="$i18n.path('contact')">
          <h1 @click="toggleMenu">{{ $t('menu.contact') }}</h1>
        </nuxt-link>
        <br/>
        <div class="locales">
          <nuxt-link
            v-for="locale in locales"
            :key="`${ locale }-key`"
            :to="`/${ locale }${$route.fullPath.replace(/^\/[^\/]+/, '')}`"
            :class="{ active: isActive(locale) }"
          >
            {{ locale }}
          </nuxt-link>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import Logo from '@/components/Logo.vue'
import { mapMutations } from 'vuex'

export default {
  components: {
    Logo
  },
  data () {
    return {
      locales: this.$store.getters['lang/locales'],
    }
  },
  methods: {
    isActive: function(locale) {
      return locale === this.$store.getters['lang/locale']
    },
    ...mapMutations({
      toggleMenu: 'menu/toggle',
      closeMenu: 'menu/close'
    })
  }
}
</script>


<style scoped>
.locales a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3em;
  height: 3em;
  margin: 0 0 1em 0;
  text-transform: uppercase;
  color: var(--color-primary);
  border-radius: 100px;
  border: 1px solid var(--color-primary);
}

.locales a:hover {
  color: black;
  background: silver;
  border: 1px solid silver;
}

.locales .active {
  color: black;
  background: var(--color-primary);
}

.menu-container {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  /* padding: 1em; */
  color: var(--color-primary);
  background: black;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5vh;
  padding: 0 calc(5vh / 2.5);
}

nav a {
  color: var(--color-primary);
}

nav a:hover {
  color: silver;
}

.container {
  display: flex;
  justify-content: space-between;
  padding: 0 calc(5vh / 2.5);
}

@media (max-width: 800px) {
  h1 {
    font-size: 3em;
  }
}
</style>

