<template>
  <div class="home position-relative justify-center">
    <home-hero :user="getUser"></home-hero>
    <home-body></home-body>

  </div>
</template>

<script>
import HomeBody from "../components/HomeBody";
import HomeHero from "../components/HomeHero";
import UserService from "../services/UserService";
export default {
  name: "home",
  components: {
    HomeBody,
    HomeHero,
  },

  computed: {
    getUser() {
      return this.$store.getters.getUser;
    }
  }
};
</script>

<style >
</style>


