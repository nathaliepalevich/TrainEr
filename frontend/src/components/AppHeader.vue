<template>
  <md-toolbar>
    <div class="header-bless flex precent-width-100 space-between">
      <h2 v-if="user">{{this.user.fullName}}</h2>
      <router-link to="/">
        <img src="../assets/images/logo/logo.png" />
      </router-link>
    </div>
  </md-toolbar>
</template>

<script>
export default {
  props: ["user"]
};
</script>

<style lang="scss">
.md-toolbar {
  position: fixed !important;
  height: 50px;
  z-index: 100 !important;
}
.header-bless {
  img {
    max-width: 150px;
  }
}
</style>
