<template>
  <section class="lesson-form flex justify-center">
    <md-card class="md-layout-item md-size-80 md-small-size-100 center">
      <md-card-header>
        <div class="md-title center">{{addEditLsnTitle}}</div>
      </md-card-header>
      <datetime
        type="date"
        v-model="newLesson.date"
        format="D"
        placeholder="date"
        value-zone="local"
        :min-datetime="new Date().toISOString()"
        auto
      ></datetime>
      <div class="flex justify-center">
        <datetime
          type="time"
          :minute-step="30"
          format="HH:mm"
          placeholder="Start time"
          value-zone="local"
          zone="local"
          v-model="newLesson.start"
        ></datetime>
        <datetime
          type="time"
          :minute-step="30"
          format="HH:mm"
          v-model="newLesson.end"
          :min-datetime="newLesson.start"
          placeholder="End Time"
          value-zone="local"
          zone="local"
        ></datetime>
      </div>

      <form class="md-layout flex justify-center" @submit.prevent="addLesson">
        <md-card-content>
          <div class="md-layout md-gutter">
            <md-autocomplete
              type="text"
              v-model="newLesson.title"
              :md-options="lessonsTitle"
              required
            >
              <label>Lesson Title</label>
            </md-autocomplete>
            <md-field>
              <label for="lessonsTypes">Lesson Types</label>
              <md-select
                v-model="newLesson.trainTypes"
                name="lessonsTypes"
                id="lessonsTypes"
                multiple
              >
                <md-option
                  v-for="(lessonType, index) in lessonsTypes"
                  :key="index"
                  :value="lessonType"
                >{{lessonType}}</md-option>
              </md-select>
            </md-field>

            <md-field>
              <label>Price</label>
              <md-input type="number" v-model="newLesson.price" required></md-input>
              <span class="md-suffix">₪</span>
            </md-field>
            <!-- <input type="image" v-model="newLesson.img" placeholder="Image" /> -->
            <md-field>
              <label>Lesson Image</label>
              <md-file type="file" @change="handleUploadImage($event)" accept="image/*" />
            </md-field>

            <md-field>
              <label>Lesson Location</label>
              <md-input type="text" v-model="newLesson.location.address" required></md-input>
              <span class="md-helper-text">City, Street, Home Number</span>
            </md-field>

            <md-field>
              <label>Trainees Capacity</label>
              <md-input type="number" v-model="newLesson.traineesCapacity" required></md-input>
            </md-field>
          </div>
        </md-card-content>
        <div class="flex justify-center precent-width-100">
          <md-button
            class="md-raised"
            type="submit"
            :disabled="formValidation || isUploading"
          >{{addSaveBtnTxt}}</md-button>
          <md-button class="md-raised" @click="cancelChanges">{{cancelBtnTxt}}</md-button>
          <md-button class="md-raised" @click="deleteLesson" v-if="lesson._id">Delete Lesson</md-button>
        </div>
      </form>
      <div :class="{none: !isUploading }" class="loading-spinner">
        <md-progress-spinner class="md-accent" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
      </div>
    </md-card>
  </section>
</template>

<script>
var moment = require("moment");
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import { Datetime } from "vue-datetime";
import axios from "axios";
import SocketService from "../services/SocketService.js";

export default {
  name: "lesson-form",
  data() {
    return {
      isUploading: false,
      lessonsTitle: null,
      lessonsTypes: null,
      currUser: null,
      addEditLsnTitle: "Add Lesson",
      cancelBtnTxt: "Cancel",
      addSaveBtnTxt: "Add lesson",
      newLesson: {
        title: "",
        price: null,
        img:
          "static.onecms.io/wp-content/uploads/sites/35/2019/04/16045733/benefits-yoga-fb.jpg",
        start: null,
        end: null,
        date: "",
        dateTime: "",
        location: {
          address: "",
          lat: null,
          lng: null
        },
        traineesCapacity: null,
        trainTypes: [],
        createdBy: {
          trainerId: "",
          trainerImg: "",
          fullName: ""
        },
        regTrainees: [],
        msgs: []
      }
    };
  },
  computed: {
    formValidation() {
      if (this.newLesson.start && this.newLesson.end && this.newLesson.date)
        return false;
      else return true;
    }
  },
  methods: {
    async handleUploadImage(ev) {
      this.isUploading = true;
      const form = new FormData();
      form.append("imgUpload", ev.target.files[0]);
      const res = await axios.post(
        `${SocketService.BASE_URL}/upload/cloudinary`,
        form
      );
      this.newLesson.img = await res.data.secure_url;
      this.isUploading = false;
    },

    parseDate() {
      this.newLesson.date = this.newLesson.date.match(/\d{4}-\d{2}-\d{2}/)[0];
      let end = this.newLesson.end.match(/\d{2}:\d{2}/)[0];
      let start = this.newLesson.start.match(/\d{2}:\d{2}/)[0];
      this.newLesson.dateTime = `${this.newLesson.date} ${start}`;

      this.newLesson.end = `${this.newLesson.date} ${end}`;
      this.newLesson.start = `${this.newLesson.date} ${start}`;
    },
    cancelChanges() {
      this.$router.go(-1);
    },
    async deleteLesson() {
      this.$store.dispatch({
        type: "deleteLesson",
        deleteLesson: this.lesson._id
      });
      this.$router.push(`../../../user-details/${this.currUser._id}`);
    },
    async addLesson() {
      if (!this.lesson._id) {
        this.newLesson.trainTypes.push();
        this.newLesson.createdBy.trainerId = this.currUser._id;
        this.newLesson.createdBy.trainerImg = this.currUser.userImg;
        this.newLesson.createdBy.fullName = this.currUser.fullName;
      }

      this.parseDate();
      this.newLesson = await this.$store.dispatch({
        type: "saveLesson",
        editLesson: this.newLesson
      });
      this.$router.push(`../../../user-details/${this.currUser._id}`);
    }
  },

  created() {
    this.currUser = this.$store.getters.getUser;
    this.lessonsTitle = this.$store.getters.sportTitle;
    this.lessonsTypes = this.$store.getters.sportType;
    this.lesson = this.$attrs;

    if (this.lesson._id) {
      this.addEditLsnTitle = "Edit Lesson";
      this.cancelBtnTxt = "Cancel Changes";
      this.addSaveBtnTxt = "Save Changes";
      this.newLesson = JSON.parse(JSON.stringify(this.lesson));
      this.newLesson.start = this.newLesson.start.match(/\d{2}:\d{2}/)[0];
      this.newLesson.end = this.newLesson.end.match(/\d{2}:\d{2}/)[0];
      this.newLesson.date = this.newLesson.date.match(/\d{4}-\d{2}-\d{2}/)[0];
    }
  },

  components: {
    VueCal,
    Datetime
  }
};
</script>

<style lang="scss">
</style>

