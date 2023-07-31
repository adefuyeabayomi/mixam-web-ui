<template>
  <!--design the post blah blah here. -->
  <div id="notification-main-container">
    <section id="header-section">
      <!--Explore the community activity headers. and navigation -->
      <h3 class="pagemain-header">Notifications</h3>
      <p class="pagefollow-text">Check all your activities updates here.</p>
    </section>
    <div class="mark-read-container">
      <p>
        <span class="pointercursor" @click="markAllAsRead()"
          >Mark all notifications as Opened</span
        >
      </p>
      <p class="mrc-clear">
        <span @click="clearNotifications()" class="pointercursor"
          >Clear All Notifications</span
        >
      </p>
    </div>
    <section class="notification-container">
      <section
        class="notification-day-container"
        v-for="day in serveNotificationDay"
        :key="day.id"
      >
        <div v-if="day.id <= seeDayTo">
          <div class="day-title">
            <p>{{ day.date }}</p>
          </div>
          <div
            v-for="notification in dayNotifications(day.date)"
            :key="notification.notificationID"
          >
            <notification-item
              v-bind:date="day.date"
              v-bind="notification"
            ></notification-item>
          </div>
          <div class="notification-day-divider"></div>
        </div>
      </section>
    </section>
    <div class="more-notifications">
      <button v-if="!maxNotifications" @click="seeOlderNotifications()">
        See Older Notifications
      </button>
      <p v-if="maxNotifications">No More Older Notifications!</p>
    </div>
  </div>
</template>

<script>
import notificationItem from "../components/notification-item.vue";
function reverseArray(arr) {
  let returnArr = [];
  for (let count = arr.length - 1; count >= 0; count--) {
    returnArr.push(arr[count]);
  }
  return returnArr;
}

