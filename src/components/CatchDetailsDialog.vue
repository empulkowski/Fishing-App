
<template>
  <q-dialog :model-value="dialogVisible" @update:model-value="updateDialogVisible" persistent class="catch-details-dialog">
    <q-card>
      <q-card-section class="q-pt-none">
        <q-card>
<!--          <q-card-section class="image-section">-->
<!--            <img src="" alt="Catch Image" class="catch-image" />-->
<!--          </q-card-section>-->

          <q-card-section class="q-pb-none">
            <!-- Render editable or non-editable fields based on isEditing -->
            <div v-if="!isEditing"><strong>Species:</strong>  {{ selectedCatch.species }}</div>
            <q-input v-else v-model="editedCatch.species" label="Species" dense />

            <div v-if="!isEditing"><strong>Date:</strong>  {{ selectedCatch.date }}</div>
            <q-date v-else v-model="editedCatch.date" label="Date" dense :size="sizeForDatePicker" />

            <div v-if="!isEditing"><strong>Location:</strong>  {{ selectedCatch.location }}</div>
            <q-input v-else v-model="editedCatch.location" label="Location" dense />

            <div v-if="!isEditing"><strong>Tackle:</strong>  {{ selectedCatch.tackle }}</div>
            <q-input v-else v-model="editedCatch.tackle" label="Tackle" dense />

            <div v-if="!isEditing"><strong>Time:</strong>  {{ selectedCatch.time }}</div>
            <q-time v-else v-model="editedCatch.time" label="Time" dense :size="sizeForTimePicker"/>

            <div v-if="!isEditing"><strong>Weight:</strong>  {{ selectedCatch.weight }}</div>
            <q-input v-else v-model="editedCatch.weight" label="Weight" dense />

            <div v-if="!isEditing"><strong>Length:</strong>  {{ selectedCatch.length }}</div>
            <q-input v-else v-model="editedCatch.length" label="Length" dense />

            <div v-if="!isEditing"><strong>Notes:</strong>  {{ selectedCatch.notes }}</div>
            <q-input v-else v-model="editedCatch.notes" label="Notes" dense />

          </q-card-section>


      <q-card-actions align="left">
        <q-btn flat
          v-if="!isEditing"
          icon="fa-solid fa-pen-to-square fa-2xs"
          color="#327576"
          @click="toggleEditing" ></q-btn>

        <q-btn v-else label="Save" color="primary" @click="saveChanges" />

        <q-btn flat label="Delete" color="negative" @click="deleteCatch" v-if="!isEditing" />
        <q-btn flat label="Close" color="#327576" @click="closeDialog" />
      </q-card-actions>
        </q-card>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>

export default {
  props: {
    dialogVisible: Boolean,
    selectedCatch: Object,
  },
  emits: ['update:dialogVisible', 'closeDialog', 'saveChanges'],
  data() {
    return {
      isEditing: false,
      editedCatch: null,
      sizeForDatePicker: 'sm',
      sizeForTimePicker: 'sm',
    };
  },
  methods: {
    updateDialogVisible(value) {
      this.$emit('update:dialogVisible', value);
    },
    closeDialog() {
      this.$emit('closeDialog');
      this.updateDialogVisible(false);
    },
    toggleEditing(value) {
      this.isEditing = value;
      this.editedCatch = { ...this.selectedCatch };
    },
    deleteCatch() {
      this.$emit('deleteCatch', this.selectedCatch.id); // Assuming you have an 'id' property in your selectedCatch
      this.toggleEditing();
      this.closeDialog();
    },

    saveChanges() {
      // Emit an event with the edited data for the parent to handle
      this.$emit('saveChanges', this.editedCatch);
      // Toggle back to non-editing state
      this.toggleEditing();
    },
  },
};
</script>
<style scoped>
.q-pt-none {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  overflow-x: hidden;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.image-section {
  text-align: center;
}

.catch-image {
  max-width: 100%;
  max-height: 200px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.q-card-section {
  margin-bottom: 16px;
}

.q-btn {
  font-size: 14px;
  padding: 10px 16px;
}

.q-btn-primary {
  background-color: #4caf50;
  color: #fff;
}

.q-btn-danger {
  background-color: #f44336;
  color: #fff;
}
.q-card-section div {
  font-weight: bold;
}
.image-section{
  backgound-color: black;
}
.q-btn-close {
  margin-left: 8px;
}
</style>


