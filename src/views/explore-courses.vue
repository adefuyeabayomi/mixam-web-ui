<template>
  <section id="course_section">
    <section
      type="course-item"
      id="content-item-container"
      v-for="content in courseFeed"
      :key="content.cid"
    >
      <course-item
        @fetchMoreFeed="fetchCourses"
        @report="relayReport"
        v-bind="content"
      ></course-item>
    </section>
    <section class="loading-content-section">
      <p v-if="fetchingMore">
        Fetching More Courses<span class="ui active inline loader"></span>
      </p>
      <div v-else class="noNewFeedSection">
        <div>
          <p v-if="noNewFeed">Sorry we were not able to find any new course feed content. You can refresh your feed with the button.</p>
        </div>
        <div style="padding-top: 10px;">
          <vs-button @click="fetchCourses()" style="width: 100%; background-color : black !important; color : gray; font-weight : 600"> Load More Courses</vs-button>
        </div>      
      </div>
    </section>
  </section>
</template>

<script>
import courseItem from "../components/courses-item.vue";
import shuffle from "shuffle-array";
export default {
  data: function () {
    return {
      MID: JSON.parse(window.localStorage.getItem("userlogindata")).MID,
      DID: JSON.parse(window.localStorage.getItem("userlogindata")).DID,
      fetchingMore : false,
      noNewFeed : false,
    };
  },
  methods: {
    fetchCourses(event) {
      this.fetchingMore = true;
      let vuexFeedAction = this.$store.state.feedAction;
      let url = `${this.$store.state.apiServer}/feed/`;
      window.axios
        .get(url, {
          params: {
            MID: this.MID,
            DID: this.DID,
            feedType: "courses",
            feedAction: vuexFeedAction,
          },
        })
        .then((response) => {
          this.fetchingMore = false;
          // response.data.status can either be success, failed or no-new-feeds
          if (response.data.status == "no-new-feed") {
            this.noNewFeed = true;
            console.log("feed exhausted and no more new feed");
            return;
          }
          this.noNewFeed = false;
          console.log(response.data);
          let retrievedArrays =
            response.data.feed || response.data.data.courses;
          let total = shuffle(retrievedArrays);
          this.$store.commit("updatefeeds", total)
        })
        .catch((err) => {
          this.fetchingMore = false;
          console.error(err.message);
        });
    },
    relayReport: function (event) {
      console.log("from explore courses - event ", event);
      this.$emit("report", event);
    },
  },
  computed: {
    courseFeed: function () {
      return this.$store.state.allFeeds.filter(x=>x.cid);
    },
    fetchMoreR: function () {
      return this.$store.state.fetchMoreReachesC;
    },
  },
  created: function () {
    //this.fetchCourses();
  },
  components: {
    courseItem,
  },
};
</script>

<style lang="scss">
.no-feed-style {
  font-size: 200%;
  font-family: "signika-regular";
  font-weight: 900;
  color: gray;
  padding-top: 25px;
}
</style>
