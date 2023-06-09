<template>
  <form @submit.prevent="submit" action="">
    <div>
      <avatar-input ref="avatar" v-model="editFriend.avatarUrl"></avatar-input>
    </div>
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
  </form>
</template>
<script>
import AvatarInput from "./AvatarInput.vue";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      editFriend: {
        name: null,
        place: null,
        contact: null,
        key: null,
        avatarUrl: null
      }
    };
  },
  components: { AvatarInput },
  props: ["friend"],
  methods: {
    ...mapActions({
      changeFriendInfo: "changeFriendInfo",
      addFriend: "addFriend"
    }),
    submit() {
      console.log("submitting", this.form);
    }
  },
  mounted() {
    this.editFriend.name = this.friend.name;
    this.editFriend.place = this.friend.place;
    this.editFriend.contact = this.friend.contact;
    this.editFriend.key = this.friend.key;
    this.editFriend.avatarUrl = this.friend.avatarUrl;
    setTimeout(() => {
      this.$refs.avatar.check();
    }, 500);
    console.log("mounted");
  },
  beforeRouteLeave(to, from, next) {
    // Take state.friend
    let friendIndx = this.$store.state.friends.findIndex(
      (frd) => frd.key === this.editFriend.key
    );
    this.$store.state.friends[friendIndx];
    // One level compare new state of friend and old state
    if (
      Object.keys({
        ...this.editFriend,
        ...this.$store.state.friends[friendIndx]
      }).every(
        (key) =>
          this.editFriend[key] === this.$store.state.friends[friendIndx][key]
      )
    ) {
      next(true);
    } else {
      const answer = window.confirm(
        "Вы хотите уйти? У вас есть несохранённые изменения!"
      );
      next(answer);
    }
  }
};
</script>
<style scoped>
form {
  background: red;
  position: absolute;
  width: 40vw;
  height: 100vh;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
