<template>
  <section id="chat-messenger-page">
    <section class="cm-header">
      <div class="cm-header-container">
        <div class="cm-header-avartar-container">
          <div class="chat-cc-avatar-container">
            <vs-avatar v-if="img !== ''" size="40px" :src="img" />
            <vs-avatar
              v-if="img == ''"
              size="40px"
              :text="username"
              color="black"
            />
            <span v-if="!chatinit" class="online-indicator-ic"></span>
          </div>
        </div>
        <div class="chat-name-details-container">
          <div>
            <p class="ccd-name">{{ username }}</p>
            <p v-if="!chatinit" class="ccd-last-seen">online</p>
          </div>
        </div>
        <div class="cc-inchat-menu-container">
          <div class="cc-moc">
            <vs-button
              icon-pack="fas"
              :color="'rgb(100 178 255)'"
              type="border"
              icon="fa-ellipsis-v"
            ></vs-button>
          </div>
        </div>
      </div>
    </section>
    <section id="chat-container" class="cm-content">
      <div class="cm-content-container-main">
        <div class="cm-content-main">
          <div
            class="cm-chat-item-container"
            v-for="chatitem in chats"
            :key="chatitem.sent_time + chatitem.message"
          >
            <div
              :class="{
                'to-recipient': chatitem.sentBy == MID,
                'to-me': chatitem.sentBy !== MID,
              }"
              class="cm-chat-item"
            >
              <p>{{ chatitem.message }}</p>
            </div>
          </div>
        </div>
        <div id="chat-end"></div>
      </div>
    </section>

    <section class="cm-controls">
      <div class="cmc-text-input-container">
        <vs-input placeholder="Write a message" v-model="message" />
      </div>
      <div class="cmc-attachment-button-container">
        <form id="msg-file-container">
          <input
            name="msg-file"
            @change="imageUploaded"
            type="file"
            id="actual-btn"
            hidden
          />
        </form>
        <label class="inputlabel" for="actual-btn"
          ><i class="fas fa-file-upload"></i
        ></label>
      </div>
      <div class="cmc-send-button-container">
        <button @click="sendMessage()">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    </section>
  </section>
</template>
<script>
export default {
  data: function () {
    return {
      message: "",
      MID: JSON.parse(window.localStorage.getItem("userlogindata")).MID,
      DID: JSON.parse(window.localStorage.getItem("userlogindata")).DID,
      chats: [],
    };
  },
  computed: {
    username() {
      return this.$route.query.username;
    },
    img() {
      return this.$route.query.imgLink;
    },
    user() {
      return this.$route.query.user;
    },
    chatHistory: function () {
      return this.$store.state.chatHistory;
    },
    chatinit: function () {
      let init = true;
      for (let each of this.chatHistory) {
        if (each.user == this.user) {
          init = false;
          console.log("chat init", each);
          this.participantid = each.participantid;
        }
      }
      return init;
    },
    lastMsgSentBy: function () {
      let lastMsgSentBy = "";
      for (let each of this.chatHistory) {
        if (each.user == this.user) {
          lastMsgSentBy = each.lastMsgSentBy;
          console.log(each.lastMsgSentBy);
        }
      }
      return lastMsgSentBy;
    },
    participantid: {
      get: function () {
        let id = "";
        for (let each of this.chatHistory) {
          if (each.user == this.user) {
            id = each.participantid;
            console.log(each.participantid);
          }
        }
        return id;
      },
      set: function (val) {
        this.val = val;
      },
    },
    realTimeChat() {
      return this.$store.state.realtimeMessage;
    },
  },
  methods: {
    scrollToChatEnd() {
      let el = "#chat-end";
      let options = {
        container: "#chat-container",
        offset: 100,
      };
      setTimeout(() => {
        this.$scrollTo(el, 500, options);
        console.log("scrolling to chat end");
      }, 500);
    },
    updateChat(msg) {
      this.chats.push(msg);
      this.scrollToChatEnd();
    },
    imageUploaded(e) {
      let beb = document.getElementById("actual-btn");
      console.log("image upload event detected", e);
    },
    fetchMessages() {
      let url = `${this.$store.state.apiServer}/fetch-chat-details/`;
      window.axios
        .get(url, {
          params: {
            MID: this.MID,
            DID: this.DID,
            user: this.user,
          },
        })
        .then((response) => {
          if (response.data.status == "success") {
            console.log(response.data.chatDetails);
            let updateInitObject = {
              user: this.user,
              msgsInit: response.data.chatDetails,
            };
            this.$store.commit("initializemessages", updateInitObject);
            this.chats = response.data.chatDetails;
            if (this.MID !== this.lastMsgSentBy) {
              this.openChat();
            }
          } else {
          }
        })
        .catch((err) => {
          console.error(err.message);
        });
    },
    openChat() {
      let url = `${this.$store.state.apiServer}/open-chat/`;
      window.axios
        .get(url, {
          params: {
            MID: this.MID,
            DID: this.DID,
            user: this.user,
            participantid: this.participantid,
          },
        })
        .then((response) => {
          console.log("open chat", response.data);
        })
        .catch((err) => {
          console.error("in open chat", err.message);
        });
    },
    sendMessage() {
      if (
        this.message == "" &&
        document.getElementById("actual-btn").value == ""
      ) {
        console.log("No input or file");
      }
      let url = `${this.$store.state.apiServer}/send-chat-message/`;
      let formData = new FormData(
        document.getElementById("msg-file-container")
      );
      formData.append("MID", this.MID);
      formData.append("DID", this.DID);
      formData.append("user", this.user);
      formData.append("message", this.message);
      formData.append("newchat", this.chatinit);
      window.axios
        .post(url, formData, {
          "Content-Type": "multipart/form-data",
        })
        .then((response) => {
          if (response.data.status == "success") {
            console.log("sent-msg-response", response.data);
            if (this.chatinit) {
              let message = response.data.newMessage;
              this.partipantid = message.partipants;
              this.chats.push(message);
              //this.$store.commit("initializemessages", updateInitObject)
              let chatHistory = response.data.historyData;
              this.$store.commit("updatechathistory", chatHistory);
            } else {
              let updateMsgObj = {
                user: this.user,
                message: response.data.newMessage,
              };
              this.chats.push(updateMsgObj.message);
              this.scrollToChatEnd();
            }
          } else {
          }
          this.message = "";
        })
        .catch((error) => {});
    },
    updateChatHis(msg) {
      console.log("in updateChatHis s by me");
      let updateObj = {
        message: msg,
        sent_by: MID,
        sent_time: Date.now(),
        participantid: this.participantid,
      };
      console.log("store val", this.$store.state);
      this.$store.commit("historyupdatesentbyme", updateObj);
    },
  },
  created: function () {
    console.log(
      "from created ",
      this.$store.state.messages,
      this.$store.state.messages[this.user]
    );
    if (!this.chatinit) {
      console.log("fetching chat with this user", this.user);
      this.fetchMessages();
    }
    this.scrollToChatEnd();
  },
  watch: {
    realTimeChat(newVal, oldVal) {
      console.log(this.participantid);
      console.log(
        "new VAl ",
        newVal,
        newVal.participants == this.participantid,
        newVal.participants,
        this.partipantid
      );
      if (newVal.participants == this.participantid) {
        console.log("new chat from the present user");
        this.updateChat(newVal);
        this.$store.commit("updateRTM", {});
        this.openChat();
      }
    },
  },
};
</script>

