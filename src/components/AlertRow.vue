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
  computed: mapState('auth',['lastMessage']),
};
</script>
  