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
        Welcome, {{ userName }}
      </q-toolbar-title>

      <router-link to="/login">
        <q-btn icon="fas fa-user" round flat></q-btn>
      </router-link>
    </q-toolbar>
  </div>
</template>

<script>
export default {
  props: {
    userName: {
      type: String,
      default: 'Guest'
    },
  },
  methods: {
    goHome() {
      this.$router.push('/')
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
