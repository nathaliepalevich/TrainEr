<template>
  <section class="calendar-container">
        <md-content class="md-scrollbar">
    <vue-cal
      ref="vuecal"
      selected-date
      :time-from="8 * 60"
      :time-to="21.5 * 60"
  
      :disable-views="['year', 'month', 'day','years']"
      hide-view-selector
      :events="events"
      :deletable="true"
      :startWeekOnSunday="true"
      class="vuecal--full-height-delete"
      @cell-focus="onEventCreate($event)"
      :on-event-click="onEventClick"
    ></vue-cal>
    </md-content>
  </section>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import UserService from "../services/UserService";
export default {
  components: {
    VueCal
  },
  props: {
    passedEv: {},
    lessons: {
      type: Array,
      required: false
    },
    currUserPage: {
      type: Object
    },
    loggedUser: {
      type: Object
    }
  },
  computed: {
    // allowedEdit() {
    //   if (!this.loggedUser) return false;
    //   return (
    //     this.currUserPage.isTrainer &&
    //     this.currUserPage._id === this.loggedUser._id
    //   );
    // },
    events() {
      this.lessons.forEach(lesson => {
        return (lesson.content = "<i >Click for details</i>");
      });
      return this.lessons;
    }
  },

  data: () => ({}),
  methods: {
    onEventCreate(event) {
      if (!this.loggedUser) return false;
      if (
        this.currUserPage.isTrainer &&
        this.loggedUser._id === this.currUserPage._id
      ) {
        this.$store.commit({ type: "setUser", user: this.loggedUser });
        this.$router.push(`../lesson/new/edit-lesson`);
        return event;
      }
    },

    deleteEvent(event) {
      this.$store.dispatch({ type: "deleteLesson", lessonId: event._id });
    },

    onEventClick(lesson) {
      this.$router.push(`/lesson/${lesson._id}`);
    }
  }
};
</script>

<style lang="scss">
</style>
