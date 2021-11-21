<template>
  <div id="App">
    <div id="header" style="display:flex">
    <img src="./assets/hll_logo.jpeg" style="width:5vw;display:block;margin-left:2vh;"/>
      <h1 style="margin:auto;">Deemos</h1>
    </div>
    <div id="bottom">
      <div id="left_nav_pane">        
        <router-link to="/matchlist">Match List</router-link> || <router-link to="/Memberlist">Member list</router-link>
      </div>
      <div id="main_content">
        <router-view />
     </div>
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
