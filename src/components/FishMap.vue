<template>
  <div>
    <div ref="map" class="map-container"></div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';

export default {
  name: 'FishMap',
  props: ['accessToken', 'lake'],
  data() {
    return {
      map: null,
      geocoder: null,
      markers: [],
      markerCoordinates: [],
    };
  },
  mounted() {
    mapboxgl.accessToken = this.accessToken;
    this.map = new mapboxgl.Map({
      container: this.$refs.map,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [-74.5, 40], // Initial map center coordinates
      zoom: 9, // Initial map zoom level
    });
    this.map.on('click', (e) => {
      this.addMarker(e.lngLat);
    });
    this.geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
      position: 'top-left',
    }).on('error', (error) => {
      console.error('Mapbox Geocoder error:', error);
    });
    this.map.addControl(this.geocoder);
  },
  watch: {
    lake: function (newLake, oldLake) {
      console.log('New Lake:', newLake);
      if (newLake !== oldLake) {
        this.updateMapForLake(newLake);
      }
    },
  },
  methods: {



    updateMapForLake(lake) {
      const lakeCoordinates = this.getLakeCoordinates(lake);
      if (lakeCoordinates) {
        this.map.flyTo({
          center: lakeCoordinates,
          zoom: 12,
          speed: 1.5,
        });
      } else {
        console.warn(`Coordinates not found for lake: ${lake}`);
      }
    },
    addMarker(coordinates) {
      let marker = new mapboxgl.Marker()
        .setLngLat(coordinates)
        .addTo(this.map);

      let deleteButton = document.createElement("button");
      deleteButton.innerHTML = "delete";
      deleteButton.style.background = "none";
      deleteButton.style.border = "1px solid #333";
      deleteButton.style.color = "#333";
      deleteButton.style.padding = "2px 5px";
      deleteButton.style.fontSize = "10px";
      deleteButton.style.cursor = "pointer";

      deleteButton.onclick = () => {
        marker.remove();
        this.markers = this.markers.filter(m => m !== marker);
      };

      let popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
        .setDOMContent(deleteButton)
        .addTo(this.map);

      marker.setPopup(popup);
      this.markers.push(marker);
    },

    getLakeCoordinates(lake) {
      let lakeCoordinates;
      if (lake === 'Lake One') {
        lakeCoordinates = [-74.5, 40];
      } else if (lake === 'Lake Two') {
        lakeCoordinates = [-75, 39.5];
      }
      console.log(`Coordinates for ${lake}:`, lakeCoordinates);
      return lakeCoordinates;
    },
  },
};
</script>

<style scoped>
.custom-geocoder-container {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1;
}

.map-container {
  height: 400px;
  margin: 20px;
}
</style>
