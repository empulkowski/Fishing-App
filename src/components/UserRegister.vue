<template>
  <div class="user-register">
    <h1>Sign Up</h1>
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
        <p v-if="password && password.length < 6" style="color: red;">Password should be at least 6 characters</p>
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
      username: ''
    }
  },
  methods: {
    async submitForm() {
      // Check if password length is less than 6; if so, don't continue, just return after alerting user
      if (this.password.length < 6) {
        alert('Password should be at least 6 characters');
        return;
      }
      console.log('username:', this.username);
      console.log('email:', this.email);
      console.log('password:', this.password);

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);

        // After creating user add username to the Firestore
        try {
          await setDoc(doc(db, "users", userCredential.user.uid), {
            username: this.username
          });

          let docSnap = await getDoc(doc(db, "users", userCredential.user.uid));
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
            message = 'This email address is already in use by another account.';
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
        console.log(message);
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
</style>
