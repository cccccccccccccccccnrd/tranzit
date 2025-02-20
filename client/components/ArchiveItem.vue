<template>
  <div
    class="archive-item"
    :style="`background: url('${apiUrl}${entry.gallery[0]}') no-repeat center center;`"
  >
    <div class="info">
      <small class="title">{{ entry.name }} {{ entry.year ? `(${entry.year})` : '' }}</small>
      <small class="sub">{{ entry.sub }}</small>
    </div>
  </div>
</template>

<script>
export default {
  props: ['entry'],
  data () {
    return {
      apiUrl: process.env.OWN_API_URL,
    }
  },
  methods: {
    background (url) {
      return require(`@/assets/${url}`)
    }
  }
}
</script>

<style scoped>
.archive-item {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 50%;
  height: 25vh;
  overflow: hidden;
}

.archive-item:hover {
  cursor: pointer;
}

.archive-item:hover .info {
  opacity: 0;
}

img {
  width: 100%;
}

p {
  margin: 0;
}

.background {
  display: block;
  width: 30vh;
  height: 20vh;
  background-size: cover;
}

.info {
  position: absolute;
  display: flex;
  flex-flow: column nowrap;
  max-width: 90%;
  padding: 0.6em 0.8em;
  color: white;
  text-transform: uppercase;
  background: black;
  border-radius: 100px;
  box-shadow: 0.5em 0.5em 1em black;
  opacity: 1;
  /* transition: all ease-in-out 800ms; */
}

.title {
  font-weight: 700;
  font-size: 0.8em;
  top: calc(15000px / 2);
}

.sub {
  font-size: 0.6em;
}

/* .info {
  position: absolute;
  border-radius: 100px;
  color: white;
  margin: 0.5em 0 0 0.5em;
  font-size: 0.8em;
  font-weight: 800;
  text-shadow: 0 0 0.3em black;
} */

@media (max-width: 800px) {
  .archive-item {
    width: 100%;
  }
}
</style>
