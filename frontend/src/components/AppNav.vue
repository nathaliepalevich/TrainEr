<template>
  <PushRotate>
    <div class="menu-container column">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <div class="list">
        <div class="title-item flex">
          <md-avatar class="md-medum">
            <img v-if="user" :src="user.userImg" />
          </md-avatar>
          <span v-if="user">{{user.fullName}}</span>
        </div>
        <div class="header__spacer"></div>
        <hr class="divider" />
        <nav>
          <ul>
            <li>
              <div class=" flex">
                <router-link class="list-item" to="/" exact>
                  <md-icon class="fa fa-home"></md-icon>Home
                </router-link>
              </div>
            </li>
            <li v-if="user">
              <div class=" flex">
                <router-link class="list-item" :to="'../user-details/'+this.user._id">
                <md-icon class="fa fa-user"></md-icon>
                Profile</router-link>
              </div>
            </li>
            <li>
              <div class=" flex">
                <router-link class="list-item" to="/users">
                <md-icon class="fa fa-users"></md-icon>
                All users page</router-link>
              </div>
            </li>
            <li v-if="!user">
              <div class=" flex">
                <router-link class="list-item" to="/sign-up">
                <md-icon class="fa fa-user-plus"></md-icon>
                SignUp</router-link>
              </div>
            </li>
            <li v-if="!user">
              <div class=" flex">
                <router-link class="list-item" to="/login">
                <md-icon class="fa fa-sign-in"></md-icon>
                LogIn</router-link>
              </div>
            </li>
            <li v-if="user" @click="logout">
              <div class=" flex">
                <router-link to class="list-item">
                  <button class="logout precent-width-100 left">
                    <md-icon class="fa fa-sign-out"></md-icon>Logout
                  </button>
                </router-link>
              </div>
            </li>
            <li>
              <div class=" flex">
                <router-link class="list-item" to="/app-guide">
                <i class="fa fa-question-circle"></i>
                About us &amp; App guide</router-link>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </PushRotate>
</template>
<script>
import { PushRotate } from "vue-burger-menu";
export default {
  name: "app-nav",
  props: ["user"],
  methods: {
    async logout() {
      this.$emit("logout", this.user);
      this.$router.push("/");
    }
  },
  components: {
    PushRotate
  }
};
</script>

<style lang="scss">
</style>
