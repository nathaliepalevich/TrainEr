<template>
  <div class="lesson-preview">
    <router-link :to="`/lesson/${this.currLesson._id}`">
      <md-list-item    :class="{red: lessonToMark === currLesson._id}">
        <div>
          <img :src="currLesson.img" alt="lessonImg" class="lesson-img position-relative" />
        </div>
        <div class="md-list-item-text">
          <div
            class="md-subhead title"
            :data-id="currLesson._id"
         
          >{{currLesson.title}}</div>
          <div class="md-subhead">{{currLesson.createdBy.fullName}}</div>
          <div class="md-subhead">{{currLesson.price}}₪</div>
          <div class="md-subhead">{{currLesson.start | moment('dddd ,DD/MM/YY, HH:mm')}}</div>
          <div v-if="isFull" class="md-subhead full-class">Lesson is full!</div>
        </div>
      </md-list-item>
    </router-link>
  </div>
</template>

<script>
import UserService from "../services/UserService";
import EventBus from "../services/eventBus";
export default {
  props: {
    currLesson: {
      type: Object
    }
  },
  data() {
    return {
      lessonToMark: ""
    };
  },
  computed: {
    isFull() {
      return (
        this.currLesson.regTrainees.length === +this.currLesson.traineesCapacity
      );
    }
  },
  mounted() {
    EventBus.$on("LESSON_MARK", lesson => {
      this.lessonToMark = lesson._id;
    });
  },
  beforeDestroy() {
    EventBus.$off("LESSON_MARK");
  }
};
</script>

<style lang="scss" scoped>
</style>