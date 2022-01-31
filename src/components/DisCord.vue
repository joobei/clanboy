<template>
  <div class="container">
    <h2>Please wait while you are being logged in</h2>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Discord_",
  computed: mapState("auth", ["loginStatus"]),
  mounted() {
    console.log(this.$route.query.code);
    this.$store.dispatch("auth/discord_login", this.$route.query.code);
  },
  watch: {
    loginStatus: function() {
      this.$router.push('/matchlist')
    }
  }
};
</script>
