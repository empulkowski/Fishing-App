<template>
  <q-page>
    <div>{{fishRecords}}</div>
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
        :sort-method="customSort"
        virtual-scroll
      >
        <template v-slot:top>
          <div class="title">Fishing Log</div>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td :props="props" auto-width v-for="col in columns" :key="col.name">
              {{ props.row[col.name] }}
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
    </div>
  </q-page>
</template>

<script>
import {defineComponent, ref, onMounted, watch} from 'vue';
import firebaseApp from 'src/boot/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
export default defineComponent({
  name: 'FriendsLogs',
  props: {
    friendId: String,
  },
  setup(props, {emit, root}) {
    console.log(props.friendId);
    const db = getFirestore(firebaseApp);
    const fishRecords = ref([]);
    const pagination = ref({page: 1, rowsPerPage: 10});
    const loadingFishRecords = ref(true);
    const size = 'md';

    const updatePagination = (val) => {
      pagination.value = val;
    };
    const columns = [
      {name: 'species', label: 'Species', align: 'left', field: 'species', sortable: true},
      {name: 'date', label: 'Date', align: 'left', field: 'date', sortable: true},
      {name: 'location', label: 'Location', align: 'left', field: 'location', sortable: true},
      {name: 'weight', label: 'Weight', align: 'left', field: 'weight', sortable: true},
      {name: 'length', label: 'Length', align: 'left', field: 'length', sortable: true},
    ];
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

    const fetchFishRecords = async () => {
      console.log(`Fetching fish records for friendId: ${props.friendId}`);

      try {
        loadingFishRecords.value = true;
        const fishCollection = collection(db, 'fish');
        const querySnapshot = await getDocs(query(fishCollection, where("userId", "==", props.friendId)));

        console.log(querySnapshot); // Add this line for debugging.

        const records = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
        fishRecords.value = records;

        console.log('Fish records fetched successfully.');
      } catch (error) {
        console.error('Error fetching fish records: ', error);
      } finally {
        loadingFishRecords.value = false;
      }
    };

    const viewFishingLog = (id) => {
      console.log('Friend\'s Id:', id); // Debug line
      emit('view-log', id);
    };
    watch(() => props.friendId, (newValue) => {
      if (newValue) {
        fetchFishRecords();
      }
    }, { immediate: true });


    return {
      fishRecords,
      columns,
      pagination,
      updatePagination,
      customSort,
      loadingFishRecords,
      size,
    };
  },
});
</script>
<style scoped>

.my-table {
  padding: 20px;
  margin-top: 120px;
  margin-bottom: 60px;
  margin-left: 60px;
  margin-right: 60px;
}
.title {
  color: white;
  font-size: 40px;
  font-family: "Bebas Neue", Serif;

  background-color: #1D4E4F;
  border-radius: 3px;
  width: 100%;
  text-align: center;
  padding-top:10px;
  padding-bottom:10px;
}
.flex-center-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
}
.my-table{
  font-family: "Bebas Neue", Serif;
}
.q-page{
  background-color: #327576;
}
q.button{
  background-color:#327576;
  color: #327576;
}
</style>
