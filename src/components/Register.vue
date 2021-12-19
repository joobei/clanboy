<template>
  <div class="container">
    <h4>Register</h4>
    <form @submit.prevent="register">
      <!-- <label for="name">Name</label>
      <div>
        <input id="name" type="text" v-model="name" required autofocus />
      </div>

      <label for="email">E-Mail Address</label>
      <div>
        <input id="email" type="email" v-model="email" required />
      </div>

      <label for="password">Password</label>
      <div>
        <input id="password" type="password" v-model="password" required />
      </div>

      <label for="password-confirm">Confirm Password</label>
      <div>
        <input
          id="password-confirm"
          type="password"
          v-model="password_confirmation"
          required
        />
      </div> -->
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
    </form>
  </div>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">...</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
// @ts-ignore
import { Modal } from "bootstrap";

export default {
  name: "RegiStration",
  data: () => ({
    username: "jubei",
    email: "nkatzakis@gmail.com",
    password: "amataro",
    password_confirmation: "amataro",
    is_admin: null,
    modal: null,
  }),
  mounted() {
    this.modal = new Modal(document.getElementById("exampleModal"), {
      keyboard: false,
    });
  },
  methods: {
    register: function () {
      let data = {
        username: this.username,
        email: this.email,
        password: this.password,
        is_admin: this.is_admin,
      };
      this.$store
        .dispatch("auth/register", data)
        .then(() => this.$router.push("/dashboard"))
        .catch((err) => console.log(err));
    },
  },
};
</script>