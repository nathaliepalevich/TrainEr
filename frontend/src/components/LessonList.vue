<template>
  <section class="lesson-list flex wrap">
    <md-list class="md-triple-line">
      <md-content class="md-scrollbar">
        <lesson-preview v-for="(lesson, i) in lessons" :key="i" :currLesson="lesson"></lesson-preview>
      </md-content>
    </md-list>
  </section>
</template>

<script>
import LessonPreview from "../components/LessonPreview";

export default {
  props: {
    lessons: {
      type: Array
    }
  },
  components: {
    LessonPreview
  }
};
</script>

<style lang="scss">
</style>
