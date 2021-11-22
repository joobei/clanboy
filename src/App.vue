<template>
  <div id="App">
    <div id="header" style="padding:10px">
      <router-link to="/matchlist">Match List</router-link> || <router-link to="/Memberlist">Member list</router-link>
    </div>
    <div id="bottom">
        <router-view />
    </div>
  </div> 
</template>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
