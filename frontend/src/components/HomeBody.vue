<template>
  <section id="home-body" class="flex justify-evenly padding-20-20-px wrap">
    <type-filter @setFilter="setFilter" @setSort="setSort" @selectedView="selectedView"></type-filter>
    <lesson-list :lessons="lessons" v-if="deviceClass=== 'large' || listView === 'list'"></lesson-list>
    <app-map-v :lessons="lessons" v-if="deviceClass=== 'large' || listView === 'map'"></app-map-v>
     <app-footer></app-footer>
  </section>
</template>

<script>
import AppMapV from "./AppMapV";
import LessonList from "./LessonList";
import TypeFilter from "./filters/TypeFilter";
import AppFooter from "../components/AppFooter.vue";
export default {
  computed: {
    lessons() {
      return this.$store.getters.lessons;
    }
  },
  data() {
    return {
      listView: "list",
      deviceClass: ""
    };
  },

  destroyed() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      this.deviceClass = window.matchMedia("(max-width: 960px)").matches
        ? "small"
        : "large";
    },
    setFilter(setFilter) {
      this.$store.dispatch({ type: "getLessons", filterBy: setFilter });
    },
    selectedView(isListView) {
      this.listView = isListView;
    },
    setSort(setSort) {
      switch (setSort) {
        case "Price":
          this.$store.commit("sortByPrice", "Price");
          break;
        case "Time":
          this.$store.commit("sortByTime", "Time");
          break;
      }
    }
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
    this.onResize();
  },
  components: {
    LessonList,
    TypeFilter,
    AppMapV,
        AppFooter
  }
};
</script>

<style>
</style>
