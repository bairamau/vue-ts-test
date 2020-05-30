<template>
  <div id="app" :class="$style.app">
    <div :class="$style.nav" v-if="$route.name !== 'home'">
      <router-link :class="$style.link" :to="{ name: 'home' }">Home</router-link>
    </div>
    <div id="nav" :class="$style.nav" v-else>
      <router-link :class="$style.link" :to="{ name: 'table' }">Table</router-link>
      <router-link :class="$style.link" :to="{ name: 'canvas' }">Canvas</router-link>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { useStore } from "vuex-simple";
import { Store } from "@/store/store";

@Component
export default class App extends Vue {
  public store: Store = useStore(this.$store);
  public created() {
    this.store.fruits.requestFruits();
    this.store.canvas.requestImage();
  }
}
</script>

<style lang="scss" module>
.app {
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    "Open Sans",
    "Helvetica Neue",
    sans-serif,
    Helvetica,
    Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 30px;
}

.nav {
  padding-bottom: 20px;

  .link {
    font-weight: bold;
    color: #2c3e50;
    margin-right: 20px;
  }
}
</style>
