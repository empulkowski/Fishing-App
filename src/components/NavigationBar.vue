<template>
  <div class="q-pa-md">

    <q-toolbar class="navigation-bar">
      <router-link to="/">
        <q-btn flat dense round @click="goHome">
          <img src="../assets/myCatch.png" alt="Logo" style="max-height: 2rem;">
        </q-btn>
      </router-link>
      <!-- (Welcome Message) -->
      <q-toolbar-title>
        Welcome, Emily
      </q-toolbar-title>

      <!-- Right-->
<!--      <q-avatar>-->
<!--        &lt;!&ndash; <img :src="userProfileImage" alt="Profile Image"> &ndash;&gt;-->
<!--      </q-avatar>-->
    </q-toolbar>
  </div>
</template>

<script>
export default {
  props: {
    userName: {
      type: String,
      required: true,
    },
    userProfileImage: {
      type: String,
      required: true,
    },
  },
  methods: {
    goHome() {
      // logic to go to the home page
      console.log('Navigating home...');
    },
  },
};
</script>

<style>
.navigation-bar {
  font-family: "Bebas Neue", Serif;
  text-align: center;


}

html body.desktop.no-touch.body--light div#q-app div.q-layout.q-layout--standard header.q-header.q-layout__section--marginal.absolute-top div.q-pa-md {
  background-color: #143D56;
}

</style>
