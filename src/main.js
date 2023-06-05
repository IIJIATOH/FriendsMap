import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import BaseCircle from "./components/BaseCircle.vue";
import { v4 as uuidv4 } from "uuid";
import { createRouter, createWebHistory } from "vue-router";
import FriendInfo from "./components/FriendInfo.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/products"
    },
    {
      path: "/priducts"
    },
    {
      path: "/friendForm",
      component: FriendInfo,
      // Get confirm from user before leave form
      beforeLeave(to, from, next) {
        const answer = window.confirm(
          "Вы хотите уйти? У вас есть несохранённые изменения!"
        );
        if (answer) {
          next();
        } else {
          next(false);
        }
      }
    }
  ]
});

const store = createStore({
  state() {
    return {
      selectedFriend: undefined,
      friends: [
        { key: 1, name: "boba", place: "Home", contact: "79128" },
        { key: 2, name: "boobas", place: "Home2", contact: "79128231" }
      ]
    };
  },
  mutations: {
    addFriend(state, friend) {
      state.friends.push({
        key: uuidv4(),
        name: friend.name,
        place: friend.place,
        contact: friend.contact
      });
    },
    changeFriendInfo(state, editFriend) {
      let friendIndx = state.friends.findIndex(
        (frd) => frd.key === editFriend.key
      );
      state.friends[friendIndx] = editFriend;
      state.friends[friendIndx].contact = editFriend.contact;
      state.friends[friendIndx].place = editFriend.place;
    },
    selectFriend(context, friend) {
      context.selectedFriend = friend;
    }
  },
  getters: {
    friendsGet(state) {
      return state.friends;
    },
    selectedFriendGet(state) {
      return state.selectedFriend;
    }
  },
  actions: {
    changeFriendInfo(context, editFriend) {
      context.commit("changeFriendInfo", editFriend);
    },
    selectFriend(context, friend) {
      context.commit("selectFriend", friend);
    },
    addFriend(context, friend) {
      context.commit("addFriend", friend);
    }
  }
});

const app = createApp(App);
app.use(store);
app.use(router);
app.component("base-circle", BaseCircle);

app.mount("#app");
