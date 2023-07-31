<template>
  <!--design the post blah blah here.-->
  <section id="my-chats">
    <div class="page-header-main">
      <h4>Chats</h4>
      <p>
        Connect with like minded individuals.
        <span @click="openFollowModal()" class="mcp-new-chat-link pointercursor"
          >Start a new Chat</span
        >
      </p>
    </div>
    <vs-divider></vs-divider>
    <div class="chat-contents">
      <div v-if="chatHistory.length == 0">
        <p>You don't have any chats.</p>
      </div>
      <div class="chat-cc-container" v-if="myChats.length !== 0 && !noshow">
        <div
          v-for="chat in myChats"
          :key="chat.user"
          @click="goToChat(chat.user, chat.username, chat.imgLink)"
          class="chat-cc-item"
        >
          <div class="chat-cc-avatar-container">
            <vs-avatar
              v-if="chat.imgLink !== ''"
              size="70px"
              :src="chat.imgLink"
            />
            <vs-avatar
              v-if="chat.imgLink == ''"
              size="70px"
              :text="chat.username"
              color="black"
            />
            <span class="online-indicator"></span>
          </div>
          <div class="chat-cc-details-container">
            <p class="chat-cc-name">{{ chat.username }}</p>
            <p
              class="chat-cc-msg"
              :class="{
                'last-msg-style':
                  chat.lastMsgSentBy !== MID && chat.unreadMsgCount > 0,
              }"
            >
              {{ chat.lastMsg }}
            </p>
          </div>
          <div class="chat-cc-info-container">
            <p
              class="chat-cci-count last-msg-style"
              v-if="chat.lastMsgSentBy !== MID && chat.unreadMsgCount > 0"
            >
              <span>{{ chat.unreadMsgCount }}</span>
            </p>
            <p class="chat-cci-time">{{ extractTime(chat.lastTimeActive) }}</p>
          </div>
        </div>
      </div>
    </div>
    <modal
      name="follow-modal"
      :adaptive="true"
      height="auto"
      :max-width="maxWidth"
      width="90%"
    >
      <div class="start-chat-main">
        <div class="scm-header">
          <p>Following</p>
        </div>
        <div class="scm-content">
          <p v-if="userFollowing.length == 0">You are not following anyone</p>
          <div
            class="scm-user-container"
            v-for="user in userFollowing"
            :key="user.user"
          >
            <div class="scm-user-avater">
              <vs-avatar
                v-if="user.imgLink == ''"
                size="45px"
                :text="user.username"
              />
              <vs-avatar
                v-if="user.imgLink !== ''"
                size="45px"
                :src="user.imgLink"
              />
            </div>
            <div class="scm-username">
              {{ user.username }}
            </div>
            <div class="scm-send-message-container">
              <vs-button
                color="#1e87f0"
                type="filled"
                @click="goToChat(user.user, user.username, user.imgLink)"
                >Message</vs-button
              >
            </div>
          </div>
        </div>
        <div class="scm-header">
          <p>Followers</p>
        </div>
        <div class="scm-content">
          <p v-if="userFollowers.length == 0">
            You do not have any followers yet.
          </p>
          <div
            class="scm-user-container"
            v-for="user in userFollowers"
            :key="user.user"
          >
            <div class="scm-user-avater">
              <vs-avatar
                v-if="user.imgLink == ''"
                size="45px"
                :text="user.username"
              />
              <vs-avatar
                v-if="user.imgLink !== ''"
                size="45px"
                :src="user.imgLink"
              />
            </div>
            <div class="scm-username">
              {{ user.username }}
            </div>
            <div class="scm-send-message-container">
              <vs-button
                color="#1e87f0"
                type="filled"
                @click="goToChat(user.user, user.username, user.imgLink)"
                >Message</vs-button
              >
            </div>
          </div>
        </div>
      </div>
    </modal>
  </section>
</template>

