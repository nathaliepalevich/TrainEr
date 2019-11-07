<template>
  <section class="app-guide flex column position-relative both-align-center">
    <div class="center">
    <div class="header">
    <img src="../assets/images/me.jpeg"/>
    </div>
      <P>
        TrainEr is an app that comes to make sport more accessible for everyone.
        The story began when I turned 33 and I decided to get out from my "couch potato" mood and start doing something useful for my body and soul.
        After countless Google searches,
        schedule cross-checking and frustrating endless phone calls,
        I wondered Working out shouldn’t be hard - what if there was a way to make it easier? I believe that being active is the key to living a happy and healthy life.
      </P>
      
      <h2>How does it work?</h2>
     <div class="go-to">
          <router-link to="trainer-guide" class="list-item goto ">As a trainer </router-link>
          |
          <router-link to="trainee-guide" class="list-item goto">As a trainee</router-link>
     </div>
    <router-view></router-view>

      <h2>Enjoy!</h2>
    </div>
     </div>
  </section>
</template>
<script>
export default {
data() {
  return {
    isActive: false
  }
},
};
</script>

<style lang="scss">

</style>
