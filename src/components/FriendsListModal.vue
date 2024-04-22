<template>
  <q-dialog :model-value="showModal" @update:model-value="updateModal">
    <q-card class="card-style">
      <q-card-section>
        <div class="text-h6 title-style" id="title">Fishing Buddies</div>

        <div class="q-gutter-md list-section">
          <q-chip
            class="friend-item"
            v-for="friend in friends"
            :key="friend.id"
            removable
            @remove="removeFriend(friend)"
          >
            <span class="friend-name">{{ friend.username }} (ID: {{ friend.friendId }})</span> <!-- Debug line -->
            <q-btn outline color="primary" dense class="custom-view-btn" @click.stop="viewFishingLog(friend.friendId)">
              <q-icon name="remove_red_eye" size="1em" class="icon-style"/>
              <span class="view-button-text"> View Fishing Log </span>
            </q-btn>
          </q-chip>
        </div>

        <hr class="separator">

        <div class="add-friend-section">
          <div class="text-h5">Add New Friend</div>
          <q-input class="q-mt-md" filled v-model="friendEmail" label="Enter friend's email"/>
          <div v-if="errorMessage" class="text-negative q-mt-sm">{{ errorMessage }}</div>
          <q-btn class="q-mt-md" label="Verify Email" color="primary" @click="verifyFriendEmail"/>
          <div v-if="potentialFriend" class="q-mt-md potential-friend-section">
            Would you like to add: {{ potentialFriend.username }}
            <q-btn class="q-mt-sm" label="yes" color="#327576" @click="addFriend"/>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn flat padded label="Close" color="primary" class="close-button" @click="closeModal"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>


<script>
import {db, auth} from '../boot/firebase';
import {collection, doc, getDocs, query, where, addDoc} from 'firebase/firestore';
import { deleteDoc } from 'firebase/firestore';
export default {
  name: 'FriendsListModal',
  props: {
    showModal: Boolean
  },
  data() {
    return {
      friendEmail: '',
      friends: [],
      potentialFriend: null,
      errorMessage: null,
    };
  },
  mounted() {
    this.fetchFriends();
  },
  methods: {

    async verifyFriend() {
      const emailToSearchFor = this.friendEmail.trim();
      const targetUserSnapshot = await getDocs(query(collection(db, 'users'), where('email', '==', emailToSearchFor)));

      if (!targetUserSnapshot.empty) {
        let friendData = targetUserSnapshot.docs[0].data();
        if (!friendData.email) {
          friendData.email = emailToSearchFor;
        }
        this.potentialFriend = friendData;
      } else {
        this.potentialFriend = null; // no user found with that email
        console.log(`User not found with the provided email: ${emailToSearchFor}`);
      }
    },
    viewFishingLog(id) {
      console.log(id); // Debug
      if(!id) {
        console.error('Error: no id passed to viewFishingLog function');
        return;
      }
      console.log('Friend\'s Id:', id); // Debug line
      this.$router.push({ name: 'friend-log', params: { friendId: id } });
    },

    async verifyFriendEmail() {
      const emailToSearchFor = this.friendEmail.trim();
      const targetUserSnapshot = await getDocs(query(collection(db, 'users'), where('email', '==', emailToSearchFor)));

      if (!targetUserSnapshot.empty) {
        let friendData = targetUserSnapshot.docs[0].data();
        friendData.friendId = targetUserSnapshot.docs[0].id;

        if (!friendData.email) {
          friendData.email = emailToSearchFor;
        }
        this.potentialFriend = friendData;
        this.errorMessage = null;
      } else {
        this.potentialFriend = null;
        this.errorMessage = `User not found with the provided email: ${emailToSearchFor}`;
      }
    },


    async addFriend() {
      if (this.potentialFriend) {
        const uid = auth.currentUser.uid;
        const userFriendsCollection = collection(db, `users/${uid}/friends`);
        const docRef = await addDoc(userFriendsCollection, this.potentialFriend);

        this.friends.push({ id: docRef.id, ...this.potentialFriend }); // Include id in local list

        this.friendEmail = ''; // Reset the input field
        this.potentialFriend = null; // Reset potential friend
      } else {
        console.log("No User has been verified with the provided email.");
      }
    },


    updateModal(value) {
      this.$emit('update:showModal', value);
    },

    closeModal() {
      this.updateModal(false);
    },

    async fetchFriends() {
      const uid = auth.currentUser.uid;
      const userFriendsSnapshot = await getDocs(collection(db, `users/${uid}/friends`));

      this.friends = userFriendsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(friend => friend !== undefined && friend.username !== 'initial');

      console.log(this.friends); // Debug - to verify if id exists now
    },

async removeFriend(friend) {
  if (confirm(`Are you sure you want to delete ${friend.username}?`)) {
    // Remove friend from the database
    const uid = auth.currentUser.uid;
    const userFriendsCollection = collection(db, `users/${uid}/friends`);
    const friendSnap = await getDocs(query(userFriendsCollection, where('email', '==', friend.email)));
    if (!friendSnap.empty) {
      const friendDocId = friendSnap.docs[0].id;
      await deleteDoc(doc(db, `users/${uid}/friends/${friendDocId}`));

      // Remove friend locally
      this.friends = this.friends.filter(f => f.email !== friend.email);
    }
  }
}
}
};
</script>

<!-- Style stays the same -->
<style scoped>
.card-style {
  width: 600px;
  background: #fafafa;
  border-radius: 15px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
}

.title-style {
  background-color: #143D56;
  color: #fff;
  padding: 20px;
  font-family: "Arial", sans-serif;
  font-size: 1.5rem;
  text-align: center;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.friend-item {
  padding: 10px;
  border-radius: 15px;
  margin: 10px 0;
  align-items: center;
  justify-content: space-between;
  display: flex;
  height: 50px;
  background: #fff;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.05);
}

.friend-name {
  font-size: 1.125rem;
  font-weight: 600;
}

.list-section,
.add-friend-section {
  margin-top: 20px;
}

.separator {
  margin: 20px 0;
  border-top: 2px solid #f0f0f0;
}

.potential-friend-section {
  margin-top: 10px;
}

.close-button {
  padding: 5px 20px;
  font-weight: 600;
}

.q-card__section {
  padding: 0px;
}

div.q-gutter-md:nth-child(2) {
  margin-left: 12px;
  margin-right: 12px;
}

.custom-view-btn {
  border-radius: 5px;
  margin-left: 10px;

}

.icon-style {
  color: #327576;
  margin-right: 5px;
}

.view-button-text {
  color: #327576;
}


.add-friend-section {
  margin-left: 20px;
  margin-right: 20px;
}

</style>
