<template>
  <div class="user-register">
    <h1>Sign Up</h1>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <form @submit.prevent="submitForm">
      <div class="form-stuff">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
        <p v-if="password && password.length < 5" style="color: red;">Password should be at least 6 characters</p>
      </div>

      <div>
        <button type="submit">Sign Up</button>
      </div>
      <p v-if="email && !email.includes('@')" style="color: red;">Invalid email format</p>
      <div class="login-link">
        <router-link to="/login">Back to Login</router-link>
      </div>
      </div>
    </form>
  </div>
</template>

<script>
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'src/boot/firebase';
import { db } from 'src/boot/firebase';
import { doc, setDoc, getDoc } from "firebase/firestore";

export default {
  data() {
    return {
      email: '',
      password: '',
      username: '',
      errorMessage: ''
    }
  },
  methods: {
    async submitForm() {
      if (this.password.length < 5) {
        this.errorMessage = 'Password should be at least 6 characters';
        return;
      }

      // Check if the username already exists
      let usernameSnap = await getDoc(doc(db, "usernames", this.username));
      if (usernameSnap.exists()) {
        this.errorMessage = 'This username is already in use by another account.';
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
        const {user} = userCredential;

        // After creating user add username and email to the Firestore
        try {
          // Set user document with email field
          await setDoc(doc(db, "users", user.uid), {
            username: this.username,
            email: this.email
          });

          let docSnap = await getDoc(doc(db, "users", user.uid));
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
          } else {
            console.log("No such document!");
          }
        } catch (e) {
          console.error("Error adding document: ", e);
        }

        console.log('Firebase response:', userCredential); // log the Firebase Auth response
        this.$router.push("/login");
      } catch (error) {
        let message = '';
        switch (error.code) {
          case 'auth/email-already-in-use':
          case 'auth/username-already-in-use':
            message = 'This ' + error.code.split('/')[1] + ' is already in use by another account.';
            break;
          case 'auth/invalid-email':
            message = 'The email address is not valid.';
            break;
          case 'auth/operation-not-allowed':
            message = 'Email/password accounts are not enabled. Enable email/password in the Firebase Console, under the Auth tab.';
            break;
          case 'auth/weak-password':
            message = 'The password is not strong enough.';
            break;
          default:
            message = 'An error occurred during registration. Please try again.';
        }
        // Display the error message to the user
        this.errorMessage = message;
      }
    }
  }
}
</script>
<style scoped>

.form-stuff {
  padding: 20px;
}
.login-link {
  margin-top: 20px;
  width: 100%;
  text-align: center;
}

.login-link a {
  display: block;
  margin: auto;
  color: #327576;
  text-decoration: none;
  transition: color 0.3s;
}

.login-link a:hover {
  color: #143D56;
}
body {
  background-color: #f6f6f6;
}

.user-register {
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

input[type="text"],
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

p {
  color: red;
}
.error {
  color: red;
  font-weight: bold;
  margin: 10px 0;
}
</style>
