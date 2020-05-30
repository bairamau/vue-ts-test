<template>
  <div id="app">
    <div id="nav" v-if="$route.name !== 'home'">
      <router-link :to="{ name: 'home' }">Home</router-link>
    </div>
    <div id="nav" v-else>
      <router-link :to="{ name: 'table' }">Table</router-link>
      <router-link :to="{ name: 'canvas' }">Canvas</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif, Helvetica,
    Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 30px;
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;
    margin-right: 20px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
