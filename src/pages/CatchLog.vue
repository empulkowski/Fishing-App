<template>
  <q-page>
    <div>
      <!-- Skeleton loader -->
        <q-table
          class="my-table"
          v-if="!loadingFishRecords"
          :rows="fishRecords"
          :columns="columns"
          row-key="id"
          :pagination="pagination"
          @update:pagination="updatePagination"
          @update:sortBy="updateSort"
          :sort-method="customSort"
          virtual-scroll
        >
          <template v-slot:body="props">
            <q-tr :props="props" @click="openDetailsDialog(props.row)">
              <q-td :props="props" auto-width v-for="col in columns" :key="col.name">
      <span v-if="col.name === 'species'" style="display: flex; align-items: center;">
        <q-btn round dense flat icon="more_vert" @click.stop="openDetailsDialog(props.row)" />
        {{ props.row[col.name] }}
      </span>
                <span v-else>
        {{ props.row[col.name] }}
      </span>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      <q-skeleton
        v-else
        :bordered="true"
        :animated="true"
        :size="size"
      />

      <catch-details-dialog
        v-if="!loadingFishRecords"
        :dialogVisible="dialogVisible"
        :selectedCatch="selectedCatch"
        @closeDialog="closeDetailsDialog"
        @saveChanges="updateDatabase"
        @deleteCatch="deleteCatchHandler"
      />
    </div>
  </q-page>
</template>

<script>
import CatchDetailsDialog from '../components/CatchDetailsDialog.vue';
import {defineComponent, ref, onMounted} from 'vue';
import firebaseApp from 'src/boot/firebase';
import {getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, where} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

export default defineComponent({
  components: {
    CatchDetailsDialog,
  },
  setup() {
    const db = getFirestore(firebaseApp);
    const fishRecords = ref([]);
    const pagination = ref({page: 1, rowsPerPage: 10});
    const sortBy = ref(null);
    const descending = ref(false);
    const dialogVisible = ref(false);
    const selectedCatch = ref(null);
    const loadingFishRecords = ref(true); // Added for skeleton loader
    const size = 'md'; // Added for skeleton loader

    const updatePagination = (val) => {
      pagination.value = val;
    };

    const updateSort = (column) => {
      sortBy.value = column;
      descending.value = !descending.value;
      fetchFishRecords();
    };

    const openDetailsDialog = (catchData) => {
      selectedCatch.value = catchData;
      dialogVisible.value = true;
    };

    const closeDetailsDialog = () => {
      dialogVisible.value = false;
    };

    const columns = [
      {name: 'species', label: 'Species', align: 'left', field: 'species', sortable: true},
      {name: 'date', label: 'Date', align: 'left', field: 'date', sortable: true},
      {name: 'location', label: 'Location', align: 'left', field: 'location', sortable: true},
      {name: 'weight', label: 'Weight', align: 'left', field: 'weight', sortable: true},
      {name: 'length', label: 'Length', align: 'left', field: 'length', sortable: true},
    ];

    const deleteCatchHandler = (catchId) => {
      const fishCollection = collection(db, 'fish');
      const fishDoc = doc(fishCollection, catchId);

      deleteDoc(fishDoc)
        .then(() => {
          console.log('Record deleted from the database');
          fetchFishRecords(); // Refresh the fishRecords after deletion
          closeDetailsDialog();
          toggleEditing(false);
        })
        .catch((error) => {
          console.error('Error deleting record from the database: ', error);
        });
    };

    const fetchFishRecords = async () => {
      try {
        loadingFishRecords.value = true;
        const auth = getAuth();
        const userId = auth.currentUser.uid;
        const fishCollection = collection(db, 'fish');
        const querySnapshot = await getDocs(query(fishCollection, where("userId", "==", userId)));
        const records = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
        fishRecords.value = records;
        console.log('Fish records fetched successfully.');
      } catch (error) {
        console.error('Error fetching fish records: ', error);
        // Handle the error if needed
      } finally {
        loadingFishRecords.value = false; // Set loading state to false after data is fetched
        console.log('Loading state set to false.');
      }
    };


    const addFishToDatabase = (fishData) => {
      return new Promise((resolve, reject) => {
        const fishCollection = collection(db, 'fish');
        addDoc(fishCollection, fishData)
          .then((docRef) => {
            resolve();
          })
          .catch((error) => {
            console.error('Error adding fish record: ', error);
            reject(error);
          })
          .finally(() => {
            fetchFishRecords();
          });
      });
    };

    const updateDatabase = (editedCatch) => {
      // Implement the logic to update the record in the database
      // For example, if you're using Firestore
      const fishCollection = collection(db, 'fish');
      const fishDoc = doc(fishCollection, editedCatch.id); // Assuming you have an "id" field in your data
      updateDoc(fishDoc, editedCatch)
        .then(() => {
          console.log('Record updated in the database');
        })
        .catch((error) => {
          console.error('Error updating record in the database: ', error);
        });
    };

    const customSort = (rows, sortBy, descending) => {
      const data = [...rows];
      if (sortBy) {
        data.sort((a, b) => {
          const x = descending ? b : a;
          const y = descending ? a : b;

          switch (sortBy) {
            case 'date':
              return new Date(x[sortBy]) - new Date(y[sortBy]);
            case 'weight':
            case 'length':
              return parseFloat(x[sortBy]) - parseFloat(y[sortBy]);
            default:
              return String(x[sortBy]).localeCompare(String(y[sortBy]));
          }
        });
      }
      return data;
    };

    onMounted(() => {
      fetchFishRecords();
    });

    return {
      fishRecords,
      columns,
      pagination,
      updatePagination,
      addFishToDatabase,
      updateSort,
      customSort,
      openDetailsDialog,
      closeDetailsDialog,
      dialogVisible,
      selectedCatch,
      updateDatabase,
      deleteCatchHandler,
      loadingFishRecords,
      size,
    };
  },
});
</script>

<style scoped>
.q-page {
  margin: 100px;
}


</style>
