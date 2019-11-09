<template>
  <section v-if="lesson" class="lesson-details">
    <div class="lesson-profile position-relative">
      <div class="lesson-img-container center">
        <img :src="lesson.img" />
        <h1>{{lesson.title}}</h1>
        <div>
          <button
            v-if="!isLessonCreator"
            @click="addUserToLesson"
            class="regBtn position-relative"
            :class="{desabledBtn: desableBtn}"
            :disabled="desableBtn"
          >
            {{regBtn}}
            <span class="shiny"></span>
          </button>
          <router-link v-if="isLessonCreator && !timePassed " :to="{ name: `EditLesson`,params: lesson}">
            <button class="regBtn position-relative">
              Edit Lesson
              <span class="shiny"></span>
            </button>
          </router-link>
        </div>
      </div>
      <div class="lesson-info flex column left">
        <div class="flex start align-baseline">
          <h2>Trainer</h2>
          <router-link :to="'../user-details/' + lesson.createdBy.trainerId">
            <div class="flex align-center">
              <p>{{lesson.createdBy.fullName}}</p>
              <md-avatar class="md-medum">
                <img :src="lesson.createdBy.trainerImg" />
              </md-avatar>
            </div>
          </router-link>
        </div>
        <hr class="underline" />
        <div class="flex start align-baseline">
          <h2>Price</h2>
          <p>{{lesson.price}} ₪</p>
        </div>
        <hr class="underline" />
        <div class="flex start date-time">
          <div class="flex align-baseline">
            <h2>Date</h2>
            <p>{{lesson.start | moment('dddd ,DD/MM/YY')}}</p>
          </div>
          <div class="flex align-baseline">
            <h2>Time</h2>
            <p>{{lesson.start | moment('HH:mm')}} - {{lesson.end | moment('HH:mm')}}</p>
          </div>
        </div>
        <hr class="underline" />
        <div class="flex start align-baseline">
          <div class="address space-between flex align-baseline">
            <h2>Adress</h2>
            <p>{{lesson.address}}</p>&nbsp; &nbsp;
            <div class="position-relative">
              <i class="fa fa-map" @mouseover="isHoverMap =true " @mouseout="isHoverMap = false"></i>
              <div class="modal-body flex column both-align-center">
                <img :src="lessonMapImg" :class="{'btn-hover': isHoverMap}" class="map-img" />
              </div>
            </div>
          </div>
        </div>
        <hr class="underline" />
        <div class="flex start">
          <div class="flex align-baseline">
            <h2>Capacity</h2>
            <p>{{lesson.regTrainees.length}} of {{lesson.traineesCapacity}}</p>
          </div>
        </div>
        <hr class="underline" />
        <div class="flex start align-baseline">
          <div class="flex align-baseline">
            <h2>Registerd trainees</h2>
            <div class="reg-trainee">
              <md-avatar
                class="md-medium"
                style="margin:0;"
                v-for="(trainee, index) in lesson.regTrainees"
                :key="index"
              >
                <router-link :to="'../user-details/' + trainee._id" style="height: 100%;">
                  <img :src="trainee.userImg" title="Go to profile" />
                </router-link>
              </md-avatar>
            </div>
          </div>
        </div>
        <hr class="underline" />
      </div>
      <app-chat :loggedUser="loggedUser" :lesson="lesson"></app-chat>
    </div>
  </section>
</template>

<script>
import Swal from "sweetalert2";
import AppChat from "../components/AppChat";

export default {
  name: "Lesson-details",
  data() {
    return {
      lesson: null,
      isClassFull: false,
      lessonMapImg: "",
      iconWasClicked: false,
      regBtn: "Add Me To Lesson",
      isHoverMap: false
    };
  },
  components: {
    AppChat
  },
  async created() {
    const lessonId = this.$route.params.id;
    const lesson = await this.$store.dispatch({
      type: "getLessonById",
      lessonId
    });
    this.lesson = lesson;
    this.lessonMapImg =
      "https://maps.googleapis.com/maps/api/staticmap?center=" +
      this.lesson.address +
      "&zoom=19&size=400x400&markers=color:red|" +
      this.lesson.address +
      "&key=AIzaSyBbf-OSd3gYrA2hOp7KFsRK4FxE4R6RCKI";
  },

  computed: {
    desableBtn() {
      if (this.timePassed) {
        this.regBtn = "Lesson is over";
        return true;
      }
      if (!this.loggedUser) {
        return;
      }

      if (this.isUserRegistered) {
        this.regBtn = "Unsubscribe";
        return false;
      }
      if (this.loggedUser.isTrainer) {
        this.regBtn = "Change to trainee profile to join classes";
        return true;
      }
      if (this.isFull) {
        this.regBtn = "Lesson is full";
        return true;
      }
    },
    timePassed() {
      const lessonTime = new Date(`${this.lesson.dateTime}`);
      return lessonTime < new Date();
    },
    loggedUser() {
      return this.$store.getters.getUser;
    },
    isFull() {
      this.isClassFull =
        +this.lesson.traineesCapacity === this.lesson.regTrainees.length;

      return this.isClassFull;
    },
    isUserRegistered() {
      const loggedUser = this.loggedUser;
      const regUsers = this.lesson.regTrainees.some(trainee => {
        return trainee._id === loggedUser._id;
      });
      return regUsers;
    },
    isLessonCreator() {
      if (!this.loggedUser) return false;
      return this.loggedUser._id === this.lesson.createdBy.trainerId;
    }
  },
  methods: {
    editLesson() {
      this.$router.push({
        name: `${this.lesson._id}/edit-lesson`,
        params: this.lesson
      });
    },
    async addUserToLesson(ev) {
      if (!this.loggedUser) {
        const userRes = await this.$store.dispatch({
          type: "notRegAlert",
          msg: "subscribe"
        });
        if (userRes) this.$router.push("../login");
        return;
      }

      const innerBtnTxt = ev.path[0].innerText;
      let answer;
      if (innerBtnTxt === "Unsubscribe") {
        answer = await this.$store.dispatch({
          type: "toggleLsnSub",
          msg: "Are you sure you want to unsubscribe??"
        });

        if (answer) {
          const updatedLesson = await this.$store.dispatch({
            type: "removeUserFromLesson",
            lessonId: this.lesson._id
          });

          await this.$store.dispatch({
            type: "successMsg",
            msg: `You are unsubscribed from ${this.lesson.title} lesson`
          });

          this.lesson = updatedLesson;
          this.regBtn = "Add Me To Lesson";
        }
      } else {
        answer = await this.$store.dispatch({
          type: "toggleLsnSub",
          msg: `Do you aprove transform ${this.lesson.price}₪ to ${this.lesson.createdBy.fullName}?`
        });

        if (answer) {
          const lesson = await this.$store.dispatch({
            type: "addUserToLesson",
            lessonId: this.lesson._id
          });
          this.$store.dispatch({
            type: "successMsg",
            msg: `You are registerd to ${this.lesson.title}!`
          });

          this.lesson = lesson;
          this.$router.push(`/user-details/${this.loggedUser._id}`);
        }
      }
    }
  }
};
</script>

<style lang="scss">
</style>