<template>
  <div class="header-hero flex column justify-end">
    <div class="header-container flex">
      <div class="left-container flex column justify-center precent-width-100">
        <div class="mobile-txt">
          <div class="header-txt">
            <h2 class="caps">
              Your favorite sport
              <br />wherever you are.
            </h2>
            <h3>No strings attached.</h3>
          </div>
          <div class="sub-header-txt">
            <h4>
              Committing is hard — so don’t.
              Work out anywhere,
              <br />try any workout and do it all with one
              app.
            </h4>
          </div>
          <div class="scroll-btn flex column center">
            <p>Find classes nearby</p>
            <button
              v-scroll-to="{
                el: '#home-body',
                offset: -64,
              }"
            >
              <svg id="more-arrows">
                <polygon
                  class="arrow-top"
                  points="37.6,27.9 1.8,1.3 3.3,0 37.6,25.3 71.9,0 73.7,1.3 "
                />
                <polygon
                  class="arrow-middle"
                  points="37.6,45.8 0.8,18.7 4.4,16.4 37.6,41.2 71.2,16.4 74.5,18.7 "
                />
                <polygon
                  class="arrow-bottom"
                  points="37.6,64 0,36.1 5.1,32.8 37.6,56.8 70.4,32.8 75.5,36.1 "
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/UserService";

export default {
  name: "HomeHero",
  computed: {
    userURL() {
      return `/user-details/${this.user._id}`;
    }
  }
};
</script>

<style lang="scss">
</style>
