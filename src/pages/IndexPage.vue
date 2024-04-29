<script>
import {ref} from 'vue';
import AddFishModal from '../components/AddFishModal.vue';
import AddHotSpotModal from '../components/AddHotSpotModal.vue'
import FishMap from '../components/FishMap.vue';
import FriendsListModal from "../components/FriendsListModal.vue";

export default {
  name: 'IndexPage',
  components: {
    AddFishModal,
    AddHotSpotModal,
    FishMap,
    FriendsListModal,
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
      console.log('Adding fish to the database:', fishData);
      isAddFishModalVisible.value = false;
    };

    const isFriendsListModalVisible = ref(false);
    const openFriendsListModal = () => {
      console.log("opening friends list");
      isFriendsListModalVisible.value = true;
    };
    return {
      isFriendsListModalVisible,
      openFriendsListModal,
      isAddHotSpotModalVisible,
      isAddFishModalVisible,
      openAddFishModal,
      addFishToDatabase,
      openAddHotSpotModal,
      closeAddHotSpotModal,
      mapboxAccessToken: 'sk.eyJ1IjoiZW1wdWxrb3dza2kiLCJhIjoiY2xweWt1ajB2MHZxNjJpb2F3anFpbzg5dCJ9.7lwNowFsbEgcBaT_UHobvw', // Replace with your Mapbox access token
      isActive: false,
    };

  },
  data() {
    return {
      searchLake: '',
      searchTerm: '',
    };
  },
  methods: {
    toggleActiveStatus() {
      this.isActive = !this.isActive;
    },
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
        <div class="nav-row">
          <div class="circle add-fish-button" @click="openAddFishModal" style="cursor: pointer;">
            <img src="../assets/addFIshStroke.png" alt="circle image of fish. ">

          </div>

          <div class="circle friends-button" @click="openFriendsListModal" style="cursor: pointer;">
            <img src="../assets/friendsStroke.png" alt="circle image of a friend. ">

          </div>
        </div>
        <div class="nav-row">
          <router-link class="circle" to="/log">
            <img src="../assets/fishingLogStroke.png" alt="circle image of fishing log.">

          </router-link>

          <router-link class="circle" :to="{ name: 'FishSearch' }">
            <img src="../assets/fishSearchStroke.png" alt="circle image of fish search.">
          </router-link>
        </div>
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
    <FriendsListModal :show-modal="isFriendsListModalVisible" @update:show-modal="val => isFriendsListModalVisible = val" />
    <add-fish-modal :show-modal="isAddFishModalVisible" @update:show-modal="val => isAddFishModalVisible = val"
    />
    <add-hot-spot-modal :show-modal="isAddHotSpotModalVisible"
                        @update:show-modal="val => isAddHotSpotModalVisible = val" @close-modal="closeAddHotSpotModal"/>
  </q-page>
</template>


<style scoped>
#main-container {
  gap: 5px;
  display: flex;
  flex-direction: row;
  height: 100vh;
  margin: 0;
  padding: 0;
  background-color: #327576;
  align-items: center;

}

#nav-circles {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  margin: auto;
  max-width: 380px;
}
.friends-button,
.add-fish-button {

}
.circle img,
a.circle img {
  width: 380px;
 height: auto;
}
.circle {
  margin: -50px;
  transition: transform 0.3s ease-in-out;

}
.circle:hover {
  transform: scale(1.1);
}
.circle.active {
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.5);
}

.hotspot-column {
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 50%;
  box-sizing: border-box;
  padding-right: 40px;

}

.hot-spot-bar {
  background-color: #1D4E4F;
  color: white;
  padding: 7px;
  margin-bottom: 10px;
  font-family: "Bebas Neue", Serif;
  text-align: center;
  font-size: 30px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.hotspot-container {
  background: #143D56;
  flex: 1;
  margin: 0 15px;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.map-container {
  height: 100%;
  padding: 8px;
}
.nav-row {
  display: flex;
  justify-content: space-evenly;
}

@media screen and (max-width: 1024px) {
  #main-container {
    flex-direction: column;
    align-items: normal;
    width: 100%;
  }
  #nav-circles {
    justify-content: center;
    padding: 0 15px;


  }

  .circle {
    margin-left: 50px;
  }

  .hotspot-column {
    padding-top: 20px;
    width: 100%;
    margin: 0px;
    flex: 1;
  }
  .hotspot-container {
    width: 100%;
    margin: 0px;
  }
  .map-container {
    width: 100%;
  }
  /* Add any additional styles here */
}
@media screen and (max-width: 768px) {
  #main-container {
    flex-direction: column;
    align-items: normal;
    width: 100%;
  }
  #nav-circles {
    max-width: 100%;

  }
  .hotspot-column {
    padding-top: 20px;
    width: 100%;
    margin: 0px;
    flex: 1;
  }
  #nav-circles, .hotspot-column {
    max-width: 100%;
    box-sizing: border-box;
  }
  .hotspot-container {
    width: 100%;
    margin:15px;

  }
  .map-container {
    width: 100%;
    padding: 0;

  }
}
</style>
