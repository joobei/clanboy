<template>
  <div>
    <NavBar/>
    <AlertRow/>
    <router-view></router-view>
  </div>

</template>

<script>
import NavBar from "@/components/navbar.vue"
import AlertRow from "@/components/AlertRow.vue"

export default {
  name: "App",
  components: { NavBar, AlertRow },
  data() {
    return {
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
</style>
