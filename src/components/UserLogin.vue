<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="submitForm">
     <div class="form-stuff">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
       <div class="alert" v-if="loginError">{{ loginError }}</div>
       <div>
         <label for="remember">
           <input type="checkbox" id="remember" v-model="remember"> Remember me
         </label>
        <button type="submit">Log In</button></div>
      <div class="signup-prompt">
        <p>New to this app?</p>
        <router-link to="/register">Sign up now</router-link>
      </div>
     </div>
    </form>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from 'src/boot/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'src/boot/firebase';

export default {
  data() {
    return {
      email: '',
      password: '',
      username: '',
      loginError: ''
    }
  },
  methods: {
    async submitForm() {
      this.loginError = '';
      try {
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
        console.log(userCredential);

        // Add this block to fetch the username from Firestore after a successful login
        const docRef = doc(db, 'users', userCredential.user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          this.username = docSnap.data().username;
          console.log("Username: ", this.username);

        } else {
          console.log("No such user in Firestore");
        }

        // Navigate to '/home' if login is successful
        this.$router.push("/#");
      } catch (error) {
        this.loginError = error.message;
        console.error('Error occurred when signing in:', error);
      }
    }
  }
}
</script>

<style scoped>
.form-stuff {
  padding: 20px;
}
body {
  background-color: #f6f6f6;
}

.login {
  max-width: 400px;
  margin: 40px auto;
  padding: 0px;
  border: none;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
}

h1 {
  text-align: center;
  color: white;
  font-weight: 500;
  font-size: 60px;
  background-color: #143D56;
  padding: 0px;
  margin: 0px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

form div {
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
}

form div:last-child {
  margin-bottom: 0;
}

label {
  margin-bottom: 10px;
  font-weight: 500;
  color: #555;
}

input[type="email"],
input[type="password"] {
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f0f0f0;
}

button {
  padding: 14px;
  border-radius: 5px;
  border: none;
  color: white;
  background-color: #327576;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

button:hover {
  background-color: #143D56;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.signup-prompt {
  margin-top: 30px;
  text-align: center;
  color: #555;
}

.router-link {
  text-decoration: none;
  color: #007acc;
  transition: color 0.3s;
}

.router-link:hover {
  color: #005999;
}

.alert {
  color: red;
  font-weight: bold;
  margin: 10px 0;
}
</style>
