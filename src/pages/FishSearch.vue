<template>
  <q-page>
    <div class="grid-container">
      <div class="data-render">
        <h1>Image Search</h1>
        <div class="form-stuff">
          <div>

            <input type="text" v-model="fishName" placeholder="Enter fish name"/>
            <button @click="fetchFishData">Search</button>
          </div>
          <!-- Fish Info -->
          <div v-if="fishData" class="fish-info">
            <div>
              <h2>{{ fishData.preferred_common_name }}</h2>
              <img class="fish-image" v-if="fishData.default_photo" :src="fishData.default_photo.square_url"
                   alt="Fish Image">
            </div>
          </div>
          <!-- Locations Info -->
          <div v-if="fishData" class="locations-info">
            <h2>Fish Details and Locations</h2>
            <ul>
              <li v-for="(location, index) in fishLocations" :key="index">
                {{ location }}
              </li>
            </ul>
          </div>
        </div>
      </div>


          <div class="additional-info">
            <div class="reg-wrapper">
            <h1>Check Regulations</h1>

            <a href="https://dnr.wisconsin.gov/topic/fishing/regulations" target="_blank" rel="noopener noreferrer">
              <img class="regulations-image" src="../assets/dnr.jpg" alt="Wisconsin Fishing Regulations">
            </a>

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
.reg-wrapper{
  margin-top: 140px;
  margin-right: 50px;
  width: 600px;
  background-color:#143D56;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.regulations-image {
width: 600px;
  height: auto;
  padding: 20px;
}
.locations-info {
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 10px;
}

.locations-info h2 {
  color: #444;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.locations-info ul {
  list-style-type: none;
}

.locations-info li {
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
}

.locations-info li:last-child {
  border: none;
}

.data-render {
  max-width: 500px;
  margin-top: 140px;
  margin-left: 50px;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
}
.additional-info > h1:nth-child(1){

  background-color: #327576;
}

.additional-info{
  margin-right:100px;
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

h2 {
  font-family: "Bebas Neue", sans-serif;
  font-size: 30px;
  text-align: center;
}

h3 {
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

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 20px;
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}
</style>
