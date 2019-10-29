<template>
  <div id="app">
    <app-nav :user="getUser" @logout="logout"></app-nav>
    <main id="page-wrap">
      <App-Header :user="getUser"></App-Header>
      <router-view :key="$route.fullPath" />
    </main>
  </div>
</template>

<script>
import UserService from "./services/UserService";
import global from "@/styles/global.scss";
import Store from "./store.js";
import AppNav from "./components/AppNav";
import AppHeader from "./components/AppHeader";
export default {
  data() {
    return {
      user: null
    };
  },
  computed: {},
  components: {
    AppNav,
    AppHeader
  },

  created() {
    this.$store.dispatch({ type: "getLessons" });
    this.$store.dispatch({ type: "getLoggedUser" });
    this.$store.dispatch({ type: "getFilters" });
  },
  computed: {
    getUser() {
      return this.$store.getters.getUser;
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch({
        type: "logout",
        editUser: this.getUser
      });
    }
  }
};
</script>

<style lang="scss">
</style>
