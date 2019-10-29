<template>
  <section class="filter flex precent-width-100">
    <div class="md-layout md-gutter">
      <div class="md-layout-item">
        <md-field>
          <label for="types">Filter...</label>
          <md-select
            v-model="filterBy.selectedType"
            @md-selected="setFilter"
            name="types"
            id="types"
            md-dense
            multiple
          >
            <md-optgroup label="By Type">
              <md-option
                v-for="(currFilter, index) in filterByType"
                :key="index"
                :value="currFilter"
              >{{currFilter}}</md-option>
            </md-optgroup>

            <!-- <md-optgroup label="By Title">
              <md-option
                v-for="(currFilter, index) in filterByTitle"
                :key="index"
                :value="currFilter"
              >{{currFilter}}</md-option>
            </md-optgroup>-->
          </md-select>
        </md-field>
      </div>
      <div class="md-layout-item">
        <md-field>
          <label for="time">Sort By...</label>
          <md-select v-model="sortBy" @md-selected="setSort" name="time" id="time" md-dense>
            <md-option v-for="(currSort, index) in sort" :key="index" :value="currSort">{{currSort}}</md-option>
          </md-select>
        </md-field>
      </div>
      <div class="body-mobile-view">
        <md-button @click="selectedView('list')">
        <i class="fa fa-list"></i>
        </md-button>
        <md-button @click="selectedView('map')">
       <i class="fa fa-map"></i>
        </md-button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      sort: ["Time", "Price"],
      filterBy: {
        selectedType: []
      },
      sortBy: ""
    };
  },
  computed: {
    filterByType() {
      return this.$store.getters.sportType;
    }
    // filterByTitle() {
    //   return this.$store.getters.sportTitle;
    // }
  },
  methods: {
    setFilter(val) {
      this.$emit("setFilter", val);
    },
    setSort(sortBy) {
      this.$emit("setSort", sortBy);
    },
    selectedView(view) {
      this.$emit("selectedView", view);
    }
  },
  created() {
    this.$emit("setFilter", "");
  }
};
</script>

<style lang="scss" scope>
</style>


