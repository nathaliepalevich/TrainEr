<template>
  <section class="signup flex justify-center position-relative">
    <form @submit.prevent="signup">
      <div class="form-container flex column justify-evenly center">
        <h1 :v-if="signupUser">{{addEdit}}</h1>
        <div class="form-input flex justify-evenly wrap">
          <div class="form-details">
            <md-field>
              <label>Full Name</label>
              <md-input type="text" v-model="signupCred.fullName" required></md-input>
            </md-field>
            <md-field>
              <label>Phone Number</label>
              <md-input type="tel" v-model="signupCred.tel" required></md-input>
            </md-field>
            <md-field>
              <label>E-mail</label>
              <md-input type="email" v-model="signupCred.email"></md-input>
            </md-field>
            <md-field v-if="signupUser">
              <label>Password</label>
              <md-input type="password" v-model="signupCred.password" required></md-input>
            </md-field>
          </div>
          <div class="form-more-details">
            <md-field>
              <label>Tell us about yourself</label>
              <md-content class="md-scrollbar">
                <md-textarea type="text-box" v-model="signupCred.aboutMe"></md-textarea>
              </md-content>
            </md-field>
            <div >
              <md-checkbox v-if="signupUser"
                v-model="signupCred.isTrainer"
                name="trainer"
                value="trainer"
                class="md-primary"
              >Are you a trainer</md-checkbox>
              <md-field>
                <label>Please upload an Image</label>
                <md-file type="file" @change="handleUploadImage($event)" accept="image/*" />
              </md-field>
            </div>
        
          </div>
        </div>
        <div class="btn-register">
          <md-button
            type="submit"
            :v-if="signupUser"
            :disabled="isUploading"
            class="md-raised"
          >{{regEdit}}</md-button>
          <md-button @click="cancelChange"  class="md-raised">Cancel</md-button>
        </div>
      </div>
    </form>
      <div :class="{none: !isUploading }" class="loading-spinner">
          <md-progress-spinner class="md-accent" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
      </div>
  </section>
</template>

<script>
import UserService from "../services/UserService";

import Swal from "sweetalert2";
import axios from "axios";
import SocketService from '../services/SocketService.js'

export default {
  name: "signup",
  data() {
    return {
      isUploading: false,
      type: null,
      signupCred: {
        fullName: "",
        tel: "",
        email: "",
        userImg: "",
        password: "",
        isTrainer: false,
        aboutMe: "",
        reviews: [],
        rating: [],
      },
      signupUser: true,
      addEdit: "Signup Form",
      regEdit: "Register",
      user: null
    };
  },
  async created() {
    const user = await this.$store.getters.getUser;
    let userDetails = Object.assign({}, user);
    if (userDetails.fullName) {
      this.signupUser = false;
      this.addEdit = "Edit Profile";
      this.regEdit = "Save";
      this.signupCred = userDetails;
    }
  },

  methods: {
    async handleUploadImage(ev) {
      this.isUploading = true;
      const form = new FormData();
      form.append("imgUpload", ev.target.files[0]);
      const res = await axios.post(
        `http:${SocketService.BASE_URL}/upload/cloudinary`,
        form
      );
      this.signupCred.userImg = await res.data.secure_url;
      this.isUploading = false;
    },
    async signup() {
      if (!this.signupCred.userImg){
        this.signupCred.userImg = require("../assets/user_icon.png");

      }

      let user = await this.$store.dispatch({
        type: "saveUser",
        editUser: this.signupCred
      });
         this.$router.push(`/user-details/${user._id}`);
      Swal.fire({
        title: "CONGRATS!",
        text: "You are now officially a PRO TRAIN-ER member!",
        imageUrl: this.signupCred.userImg,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        animation: false
      });
    },
    cancelChange() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss">
</style>
