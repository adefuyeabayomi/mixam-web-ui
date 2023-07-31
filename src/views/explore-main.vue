<template>
  <div id="explore-main-container">
    <!--<div v-if="!$store.state.userLoggedIn" class="refresh-button-box">
        <vs-button class="refresh-button" block @click="fetchAccountData()">Refresh <i class="fas fa-undo"></i></vs-button>
    </div>-->
    <section id="header-section">
      <!--Explore the community activity headers. and navigation -->
      <h3 class="explore-main-header">Explore</h3>
      <p class="explore-follow-text">
        See what mixam business community has been up to.
      </p>
    </section>
    <section id="explore-tab-options-section">
      <div class="explore-tab-container">
        <div
          @click="updateActiveTab('all')"
          class="item"
          :class="{ 'active-tab': allActive }"
        >
          <p>All</p>
        </div>
        <div
          @click="updateActiveTab('posts')"
          class="item"
          :class="{ 'active-tab': postActive }"
        >
          <p>Posts</p>
        </div>
        <div
          @click="updateActiveTab('articles')"
          class="item"
          :class="{ 'active-tab': articlesActive }"
        >
          <p>Articles</p>
        </div>
        <div
          @click="updateActiveTab('courses')"
          class="item"
          :class="{ 'active-tab': courseActive }"
        >
          <p>Courses</p>
        </div>
      </div>
    </section>
    <section class="explore-feed-container">
      <!--Activity Feed container here.-->
      <keep-alive>
        <component @report="submitReportReq" :is="currentFeed"></component>
      </keep-alive>
      <div>
        <feed v-if="false"></feed>
        <posts v-if="false"></posts>
        <articles v-if="false"></articles>
        <courses v-if="false"></courses>
      </div>
    </section>
    <section class="content-item-modals">
      <modal
        class="share-post-modal"
        name="share-post"
        width="90%"
        :maxWidth="maxWidth"
        height="auto"
        :adaptive="true"
        :click-to-close="true"
      >
        <section class="share-container">
          <div class="share-header">Share This Post</div>
          <div>
            <p class="sotxt">Share options</p>
          </div>
          <div class="share-options">
            <div :title="shareLink" class="share-item facebook">
              <a
                @click="share('facebook', 'post')"
                target="_blank"
                class="facebook-share-link"
                :href="'http://www.facebook.com/share.php?u=' + shareLink"
              >
                <i class="fab fa-facebook share-item-icon"></i>
              </a>
            </div>
            <div class="share-item whatsapp">
              <a
                @click="share('whatsapp', 'post')"
                target="_blank"
                :href="'https://api.whatsapp.com/send?text=' + shareLink"
              >
                <i class="fab fa-whatsapp share-item-icon"></i>
              </a>
            </div>
            <div class="share-item twitter">
              <a
                @click="share('twitter', 'post')"
                target="_blank"
                :href="
                  'https://twitter.com/intent/tweet?text=' +
                  'Hi there, Saw this post on mixam business website and I wanted to share it. Check it out here&url=' +
                  shareLink +
                  '&related=@mixam_business'
                "
                ><i class="fab fa-twitter share-item-icon"></i
              ></a>
              <!--              <a target="_blank" href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-size="large" data-text="Hi there, Saw this post on mixam.com and I wanted to share it. Check it out here" data-related="@mixam_business" data-show-count="false"><i class="fab fa-twitter share-item-icon"></i></a>-->
            </div>
            <div class="share-item profile">
              <span @click="share('profile', 'post')">
                <div class="share-to-profile-container">
                  <img
                    src="../assets/create-main-bgs/user-free/User_perspective_matte.png"
                  />
                </div>
                <span class="share-to-profile-text">Share to profile</span>
              </span>
            </div>
            <div v-if="false" class="share-item linkedin">
              <a
                @click="share()"
                :href="
                  'https://www.linkedin.com/sharing/share-offsite/?url=' +
                  shareLink
                "
                target="_blank"
              >
                <i class="fab fa-linkedin share-item-icon"></i>
              </a>
            </div>
            <div @click="share()" v-if="false" class="share-item instagram">
              <i class="fab fa-instagram share-item-icon"></i>
            </div>
            <div @click="copyLink()" class="share-item copylink">
              <i class="fas fa-copy share-item-icon"></i>
            </div>
          </div>
        </section>
      </modal>
      <modal
        class="share-article-modal"
        name="share-article"
        width="90%"
        :maxWidth="maxWidth"
        height="auto"
        :adaptive="true"
        :click-to-close="true"
      >
        <section class="share-container">
          <div class="share-header">Share This Article</div>
          <div>
            <p class="sotxt">Share options</p>
          </div>
          <div class="share-options">
            <div :title="shareLink" class="share-item facebook">
              <a
                @click="share('facebook', 'article')"
                target="_blank"
                class="facebook-share-link"
                :href="'http://www.facebook.com/share.php?u=' + shareLink"
              >
                <i class="fab fa-facebook share-item-icon"></i>
              </a>
            </div>
            <div class="share-item whatsapp">
              <a
                @click="share('whatsapp', 'article')"
                target="_blank"
                :href="'https://api.whatsapp.com/send?text=' + shareLink"
              >
                <i class="fab fa-whatsapp share-item-icon"></i>
              </a>
            </div>
            <div class="share-item twitter">
              <a
                @click="share('twitter', 'article')"
                target="_blank"
                :href="
                  'https://twitter.com/intent/tweet?text=' +
                  'Hi there, Saw this post on mixam business website and I wanted to share it. Check it out here&url=' +
                  shareLink +
                  '&related=@mixam_business'
                "
                ><i class="fab fa-twitter share-item-icon"></i
              ></a>
              <!--              <a target="_blank" href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-size="large" data-text="Hi there, Saw this post on mixam.com and I wanted to share it. Check it out here" data-related="@mixam_business" data-show-count="false"><i class="fab fa-twitter share-item-icon"></i></a>-->
            </div>
            <div class="share-item profile">
              <span @click="share('profile', 'article')">
                <div class="share-to-profile-container">
                  <img
                    src="../assets/create-main-bgs/user-free/User_perspective_matte.png"
                  />
                </div>
                <span class="share-to-profile-text">Share to profile</span>
              </span>
            </div>
            <div v-if="false" class="share-item linkedin">
              <a
                @click="share()"
                :href="
                  'https://www.linkedin.com/sharing/share-offsite/?url=' +
                  shareLink
                "
                target="_blank"
              >
                <i class="fab fa-linkedin share-item-icon"></i>
              </a>
            </div>
            <div @click="share()" v-if="false" class="share-item instagram">
              <i class="fab fa-instagram share-item-icon"></i>
            </div>
            <div @click="copyLink()" class="share-item copylink">
              <i class="fas fa-copy share-item-icon"></i>
            </div>
          </div>
        </section>
      </modal>
      <modal
        class="share-course-modal"
        name="share-course"
        width="90%"
        :maxWidth="maxWidth"
        height="auto"
        :adaptive="true"
        :click-to-close="true"
      >
        <section class="share-container">
          <div class="share-header">Share This Course</div>
          <div>
            <p class="sotxt">Share options</p>
          </div>
          <div class="share-options">
            <div :title="shareLink" class="share-item facebook">
              <a
                @click="share('facebook', 'course')"
                target="_blank"
                class="facebook-share-link"
                :href="'http://www.facebook.com/share.php?u=' + shareLink"
              >
                <i class="fab fa-facebook share-item-icon"></i>
              </a>
            </div>
            <div class="share-item whatsapp">
              <a
                @click="share('whatsapp', 'course')"
                target="_blank"
                :href="'https://api.whatsapp.com/send?text=' + shareLink"
              >
                <i class="fab fa-whatsapp share-item-icon"></i>
              </a>
            </div>
            <div class="share-item twitter">
              <a
                @click="share('twitter', 'course')"
                target="_blank"
                :href="
                  'https://twitter.com/intent/tweet?text=' +
                  'Hi there, Saw this post on mixam business website and I wanted to share it. Check it out here&url=' +
                  shareLink +
                  '&related=@mixam_business'
                "
                ><i class="fab fa-twitter share-item-icon"></i
              ></a>
              <!--              <a target="_blank" href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-size="large" data-text="Hi there, Saw this post on mixam.com and I wanted to share it. Check it out here" data-related="@mixam_business" data-show-count="false"><i class="fab fa-twitter share-item-icon"></i></a>-->
            </div>
            <div class="share-item profile">
              <span @click="share('profile', 'course')">
                <div class="share-to-profile-container">
                  <img
                    src="../assets/create-main-bgs/user-free/User_perspective_matte.png"
                  />
                </div>
                <span class="share-to-profile-text">Share to profile</span>
              </span>
            </div>
            <div v-if="false" class="share-item linkedin">
              <a
                @click="share()"
                :href="
                  'https://www.linkedin.com/sharing/share-offsite/?url=' +
                  shareLink
                "
                target="_blank"
              >
                <i class="fab fa-linkedin share-item-icon"></i>
              </a>
            </div>
            <div @click="share()" v-if="false" class="share-item instagram">
              <i class="fab fa-instagram share-item-icon"></i>
            </div>
            <div @click="copyLink()" class="share-item copylink">
              <i class="fas fa-copy share-item-icon"></i>
            </div>
          </div>
        </section>
      </modal>
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
    </section>
  </div>
