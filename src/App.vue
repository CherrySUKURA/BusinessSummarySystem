<template>
  <div id="app">
    <div id="nav">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}

/* #nav {
  padding: 30px;
} */

#nav a {
  font-weight: bold;
  color: #ffffff;
  text-decoration: none;
}
li{
  list-style: none;
}
/* #nav a.router-link-exact-active {
  color: #ffffff;
  text-decoration: none;
} */
</style>
