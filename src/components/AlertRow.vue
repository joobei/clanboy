<template>
  <div class="row">
    <div
      class="alert alert-danger" style="width:100%"
      align="center"
      id="bottomAlert"
    >
      {{ message }}
    </div>
  </div>
</template>

  <script>
export default {
  name: "AlertRow",
  props: ["message"],
  // data: function () {
  //   return {
  //     alertMessage: "test",
  //   };
  // },
};
</script>
  