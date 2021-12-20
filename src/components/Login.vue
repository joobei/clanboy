<template>
  <div class="container" style="max-width: 50%">
    <h4>Login</h4>
    <form>
      <div class="mb-3">
        <label for="txtuserName" class="form-label">User Name</label>
        <input
          type="text"
          class="form-control"
          id="txtuserName"
          aria-describedby="emailHelp"
          v-model="username"
        />
      </div>
      <div class="mb-3">
        <label for="txtPassword" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="txtPassword"
          v-model="password"
        />
      </div>
      <button type="button" class="btn btn-primary" @click="login()">
        Submit
      </button>
    </form>
    <div class="container text-center">
    <router-link to="/register" class="nav-link">Register</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Login_form",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {
    ...mapGetters("auth", {
      getterLoginStatus: "authStatus",
    }),
  },
  methods: {
    ...mapActions("auth", {
      actionLogin: "login",
    }),
    async login() {
      await this.actionLogin({
        username: this.username,
        password: this.password,
      });
      //todo redirect if success
      // this.$router.push("/dashboard");
      
    },
  },
};
</script>