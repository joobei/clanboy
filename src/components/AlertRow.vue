<template>
  <div class="row">
    <div
      class="alert alert-danger"
      style="width: 100%"
      align="center"
    >
      {{ lastMessage }}
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AlertRow",
  // data: function () {
  //   return {
  //     message: "untouched",
  //   };
  // },
  computed: mapState('auth',['lastMessage']),
  // methods: {
  //   fetch_message() {
  //     this.message = this.$store.getters["auth/getLastMessage"];
  //   },
  // },
};
</script>
  