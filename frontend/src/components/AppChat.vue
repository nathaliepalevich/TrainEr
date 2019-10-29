<template>
  <div>
    <section class="chat-box flex column" :class="{ 'display-none': !iconWasClicked}">
      <header class="flex justify-center">
        <img :src="lesson.img" />
        <h3>{{lesson.title}}</h3>
        <button @click="changeView" class="material-icons">close</button>
      </header>
      <md-content class="md-scrollbar chat-body">
        <ul ref="msgsList" class="chat-area flex column justify-end">
          <li
            :title="msg.from"
            v-for="(msg, i) in msgs"
            :key="i"
            class="msg flex"
            :class="fromClass"
          >
            <md-avatar class="md-small">
              <img :src="msg.img" />
            </md-avatar>
            <div class="msg">{{msg.txt}}</div>
          </li>
        </ul>
      </md-content>
      <div class="input-container flex precent-width-100">
        <input
          :disabled="timePassed"
          autocomplete="off"
          :placeholder="placeholderInput"
          class="input-msg"
          type="text"
          v-model="msgTxt"
          @keydown.enter="sendMsg"
          autofocus
        />
        <button class="material-icons" :disabled="timePassed" @click="sendMsg">send</button>
      </div>
    </section>
    <div class="chat-icon" @click="changeView">
      <h3 class="material-icons">chat</h3>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import SocketService from "../services/SocketService.js";
// import LessonService from "../services/LessonService";
const socket = io(SocketService.BASE_URL);

export default {
  name: "chat-app",
  props: ["currUserPage", "loggedUser", "lesson"],
  data() {
    return {
      msgs: [],
      msgTxt: "",
      iconWasClicked: false,
      placeholderInput: "Your message...",
      msgFrom: "",
      msgFromImg: ""
    };
  },
  methods: {
    async changeView() {
      if (!this.loggedUser) {
        const answer = await this.$store.dispatch({
          type: "notRegAlert",
          msg: "chat"
        });
        if (answer) {
          this.$router.push("../login");
        }
        return;
      }
      this.iconWasClicked = !this.iconWasClicked;
    },
    sendMsg() {
      if (!this.msgTxt) return;
      const msg = {
        img: `${this.msgFromImg}`,
        from: `${this.msgFrom}`,
        txt: `${this.msgTxt}`
      };
      socket.emit("chat msg", msg, this.lesson._id);
      this.msgTxt = "";
    }
  },
  computed: {
    timePassed() {
      const lessonTime = new Date(`${this.lesson.start}`);
      if (lessonTime < new Date()) {
        this.placeholderInput = "Chat is closed! Lesson is over.";
        return true;
      }
    },
    fromClass() {
      if (!this.loggedUser) return;
      if (this.msgFrom === this.loggedUser.fullName) return "msg-out";
      if (this.msgFrom !== this.loggedUser.fullName) return "msg-in";
    }
  },
  created() {
    this.msgFrom = this.loggedUser ? this.loggedUser.fullName : "Unknown user";
    this.msgFromImg = this.loggedUser
      ? this.loggedUser.userImg
      : "../assets/user_icon.png";

    this.msgs = this.lesson.msgs;
    socket.emit("chat join", {
      user: this.msgFrom,
      img: `${this.msgFromImg}`,
      lessonId: this.lesson._id
    });
    socket.on("chat newMsg", msg => {
      this.msgs.push(msg);
    });

    socket.on("chat history", msgs => {
      this.msgs = msgs;
    });
  },
  destroyed() {
    socket.removeListener("chat newMsg");
    socket.removeListener("chat history");
  }
};
</script>

<style lang="scss">
</style>
