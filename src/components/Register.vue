<template>

  <div class="container">
    <h4>Register</h4>
    <form @submit.prevent="register">
      <label for="username">Discord Id</label>
      <div>
        <input
          id="username"
          type="text"
          v-model="username"
          required
          autofocus
        />
      </div>
      <label for="password">Password</label>
      <div>
        <input id="password" type="password" v-model="password" required />
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
    password: "amataro",
    password_confirmation: "amataro",
    is_admin: null,
    alertMessage: "",
  }),
  methods: {
    register() {
      let data = {
        username: this.username,
        password: this.password
      };
      this.$store.dispatch("auth/register", data);
    },
  },
};
</script>