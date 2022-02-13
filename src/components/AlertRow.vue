<template>
  <div class="row" v-if="visible" @toast-updated="makeVisible">
    <div class="alert alert-danger" style="width: 100%" align="center">
      {{ lastMessage }}
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      timer: 3000,
      visible: false,
    };
  },
  computed: mapState("auth", ["lastMessage","pendingMessage"]),
  watch: {
    pendingMessage: function () {
      this.visible = this.pendingMessage
      setTimeout(() => this.$store.dispatch('auth/clear_pending_message'),3000
      );
    },
  },
};
</script>
  