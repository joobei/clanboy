<template>
  <div class="container">
    <h2>Please wait while you are being logged in</h2>
    <div class="spinner-border .m-5" role="status"></div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Discord_",
  computed: mapState("auth", ["loginStatus","pendingMessage"]),
  mounted() {
    this.$store.dispatch("auth/discord_login", this.$route.query.code);
  },
  watch: {
    loginStatus: function() {
      this.$router.push('/matchlist')
    },
    pendingMessage: function() {
      this.$router.push('/')
    }
  }
};
</script>
