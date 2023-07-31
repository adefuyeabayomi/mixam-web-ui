<template>
  <div id="app" v-bind:class="{ appstyle: $store.state.userLoggedIn }">
    <app-topbar></app-topbar>
    <app-menu v-if="$store.state.menuOpen"></app-menu>
    <section
      :class="{hidden: $store.state.menuOpen}"
      class="app-layout-container"
    >
      <div v-if="$store.state.userLoggedIn" class="app-sidebar-left">
        <div class="sidebar-content-left">
          <options-sidebar></options-sidebar>
        </div>
      </div>
      <div class="page-container main">
        <router-view />
      </div>
      <div v-if="$store.state.userLoggedIn" class="app-sidebar-right">
        <div class="sidebar-content-right">
          <activities></activities>
        </div>
      </div>
    </section>
    <!--utils for the site terms and condition modal, privacy modal-->
    <welcome></welcome>
    <app-login></app-login>
    <app-signup></app-signup>
    <app-forgotpassword></app-forgotpassword>
    <verify-master></verify-master>
  </div>
</template>
<script
  async
  src="https://platform.twitter.com/widgets.js"
  charset="utf-8"
></script>
<script>
function getUnique(arr) {
  let uniqueArr = [];

  // loop through array
  for (let i of arr) {
    if (uniqueArr.indexOf(i) === -1) {
      uniqueArr.push(i);
    }
  }
  return uniqueArr;
}
import appTopbar from "./components/app-topbar.vue";
import appLogin from "./components/app-login.vue";
import appSignup from "./components/app-signup.vue";
import appForgotpassword from "./components/forgot-password.vue";
import appMenu from "./components/app-menu.vue";
import welcome from "./components/welcome-profilebuilder.vue";
import optionsSidebar from "./components/options-sidebar.vue";
import activities from "./components/activities-sidebar.vue";
import verifyMaster from "./components/verify-master.vue";

