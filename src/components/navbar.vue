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
            <router-link to="/" class="nav-link">
              <!-- <font-awesome-icon icon="home" />  -->Home
            </router-link>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link to="/login" class="nav-link">
              <!-- <font-awesome-icon icon="right-to-bracket" /> -->
              Login</router-link
            >
          </li>
          <li
            class="nav-item nav-link"
            style="cursor: pointer"
            v-if="isLoggedIn"
            @click="logout"
          >
            <!-- <font-awesome-icon icon="right-from-bracket" />-->
            Logout
          </li>
          <li class="nav-item">
            <router-link to="/dashboard" class="nav-link">
              <!-- <font-awesome-icon icon="gauge" /> -->
              Dashboard</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/matchlist" class="nav-link">
              <!-- <font-awesome-icon icon="list" /> -->
              Match List</router-link
            >
          </li>
          <li class="nav-item">
            
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  setup() {},
  methods: {
    logout: function () {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>