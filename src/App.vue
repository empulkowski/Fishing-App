<template>
  <router-view />

</template>
<script>

import { defineComponent, ref } from 'vue';

import firebaseApp from 'src/boot/firebase';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

export default defineComponent({
  name: 'App',
  setup() {

    return {};
  },
});
</script>