</template>
<script async src="https://platform.twitter.com/widgets.js"></script>
<script>
import Feed from "./explore-feed.vue";
import Posts from "./explore-post.vue";
import Articles from "./explore-articles.vue";
import Courses from "./explore-courses.vue";
export default {
  data: function () {
    return {
      currentFeed: Feed,
      activeTab: "all",
      maxWidth: 450,
      reportReason: "",
      otherReason: "",
      reportInfo: {},
      MID: JSON.parse(window.localStorage.getItem("userlogindata")).MID,
      DID: JSON.parse(window.localStorage.getItem("userlogindata")).DID,
    };
  },
  created: function () {
    this.$store.commit("updatecurrentroute", "explore");
    this.setActiveTab(this.tab);
  },
  computed: {
    allActive: function () {
      return this.activeTab == "all";
    },
    postActive: function () {
      return this.activeTab == "posts";
    },
    articlesActive: function () {
      return this.activeTab == "articles";
    },
    courseActive: function () {
      return this.activeTab == "courses";
    },
    shareLink: function () {
      return this.$store.state.shareLink;
    },
    tab: function () {
      return this.$store.state.exploreCurrentTab;
    },
  },
  methods: {
    updateActiveTab(tab) {
      this.$store.commit("updateexploretab", tab);
    },
    setActiveTab(tab) {
      this.activeTab = tab;
      if (tab == "all") {
        this.currentFeed = Feed;
      } else if (tab == "posts") {
        this.currentFeed = Posts;
      } else if (tab == "articles") {
        this.currentFeed = Articles;
      } else {
        this.currentFeed = Courses;
      }
    },
    submitReportReq(event) {
      this.reportInfo = event;
      console.log("");
      this.$modal.show("report");
    },
    copyLink() {
      // look for the appropraite code.
      navigator.clipboard.writeText(this.shareLink);
      this.$vs.notify({
        title: "copied to clipboard",
        color: "#98c2ff",
      });
      this.closeShareModal();
    },
    closeShareModal() {
      this.$modal.hide("share-post");
      this.$modal.hide("share-article");
      this.$modal.hide("share-course");
    },
    share(to, contentType) {
      this.closeShareModal();
      if (to == "profile") {
        this.shareToProfile();
      }
      let url = `${this.$store.state.apiServer}/share/`;
      let parsedLink = new window.URL(this.shareLink);
      window.axios
        .get(url, {
          params: {
            MID: this.MID,
            DID: this.DID,
            to,
            contentType,
            ref:
              parsedLink.searchParams.get("pid") ||
              parsedLink.searchParams.get("aid") ||
              parsedLink.searchParams.get("cid"),
            author: parsedLink.searchParams.get("author"),
          },
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.$vs.notify({
              position: "bottom-center",
              title: "Shared Successfully",
              color: "#98c2ff",
            });
          } else {
            this.$vs.notify({
              position: "bottom-center",
              title: "Unable to share, try again later",
              color: "#98c2ff",
            });
          }
        })
        .catch((err) => {
          this.$vs.notify({
            position: "bottom-center",
            title: "Unable to share, try again later",
            color: "#98c2ff",
          });
          console.error(err.message);
        });
    },
    shareToProfile() {
      let url = `${this.$store.state.apiServer}/share-to-profile/`;
      console.log("sharing post to profile");
      let parsedLink = new window.URL(this.shareLink);
      window.axios
        .get(url, {
          params: {
            MID: this.MID,
            DID: this.DID,
            pid: parsedLink.searchParams.get("pid"),
          },
        })
        .then((response) => {
          if (response.data.status == "success") {
            console.log("shared to profile success");
          } else {
            console.error("unable to share to profile");
          }
        })
        .catch((err) => {
          this.$vs.notify({
            position: "bottom-center",
            title: "Network connection not available.",
            color: "#cbe0ff",
          });
          console.error(err.message);
        });
    },
    sendReportRequest() {
      this.$vs.loading();
      let url = `${this.$store.state.apiServer}/report/`;
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
  },
  components: {
    Feed,
    Posts,
    Articles,
    Courses,
  },
  watch: {
    tab(newVal, old) {
      console.log("new tab val from store", newVal);
      this.setActiveTab(newVal);
    },
  },
};
</script>

