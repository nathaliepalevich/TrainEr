<template>
  <section>
    <div class="user-info flex column left">
      <div class="flex start" v-for="(value, name) in userInfo" :key="name">
        <div class="precent-width-100">
          <div class="flex align-baseline">
            <h2>{{name}}</h2>
            {{value}}
          </div>
          <hr class="underline precent-width-100" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    currUserPage: {
      type: Object
    }
  },
  data() {
    return {
      userInfo: {
        Name: this.currUserPage.fullName,
        Email: this.currUserPage.email,
        Phone: this.currUserPage.tel,
        "About me": this.currUserPage.aboutMe
      }
    };
  },
  computed: {
    aboutUser() {
      return this.currUserPage;
    }
  }
};
</script>

<style lang="scss">
</style>
