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
  computed: mapState("auth", ["lastMessage"]),
  methods: {
    makeVisible() {
      this.visible = true;
      setTimeout(() => this.visible = false, 3000);
    }
  },
  watch: {
    lastMessage: function () {
      this.makeVisible();
    },
  },
};
</script>
  