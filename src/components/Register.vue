<template>
  <div class="container" style="max-width: 50%">
    <h4 style="margin-top: 40px">Register</h4>
    <form @submit.prevent="register">
      <div class="mb-3">
      <label class="form-label" for="username">Discord Id</label>
        <input
          type="text"
          class="form-control"
          id="username"
          v-model="username"
          required
          autofocus
        />
      </div>
      <div class="mb-3">
      <label class="form-label" for="password"></label>
        <input class="form-control" id="password" type="password" v-model="password" required/>{{this.$route.query.code}}
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "RegiStration",
  data: () => ({
    username: "jubei",
    email: "nkatzakis@gmail.com",
    password: "",
    password_confirmation: "",
    is_admin: null,
    alertMessage: "",
  }),
  methods: {
    register() {
      let data = {
        username: this.username,
        password: this.password,
      };
      this.$store.dispatch("auth/register", data);
    },
  },
};
</script>