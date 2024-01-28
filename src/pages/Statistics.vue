<template>
  <div>
    <canvas id="myChart" width="400" height="200"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';
import firebase from 'firebase';

export default {
  name: 'StatisticsPage',
  data() {
    return {
      fishingData: [] // Store your fishing data here
    };
  },
  methods: {
    fetchDataFromFirebase() {
      // Replace the following with your actual Firebase database reference
      const databaseRef = firebase.database().ref('/fishingData');

      databaseRef.once('value')
        .then(snapshot => {
          this.fishingData = snapshot.val();

          this.createChart();
        })
        .catch(error => {
          console.error('Error fetching data from Firebase:', error);
        });
    },

    createChart() {
      const ctx = document.getElementById('myChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Label1', 'Label2', 'Label3'], // Add labels based on your data
          datasets: [{
            label: 'Fishing Statistics',
            data: this.fishingData, // Use your fetched data here
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  },
  mounted() {
    this.fetchDataFromFirebase(); // Fetch data when the component is mounted
    this.createChart(); // Create the chart after data is fetched
  }
};
</script>

<style scoped>
/* Add any scoped styles here if needed */
</style>
