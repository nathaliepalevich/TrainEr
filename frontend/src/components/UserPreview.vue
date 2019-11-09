<template >
  <swiper-slide>
    <div>
      <router-link :to="`/user-details/${this.currUser._id}`">
        <md-card>
          <md-card-media class="users-page">
            <img :src="userImg" alt="lessonImg" />
            <h1>{{currUser.fullName}}</h1>
          </md-card-media>
        </md-card>
      </router-link>
    </div>
  </swiper-slide>
</template>

<script>
export default {
  props: {
    currUser: {
      type: Object
    }
  },
  computed: {
    userImg() {
      return this.currUser.userImg;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>