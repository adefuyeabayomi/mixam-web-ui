<template>
  <section id="search-result">
    <section class="search-header-section">
      <div class="page-header-main">
        <h4>Results</h4>
        <p>
          Results relating to your search for
          <span class="search-term-sp">"{{ searchTerm }}"</span>
        </p>
      </div>
      <vs-divider></vs-divider>
      <div class="sr-filters">
        <div
          @click="setActive('all')"
          class="pointercursor"
          :class="{ 'sr-filter-active': isActive == 'all' }"
        >
          <p>All</p>
        </div>
        <div
          @click="setActive('people')"
          class="pointercursor"
          :class="{ 'sr-filter-active': isActive == 'people' }"
        >
          <p>People</p>
        </div>
        <div
          @click="setActive('posts')"
          class="pointercursor"
          :class="{ 'sr-filter-active': isActive == 'posts' }"
        >
          <p>Posts</p>
        </div>
        <div
          @click="setActive('articles')"
          class="pointercursor"
          :class="{ 'sr-filter-active': isActive == 'articles' }"
        >
          <p>Articles</p>
        </div>
        <div
          @click="setActive('courses')"
          class="pointercursor"
          :class="{ 'sr-filter-active': isActive == 'courses' }"
        >
          <p>Courses</p>
        </div>
        <div
          class="lastdiv pointercursor"
          @click="setActive('tags')"
          :class="{ 'sr-filter-active': isActive == 'tags' }"
        >
          <p>Tags</p>
        </div>
      </div>
      <vs-divider></vs-divider>
    </section>
    <div v-if="totalSearchResults == 0 && isActive == 'all'">
      <p>No results found in all sections!</p>
    </div>
    <section
      id="sr-tags"
      class="search-result-tags-container"
      v-if="(isActive == 'all' && tags.length !== 0) || isActive == 'tags'"
    >
      <div class="srt-header">
        <p>Tags</p>
      </div>
      <div class="srt-content">
        <p>
          <span class="sr-tagitem" v-for="hashitem in hash" :key="hashitem"
            ><a href="#">{{ hashitem.toLowerCase() }}</a></span
          >
        </p>
      </div>
      <div class="tag-result-container" v-if="tags.length !== 0">
        <div
          v-for="result in tags"
          :key="result.aid || result.cid || result.pid"
        >
          <sr-article-item
            @report="submitReportReq"
            v-bind:resdata="result"
            v-if="result.aid"
          ></sr-article-item>
          <sr-post-item
            @report="submitReportReq"
            v-bind:resdata="result"
            v-if="result.pid"
          ></sr-post-item>
          <sr-course-item
            @report="submitReportReq"
            v-bind:resdata="result"
            v-if="result.cid"
          ></sr-course-item>
        </div>
      </div>
      <div class="no-tags-container" v-if="tags.length == 0">
        <p>No results found for tags</p>
      </div>
    </section>
    <vs-divider v-if="isActive == 'all' && people.length !== 0"></vs-divider>
    <section
      id="sr-people"
      class="search-result-people-container"
      v-if="(isActive == 'all' && people.length !== 0) || isActive == 'people'"
    >
      <div class="srt-header">
        <p>People</p>
      </div>
      <div class="srt-content" v-if="people.length !== 0">
        <div class="people-card">
          <div v-for="user in people" :key="user.__mid">
            <user-card :userData="user"></user-card>
          </div>
        </div>
      </div>
      <div class="no-people-container" v-if="people.length == 0">
        <p>No results found for people</p>
      </div>
    </section>
    <vs-divider v-if="isActive == 'all' && posts.length !== 0"></vs-divider>
    <section
      id="sr-post"
      class="search-result-posts-container"
      v-if="(isActive == 'all' && posts.length !== 0) || isActive == 'posts'"
    >
      <div class="srt-header">
        <p>Posts</p>
      </div>
      <div class="sr-post-contents-container" v-if="posts.length !== 0">
        <div v-for="post in posts" :key="post.pid">
          <sr-post-item
            @report="submitReportReq"
            :resdata="post"
          ></sr-post-item>
        </div>
      </div>
      <div class="no-posts-container" v-if="posts.length == 0">
        <p>No results found for Posts</p>
      </div>
    </section>
    <vs-divider v-if="isActive == 'all' && articles.length !== 0"></vs-divider>
    <section
      id="sr-article"
      class="search-result-articles-container"
      v-if="
        (isActive == 'all' && articles.length !== 0) || isActive == 'articles'
      "
    >
      <div class="srt-header">
        <p>Articles</p>
      </div>
      <div class="sr-article-contents-container" v-if="articles.length !== 0">
        <div v-for="article in articles" :key="article.aid">
          <sr-article-item
            @report="submitReportReq"
            :resdata="article"
          ></sr-article-item>
        </div>
      </div>
      <div class="no-articles-container" v-if="articles.length == 0">
        <p>No results found for Articles</p>
      </div>
    </section>
    <vs-divider v-if="isActive == 'all' && courses.length !== 0"></vs-divider>
    <section
      id="sr-courses"
      class="search-result-courses-container"
      v-if="
        (isActive == 'all' && courses.length !== 0) || isActive == 'courses'
      "
    >
      <div class="srt-header">
        <p>Courses</p>
      </div>
      <div class="sr-course-contents-container" v-if="courses.length !== 0">
        <div v-for="course in courses" :key="course.cid">
          <sr-course-item
            @report="submitReportReq"
            :resdata="course"
          ></sr-course-item>
        </div>
      </div>
      <div class="no-courses-container" v-if="courses.length == 0">
        <p>No results found for courses</p>
      </div>
    </section>
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
</template>

