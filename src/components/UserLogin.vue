<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>

      <div>
        <button type="submit">Log In</button></div>
      <div class="signup-prompt">
        <p>New to this app?</p>
        <router-link to="/register">Sign up now</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'src/boot/firebase';

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async submitForm() {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
        console.log(userCredential);
        // Navigate to '/home' if login is successful
        this.$router.push("/#");
      } catch (error) {
        console.error('Error occurred when signing in:', error);
      }
    }
  }
}
</script>

<style scoped>
.login {
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

form div {
  margin-bottom: 10px;
}

label {
  margin-bottom: 5px;
}

input[type="email"], input[type="password"] {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px;
  margin-top: 20px;
  border-radius: 5px;
  border: none;
  color: white;
  background-color: #3399ff;
  cursor: pointer;
}

button:hover {
  background-color: #007acc;
}

.signup-prompt {
  margin-top: 20px;
  text-align: center;
}

.router-link {
  text-decoration: none;
  color: #007acc;
}
</style>
