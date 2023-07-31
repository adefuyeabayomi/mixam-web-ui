<template>
  <!--design the post blah blah here.-->
  <div id="myaccount-main-container">
    <section id="header-section">
      <!--Explore the community activity headers. and navigation -->
      <h3 class="pagemain-header">My Account Settings</h3>
      <p class="pagefollow-text">Manage your account here.</p>
    </section>
    <section class="account-options-container">
      <div class="option-container" @click="goToProfilePage()">
        <p>
          <span class="icon1"><i class="fas fa-user"></i></span> My Profile
          <span class="go-icon"><i class="fas fa-arrow-right"></i></span>
        </p>
      </div>
      <div class="option-container" @click="goToDraftsPage()">
        <p>
          <span class="icon1"><i class="fas fa-user"></i></span> My Drafts
          <span class="go-icon"><i class="fas fa-arrow-right"></i></span>
        </p>
      </div>
      <div class="option-container" @click="goToLoginSettings()">
        <p>
          <span class="icon1"><i class="fas fa-user"></i></span> Login
          Settings<span class="go-icon"
            ><i class="fas fa-arrow-right"></i
          ></span>
        </p>
      </div>
      <div class="option-container" @click="goToPrivacy()">
        <p>
          <span class="icon1"><i class="fas fa-user"></i></span> Privacy
          <span class="go-icon"><i class="fas fa-arrow-right"></i></span>
        </p>
      </div>
      <div class="option-container" @click="goToTerms()">
        <p>
          <span class="icon1"><i class="fas fa-user"></i></span> Terms &
          Conditions
          <span class="go-icon"><i class="fas fa-arrow-right"></i></span>
        </p>
      </div>
      <div class="option-container" @click="goToHelpCenter()">
        <p>
          <span class="icon1"><i class="fas fa-user"></i></span> Help Center
          <span class="go-icon"><i class="fas fa-arrow-right"></i></span>
        </p>
      </div>
      <div class="option-container" @click="goToFeedback()">
        <p>
          <span class="icon1"><i class="fas fa-user"></i></span> Feedback &amp;
          Complaints
          <span class="go-icon"><i class="fas fa-arrow-right"></i></span>
        </p>
      </div>
      <div class="option-container" @click="logOutConfirmation()">
        <p>
          <span class="icon1"><i class="fas fa-user"></i></span> Log Out
          <span class="go-icon"><i class="fas fa-arrow-right"></i></span>
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data: function () {
    return {};
  },
  created: function () {
    this.$store.commit("updatecurrentroute", "myaccount");
  },
  methods: {
    goToProfilePage() {
      this.$router.push({
        path: "/profile",
      });
    },
    goToLoginSettings() {
      this.$router.push({
        path: "/login-settings",
      });
    },
    goToFeedback() {
      this.$router.push({
        path: "/feedback-and-complaint",
      });
    },
    goToPrivacy() {
      this.$router.push({
        path: "/privacy",
      });
    },
    goToTerms() {
      this.$router.push({
        path: "/terms-and-conditions",
      });
    },
    goToHelpCenter() {
      this.$router.push({
        path: "/help-center",
      });
    },
    logOutConfirmation() {
      this.$modal.show("dialog", {
        title: "Are you sure you want to log out?",
        buttons: [
          {
            title: "Yes, Log Out",
            handler: () => {
              this.$modal.hide("dialog");
              setTimeout(() => {
                this.logOut();
              }, 300);
            },
          },
          {
            title: "Cancel",
            handler: () => {
              this.$modal.hide("dialog");
            },
          },
        ],
      });
    },
    logOut() {
      let DID = JSON.parse(window.localStorage.getItem("userlogindata")).DID;
      window.localStorage.setItem("userlogindata", JSON.stringify({ DID }));
      this.$store.commit("updateloginstatus", {});
      this.$router.push("home");
      setTimeout(() => {
        this.$modal.show("dialog", {
          title: "You are logged out",
          buttons: [
            {
              title: "Okay",
              handler: () => {
                this.$modal.hide("dialog");
              },
            },
          ],
        });
      }, 300);
    },
    goToDraftsPage() {
      this.$router.push({
        path: "/my-drafts",
      });
    },
  },
};
</script>

<style lang="scss">
/* -- heading for the main pages css -- */
.pagemain-header {
  padding-left: 8px;
  padding-top: 15px !important;
  margin-bottom: 0px;
  color: #4e4e4e;
  font-family: highgate-bold;
  font-size: 200%;
  font-weight: 600;
}
.pagefollow-text {
  color: #8a8a8a;
  font-size: 90%;
  padding-left: 8px;
}

/* -- heading for the main pages css -- */
#myaccount-main-container {
  padding-bottom: 70px;
  padding-left: 8px;
  padding-right: 8px;
}
.option-container p {
  font-family: segoe ui;
  font-weight: 600;
}
.option-container {
  padding: 20px 5px 20px 10px;
  border-radius: 11px;
  background-color: white;
  box-shadow: 0px 0px 5px #9eb9e0;
  margin-top: 15px;
  margin-bottom: 15px;
}
.option-container:hover {
  cursor: pointer;
}
.go-icon {
  float: right;
  margin-right: 10px;
}
.account-options-container {
  padding-top: 15px;
}
</style>
