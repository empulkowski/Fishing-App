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


      <div class="user-menu">
        <q-btn icon="fas fa-user" flat round ref="myRef"></q-btn>
        <q-menu ref="myMenu" anchor="top right" self="top left" :target="$refs.myRef" @mouseleave="closeMenu">
          <q-list clickable class="my-drop-down">
            <q-item v-close-popup>
              <q-item-section @click="logout">Logout</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </div>
<!--      <router-link to="/login">-->
<!--        <q-btn icon="fas fa-user" round flat></q-btn>-->
<!--      </router-link>-->
    </q-toolbar>
  </div>
</template>

<script>
import { auth } from '../boot/firebase';
export default {
  props: {
    userName: {
      type: String,
      default: 'Guest'
    },
  },
  data() {
    return {
      auth: auth
    }
  },
  methods: {
    closeMenu() {
      this.$refs.myMenu.hide()
    },
    goHome() {
      this.$router.push('/')
      console.log('Navigating home...');
    },
    async logout() {
      try {
        console.log(auth)
        await auth.signOut();
        this.$router.push('/login'); // redirects the user to the login page
      } catch (error) {
        console.error('An error occurred during sign out:', error);
      }
    }

  },
  mounted() {
    this.$nextTick(function () {
 console.log(this.$refs.myRef);
    });
  }
}
</script>

<style>
.navigation-bar {
  font-family: "Bebas Neue", Serif;
  text-align: center;


}

html body.desktop.no-touch.body--light div#q-app div.q-layout.q-layout--standard header.q-header.q-layout__section--marginal.absolute-top div.q-pa-md {
  background-color: #143D56;
}
.q-toolbar > a:nth-child(3) > button:nth-child(1) > span:nth-child(2){
  color: #143D56;
  background-color: white;
  border-radius:50px;
}

.my-drop-down{
  background-color: #327576;
  color: white;
  box-shadow: 2px 2px 5px 1px rgba(0,0,0,0.3);

}

.my-drop-down . q-item{
  padding: 10px 20px;
}
</style>
