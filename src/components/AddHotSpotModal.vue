<template>
  <q-dialog :model-value="showModal" @update:model-value="updateModal" persistent>
    <q-card>
      <q-card-section class="q-pt-none">
        <q-card-title class="text-h6">Add Hot Spot</q-card-title>
      </q-card-section>

      <q-form @submit="addHotSpot">
        <q-card-section>
          <q-input v-model="location" label="Location"/>
          <q-input v-model="description" label="Description"/>
          <!-- Add other fields as needed -->

          <!-- You can use QToggle for boolean values or other Quasar components as required -->
        </q-card-section>

        <q-card-section>
          <q-btn label="Cancel" color="negative" @click="cancel"/>
          <q-btn label="Add Hot Spot" color="positive" type="submit"/>
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from 'vue';
import { addDoc, collection, getFirestore } from 'firebase/firestore'; // Import necessary Firebase Firestore functions
import firebaseApp from 'boot/firebase';

export default {
  props: {
    showModal: Boolean,
  },
  emits: ['update:showModal'],
  data() {
    return {
      location: '',
      description: '',
      // Add other data properties as needed
    };
  },
  methods: {
    updateModal(value) {
      this.$emit('update:showModal', value);
    },
    async addHotSpot() {
      const hotSpotData = {
        location: this.location,
        description: this.description,
        // Add other fields as needed
      };

      const db = getFirestore(firebaseApp);

      try {
        const hotSpotCollection = collection(db, 'hotSpots'); // Replace 'hotSpots' with your collection name
        await addDoc(hotSpotCollection, hotSpotData);
        console.log('Hot Spot added successfully!');
      } catch (error) {
        console.error('Error adding Hot Spot: ', error);
      }

      this.resetForm();
      this.updateModal(false);
    },
    resetForm() {
      this.location = '';
      this.description = '';
    },
    cancel() {
      // Emit a custom event to indicate cancellation
      this.$emit('cancel');
      // Close the modal
      this.updateModal(false);
    },

  },
};
</script>

<style scoped>
/* Add scoped styles as needed */
</style>
