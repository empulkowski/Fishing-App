<script>
import {ref} from 'vue';
import AddFishModal from '../components/AddFishModal.vue';
import AddHotSpotModal from '../components/AddHotSpotModal.vue'
import FishMap from '../components/FishMap.vue';

export default {
  name: 'IndexPage',
  components: {
    AddFishModal,
    AddHotSpotModal,
    FishMap,
  },
  setup() {
    const isAddFishModalVisible = ref(false);
    const isAddHotSpotModalVisible = ref(false);
    const openAddFishModal = () => {
      console.log('Opening AddFishModal');
      isAddFishModalVisible.value = true;
    };
    const openAddHotSpotModal = () => {
      isAddHotSpotModalVisible.value = true;
    };

    const closeAddHotSpotModal = () => {
      isAddHotSpotModalVisible.value = false;
    };
    const addFishToDatabase = (fishData) => {
      // Perform logic to add fish data to the database
      console.log('Adding fish to the database:', fishData);

      // Close the modal
      isAddFishModalVisible.value = false;
    };

    return {
      isAddHotSpotModalVisible,
      isAddFishModalVisible,
      openAddFishModal,
      addFishToDatabase,
      openAddHotSpotModal,
      closeAddHotSpotModal,
      mapboxAccessToken: 'sk.eyJ1IjoiZW1wdWxrb3dza2kiLCJhIjoiY2xweWt1ajB2MHZxNjJpb2F3anFpbzg5dCJ9.7lwNowFsbEgcBaT_UHobvw', // Replace with your Mapbox access token

    };

  },
  data() {
    return {
      searchLake: '',
      searchTerm: '',
    };
  },
  methods: {
    searchLakeButtonClicked() {
      this.searchLake = this.searchTerm;
    },
    updateMapForLake() {
      // Perform any additional logic if needed
      // For now, just log the selected lake
      console.log('Updating map for lake:', this.searchLake);
    },
  },
};

//     handleSearch() {
//       // Call the updateMap method on the FishMap component with the selected lake
//       this.$refs.fishMap.updateMap(this.searchLake);
//     },
//   },
// };
</script>
<template>
  <q-page>
    <!-- Main container with grid layout -->
    <div class="main-container q-gutter-md q-flex" id="main-container">
      <!-- Navigation circles column (Left half) -->
      <div class="nav-container">
        <div class="q-flex-center" id="nav-circles">
          <!-- Top row -->
          <div class="top-row-container">
            <h1>Add A Fish</h1>
            <div class="circle" @click="openAddFishModal">
              <img src="../assets/fish.png" alt="circle image of fish. ">
            </div>

            <div class="circle">
              <img src="../assets/friend.png" alt="circle image of friend. ">
            </div>
          </div>

          <!-- Bottom row -->
          <div class="bottom-row-container">
            <router-link to="/log" class="circle">
              <img src="../assets/log.png" alt="circle image of fishing log. ">
            </router-link>

            <router-link to="/stats" class="circle">
              <img src="../assets/stats3.png" alt="circle image of camera. ">
            </router-link>
          </div>
        </div>
      </div>

      <!-- Hotspot column (Right half) -->
      <div class="right-column q-flex-column col-md-6">
        <!-- Hot Spot Bar -->
        <div class="hot-spot-bar">Hot Spot</div>

        <!-- Map container -->
        <div class="map-container">
          <FishMap
            :accessToken="'pk.eyJ1IjoiZW1wdWxrb3dza2kiLCJhIjoiY2xweW5tYTRtMHczbDJqcXhwMHB6NzR5NCJ9.ALxEoJOUkHqvPuQ61aejCQ'"
            :lake="searchLake"
            @update-map="updateMapForLake"
          />
        </div>
      </div>
    </div>

    <!-- Modals -->
    <add-fish-modal :show-modal="isAddFishModalVisible" @update:show-modal="val => isAddFishModalVisible = val" @addFish="addFishToDatabase"/>
    <add-hot-spot-modal :show-modal="isAddHotSpotModalVisible" @update:show-modal="val => isAddHotSpotModalVisible = val" @close-modal="closeAddHotSpotModal"/>
  </q-page>
</template>


<style scoped>
#nav-circles {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.circle {
  flex: 1;
  margin: 0 10px;
  max-width: 180px;
}
div.circle:nth-child(2) > img:nth-child(1), div.circle:nth-child(1) > img:nth-child(1){
  padding-right: 25px;
}
a.circle:nth-child(1) > img:nth-child(1), a.circle:nth-child(2) > img:nth-child(1) {
padding-left: 25px;
}
.hot-spot-bar {
  background-color: #1D4E4F;
  color: white;
  padding: 10px;
  margin-top: 0px;
  font-family: "Bebas Neue", Serif;
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;

}

#main-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 0;
  padding: 0;
  background-color: #327576;


}

.right-column {
  margin: 0;
  padding: 0 20px;
}

.right-column .hot-spot-bar {
  /* Add styles for the hot-spot-bar in the right column if needed */
}

.top-circles-container,
.bottom-circles-container {
  display: flex;
}

.circle {
  margin: 0 10px;
}

@media screen and (max-width: 768px) {
  #main-container {
    grid-template-columns: 1fr;
  }

  .right-column {
    margin-top: 20px;
  }
}
div.right-column.q-flex-column.col-md-6{
  padding:0px;
}

#nav-circles{
  margin-top: 30px;
}
.nav-container {
  background-image: url("src/assets/lureBackground3.png");
  padding: 0;
  margin: 0;
}

.nav-container img {
  width: 300px;
}

a.circle:nth-child(1) > img:nth-child(1), a.circle:nth-child(2) > img:nth-child(1){
   margin-left: 60px;
}
#main-container {

 max-height: 100vh; /* Set minimum height to cover the entire viewport */
}

</style>

