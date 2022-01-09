<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light">
    <div class="container-fluid">
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
            <router-link to="/" class="nav-link">Home
            </router-link>
          </li>
          
          <li class="nav-item">
            <router-link to="/matchlist" class="nav-link">
              Match List</router-link
            >
          </li>
          <li class="nav-item">
            
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item" v-if="loginStatus">
            <router-link to="/dashboard" class="nav-link">
              Dashboard</router-link
            >
          </li>
          <li
            v-if="loginStatus"
            class="nav-item nav-link"
            style="cursor: pointer"
            @click="logout"
          >
            Logout
          </li>
          <li class="nav-item " v-else>
            <router-link to="/login" class="nav-link">
              Login</router-link
            >
          </li>
    
    
    <!-- <router-link v-if="!loginStatus" to="/register" class="nav-link"><button type="button" class="btn btn-primary">
        Sign Up
      </button></router-link> -->
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "NavBar",
  setup() {},
  methods: {
    logout: function () {
      this.$store.dispatch("auth/logout").then(() => {
        this.$router.push("/");
      });
    },
  },
  computed: mapState('auth', ["loginStatus"]),
};
</script>