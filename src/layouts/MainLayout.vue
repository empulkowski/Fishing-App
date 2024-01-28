<template>

  <q-layout>
    <q-header>
      <NavigationBar />
      <!--    <NavigationBar :user-name="userName" :user-profile-image="userProfileImage" />-->
    </q-header>
<q-page-container>
<router-view />
</q-page-container>
    <q-footer>
      <FooterBar />
    </q-footer>
  </q-layout>
</template>

<script>

import { defineComponent } from 'vue'
import NavigationBar from 'components/NavigationBar.vue'
import FooterBar from 'components/FooterBar.vue'
export default defineComponent({
  name: 'MainLayout',

  components: {
    NavigationBar,
    FooterBar,
  },
})

</script>

<style scoped>
.circle img {
  width: 100%;
}



</style>