<style lang="scss">
#chat-messenger-page {
  height: 84vh;
  display: flex;
  flex-direction: column;
}
.cm-header,
.cm-controls {
  height: max-content;
}
.cm-content {
  flex: 1;
  width: 97%;
  margin: 6px 1.5%;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #cbe0ff;
  overflow-y: scroll;
}
.cm-controls {
  display: flex;
  width: 97%;
  margin: 6px 1.5%;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #cbe0ff;
}
.cm-content::-webkit-scrollbar {
  width: 7px;
}
.cm-content::-webkit-scrollbar-track {
  background-color: #d6d6d6;
}
.cm-content::-webkit-scrollbar-thumb {
  background-color: #8ba4bd;
}

.cm-header {
  padding: 10px 5px 5px 5px;
}
@media (min-width: 768px) {
  #chat-messenger-page {
    height: 91.5vh;
  }
}
.cm-header-container {
  padding-top: 6px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #a2bfeb;
  background: #ffffff;
  display: flex;
  align-items: center;
}
.chat-cc-avatar-container {
  width: max-content;
}
.online-indicator-ic {
  width: 10px;
  height: 10px;
  border-radius: 20px;
  background: rgb(73, 252, 94);
  position: absolute;
  margin-top: 40px;
  margin-left: -20px;
}
.chat-name-details-container {
  flex: 1;
}
.cc-inchat-menu-container,
.cm-header-avartar-container {
  width: max-content;
}
.cc-inchat-menu-container {
  padding-right: 10px;
}
.ccd-name {
  font-weight: 600;
}
.ccd-last-seen {
  font-size: 90%;
}
.cc-moc {
  position: relative;
  bottom: 3px;
}
.cmc-text-input-container {
  flex: 1;
}
.cmc-attachment-button-container,
.cmc-send-button-container {
  width: max-content;
}
.cmc-send-button-container button {
  background-color: white;
  border-radius: 5px;
  margin-left: 5px;
  padding: 5px 7px 5px 5px;
  border: 1px solid #a4a4a4;
  box-shadow: 0px 0px 5px #8fa0b8;
  position: relative;
  top: 0.5px;
  color: #445b72;
}
.cm-controls .vs-con-input input {
  width: 100%;
}
.cm-controls .vs-con-input-label {
  width: 100% !important;
}
.inputlabel {
  background-color: #0d4b56;
  color: white;
  padding: 5px 7px 5px 7px;
  font-family: sans-serif;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
  position: relative;
  top: 4px;
  margin-left: 5px;
}
.cm-chat-item {
  padding: 5px;
  display: flex;
}
.cm-chat-item p {
  border-radius: 13px;
  padding: 4px 10px 4px 10px;
  border: 1px solid #a2bfeb;
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content;
  max-width: 70%;
}
.cm-chat-item.to-recipient {
  justify-content: flex-end;
}
.cm-chat-item.to-me {
}
</style>
