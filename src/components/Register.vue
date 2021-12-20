<template>

  <div class="container">
    <h4>Register</h4>
    <form @submit.prevent="register">
      <label for="username">Name</label>
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
        email: this.email,
        password: this.password,
        is_admin: this.is_admin,
      };
      this.$store
        .dispatch("auth/register", data)
        .then(
            // this.alertMessage = this.$store.getters['auth/getLastMessage']
            // this.$emit('alert-message-available')
        )
        .catch((err) => console.log(err));
    },
  },
};
</script>