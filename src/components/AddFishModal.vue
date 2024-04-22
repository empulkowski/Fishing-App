<script>
import {addDoc, collection, getFirestore} from "firebase/firestore";
import firebaseApp from "boot/firebase";
import { getAuth } from 'firebase/auth';

export default {
  name: 'AddFishModal',
  props: ['showModal'],
  data() {
    return {
      species: '',
      date: '',
      time: '',
      location: '',
      weight: null,
      length: null,
      tackle: '',
      notes: '',
      temperature: null,
    };
  },
  methods: {
    updateModal(value) {
      this.$emit('update:showModal', value);
    },
    async addFish() {
      const auth = getAuth();
      const fishData = {
        species: this.species,
        date: this.date,
        time: this.time,
        location: this.location,
        weight: this.weight,
        length: this.length,
        tackle: this.tackle,
        notes: this.notes,
        temperature: this.temperature,
        userId: auth.currentUser.uid
      };
      const db = getFirestore(firebaseApp);

        try {
          const fishCollection = collection(db, 'fish');
          await addDoc(fishCollection, fishData);
          console.log('Record added successfully!');
          this.resetForm();
          this.updateModal(false);
        } catch (error) {
          console.error('Error adding record: ', error);
        }

// // method to add the data to your database
//       this.$emit('addFish', fishData);

      this.$emit('hide');
    },
    resetForm() {
      this.species = '';
      this.date = '';
      this.time = '';
      this.location = '';
      this.weight = null;
      this.length = null;
      this.tackle = '';
      this.notes = '';
      this.temperature = null;
    },
    cancelForm() {
      this.resetForm();
      this.updateModal(false); // Close the modal without submitting the form
    },
  },
};
</script>

<template>
  <q-dialog :model-value="showModal" @update:model-value="updateModal" @hide="resetForm">
    <q-card class="my-card">
      <div class="text-subtitle2 absolute-top text-center" id="title">
        Add Fish
      </div>
      <q-form @submit="addFish">
        <q-card-section horizontal>
          <q-card-section>
            <q-input v-model="species" label="Species"/>
          <q-input v-model="date" label="Date" type="date"/>
          <q-input v-model="time" label="Time" type="time"/>
          </q-card-section>
          <q-separator vertical />

          <q-card-section>
          <q-input v-model="location" label="Location"/>
          <q-input v-model="weight" label="Weight" type="number"/>
          <q-input v-model="length" label="Length" type="number"/>
          </q-card-section>
          <q-separator vertical />
          <q-card-section>
            <q-input v-model="tackle" label="Tackle"/>
          <q-input v-model="notes" label="Notes"/>
          <q-input v-model="temperature" label="Temperature" type="number"/>
        </q-card-section>
        </q-card-section>

        <q-card-section class="q-mt-md">
          <q-btn flat label ="Cancel" color="negative" @click="cancelForm"/>
          <q-btn
            flat
            label="Add Fish"
            color="positive"
            type="submit"
            class="q-ml-md"
            icon="add"
          />        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>


<style scoped>
.q-form > div:nth-child(1){
  padding: 0px 20px 20px 20px;
}
.my-card #title {
  background-color: #143D56;
  color: white;
  padding: 20px;
font-family: "Bebas Neue", Serif;
  font-size: 30px;
}
div.q-card__section{
  margin-top: 30px;
  text-align: center;
}
div.q-card__section:nth-child(2){
  margin-top: 0px;
  padding-top:0px;
}

</style>
