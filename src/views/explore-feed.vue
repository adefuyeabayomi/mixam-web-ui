<template>
  <section id="feed_section">
    <section
      :type="content.type"
      id="content-item-container"
      v-for="content in allFeed"
      :key="content.pid || content.aid || content.cid"
    >
      <post-item
        @report="relayReport"
        @fetchMoreFeed="fetchFeed"
        v-if="content.pid"
        v-bind="content"
      ></post-item>
      <article-item
        @report="relayReport"
        @fetchMoreFeed="fetchFeed"
        v-if="content.aid"
        v-bind="content"
      ></article-item>
      <course-item
        @report="relayReport"
        @fetchMoreFeed="fetchFeed"
        v-if="content.cid"
        v-bind="content"
      ></course-item>
    </section>
    <section class="loading-content-section">
      <p v-if="fetchingMore">
        Fetching More Feed<span class="ui active inline loader"></span>
      </p>
      <div v-else class="noNewFeedSection">
        <div>
          <p v-if="noNewFeed">Sorry we were not able to find any new feed content. You can refresh your feed with the button.</p>
        </div>
        <div style="padding-top: 10px;">
          <vs-button @click="fetchFeed()" style="width: 100%; background-color : black !important; color : gray; font-weight : 600"> Load More Feed</vs-button>
        </div>      
      </div>
    </section>
  </section>
</template>

<script>
import postItem from "../components/post-item.vue";
import articleItem from "../components/article-item.vue";
import courseItem from "../components/courses-item.vue";
import shuffle from "shuffle-array";

export default {
  data: function () {
    return {
      feed: [],
      MID: JSON.parse(window.localStorage.getItem("userlogindata")).MID,
      DID: JSON.parse(window.localStorage.getItem("userlogindata")).DID,
      count: true,
      fetchingMore : true,
      noNewFeed : false,
    };
  },
  computed: {
    allFeed: function () {
      return this.$store.state.allFeeds;
    },
    fetchMoreR: function () {
      return this.$store.state.fetchMoreReachesF;
    },
  },
  methods: {
    fetchFeed(event) {
      this.fetchingMore = true;
      let vuexFeedAction = this.$store.state.feedAction;
      let url = "http://localhost/feed/";
      window.axios
        .get(url, {
          params: {
            MID: this.MID,
            DID: this.DID,
            feedType: "all",
            feedAction: vuexFeedAction,
          },
        })
        .then((response) => {
          this.fetchingMore = false;
          this.noNewFeed = false;
          if (response.data.status == "no-new-feed") {
            this.noNewFeed = true;
            console.log("feed exhausted and no more new feed");
            return;
          }
          this.noNewFeed = false;
          console.log("fetched feed", response.data);
          let retrievedArrays = response.data.data || response.data.feed;
          let posts = retrievedArrays.posts;
          let articles = retrievedArrays.articles;
          let courses = retrievedArrays.courses;
          let total = posts.concat(articles).concat(courses);
          total = shuffle(total);
          this.$store.commit("updatefeeds", total)           
        })
        .then(()=>{
          this.$store.commit("updatefeedaction","create-new")
        })
        .catch((error) => {
          this.fetchingMore = false;
          console.log(error);
        });
    },
    relayReport: function (event) {
      console.log("from explore feed - event ", event);
      this.$emit("report", event);
    },
  },
  components: {
    postItem,
    articleItem,
    courseItem,
  },
  created: function () {
    this.fetchFeed();
  },
};
</script>

<style lang="scss">
.ui.loader:before,
.ui.loader:after {
  width: 1.285714rem !important;
  height: 1.285714rem !important;
}
.loading-content-section p , .loading-content-section{
  text-align: center;
  padding-top: 15px;
}
span.ui.active.inline.loader {
  margin-left: 10px !important;
  position: relative;
  top: 3px;
}
.no-feed-style {
  font-size: 200%;
  font-family: "signika-regular";
  font-weight: 900;
  color: gray;
  padding-top: 25px;
}
.noNewFeedSection{
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px #bfcdd3;
}
</style>
