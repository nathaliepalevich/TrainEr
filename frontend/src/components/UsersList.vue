<template>
  <section class="users-list">
    <md-card>
      <md-card-media class="swiper-inner precent-width-100">
        <swiper ref="mySwiper" :options="swiperOption">
          <user-preview v-for="(user, i) in users" :key="i" :currUser="user"></user-preview>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </md-card-media>
    </md-card>
  </section>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import UserPreview from "./UserPreview";
export default {
  props: {
    users: {
      type: Array
    }
  },
  data() {
    return {
      swiperOption: {
        effect: "coverflow",
        grabCursor: true,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
          },
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: false
        },
     
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },
  components: {
    UserPreview
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  }
};
</script>

<style>
</style>