<style lang="scss">
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

.explore-main-header {
  padding-left: 8px;
  padding-top: 15px !important;
  margin-bottom: 0px;
  color: #4e4e4e;
  font-family: highgate-bold;
  font-size: 200%;
  font-weight: 600;
}
.explore-follow-text {
  color: #8a8a8a;
  font-size: 90%;
  padding-left: 8px;
}
.item.active-tab {
  background: #1e87f0;
  font-weight: 900;
  color: white;
}
.explore-tab-container {
  display: flex;
  padding-top: 8px;
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
.explore-tab-container div {
  width: max-content;
}
.explore-tab-container .item {
  margin: 4px 8px 0px 0px;
  border-radius: 10px;
  padding: 0px 16px;
  box-shadow: 0px 0px 3px grey;
}
.item:hover {
  cursor: pointer;
}
#explore-main-container {
  padding-bottom: 70px;
  padding-left: 8px;
  padding-right: 8px;
}
.share-post-modal.vm--modal,
.share-article-modal.vm--modal,
.share-course-modal.vm--modal {
  padding-bottom: 20px;
}
.share-container {
  padding: 20px;
}
.share-header {
  font-size: 150%;
  font-weight: 600;
  text-align: center;
  margin-top: 10px;
}
.share-item {
  width: 70px;
  height: 70px;
  border-radius: 10px;
  background: #8a8a8a;
  margin-right: 20px;
  margin-bottom: 10px;
  float: left;
}
.share-item:hover {
  cursor: pointer;
}
.share-options {
  padding-top: 20px;
}
.sotxt {
  text-align: center;
}
.share-item.facebook {
  background-color: #002ed4;
}
.share-item.twitter {
  background-color: #00bcd4;
}
.share-item.whatsapp {
  background-color: #21ca32;
}
.share-item.instagram {
  background-image: -moz-radial-gradient(#ffffff, #000000);
}
.share-item.profile {
  background: black;
}
.share-item.linkedin {
  background-color: #0086d4;
}
.share-item.copylink {
  background-color: #b3cfd2;
}
i.fas.fa-share.share-item-icon {
  font-size: 250%;
  margin-left: 17px;
  margin-top: 10px;
}
.share-item-txt {
  text-align: center;
  color: white;
}
.share-item-icon {
  font-size: 350%;
  padding: 9px 0px 0px 11px;
  color: white;
}
.report-header p {
  font-size: 200%;
  font-weight: 600;
  text-align: center;
  color: #1e87f0;
  padding: 15px 0px 0px 0px;
}
.report-body p {
  text-align: center;
  font-size: 130%;
  padding-bottom: 20px;
}
.report-input-container {
  display: block;
  padding: 10px;
}
.report-other-reason-input {
  width: 100%;
  height: 30px;
  border-radius: 4px;
  border: 1px solid #888888;
}
.other-report-reason {
  text-align: left !important;
  font-weight: 600;
  padding-bottom: 4px !important;
  font-size: 110% !important;
}
.report-body {
  padding: 0px 20px 20px 20px;
}
.report-button-container {
  padding-top: 10px;
}
.share-to-profile-container {
  border: 2px solid #ffffff;
  border-radius: 20px;
  width: 50%;
  padding: 5px;
  margin: 3.5px 0px 3.5px 25%;
}
.share-to-profile-container img {
}
.share-to-profile-text {
  font-size: 12px;
  line-height: 12px;
  text-align: center;
  display: block;
  color: white;
}
</style>