<script>
function reverseArray(arr) {
  let returnArr = [];
  for (let count = arr.length - 1; count >= 0; count--) {
    returnArr.push(arr[count]);
  }
  return returnArr;
}
import userCardVue from "@/components/user-card.vue";
import srArticleItemVue from "@/components/sr-article-item.vue";
import srCourseItemVue from "@/components/sr-course-item.vue";
import srPostItemVue from "@/components/sr-post-item.vue";

export default {
  data: function () {
    return {
      MID: JSON.parse(window.localStorage.getItem("userlogindata")).MID,
      DID: JSON.parse(window.localStorage.getItem("userlogindata")).DID,
      results: {},
      isActive: "all",
      reportReason: "",
      otherReason: "",
      reportInfo: {},
      maxWidth: 480,
    };
  },
  computed: {
    shareLink: function () {
      return this.$store.state.shareLink;
    },
    totalSearchResults() {
      let total = [];
      total = total
        .concat(this.tags)
        .concat(this.people)
        .concat(this.posts)
        .concat(this.articles)
        .concat(this.courses);
      return total.length;
    },
    hash: function () {
      let searchInput = this.$route.query.search;
      let hash = [];
      searchInput.split(" ").forEach((x) => {
        hash.push("#" + x);
      });
      hash = hash.filter((x) => {
        return x.length > 3;
      });
      return reverseArray(hash);
    },
    searchTerm: function () {
      return this.$route.query.search;
    },
    people() {
      if (this.results.people) {
        return this.results.people;
      }
      return [];
    },
    tags() {
      if (this.results.tags) {
        return this.results.tags;
      }
      return [];
    },
    posts() {
      if (this.results.posts) {
        return this.results.posts;
      }
      return [];
    },
    articles() {
      if (this.results.articles) {
        return this.results.articles;
      }
      return [];
    },
    courses() {
      if (this.results.courses) {
        return this.results.courses;
      }
      return [];
    },
  },
  methods: {
    search() {
      let url = `${this.$store.state.apiServer}/search/`;
      //let url = "/search/"
      window.axios
        .get(url, {
          params: {
            MID: this.MID,
            DID: this.DID,
            searchInput: this.searchTerm,
            hash: this.hash,
          },
        })
        .then((response) => {
          console.log("search result", response.data.searchResult);
          this.results = response.data.searchResult;
        })
        .catch((error) => {
          console.error("An error occured : ", error.message);
        });
    },
    setActive(tab) {
      this.isActive = tab;
    },
    submitReportReq(event) {
      this.reportInfo = event;
      console.log("report", event);
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
  created: function () {
    this.search();
  },
  components: {
    userCard: userCardVue,
    srPostItem: srPostItemVue,
    srCourseItem: srCourseItemVue,
    srArticleItem: srArticleItemVue,
  },
  watch: {
    searchTerm: function (newVal, oldVal) {
      this.search();
    },
  },
};
</script>

<style lang="scss">
#search-result {
  padding: 10px;
  padding-bottom: 80px;
}
.page-header-main {
}
.page-header-main h4 {
  font-family: highgate-bold;
  font-size: 200%;
  padding-top: 10px;
  font-weight: 600;
}
.page-header-main p {
  font-family: highgate-regular;
  font-size: 90%;
}
.search-term-sp {
  font-weight: 600;
}
.sr-filters {
  display: flex;
}
.sr-filters div {
  width: max-content;
  padding: 0px 30px 0px 4px;
  border-right: 1px solid #cccccc;
}
.sr-filters .lastdiv {
  border-right: 0px solid;
}
.sr-filter-active {
  font-weight: 600;
}
.sr-filter-active:hover {
  cursor: pointer;
}
.srt-header p {
  font-family: highgate-bold;
  font-size: 130%;
}
.sr-tagitem a {
  padding-right: 10px;
  font-family: highgate-regular;
}
.srt-content {
  padding-top: 7px;
}

@import url(https://fonts.googleapis.com/css?family=Open+Sans:600,300);

$brown: #786450;

.frame {
  margin-top: 10px;
  width: max-content;
  height: max-content;
  max-width: 350px;
  border-radius: 2px;
  box-shadow: 1px 2px 10px 0px rgb(0 0 0 / 30%);
  background: #ca7c4e;
  background: linear-gradient(to top right, #43a1ff 0%, #cbe0ff 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#EEBE6C", endColorstr="#CA7C4E",GradientType=1 );
  color: #0f1f2f;
  font-family: "Open Sans", Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 30px 10px 30px 10px;
}

.center {
  height: 299px;
  width: 320px;
  background: #fff;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 10px 10px 15px 0 rgba(0, 0, 0, 0.3);
}

.profile-user {
  float: left;
  width: 200px;
  height: 320px;
  text-align: center;

  .image {
    position: relative;
    width: 70px;
    height: 70px;
    margin: 38px auto 0 auto;

    .circle-1 {
      position: absolute;
      box-sizing: border-box;
      width: 76px;
      height: 76px;
      top: -3px;
      left: -3px;
      border-width: 1px;
      border-style: solid;
      border-color: #1e87f0 #1e87f0 #1e87f0 transparent;
      border-radius: 50%;
      transition: all 1.5s ease-in-out;
    }

    .circle-2 {
      @extend .circle-1;
      width: 82px;
      height: 82px;
      top: -6px;
      left: -6px;
      border-color: #1e87f0 transparent #1e87f0 #1e87f0;
    }

    img {
      display: block;
      border-radius: 50%;
      background: #cbe0ff;
    }

    &:hover {
      cursor: pointer;

      .circle-1 {
        transform: rotate(360deg);
      }

      .circle-2 {
        transform: rotate(-360deg);
      }
    }
  }

  .name {
    font-size: 15px;
    font-weight: 600;
    margin-top: 20px;
  }

  .job {
    font-size: 11px;
    line-height: 15px;
  }

  .actions {
    margin-top: 20px;

    .btn {
      display: block;
      width: 120px;
      height: 30px;
      margin: 0 auto 10px auto;
      background: none;
      border: 1px solid $brown;
      border-radius: 15px;
      font-size: 12px;
      font-weight: 600;
      box-sizing: border-box;
      transition: all 0.3s ease-in-out;
      color: $brown;

      &:hover {
        background: $brown;
        color: #fff;
      }
    }
  }
}

.stats {
  width: 115px;
  float: right;

  .box {
    box-sizing: border-box;
    width: 120px;
    height: 99px;
    background: #cbe0ff;
    text-align: center;
    padding-top: 28px;
    transition: all 0.4s ease-in-out;

    &:hover {
      background: #88b7fe;
      cursor: pointer;
    }

    &:nth-child(2) {
      margin: 1px 0;
    }
  }

  span {
    display: block;
  }

  .value {
    font-size: 18px;
    font-weight: 600;
  }

  .parameter {
    font-size: 11px;
  }
}
</style>
