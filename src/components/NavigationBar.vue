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
            <q-item v-close-popup v-if="userName != 'Guest'" class="pointer-cursor">
              <q-item-section @click="logout">Logout</q-item-section>
            </q-item>

            <q-item v-close-popup v-else class="pointer-cursor">
              <q-item-section @click="login">Login</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </div>
    </q-toolbar>
  </div>
</template>

<script>
import { auth } from 'src/boot/firebase';
import { db } from 'src/boot/firebase';
import { doc, getDoc } from "firebase/firestore";
export default {
  data() {
    return {
      auth: auth,
      userName: 'Guest',
    }
  },
  watch: {
    '$route': function() {
      this.updateUsername();
    },
  },
  created() {
    this.updateUsername();
  },

  methods: {
    async updateUsername() {
      var user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          this.userName = docSnap.data().username;
        } else {
          console.log("No such document!");
        }
      } else {
        this.userName = 'Guest';
      }
    },

    closeMenu() {
      this.$refs.myMenu.hide()
    },
    login() {
      this.$router.push('/login');
    },
    goHome() {
      this.$router.push('/')
      console.log('Navigating home...');
    },

    async logout() {
      try {
        console.log(auth)
        await auth.signOut();
        this.userName = 'Guest';
        this.$router.push('/login'); // redirects the user to the login page
      } catch (error) {
        console.error('An error occurred during sign out:', error);
      }
    }
  },
}
</script>

<style>
.navigation-bar {
  font-family: "Bebas Neue", Serif;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: #143D56;
  z-index: 1000;
  padding: 1rem;
  background-image: url("../assets/luressmall.jpg");
  box-shadow: 0px 4px 8px rgba(0,0,0,0.3);
  height:100px;

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
.pointer-cursor {
  cursor: pointer;
}

</style>
