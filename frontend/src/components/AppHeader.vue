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
#page-wrap {
  .md-toolbar {
    position: fixed !important;
    min-height: 40px !important;
    z-index: 100 !important;
  }
}
@media (max-width: 960px) {
  .md-toolbar,
  .md-toolbar-row {
    min-height: 40px !important;
  }
}
</style>
