<template>
  <header class="border">
    <nuxt-link
      :to="$i18n.path('')"
    >
      <logo
        color="black"
        text="true"
      />
    </nuxt-link>
    <nav>
      <span
        @click="toggleMenu"
        class="cursor-pointer"
      >{{ $t('ui.menu').toUpperCase() }}</span>
    </nav>
  </header>
</template>

<script>
import Logo from '@/components/Logo.vue'
import { mapMutations } from 'vuex'

export default {
  components: {
    Logo
  },
  data () {
    return {}
  },
  computed: {
    isIndex: function () {
      return this.$route.name === 'lang'
    }
  },
  methods: {
    ...mapMutations({
      toggleMenu: 'menu/toggle',
      closeMenu: 'menu/close'
    })
  }
}
</script>


<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5vh;
  padding: 0 calc(5vh / 2.5);
  z-index: 5;
  border-bottom: 1px solid transparent;
  /* transition: all 500ms ease-in-out; */
}

nav a {
  margin: 0 0 0 0.5em;
  padding: 0 0 0.1em 0;
  line-height: 1;
  text-transform: uppercase;
}

.border {
  border-bottom: 1px solid black;
}
</style>