export default {
  data: function () {
    return {
      seeDayTo: 2,
      MID: JSON.parse(window.localStorage.getItem("userlogindata")).MID,
      DID: JSON.parse(window.localStorage.getItem("userlogindata")).DID,
    };
  },
  created: function () {
    this.$store.commit("updatecurrentroute", "notification");

    setTimeout(() => {
      this.updateSeen();
    }, 5000);
  },
  computed: {
    notificationOpenedAll() {
      return this.$store.state.notificationOpenSignal;
    },
    unseenNotifications() {
      let theNotifications = this.$store.state.userNotifications;
      if (!theNotifications) {
        return [];
      }
      let notifications = [];
      if (theNotifications == null) {
        return notifications;
      }
      for (let each of Object.keys(theNotifications)) {
        let notifDay = theNotifications[each].notifications;
        for (let notification of notifDay) {
          if (notification) {
            notification.seen !== true
              ? notifications.push(notification.notificationID)
              : false;
          }
        }
      }
      return notifications.filter((x) => x !== null && x !== undefined);
    },
    maxNotifications: function () {
      return this.seeDayTo >= this.serveNotificationDay.length - 1;
    },
    serveNotificationDay: function () {
      let theNotifications = this.$store.state.userNotifications;
      if (!theNotifications) {
        return [];
      }
      let sortedNotificationsDay = [];
      let id = theNotifications.length - 1;
      for (let each of theNotifications) {
        sortedNotificationsDay.push({ date: each.date, id });
        id--;
      }
      sortedNotificationsDay = reverseArray(sortedNotificationsDay);
      return sortedNotificationsDay;
    },
    serveNotifPrimitive: function () {
      let notifications = this.$store.state.userNotifications;
      if (!notifications) {
        return [];
      }
      let sortedNotifications = [];
      for (let each of notifications) {
        each.notifications = reverseArray(each.notifications);
        sortedNotifications.push(each);
      }
      return reverseArray(sortedNotifications);
    },
    compileTypeList: function () {
      let listMain = [];
      for (let day of this.serveNotifPrimitive) {
        for (let each of this.dayNotifications(day.date)) {
          listMain.includes(each.type) && each !== null
            ? false
            : listMain.push(each.type);
        }
      }
      return listMain;
    },
  },
  methods: {
    fetchNotifications: function () {
      let url = `${this.$store.state.apiServer}/fetch-notifications/`;
      window.axios
        .get(url, {
          params: {
            MID: JSON.parse(window.localStorage.getItem("userlogindata")).MID,
            DID: JSON.parse(window.localStorage.getItem("userlogindata")).DID,
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
        .then(() => {
          this.$store.commit("signalnotificationopen", "");
        })
        .catch((err) => {
          console.error("Error Fetching Notifications : ", err.message);
        });
    },
    updateSeen: function () {
      let url = `${this.$store.state.apiServer}/update-seen-notification/`;
      window.axios
        .get(url, {
          params: {
            MID: this.MID,
            DID: this.DID,
          },
        })
        .then((response) => {
          if (response.data.status == "success") {
            console.log(response.data);
            this.fetchNotifications();
          } else {
          }
        })
        .catch((err) => {
          console.error(err.message);
        });
    },
    markAllAsRead() {
      let url = `${this.$store.state.apiServer}/mark-all-notification-read/`;
      window.axios
        .get(url, {
          params: {
            MID: this.MID,
            DID: this.DID,
          },
        })
        .then((response) => {
          if (response.data.status == "success") {
            console.log(response.data);
            this.fetchNotifications();
            this.$vs.notify({
              title: "Successfully marked all as opened.",
              color: "#98c2ff",
            });
          } else {
          }
        })
        .catch((err) => {
          console.error(err.message);
        });
    },
    clearNotifications() {
      console.log("clearing notifications");
      let url = `${this.$store.state.apiServer}/clear-notifications/`;
      window.axios
        .get(url, {
          params: {
            MID: this.MID,
            DID: this.DID,
          },
        })
        .then((response) => {
          if (response.data.status == "success") {
            console.log(response.data);
            this.fetchNotifications();
            this.$vs.notify({
              title: "Successfully cleared notifications.",
              color: "#98c2ff",
            });
          } else {
          }
        })
        .catch((err) => {
          console.error(err.message);
        });
    },
    seeOlderNotifications() {
      this.seeDayTo = this.seeDayTo + 2;
      this.$vs.loading();
      setTimeout(() => {
        this.$vs.loading.close();
      }, 1200);
    },
    newID() {
      return String(Math.round(Math.random() * 1000000000));
    },
    dayNotifications(date) {
      let userNotifications = this.$store.state.userNotifications;
      let result = [];
      for (let each of userNotifications) {
        if (each.date == date) {
          result = each.notifications;
        }
      }
      let sorted = [];
      for (let each of result) {
        if (each == null) {
        } else {
          sorted.push(each);
        }
      }
      return reverseArray(sorted);
    },
  },
  components: {
    notificationItem,
  },
  watch: {
    notificationOpenedAll: function (newVal, oldVal) {
      if (this.newVal !== "") {
        this.fetchNotifications();
      }
    },
  },
};
</script>

<style lang="scss">
/* -- heading for the main pages css -- */
.pagemain-header {
  padding-left: 8px;
  padding-top: 8px;
  margin-bottom: 0px;
  font-weight: 900;
  color: #4e4e4e;
}
.pagefollow-text {
  color: #8a8a8a;
  font-size: 90%;
  padding-left: 8px;
}

/* -- heading for the main pages css -- */
#notification-main-container {
  padding-bottom: 70px;
  padding-left: 8px;
  padding-right: 8px;
}
.day-title {
  font-size: 140%;
  font-weight: 900;
  margin-top: 25px;
  text-align: center;
  margin-bottom: -10px;
  font-family: candara, "signika-light";
  color: #5e5e5e;
}
.notification-day-divider {
  border-bottom: 2px solid #cacaca;
  padding-bottom: 15px;
}
.more-notifications {
  margin-top: 10px;
}

.more-notifications button {
  width: 100%;
  height: 40px;
  border-radius: 20px;
  border: 1px solid #88c4ff;
  background-color: #a8d2fa;
  color: #0e7be6;
  font-size: 100%;
  font-weight: 600;
}
.more-notifications p {
  text-align: center;
}
.mark-read-container {
  display: flex;
}
.mark-read-container p {
  text-decoration: underline;
  font-weight: 600;
  padding-left: 10px;
  color: gray;
  padding-top: 10px;
}
.mark-read-container .mrc-clear {
  text-align: right;
  margin-right: 10px;
}
</style>
