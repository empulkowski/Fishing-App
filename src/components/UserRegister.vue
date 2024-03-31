<template>
  <div class="user-register">
    <h1>Sign Up</h1>
    <form @submit.prevent="submitForm">
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
    </form>
  </div>
</template>

<script>
import { createUserWithEmailAndPassword } from 'firebase/auth';
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
      // Check if password length is less than 6; if so, don't continue, just return after alerting user
      if (this.password.length < 6) {
        alert('Password should be at least 6 characters');
        return;
      }
      console.log('email:', this.email);
      console.log('password:', this.password);
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
        console.log('Firebase response:', userCredential); // log the Firebase response
        this.$router.push("/login");//gotologin
      } catch (error) {
        console.error('Error occurred when signing up', error); // log the error if any
      }
    }
  }
}
</script>
