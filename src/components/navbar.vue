<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light">
    <div class="container-fluid">
      <!-- <a class="navbar-brand" href="#">Deemos</a> -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link">
              <font-awesome-icon icon="home" /> Home
            </router-link>
          </li>
          <li class="nav-item" v-if="!logged_in">
            <router-link to="/login" class="nav-link">
              <font-awesome-icon icon="right-to-bracket" />
              Login</router-link
            >
          </li>
          <li
            class="nav-item nav-link"
            style="cursor: pointer"
            v-if="logged_in"
            @click="clear_storage()"
          >
            <font-awesome-icon icon="right-from-bracket" />Logout
          </li>
          <li class="nav-item">
            <router-link to="/dashboard" class="nav-link">
              <font-awesome-icon icon="gauge" />
              Dashboard</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/matchlist" class="nav-link">
              <font-awesome-icon icon="list" />
              Match List</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import store from "../store/index";

export default {
  name: "NavBar",
  setup() {},
  methods: {
    clear_storage() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      store.commit("auth/clearLoginData");
      this.$router.push("/login");
    },
  },
  computed: {
    logged_in() {
      return store.getters["auth/isTokenActive"];
    },
  },
};
</script>
