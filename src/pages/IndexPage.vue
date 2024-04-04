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
      <div id="nav-circles">
        <!-- Top row -->
        <div class="circle" @click="openAddFishModal">
          <img src="../assets/fish.png" alt="circle image of fish. ">
        </div>

        <div class="circle">
          <img src="../assets/friend.png" alt="circle image of friend. ">
        </div>

        <!-- Bottom row -->
        <router-link class="circle" to="/log">
          <img src="../assets/log.png" alt="circle image of fishing log.">
        </router-link>

        <router-link class="circle" :to="{ name: 'FishSearch' }">
          <img src="../assets/stats3.png" alt="circle image of camera.">
        </router-link>
      </div>


      <!-- Hotspot col -->
      <div class="hotspot-column">
        <div class="hotspot-container">
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
    </div>
    <!-- Modals -->
    <add-fish-modal :show-modal="isAddFishModalVisible" @update:show-modal="val => isAddFishModalVisible = val"
                    @addFish="addFishToDatabase"/>
    <add-hot-spot-modal :show-modal="isAddHotSpotModalVisible"
                        @update:show-modal="val => isAddHotSpotModalVisible = val" @close-modal="closeAddHotSpotModal"/>
  </q-page>
</template>


<style scoped>




.nav-container img {
  width: 300px;
}

#nav-circles {
  display: grid;
  align-items: center;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(2, auto);
  justify-content: center;
  grid-gap: 20px;
  margin: 0px;
}

.circle {
  margin: 10px;
  width: 280px;
  height: 280px;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
a.circle{
  width: 280px;
  height: 280px;
}
.circle:hover {
  transform: scale(1.1);
}

.circle:active {
  transform: scale(0.9);
}

.circle img {
  max-width: 100%;
  object-fit: cover;
}


.map-container {
  padding: 8px;
}


.hotspot-column {
  margin-right: 40px;
  margin-top: 37px;
}

.hot-spot-bar {
  background-color: #1D4E4F;
  color: white;
  padding: 7px;
  margin: 0px;
  font-family: "Bebas Neue", Serif;
  text-align: center;
  font-size: 30px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;


}

#main-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 0;
  padding: 0;
  background-color: #327576;
    max-height: 620px;
    overflow: auto;


  }

div.hotspot-container {
  background-color: #143D56;
  margin: 15px;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);

}

div.map-container:nth-child(1) {
  margin: 0px;
}


@media screen and (max-width: 768px) {
  #main-container {
    grid-template-columns: 1fr;
  }

  .right-column {
    margin-top: 20px;
  }
}


</style>

