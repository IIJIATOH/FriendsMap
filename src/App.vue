<template>
  <base-circle>
    <add-friend v-for="friend in friends" :key="friend.key"
      ><router-link @click="selectFriend(friend)" to="/friendForm"
        >Plus</router-link
      ></add-friend
    ></base-circle
  >

  <router-link
    class="leaveForm"
    v-if="$route.path === '/friendForm'"
    to="/"
  ></router-link>
  <router-link v-if="$route.path === '/products'" to="/friendForm"
    >PIPA</router-link
  >
  <router-view :friend="selectedFriend"></router-view>
</template>

<script>
import AddFriend from "./components/AddFriend.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    AddFriend
  },
  computed: {
    ...mapGetters({
      friends: "friendsGet",
      selectedFriend: "selectedFriendGet"
    })
  },
  methods: {
    ...mapActions({
      selectFriend: "selectFriend"
    })
  }
};
</script>

<style>
.leaveForm {
  position: absolute;
  display: block;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
