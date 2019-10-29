<template>
  <section class="review-container">
    <div class="form-container">
      <form
        v-if="loggedUser && (loggedUser._id !== currUserPage._id) && !isUserReviewed"
        @submit.prevent="addReview"
      >
        <md-field>
          <label>Write a review</label>
          <md-textarea v-model="review.txt" type="text"></md-textarea>
        </md-field>
        <div class="flex align-center">
          <h3>How many stars you give me?</h3>
          <star-rating
            v-if="currUserPage  &&currUserPage.isTrainer"
            :rating="0.0"
            @rating-selected="setRating"
            :star-size="20"
            :increment="0.5"
            :show-rating="false"
          ></star-rating>
        </div>
        <md-button class="md-raised" type="submit" :disabled="disabled">Submit</md-button>
      </form>
    </div>
    <div class="flex justify-center">
      <div class="rating-part">
        <div class="average-rating center">
          <h2>{{this.rating}}</h2>
          <star-rating
            v-if="currUserPage  &&currUserPage.isTrainer"
            :read-only="true"
            :rating="rating"
            :star-size="20"
            :increment="0.5"
            :show-rating="false"
          ></star-rating>
          <p>Average Rating</p>
        </div>

        <div style="clear: both;"></div>
        <div class="flex align-center" v-for="(review, i) in currUserPage.reviews" :key="i">
          <div class="user-img-part flex align-center center">
            <div class="flex column">
              <md-avatar class="md-large">
                <img :src="review.userImg" alt="user image" />
              </md-avatar>
              <star-rating
                :read-only="true"
                :rating="review.userRating"
                :star-size="10"
                :show-rating="false"
              ></star-rating>
            </div>
            <div class="user-text">
              <h4>{{review.timeAdded | moment("from")}}</h4>
              <p>{{review.fullName}}</p>

              <button class="report-btn" @click="reportReview">Report</button>
            </div>
            <div style="clear: both;"></div>
          </div>
          <div class="comment">
            <p>{{review.txt}}</p>
          </div>
          <div style="clear: both;"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Swal from "sweetalert2";
import StarRating from "vue-star-rating";
export default {
  props: {
    currUserPage: {
      type: Object
    }
  },
  computed: {
    loggedUser() {
      return this.$store.getters.getUser;
    },
    rating() {
      const trainerRaiting = this.currUserPage.rating;

      if (!trainerRaiting.length) return;
      const sum = this.currUserPage.rating.reduce((acc, c) => acc + c);
      return +(sum / this.currUserPage.rating.length).toFixed(2);
    },
    isUserReviewed() {
      var found = this.currUserPage.reviews.find(review => {
        return review.fullName === this.loggedUser.fullName;
      });
      return found;
    },
    disabled() {
      if (!this.review.txt) return true;
    }
  },

  data() {
    return {
      review: {
        txt: "",
        userImg: "",
        fullName: "",
        timeAdded: "",
        userRating: null
      }
    };
  },
  created() {
    this.userRating = this.rating;
  },
  methods: {
    addReview() {
      this.review.userImg = this.loggedUser.userImg;
      this.review.fullName = this.loggedUser.fullName;
      this.review.userRating = this.userRating;
      this.review.timeAdded = new Date();
      this.currUserPage.rating.push(this.userRating);
      this.$emit("addReview", this.review);
      // this.$store.dispatch({ type: "saveUser", editUser: this.currUserPage });
    },
    setRating(rating) {
      this.userRating = rating;
    },
    reportReview() {
      Swal.fire({
        title: "Thanks for reporting!",
        timer: 1500,
        showConfirmButton: false
      });
    }
  },
  components: {
    StarRating
  }
};
</script>

<style lang="scss">
</style>
