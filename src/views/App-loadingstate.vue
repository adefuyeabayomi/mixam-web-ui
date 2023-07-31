<template>
  <section>
    <div class="waiting">Please Wait...</div>
    <div v-if="!$store.state.userLoggedIn" class="refresh-button-box">
      <vs-button class="refresh-button" b666lock @click="fetchAccountData()"
        >Refresh <i class="fas fa-undo"></i
      ></vs-button>
    </div>
  </section>
</template>

<style lang="scss">
.waiting {
  text-align: center;
  margin-top: 50px;
  color: rgb(82, 82, 82);
}
.refresh-button-box {
  width: 90%;
  margin: 0px auto;
  display: block;
  margin-top: 25%;
}
.refresh-button,
.block-button {
  border-radius: 5px;
  width: 100%;
  margin: 0px auto;
  display: block;
}
</style>

<script>
export default {
  data: function () {
    return {
      name: "app-loading-state",
    };
  },
  created: function () {
    let userLoginData = window.localStorage.getItem("userlogindata");
    let userAgent = window.navigator.userAgent;
    console.log("userAgent", userAgent);
    this.$store.commit("updateuseragent", userAgent);
    console.log("userlogindata", userLoginData);
    let data = JSON.parse(userLoginData);
    //#endregion if mid is undefined then the user has cleared their auth token so they will be redirectedtothe homepagewhere they can now login or sign up afresh.
    if (userLoginData == null) {
      console.log(
        "This device is either not registered or the user has cleared browser cache/data"
      );
      console.log("either way, it will be treated as a new device");
      this.goToHome();
    } else {
      console.log("the user exist and ill check the Device ID now");
      // if the mid is undefined, then it means that this is a registered device and the user can authorize their request using the did
      // and if the mid is defined, then it means that the user can go to explore
      // else if the mid is undefined, then the should also go home, the login can decide what to do when it is called to login the users
      // either way go to home on two cases
      // 1 mid == undefined, userlogindata== null
      // both cases, login.vue handles it
      data.MID == undefined ? this.goToHome() : this.fetchAccountData();
    }
    return "true";
  },
  methods: {
    goToHome() {
      this.$router.push("home");
    },
    goToExplore() {
      this.$router.push("explore-main");
    },
    fetchAccountData() {
      let userloggedin = this.$store.state.userLoggedIn;
      if (userloggedin) {
        return undefined;
      } else {
        let userLoginData = JSON.parse(
          window.localStorage.getItem("userlogindata")
        );
        let MID = userLoginData.MID;
        let DID = userLoginData.DID;
        console.log("MID , DID", MID, DID);
        //send request to fetch data here.
        // let url = "";
        let url = "http://localhost/getaccountinfo/";
        this.$vs.loading();
        window.axios
          .get(url, {
            params: {
              MID,
              DID,
              userAgent: this.$store.state.__userAgent,
            },
          })
          .then((response) => {
            window.userIsAuthenticated = true;
            this.$vs.loading.close();
            let data = response.data;
            if (data.status == "success") {
              this.$vs.notify({
                title:
                  "Welcome Back " + response.data.__userAccountData.username,
              });
              console.log("get account info response", data);
              this.$router.push("explore-main");
              this.$store.commit(
                "updatedeviceinformation",
                response.data.deviceInfo
              );
              this.$store.commit(
                "updateloginstatus",
                response.data.__userAccountData
              );
              this.$store.commit(
                "addtouserfollowing",
                response.data.__userAccountData.following
              );
              this.$store.commit(
                "addtouserfollowers",
                response.data.__userAccountData.followers
              );
              this.$store.commit(
                "updateusername",
                response.data.__userAccountData.username
              );
              this.$store.commit(
                "updateemail",
                response.data.__userAccountData.email
              );
              this.$store.commit(
                "updatenotifications",
                response.data.__userAccountData.notifications
              );
              this.$store.commit(
                "updateactivitylog",
                response.data.__userAccountData.activityLog
              );
              console.log("updated userlogged in status.");
            } else {
              this.$modal.show("dialog", {
                title: "Unable to fetch your data.",
                text: "Reason : This is due to the fact that your data was not found on the database or this device is unauthorized. Please Login again or contact our team with your complain support@mixam.com",
                buttons: [
                  {
                    title: "Go to login",
                    handler: () => {
                      this.$modal.hide("dialog");
                      this.$store.commit("openlogin");
                    },
                  },
                ],
              });
            }
          })
          .catch((error) => {
            this.$vs.loading.close();
            this.$modal.show("dialog", {
              title: "Unable to fetch your data.",
              text: "Reason : " + error.message,
              buttons: [
                {
                  title: "Okay",
                  handler: () => {
                    this.$modal.hide("dialog");
                  },
                },
              ],
            });
          });
      }
    },
  },
};
</script>
