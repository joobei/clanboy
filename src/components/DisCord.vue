<template>
  <div class="container">
    <h3 style="margin-top:2em">Please wait while you are being logged in</h3>
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
