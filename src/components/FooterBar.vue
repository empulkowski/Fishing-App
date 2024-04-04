<template>
  <div id="content-container">
    <div class="q-pa-md">
    <div class="footer-content">
<!--      <p>{{ currentCity }}</p>-->
      <p>{{ currentDate }}</p>
      <p>{{ currentTime }}</p>
      <p v-if="currentTemperature !== null">{{ currentTemperature }}°F</p>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "FooterBar",
  data() {
    return {
      currentCity: "",
      currentDate: "",
      currentTime: "",
      currentTemperature: null,
      mapboxApiKey: "pk.eyJ1IjoiZW1wdWxrb3dza2kiLCJhIjoiY2xweW5tYTRtMHczbDJqcXhwMHB6NzR5NCJ9.ALxEoJOUkHqvPuQ61aejCQ",
      openWeatherMapApiKey: "11ed4ac15fb43e26ca8ade6b90311bcb",
    };
  },
  mounted() {
    this.updateDateTime();
    this.getCurrentLocation();
  },
  methods: {
    updateDateTime() {
      const now = new Date();
      this.currentDate = now.toLocaleDateString();
      this.currentTime = now.toLocaleTimeString();
    },
    async getCurrentLocation() {
      try {
        const position = await this.getCurrentPosition();
        const { latitude, longitude } = position.coords;

        const city = await this.getCityName(latitude, longitude);

        await this.fetchWeatherData(city);
      } catch (error) {
        console.error("Error getting current location", error);
      }
    },
    getCurrentPosition() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    },
    async getCityName(latitude, longitude) {
      try {
        const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${this.mapboxApiKey}`;
        const response = await fetch(mapboxUrl);
        const data = await response.json();

        console.log("Mapbox API Response:", data);

        if (response.ok && data.features.length > 0) {
          const city = data.features[0].context.find((c) => c.id.startsWith("place")).text;
          const country = data.features[0].context.find((c) => c.id.startsWith("country")).text;

          console.log("City:", city);
          console.log("Country:", country);

          return `${city}, ${country}`;
        } else {
          console.error("Failed to get city name from Mapbox");
        }
      } catch (error) {
        console.error("Error getting city name from Mapbox", error);
      }
    },
    async fetchWeatherData(city) {
      const openWeatherMapUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.openWeatherMapApiKey}&units=imperial`;

      try {
        const response = await fetch(openWeatherMapUrl);
        const data = await response.json();

        if (response.ok) {
          this.currentTemperature = data.main.temp;
        } else {
          if (data.cod === '404') {
            console.warn(`City '${city}' not found on OpenWeatherMap`);
            // Handle the 'city not found' scenario, e.g., set a default temperature
            this.currentTemperature = null;
          } else {
            console.error("Failed to fetch weather data from OpenWeatherMap", data.message);
            // Handle other errors more gracefully, e.g., set a default temperature
            this.currentTemperature = null;
          }
        }
      } catch (error) {
        console.error("Error fetching weather data from OpenWeatherMap", error);
        // Handle the error more gracefully, e.g., set a default temperature
        this.currentTemperature = null;
      }
    },
  },
};
</script>

<style scoped>
.q-pa-md {
  background-color: #143D56;
  position: fixed;
  width: 100%;
  bottom: 0;
}
#content-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.footer-content {
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 40px;
  padding-right: 40px;
  font-family: "Bebas Neue", Serif;
  font-size: 20px;
}
</style>
