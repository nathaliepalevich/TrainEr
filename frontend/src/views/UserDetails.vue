<template>
  <main class="user-details flex column padding-20-20-px position-relative" v-if="currUserPage">
    <div class="flex">
      <div class="user-header flex space-between precent-width-100">
        <div class="flex flex-start">
          <md-button @click="swichView" :class="{ active: currView === 'Calendar'}">Calendar</md-button>
          <md-button
            @click="swichView"
            :class="{ active: currView === 'Reviews'}"
            v-if="currUserPage  &&currUserPage.isTrainer"
          >Reviews</md-button>
          <md-button @click="swichView" :class="{ active: currView === 'About'}">About</md-button>
          <md-button v-if="isUserPageOwner">
            <router-link to="/sign-up">Edit Profile</router-link>
          </md-button>
        </div>
        <div class="user-page-info flex align-center">
          <md-avatar class="md-medume">
            <img :src="currUserPage.userImg" />
          </md-avatar>
          <h1 class="fs17">{{usersProf}} profile</h1>
        </div>
      </div>
    </div>
    <about-user v-if="currView === 'About'" :currUserPage="currUserPage"></about-user>
    <div v-if="currView === 'Reviews'">
      <trainer-reviews @addReview="addReview" :currUserPage="currUserPage"></trainer-reviews>
    </div>
    <div v-if="currView === 'Calendar'" class="wraper-calendar">
      <user-calendar
        v-if="lessons"
        :loggedUser="loggedUser"
        :currUserPage="currUserPage"
        :lessons="lessons"
        @set-form="setForm"
        :passedEv="passedEv"
      ></user-calendar>
    </div>
  </main>
</template>

<script>
import UserCalendar from "../components/UserCalendar";
import LessonForm from "../components/LessonForm";
import UserService from "../services/UserService";
import TrainerReviews from "../components/TrainerReviews";
import AboutUser from "../views/AboutUser";

export default {
  name: "user-details",
  data() {
    return {
      lessons: null,
      isCreateLesson: false,
      passedEv: null,
      isUserPageOwner: false,
      currUserPage: null,
      currView: "Calendar",
      isActive: true,
      usersProf: ""
    };
  },
  async created() {
    let profilesUserId = this.$route.params.id;
    this.currUserPage = await this.$store.dispatch({
      type: "currProfileUser",
      profilesUserId
    });
    this.usersProf =
      this.loggedUser._id === this.currUserPage._id
        ? "My"
        : this.currUserPage.fullName;
    if (!this.loggedUser) this.isUserPageOwner = false;
    else this.isUserPageOwner = this.loggedUser._id === this.currUserPage._id;
    let currAction = !this.currUserPage.isTrainer
      ? "getLessonsByUser"
      : "getLessonsByTrainer";
    let lessons = await this.$store.dispatch({
      type: currAction,
      profilesUserId
    });
    this.lessons = lessons;
  },
  computed: {
    loggedUser() {
      let user = this.$store.getters.getUser;
      if (!user) user = {};
      return user;
    }
  },
  methods: {
    swichView(value) {
      switch (value.target.innerHTML) {
        case "Calendar":
          this.currView = "Calendar";
          break;
        case "Reviews":
          this.currView = "Reviews";
          break;
        case "About":
          this.currView = "About";
          break;
      }
    },
    setForm(stat, passedEv) {
      this.passedEv = passedEv;
      this.isCreateLesson = stat;
      let profilesUserId = this.$route.params.id;
    },
    addReview(review) {
      this.currUserPage.reviews.push(review);
      this.$store.dispatch({ type: "saveUser", editUser: this.currUserPage });
    }
  },
  components: {
    UserCalendar,
    LessonForm,
    TrainerReviews,
    AboutUser
  }
};
</script>

<style lang="scss">
</style>