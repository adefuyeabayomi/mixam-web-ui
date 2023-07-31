import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginOpen: false,
    signupOpen: false,
    forgotpasswordOpen: false,
    googleLogin: false,
    googleLoginOrigin: "",
    userLoggedIn: false,
    searchItem: "",
    menuOpen: false,
    notificationOpen: false,
    mobileSearchActive: false,
    presentGeneralRoute: "",
    profileBuilderOpen: false,
    userAccountInfo: {},
    username: "",
    email: "",
    userFollowing: [],
    userFollowers: [],
    userNotifications: undefined,
    userActivityLog: {},
    hamvis: true,
    currentRoute: "",
    __userAgent: "",
    activeContentItem: "",
    deviceInformation: {},
    shareLink: "",
    allFeeds: [],
    postsFeed: [],
    coursesFeed: [],
    articlesFeed: [],
    exploreCurrentTab: "all",
    learnCurrentTab: "find-courses",
    fetchMoreReachesA: [],
    fetchMoreReachesC: [],
    fetchMoreReachesP: [],
    fetchMoreReachesF: [],
    chatHistory: [],
    messages: {},
    chatDetails: {},
    realtimeMessage: "",
    historyChangeSignal: "",
    historyChangeSignal2: "",
    notificationOpenSignal: "",
    savedContent_Courses: {},
    savedContent_Articles: {},
    savedContent_Posts: {},
    userBase: {},
    feedAction : "fetch-feed",
  },
  mutations: {
    updatefeedaction (state,value){
      state.feedAction = value
    },
    updateusername(state, value) {
      console.log("updating username in vuex", value)
      state.userAccountInfo.username = value;
      state.usernameChangeSignal = value;
    },
    updateuserphoto(state, value) {
      state.userAccountInfo.profileImageLink = value;
    },
    updateuserbase: function (state, value) {
      value.forEach((x) => {
        if (state.userBase[x.__mid] === undefined) {
          state.userBase[x.__mid] = x;
        }
      });
    },
    addsavedcontentpost: function (state, value) {
      state.savedContent_Posts[value.pid] = value;
    },
    addsavedcontentarticle: function (state, value) {
      state.savedContent_Articles[value.aid] = value;
    },
    addsavedcontentcourse: function (state, value) {
      state.savedContent_Courses[value.cid] = value;
    },
    historyupdatesentbyme: function (state, value) {
      console.log("updating for sent by me", value);
      let no = 0;
      let found = false;
      state.chatHistory.forEach((x) => {
        if (found) return;
        if (x.participantid == value.participantid) {
          found = true;
          return;
        }
        no++;
      });
      state.chatHistory[no].lastMsgSentBy = value.sent_by;
      state.chatHistory[no].lastTimeActive = value.sent_time;
      state.chatHistory[no].lastMsg = value.message;
    },
    historyupdateopenedbyme: function () {},
    signalnotificationopen: function (state, value) {
      this.notificationOpenSignal = value;
    },
    historyupdate: function (state, value) {
      let no = 0;
      let found = false;

      state.chatHistory.forEach((x) => {
        if (found) return;
        if (x.participantid == value.participantid) {
          found = true;
          return;
        }
        no++;
      });

      let newCH = state.chatHistory;
      newCH[no] = value;
      state.chatHistory = newCH;
      state.historyChangeSignal = true;
      state.historyChangeSignal2 = true;
    },
    reformatHCS: function (state) {
      state.historyChangeSignal = "";
    },
    reformatHCS2: function (state) {
      state.historyChangeSignal2 = "";
    },
    updateRTM: function (state, value) {
      state.realtimeMessage = value;
    },
    initializemessages: function (state, value) {
      state.messages[value.user] = value.msgsInit;
      console.log("initialized messages with", value.msgsInit);
    },
    updatemessages: function (state, value) {
      state.messages[value.user].push(value.message);
    },
    updatechatdetails: function (state, value) {
      if (!state.chatDetails[value.user]) {
        console.log("initializing chat in vuex", value.chatDetails);
        state.chatDetails[value.user] = value.chatDetails;
      } else {
        state.chatDetails[value.user].push(value.chatDetails);
        console.log("adding message to chat in vuex", value.chatDetails);
      }
    },
    initchathistory: function (state, value) {
      state.chatHistory = value;
    },
    updatechathistory: function (state, value) {
      console.log("updating chat history with value", value);
      state.chatHistory.push(value);
    },
    updatefeeds: function (state, value) {
      state.allFeeds = state.allFeeds.concat(value);
      console.log("updating the feed in vuex", value);
    },
    updateposts: function (state, value) {
      state.postsFeed = state.postsFeed.concat(value);
      console.log("updating the posts in vuex", value);
    },
    updatearticles: function (state, value) {
      state.articlesFeed = state.articlesFeed.concat(value);
      console.log("updating the articles in vuex", value);
    },
    updatecourses: function (state, value) {
      state.coursesFeed = state.coursesFeed.concat(value);
      console.log("updating the course in vuex", value);
    },
    updateexploretab: function (state, value) {
      state.exploreCurrentTab = value;
    },
    updatelearntab: function (state, value) {
      state.learnCurrentTab = value;
    },
    updatefetchmoreA: function (state, value) {
      state.fetchMoreReachesA.push(value);
    },
    updatefetchmoreC: function (state, value) {
      state.fetchMoreReachesC.push(value);
    },
    updatefetchmoreP: function (state, value) {
      state.fetchMoreReachesP.push(value);
    },
    updatefetchmoreF: function (state, value) {
      state.fetchMoreReachesF.push(value);
    },
    updatedeviceinformation: function (state, valueg) {
      state.deviceInformation = valueg;
      console.log("updated device information");
    },
    updatesharelink: function (state, value) {
      state.shareLink = value;
    },
    updateuseraccountinfo(state, value) {
      state.userAccountInfo = data;
    },
    updateprofilebuilder(state, value) {
      state.profileBuilderOpen = value;
    },
    updatecurrentroute: function (state, value) {
      state.currentRoute = value;
    },
    openlogin: function (state) {
      state.loginOpen = true;
    },
    closelogin: function (state) {
      state.loginOpen = false;
    },
    opensignup: function (state) {
      state.signupOpen = true;
    },
    closesignup: function (state) {
      state.signupOpen = false;
    },
    openforgotpassword: function (state) {
      state.forgotpasswordOpen = true;
    },
    closeforgotpassword: function (state) {
      console.log("init close forgot password");
      state.forgotpasswordOpen = false;
    },
    updateloginstatus: function (state, data) {
      state.userLoggedIn = !state.userLoggedIn;
      state.userAccountInfo = data;
    },
    updategoogleloginorigin: function (state, data) {
      state.googleLoginOrigin = data;
    },
    updatenotificationopen: function (state) {
      state.notificationOpen = !state.notificationOpen;
    },
    updatecurrentsearchitem: function (state, data) {
      state.searchItem = data;
    },
    updatemobilesearchactive: function (state) {
      state.mobileSearchActive = !state.mobileSearchActive;
    },
    updatemenustatus: function (state) {
      state.menuOpen = !state.menuOpen;
    },
    updategooglelogin: function (state) {
      state.googleLogin = true;
    },
    updatepresentgeneralroute: function (state, value) {
      state.presentGeneralRoute = value;
    },
    updateHamVis: function (state) {
      state.hamvis = !state.hamvis;
    },
    updateuseragent: function (state, value) {
      state.__userAgent = value;
    },
    addtouserfollowing: function (state, value) {
      state.userFollowing = value;
    },
    removefromuserfollowing: function (state, value) {
      state.userFollowing = value;
    },
    addtouserfollowers: function (state, value) {
      state.userFollowers = value;
    },
    updateusername: function (state, value) {
      state.username = value;
    },
    updateemail: function (state, value) {
      state.email = value;
    },
    updatenotifications: function (state, value) {
      state.userNotifications = value;
    },
    addnewnotification: function (state, value) {
      console.log(value.date, "from notification adding");
      let dayIndex = 0;
      let done = false;
      state.userNotifications.forEach((x) => {
        if (done) return;
        if (x.date == value.date) {
          console.log("found the correct date", value.date, dayIndex);
          done = true;
        } else {
          dayIndex++;
        }
      });
      if (!done) {
        console.log("day not present in notification", value.date);
        state.userNotifications.push({ date: value.date, notifications: [] });
        state.userNotifications[dayIndex].notifications.push(value);
      } else {
        console.log("notification-day present", value.date);
        state.userNotifications[dayIndex].notifications.push(value);
      }
    },
    addnewnotifday: function (state, value) {
      state.userNotifications.push(value);
    },
    updateactivitylog: function (state, value) {
      state.userActivityLog = value;
    },
    update: function (state, value) {
      state;
      value;
    },
    updateACI: function (state, value) {
      state.activeContentItem = value;
    },
    // mutations for userState.
  },
  actions: {},
  modules: {},
});
