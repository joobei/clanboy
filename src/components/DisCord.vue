<template>
  <div class="container">
    <p>Please wait while you are being logged in</p>
    <h2>{{ discord_info }}</h2>
  </div>
</template>
<script>
export default {
  name: "Discord_",
  data() {
    return { discord_info: null };
  },
  mounted() {
    console.log(this.$route.query.code);
    this.discord_info = "http://localhost:5000/auth/discord/callback?code="+
      this.$route.query.code;
    this.$store.dispatch("auth/discord_login", this.$route.query.code);
  },
};
</script>
