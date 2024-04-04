<template>
  <q-page>
  <div class="data-render">
    <h1>Image Search</h1>
    <div class="form-stuff">
      <div>
        <input type="text" v-model="fishName" placeholder="Enter fish name" />
        <button @click="fetchFishData">Search</button>
      </div>
      <div v-if="fishData" class="fish-info">
        <div>
          <h2>{{ fishData.preferred_common_name }}</h2>
          <img class="fish-image" v-if="fishData.default_photo" :src="fishData.default_photo.square_url" alt="Fish Image">
        </div>
<!--        <div v-if="fishLocations.length > 0" class="locations">-->
<!--          <h3>Locations where {{ fishData.preferred_common_name }} has been found:</h3>-->
<!--          <ul>-->
<!--            <li v-for="(location, index) in fishLocations" :key="index">-->
<!--              {{ location }}-->
<!--            </li>-->
<!--          </ul>-->
<!--        </div>-->
      </div>
    </div>
  </div>
  </q-page>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      fishName: '',
      fishData: null,
      fishLocations: [],
    };
  },
  methods: {
    fetchFishData() {
      axios
        .get(`https://api.inaturalist.org/v1/taxa/autocomplete?q=${this.fishName}`)
        .then((response) => {
          if (response.data.results && response.data.results.length > 0) {
            this.fishData = response.data.results[0];
            this.fetchFishLocations(this.fishData.id); // Call fetchFishLocations here
          } else {
            this.fishData = null;
            alert('No data found for this fish species.');
          }
        })
        .catch((error) => {
          console.error(`Error: ${error}`);
        });
    },
    fetchFishLocations(fishId) {
      axios
        .get(`https://api.inaturalist.org/v1/observations?taxon_id=${fishId}&verifiable=true`)
        .then((response) => {
          if (response.data.results && response.data.results.length > 0) {
            this.fishLocations = response.data.results.map(observation => observation.place_guess);
          } else {
            this.fishLocations = [];
            alert('No location data found for this fish species.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    },
  },
};
</script>
<style scoped>
.data-render {
  max-width: 300px;
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
  font-size: 30px;
  background-color: #143D56;
  padding: 0px;
  margin: 0px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
h2{
  font-family: "Bebas Neue", sans-serif;
  font-size: 30px;
  text-align: center;
}

h3{
  font-family: "Bebas Neue", sans-serif;
  font-size: 25px;
  text-align: center;
}
.form-stuff {
  padding: 20px;
}

.form-stuff div {
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
}

input[type="text"] {
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f0f0f0;
  margin-bottom: 10px;
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
.fish-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.fish-image {
  width: 200px;
  height: 200px;

}
</style>