export default {
  data() {
    return {
      name: "app",
      MID: JSON.parse(window.localStorage.getItem("userlogindata")).MID,
      DID: JSON.parse(window.localStorage.getItem("userlogindata")).DID,
    };
  },
  computed: {
    userLoggedIn() {
      return this.$store.state.userLoggedIn;
    },
    deviceInfo() {
      return this.$store.state.deviceInformation;
    },
  },
  methods: {
    initializeSocket() {
      if (window.localStorage.getItem("userlogindata")) {
        let MID = JSON.parse(window.localStorage.getItem("userlogindata")).MID;
        let DID = JSON.parse(window.localStorage.getItem("userlogindata")).DID;
        let socketUrl = `ws://${window.location.host}/realtime-data/?MID=${MID}&DID=${DID}`;
        let realtimeData;
        // user following observer - realtime is on this socket

        realtimeData = new WebSocket(socketUrl);
        window.realtimeData = realtimeData;
        realtimeData.onopen = (e) => {
          console.log("[open] Connection established");
          console.log("Sending to server");
          console.log("notification socket", realtimeData);
          realtimeData.send("My name is john");
          realtimeData.onmessage = (e) => {
            let newData = JSON.parse(e.data);
            this.handleRealTimeData(newData);
          };
          realtimeData.onerror = (err) => {
            console.log("error occured in the socket", err);
          };
          realtimeData.onclose = (e) => {
            if (e.wasClean) {
              console.log("realtimeData closed by client", e.code, e.reason);
              setTimeout(() => {
                this.initializeSocket();
                console.log(
                  "ATTEMPTING TO RE_ESTABLISH SOCKET CONNECTION, PLEASE WAIT"
                );
              }, 4000);
            } else {
              console.log("realtimeData closed by server", e.code, e.reason);
              setTimeout(() => {
                this.initializeSocket();
                console.log(
                  "ATTEMPTING TO RE_ESTABLISH SOCKET CONNECTION, PLEASE WAIT"
                );
              }, 4000);
            }
          };
        };
      }
    },
    fetchChatHistory() {
      let url = "http://${window.location.host}/fetch-my-chats/";
      window.axios
        .get(url, {
          params: {
            MID: this.MID,
            DID: this.DID,
          },
        })
        .then((response) => {
          if (response.data.status == "success") {
            console.log("chathistory-response", response.data);
            this.$store.commit("initchathistory", response.data.chatHistory);
          } else {
            this.$store.commit("updatechathistory", "failed");
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
    },
    closeLogin: function () {
      this.$store.commit("closelogin");
    },
    closeSignup: function () {
      this.$store.commit("closesignuup");
    },
    openForgotPassword: function () {
      this.$store.commit("openforgotpassword");
    },
    closeForgotPassword: function () {
      this.$store.commit("closeforgotpassword");
    },
    fetchNotifications: function () {
      let url = "http://${window.location.host}/fetch-notifications/";
      window.axios
        .get(url, {
          params: {
            MID: JSON.parse(window.localStorage.getItem("userlogindata")).MID,
            DID: JSON.parse(window.localStorage.getItem("userlogindata")).DID,
            userAgent: this.userAgent,
          },
        })
        .then((response) => {
          console.log(
            "user notification response ",
            response.data.userNotifications.notifications
          );
          this.$store.commit(
            "updatenotifications",
            response.data.userNotifications.notifications
          );
        })
        .catch((err) => {
          console.error("Error Fetching Notifications : ", err.message);
        });
    },
    handleRealTimeData: function (data) {
      console.log("handling new Data here : ", data);
      if (data.type == "notification") {
        let date = String(new Date(data.data.created))
          .split(" ")
          .slice(0, 4)
          .join(" ");
        console.log("new notification", date);
        data.data.date = date;
        this.$store.commit("addnewnotification", data.data);
      } else if (data.type == "new-chat") {
        this.$store.commit("updatechathistory", data.data.chatHistoryObjUser);
        this.$vs.notify({
          title: "New Chat Message : Just now",
          color: "dark",
        });
      } else if (data.type == "new-chat-message") {
        this.$store.commit("updateRTM", data.data);
      } else if (data.type == "history-update") {
        this.$store.commit("historyupdate", data.data.chatHistory);
      }
    },
    verifyCheck: function () {
      console.log("starting the verification check");
      let info = this.deviceInfo;
      if (info.master) {
        if (!info.verified) {
          let welcomeDone = this.$store.state.userAccountInfo.welcomeProgress;
          if (welcomeDone == "done") {
            console.log("not-verified and welcome is done");
            setTimeout(() => {
              this.$modal.show("verify-account");
              setInterval(() => {
                this.$modal.show("verify-account");
                console.log(
                  "go and verify your account mister man or who ever you are. Mcheww"
                );
              }, 500000);
            }, 60000);
          }
        } else {
          console.log("master is verified");
        }
      }
    },
    followers_following() {
      let retArr = [];
      let userFollowing = this.$store.state.userFollowing;
      let userFollowers = this.$store.state.userFollowers;
      for (let each of userFollowing) {
        if (each) {
          retArr.push(each.user);
        }
      }
      for (let each of userFollowers) {
        if (each) {
          retArr.push(each.user);
        }
      }
      console.log(
        "user folowers and followeing",
        retArr,
        userFollowing,
        userFollowers
      );
      return getUnique(retArr);
    },
    fetchUpdatedUserData() {
      console.log("followers_following", this.followers_following());
      if (this.followers_following().length > 0) {
        console.log("not added ", this.followers_following());
        let url = "http://${window.location.host}/fetch-users-updated/";
        window.axios
          .get(url, {
            params: {
              users: JSON.stringify(this.followers_following()),
            },
          })
          .then((response) => {
            console.log("fetched user response", response.data);
            return response.data.sorted;
          })
          .then((sorted) => {
            this.$store.commit("updateuserbase", sorted);
          })
          .catch((error) => {
            console.error(error.message);
          });
      }
    },
  },

  created() {
    // create a vue plugin to use the socket.
    window.appStore = this.$store;
  },
  watch: {
    userLoggedIn(old, newVal) {
      console.log("from app.vue userLoggedIn changed fetching notifications.");
      this.fetchNotifications();
      this.fetchChatHistory();
      this.fetchUpdatedUserData();
      let userInfo = this.$store.state.userAccountInfo;
      let welcomeComplete = userInfo.welcomeDataComplete;
      console.log("userInfo", userInfo);
      if (!welcomeComplete && userInfo.welcomeDataComplete !== undefined) {
        console.log(
          "welcome has not been complete, opening the profile builder",
          welcomeComplete
        );
        this.$store.commit("updateprofilebuilder", true);
      }
      this.initializeSocket();
      // check if welcomeData Complete is true if yes do nothing  else open welcome profile builder
    },
    deviceInfo(old, newVal) {
      this.verifyCheck();
    },
  },
  components: {
    appTopbar,
    appLogin,
    appSignup,
    appForgotpassword,
    appMenu,
    welcome,
    optionsSidebar,
    activities,
    verifyMaster,
  },
};
</script>

<style lang="scss">
@import "../public/main.scss";

.sidebar-content-left,
.sidebar-content-right {
  position: fixed;
  width: 27%;
  left: 2%;
  height: -webkit-fill-available;
  background: #7dbeff;
}
.page-container {
  position: absolute;
  margin-top: 60px;
  z-index: 0;
}
@font-face {
  font-family: "junegull";
  src: url("./assets/fonts/junegull.ttf");
}
@font-face {
  font-family: "signika-bold";
  src: url("./assets/fonts/Signika-Bold.ttf");
}
@font-face {
  font-family: "signika-light";
  src: url("./assets/fonts/Signika-Light.ttf");
}
@font-face {
  font-family: "signika-regular";
  src: url("./assets/fonts/Signika-Regular.ttf");
}
@font-face {
  font-family: "signika-semibold";
  src: url("./assets/fonts/Signika-Semibold.ttf");
}
@font-face {
  font-family: "Montserrat-Black";
  src: url("./assets/fonts/Montserrat/Montserrat-Black.ttf");
}
@font-face {
  font-family: "Montserrat-Bold";
  src: url("./assets/fonts/Montserrat/Montserrat-Bold.ttf");
}
@font-face {
  font-family: "Montserrat-Medium.";
  src: url("./assets/fonts/Montserrat/Montserrat-Medium.ttf");
}
@font-face {
  font-family: "Montserrat-Regular";
  src: url("./assets/fonts/Montserrat/Montserrat-Regular.ttf");
}
@font-face {
  font-family: "Montserrat-Light";
  src: url("./assets/fonts/Montserrat/Montserrat-Light.ttf");
}
@font-face {
  font-family: "Antipasto-Regular";
  src: url("./assets/fonts/antipasto/AntipastoPro-Medium_trial.ttf");
}
@font-face {
  font-family: "Atipasto-Semibold";
  src: url("./assets/fonts/antipasto/AntipastoPro-DemiBold_trial.ttf");
}
@font-face {
  font-family: "Antipasto-Bold";
  src: url("./assets/fonts/antipasto/AntipastoPro-Bold_trial.ttf");
}
@font-face {
  font-family: "highgate-light";
  src: url("./assets/fonts/highgate-trial-cufonfonts/Highgate_Trial_Lt.ttf");
}
@font-face {
  font-family: "highgate-regular";
  src: url("./assets/fonts/highgate-trial-cufonfonts/Highgate_Trial_Rg.ttf");
}
@font-face {
  font-family: "highgate-medium";
  src: url("./assets/fonts/highgate-trial-cufonfonts/Highgate_Trial_Md.ttf");
}
@font-face {
  font-family: "highgate-bold";
  src: url("./assets/fonts/highgate-trial-cufonfonts/Highgate_Trial_Bd.ttf");
}
p {
  margin-bottom: 0px !important;
  margin-top: 0px !important;
}
.mock button {
  display: block;
  margin: 10px auto;
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background-color: rgb(176, 176, 176);
}
::-webkit-scrollbar-thumb {
  background-color: rgb(59, 61, 62);
  border-radius: 20px;
  background-clip: content-box;
}
::-webkit-scrollbar-thumb:hover {
  box-shadow: 0px 0px 2px gray;
}
p {
  width: 100%;
}
.app-layout-container {
  position: absolute;
}
body {
  overflow-x: hidden;
  height: 100vh;
  overflow-y: scroll;
}
.row {
  margin: 0px !important;
}
.tight {
  margin: 0px !important;
  padding: 0px !important;
}
.appstyle {
  height: max-content;
}
.app-sidebar-left {
}
.appstyle .page-container {
  margin-top: 60px;
}
.hidden {
  display: none !important;
}
button:hover {
  cursor: pointer;
}
.pointercursor:hover {
  cursor: pointer;
}
@media (max-width: 1024px) {
  .app-layout-container {
    display: flex;
  }
  .app-sidebar-left {
    flex: 2;
    height: 100vh;
    padding: 75px 15px 15px 15px;
  }
  .app-sidebar-right {
    display: none;
    position: absolute;
    height: 100vh;
    padding: 75px 15px 15px 15px;
  }
  .appstyle .page-container {
    margin-top: 0px;
    padding-top: 60px;
    position: static;
    flex: 5;
    height: max-content;
  }
  .sidebar-content-right,
  .sidebar-content-left {
    background: #7dbeff;
    border-radius: 5px;
    height: -webkit-fill-available;
  }
}
@media (max-width: 768px) {
  .appstyle .page-container {
    margin-top: 0px;
  }
  .app-layout-container {
    display: block;
  }
  .app-sidebar-left {
    z-index: 10;
    height: 50px;
    padding: 5px;
    position: fixed;
    bottom: 0px;
    background: rgba(255, 255, 255, 0.5);
    border-top: 3px solid #e2e2e2;
    box-shadow: 0px 0px 3px #e2e2e2;
  }
  .sidebar-content-left {
    background: transparent;
  }
  .page-container {
    border: 0px solid;
  }
}
@media (min-width: 1024px) {
  .app-layout-container {
    display: flex;
  }
  .app-sidebar-left {
    flex: 2;
    height: 100vh;
    padding: 75px 15px 15px 15px;
  }
  .app-sidebar-right {
    flex: 2;
    height: 100vh;
    padding: 75px 15px 15px 15px;
  }
  .appstyle .page-container {
    padding-top: 60px;
    margin-top: 0px;
    position: static;
    flex: 5;
    height: max-content;
  }
  .sidebar-content-right,
  .sidebar-content-left {
    border-radius: 5px;
    height: -webkit-fill-available;
    width: 20%;
  }
  .sidebar-content-right {
    margin-left: 76%;
  }
}
.vuesax-app-is-ltr .con-chips--remove-all {
  width: max-content;
  display: none;
}
.vuesax-app-is-ltr .con-vs-chip.closable {
  padding-right: 0;
  width: max-content;
  margin: 4px;
}
.con-chips {
  justify-content: flex-start !important;
}
.vuesax-app-is-ltr .no-items .con-chips--input {
  border-radius: 10px;
  border: 1px solid #e6e6e6;
  color: gray;
}
.page-header-main h4 {
  font-family: highgate-bold;
  font-size: 200%;
  padding-top: 16px;
  font-weight: 600;
}
.page-header-main p {
  font-family: highgate-regular;
  font-size: 90%;
}
.vs-avatar--con-img img {
  height: inherit !important;
}
.user-avartar-image {
  width: 100%;
  height: -webkit-fill-available;
}
</style>