<script>
export default {
  data: function () {
    return {
      MID: JSON.parse(window.localStorage.getItem("userlogindata")).MID,
      DID: JSON.parse(window.localStorage.getItem("userlogindata")).DID,
      maxWidth: 480,
      maxHeight: 550,
      myChats: [],
      noshow: false,
    };
  },
  computed: {
    chatsig: function () {
      return this.$store.state.historyChangeSignal;
    },
    chatHistory: function () {
      return this.$store.state.chatHistory;
    },
    userFollowing: function () {
      let following = this.$store.state.userFollowing;
      let sorted = [];
      for (let each of following) {
        if (each) {
          sorted.push(each);
        }
      }
      return sorted;
    },
    userFollowers: function () {
      let followers = this.$store.state.userFollowers;
      let sorted = [];
      for (let each of followers) {
        if (each) {
          sorted.push(each);
        }
      }
      return sorted;
    },
    lastMsg: function () {},
  },
  methods: {
    updatemychats() {
      function sortG(arr, output) {
        if (arr.length == 0) {
          return output;
        }
        let greatest = findGreatest(arr);
        let timeStamp = greatest.lastTimeActive;
        output.push(greatest);
        arr = arr.filter((x) => x.lastTimeActive !== timeStamp);
        return sortG(arr, output);
      }
      function findGreatest(arr) {
        let g = -Infinity;
        let eachU;
        for (let each of arr) {
          if (each.lastTimeActive > g) {
            g = each.lastTimeActive;
            eachU = each;
          }
        }
        return eachU;
      }
      let myChats = this.$store.state.chatHistory;
      let detached = Array.from(myChats);
      console.log("greatest from detached ", findGreatest(detached), detached);
      console.log("sorted-g", sortG(detached, []));
      this.myChats = sortG(detached, []);
      this.$store.commit("reformatHCS");
    },
    extractTime(stamp) {
      let time = String(new Date(stamp)).split(" ").splice(4, 1)[0].split(":");
      let prefix = time[0] > 12 ? "pm" : "am";
      return time[0] + ":" + time[1] + prefix;
    },
    goToChat(user, username, img) {
      this.$router.push({
        path: "/chat",
        query: {
          user,
          username,
          imgLink: img,
        },
      });
    },
    openFollowModal() {
      this.$modal.show("follow-modal");
    },
    fetchChatHistory() {
      this.$vs.loading();
      let url = "http://localhost/fetch-my-chats/";
      window.axios
        .get(url, {
          params: {
            MID: this.MID,
            DID: this.DID,
          },
        })
        .then((response) => {
          this.$vs.loading.close();
          if (response.data.status == "success") {
            console.log("fetched chat history ", response.data.chatHistory);
            this.$store.commit("initchathistory", response.data.chatHistory);
          } else {
            console.log("nothing to update with in chat history");
          }
        })
        .catch((error) => {
          this.$vs.loading.close();
          console.error(error.message);
        });
    },
  },
  created: function () {
    if (this.chatHistory == "failed") {
      this.fetchChatHistory();
    } else {
      this.updatemychats();
    }
  },
  watch: {
    chatsig(newVal, oldVal) {
      console.log("new Val detected for chat history", newVal);
      if (newVal !== "") {
        this.updatemychats();
        this.noshow = true;
        setTimeout(() => {
          this.noshow = false;
        }, 10);
      } else {
        console.log("idle history update");
      }
    },
  },
};
</script>

<style lang="scss">
#my-chats {
  padding: 10px;
  padding-bottom: 70px;
}
.chat-cc-item {
  width: 100%;
  background: white;
  box-shadow: 0px 0px 10px #cbe0ff;
  border-radius: 10px;
  padding: 10px 10px 7px 10px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.chat-cc-details-container {
  flex: 1;
}
.chat-cc-avatar-container,
.chat-cc-info-container {
  width: max-content;
}
.online-indicator {
  width: 10px;
  height: 10px;
  border-radius: 20px;
  background: rgb(73, 252, 94);
  position: absolute;
  margin-top: 62px;
  margin-left: -20px;
}
.chat-cc-name {
  font-weight: 600;
  font-size: 90%;
}
.chat-cci-count span {
  padding: 2px 6px 1px 6px;
  box-shadow: 0px 0px 10px #6a8eb2;
  border-radius: 10px;
}
.chat-cci-count {
  text-align: center;
}

.chat-cci-time {
  font-weight: 600;
  font-size: 90%;
  padding-top: 5px;
  color: #4c4c4c;
}
.mcp-new-chat-link {
  font-weight: 600;
  color: #3183d6;
}
.start-chat-main {
  padding: 10px;
  max-height: 650px;
  overflow-y: scroll;
}
.scm-header {
  font-family: highgate-bold;
  font-size: 150%;
}
.scm-content {
  margin-bottom: 30px;
}
.scm-user-container {
  display: flex;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #cbe0ff;
  margin-top: 15px;
}
.scm-username {
  flex: 1;
  font-weight: 600;
}
.scm-user-avater,
.scm-send-message-container {
  width: max-content;
  padding: 5px;
}
.scm-send-message-container {
  padding-right: 15px;
}
.last-msg-style {
  font-weight: 600;
}
.chat-cc-msg {
  font-size: 90%;
}
</style>
