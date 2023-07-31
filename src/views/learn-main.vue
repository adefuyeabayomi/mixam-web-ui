<template>
  <!--design the post blah blah here.-->
  <div id="learn-main-container">
    <modal
      class="report-modal"
      name="report"
      width="90%"
      :maxWidth="maxWidth"
      height="auto"
      :adaptive="true"
      :click-to-close="true"
    >
      <section>
        <div class="report-header">
          <p>Report</p>
        </div>
        <div class="report-body">
          <p>Why are you reporting?</p>
          <div class="form-container">
            <form class="report-reason-form">
              <span class="report-input-container">
                <input
                  v-model="reportReason"
                  value="Scam Content"
                  type="radio"
                  name="report-reason"
                />
                Scam Content
              </span>
              <span class="report-input-container">
                <input
                  v-model="reportReason"
                  value="Impersonation"
                  type="radio"
                  name="report-reason"
                />
                Impersonation
              </span>
              <span class="report-input-container">
                <input
                  v-model="reportReason"
                  value="Used a copyrighted item without permission"
                  type="radio"
                  name="report-reason"
                />
                Used a copyrighted item without permission
              </span>
              <span class="report-input-container">
                <input
                  v-model="reportReason"
                  value="Untrusted Link"
                  type="radio"
                  name="report-reason"
                />
                Untrusted Link
              </span>
              <p class="other-report-reason">
                You can add More details of why you're reporting below :
              </p>
              <input
                type="text"
                v-model="otherReason"
                class="report-other-reason-input"
              />
            </form>
          </div>
          <div class="report-button-container">
            <vs-button
              @click="sendReportRequest()"
              style="width: 100%; background-color: gray !important"
              class="report-button"
              >Report</vs-button
            >
          </div>
        </div>
      </section>
    </modal>
    <section id="header-section">
      <!--Explore the community activity headers. and navigation -->
      <h3 class="pagemain-header">Take a Course.</h3>
      <p class="pagefollow-text">
        Boost your worth. knowledge and business are inseperable.
      </p>
    </section>
    <section id="pagetab-options-section">
      <div class="pagetab-container">
        <div
          @click="updateActiveTab('find-courses')"
          class="item"
          :class="{ 'active-tab': findCoursesActive }"
        >
          <p>Courses</p>
        </div>
        <div
          @click="updateActiveTab('saved')"
          class="item"
          :class="{ 'active-tab': savedActive }"
        >
          <p>Saved</p>
        </div>
        <div
          @click="updateActiveTab('my-courses')"
          class="item"
          :class="{ 'active-tab': myCoursesActive }"
        >
          <p>Go To Classroom</p>
        </div>
        <div
          @click="updateActiveTab('learn-milestones')"
          class="item"
          :class="{ 'active-tab': learningMilestonesActive }"
        >
          <p>Completed Courses</p>
        </div>
      </div>
    </section>
    <section class="learn-tab-components-container">
      <!--Activity Feed container here. -->
      <keep-alive>
        <component @report="submitReportReq" :is="currentTab"></component>
      </keep-alive>
      <div>
        <course-feed v-if="false"></course-feed>
        <saved-courses v-if="false"></saved-courses>
        <my-courses v-if="false"></my-courses>
        <learning-milestones v-if="false"></learning-milestones>
      </div>
    </section>
  </div>
</template>

<script>
import courseFeed from "./explore-courses.vue";
import savedCourses from "./saved-courses.vue";
import myCourses from "./my-courses.vue";
import learningMilestones from "./learning-milestones.vue";

export default {
  data: function () {
    return {
      currentTab: courseFeed,
      activeTab: "find-courses",
      maxWidth: 480,
      reportReason: "",
      otherReason: "",
      reportInfo: {},
    };
  },
  created: function () {
    this.$store.commit("updatecurrentroute", "learn");
    this.setActiveTab(this.tab);
  },
  computed: {
    findCoursesActive() {
      return this.activeTab == "find-courses";
    },
    savedActive() {
      return this.activeTab == "saved";
    },
    myCoursesActive() {
      return this.activeTab == "my-courses";
    },
    learningMilestonesActive() {
      return this.activeTab == "learn-milestones";
    },
    tab: function () {
      return this.$store.state.learnCurrentTab;
    },
  },
  methods: {
    updateActiveTab(tab) {
      this.$store.commit("updatelearntab", tab);
    },
    setActiveTab(tab) {
      this.activeTab = tab;
      if (tab == "find-courses") {
        this.currentTab = courseFeed;
      } else if (tab == "saved") {
        this.currentTab = savedCourses;
      } else if (tab == "my-courses") {
        this.currentTab = myCourses;
      } else {
        this.currentTab = learningMilestones;
      }
    },

    sendReportRequest() {
      this.$vs.loading();
      let url = "http://localhost/report/";
      let DID = JSON.parse(window.localStorage.getItem("userlogindata")).DID;
      let MID = JSON.parse(window.localStorage.getItem("userlogindata")).MID;
      let userAgent = this.$store.state.__userAgent;
      window.axios
        .get(url, {
          params: {
            DID,
            MID,
            userAgent,
            reportReason: this.reportReason,
            otherReason: this.otherReason,
            reportInfo: this.reportInfo,
          },
        })
        .then((response) => {
          this.$vs.loading.close();
          if (response.data.status == "success") {
            console.log("reportSuccess", response.data);
            this.$modal.hide("report");
            (this.otherReason = ""), (this.reportReason = "");
            this.$vs.notify({
              position: "bottom-center",
              title: "Report Action Submitted Successfully",
              text: "We are Processsing your report request and we will take the appropraite action immediately after reviewed",
              color: "#98c2ff",
            });
          } else {
          }
        })
        .catch((err) => {
          this.$vs.loading.close();
          console.error(err.message);
        });
    },
    submitReportReq(event) {
      this.reportInfo = event;
      console.log("");
      this.$modal.show("report");
    },
  },
  watch: {
    tab(newVal, old) {
      console.log("new tab val from store", newVal);
      this.setActiveTab(newVal);
    },
  },
  components: {
    courseFeed,
    learningMilestones,
    savedCourses,
    myCourses,
  },
};
</script>

<style lang="scss">
/* -- heading for the main pages css -- */
.pagemain-header {
  padding-left: 8px;
  padding-top: 15px !important;
  margin-bottom: 0px;
  font-family: highgate-bold;
  font-size: 200%;
  font-weight: 600;
}
.pagefollow-text {
  color: #8a8a8a;
  font-size: 90%;
  padding-left: 8px;
}
.pagetab-container {
  display: flex;
  padding-top: 8px;
  padding-left: 8px;
  width: max-content;
  padding-bottom: 7px;
}
section#pagetab-options-section {
  overflow-x: scroll;
}
section#pagetab-options-section::-webkit-scrollbar {
  height: 3px;
}
.pagetab-container div {
  width: max-content;
}
.pagetab-container .item {
  margin: 4px 8px 0px 0px;
  border-radius: 10px;
  padding: 0px 16px;
  box-shadow: 0px 0px 3px grey;
}
.item.active-tab {
  background: #1e87f0;
  font-weight: 900;
  color: white;
}
.item:hover {
  cursor: pointer;
}
/* -- heading for the main pages css -- */
#learn-main-container {
  padding-bottom: 70px;
  padding-left: 8px;
  padding-right: 8px;
}
</style>
