<template>
  <q-layout view="lHh Lpr fFf">
    <q-drawer v-model="leftDrawerOpen" side="left" overlay>
      <div class="drawer-content">
        <h2>Hello from Drawer!</h2>
        <p>This is sample drawer content.</p>
      </div>
    </q-drawer>

    <q-page-container>
      <!-- your page content goes here -->
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      leftDrawerOpen: false
    }
  },
}
</script>
<style scoped>

.q-drawer {
  /* To set the drawer width */
  width: 240px !important;

  /* For a smooth transition */
  transition: all .3s ease;
}

.q-drawer-content {
  background: #f8f8f8;
  color: #333;
}

.drawer-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.drawer-content h2 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
}

.drawer-content p {
  font-size: 16px;
  line-height: 1.6;
}
</style>
