<template>
  <container>
    <div>
      <label for="name">Имя</label>
      <input type="text" placeholder="Имя" v-model="editFriend.name" />
    </div>
    <div>
      <label for="name">Место встречи</label>
      <input
        type="text"
        placeholder="Место встречи"
        v-model="editFriend.place"
      />
    </div>
    <div>
      <label for="name">Контакты</label>
      <input type="text" placeholder="Контакты" v-model="editFriend.contact" />
    </div>
    <button @click="addFriend(editFriend)">AddFriend</button>
    <button @click="changeFriendInfo(editFriend)">ChangeFriend</button>
  </container>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      editFriend: {
        name: null,
        place: null,
        contact: null,
        key: null
      }
    };
  },
  props: ["friend"],
  methods: {
    ...mapActions({
      changeFriendInfo: "changeFriendInfo",
      addFriend: "addFriend"
    })
  },
  mounted() {
    this.editFriend.name = this.friend.name;
    this.editFriend.place = this.friend.place;
    this.editFriend.contact = this.friend.contact;
    this.editFriend.key = this.friend.key;
  },
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm(
      "Вы хотите уйти? У вас есть несохранённые изменения!"
    );
    console.log("leave");
    if (answer) {
      next();
    } else {
      next(false);
    }
  }
};
</script>
<style scoped>
container {
  background: red;
  position: absolute;
  width: 40vw;
  height: 100vh;
  top: 0;
  right: 0;
}
</style>
