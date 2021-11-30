<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link">
              <font-awesome-icon icon="home" /> Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link">
              <font-awesome-icon icon="right-to-bracket"/>
              Login</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/dashboard" class="nav-link">
              <font-awesome-icon icon="gauge" />
              Dashboard</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/matchlist" class="nav-link"
              >
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
export default {
  name: "NavBar",
  setup() {},
};
</script>
