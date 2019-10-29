
<template>
  <section class="filter">
    <div class="md-layout md-gutter">
      <div class="md-layout-item">
        <md-field>
          <label for="title">Sport Title</label>
          <md-select
            v-model="selectedType"
            @md-selected="setFilter()"
            name="title"
            id="title"
            multiple
          >
            <md-option
              v-for="(currFilter, index) in filters"
              :key="index"
              :value="currFilter"
            >{{currFilter}}</md-option>
          </md-select>
        </md-field>
      </div>
    </div>
  </section>
</template>

<script>
</script>

<style lang="scss" scope>
</style>


