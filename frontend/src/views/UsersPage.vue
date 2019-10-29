<template>
  <section class="users-page position-relative center">
    <div class="users-container ">
      <h2>Meet our trainers</h2>
      <users-list :users="trainers"></users-list>
    </div>
    <div class="users-container">
      <h2>Meet our trainees</h2>
      <users-list :users="trainees"></users-list>
    </div>
  </section>
</template>

<script>
import UsersList from "../components/UsersList";

export default {
  components: {
    UsersList
  },
  data() {
    return {
      trainers: [],
      trainees: []
    };
  },
  async created() {
    await this.$store.dispatch({ type: "loadUsers" });
    await this.getUsers.map(user => {
      if (user.isTrainer) this.trainers.push(user);
      else this.trainees.push(user);
    });
  },
  computed: {
    getUsers() {
      return this.$store.getters.getUsers;
    }
  }
};
</script>

<style>
</style>
