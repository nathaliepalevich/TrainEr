<template>
  <section class="login flex justify-center position-relative ">
    <div class="login-container">
      <h1>LOGIN</h1>
      <form @submit.prevent="login">
        <md-field>
          <label>Phone</label>
          <md-input type="text" v-model="loginCred.phoneNum" required></md-input>
          <span class="md-helper-text">(050-123-4567)</span>
        </md-field>
        <md-field :md-toggle-password="true">
          <label>Password</label>
          <md-input type="password" v-model="loginCred.password" required></md-input>
        </md-field>
        <p class="wrong" v-if="wrongCred === 'wrong'">Wrong phone number / password</p>
        <md-button type="submit" class="md-raised">Login</md-button>
      </form>
    </div>
  </section>
</template>

<script>
import UserService from "../services/UserService";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      loginCred: { phoneNum: "", password: "" },
      user: null,
      wrongCred: ""
    };
  },
  computed: {},
  methods: {
    async login() {
      this.user = await this.$store.dispatch({
        type: "login",
        userCred: this.loginCred
      });
      if (this.user) {
        this.$router.push("/");
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000
        });
        Toast.fire({
          type: "success",
          title: "Signed in successfully"
        });
      }
      this.wrongCred = "wrong";
      this.loginCred = { phoneNum: "", password: "" };
    }
  }
};
</script>

<style lang="scss">
</style>
