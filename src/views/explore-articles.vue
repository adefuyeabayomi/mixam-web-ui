<template>
  <section id="article_section">
    <section
      type="article-item"
      id="content-item-container"
      v-for="content in articleFeed"
      :key="content.aid"
    >
      <article-item
        @fetchMoreFeed="fetchArticles"
        @report="relayReport"
        @inview="func()"
        v-bind="content"
      ></article-item>
    </section>
    <section class="loading-content-section">
      <p v-if="fetchingMore">
        Fetching More Articles<span class="ui active inline loader"></span>
      </p>
      <div v-else class="noNewFeedSection">
        <div>
          <p v-if="noNewFeed">Sorry we were not able to find any new article feed content. You can refresh your feed with the button.</p>
        </div>
        <div style="padding-top: 10px;">
          <vs-button @click="fetchArticles()" style="width: 100%; background-color : black !important; color : gray; font-weight : 600"> Load More Articles </vs-button>
        </div>      
      </div>
    </section>
  </section>
</template>

<script>

import articleItem from "../components/article-item.vue";
import shuffle from "shuffle-array";
export default {
  data: function () {
    return {
      MID: JSON.parse(window.localStorage.getItem("userlogindata")).MID,
      DID: JSON.parse(window.localStorage.getItem("userlogindata")).DID,
      userAgent: this.$store.state.__userAgent,
      fetchingMore : false,
      noNewFeed : false,
    };
  },
  computed: {
    articleFeed: function () {
      return this.$store.state.allFeeds.filter(x=>x.aid);
    },
    fetchMoreR: function () {
      return this.$store.state.fetchMoreReachesA;
    },
  },
  methods: {
    fetchArticles(event) {
      this.fetchingMore = true;
      let vuexFeedAction = this.$store.state.feedAction;
      let url = "http://localhost/feed/";
      window.axios
        .get(url, {
          params: {
            MID: this.MID,
            DID: this.DID,
            feedType: "articles",
            userAgent: this.userAgent,
            feedAction: vuexFeedAction,
          },
        })
        .then((response) => {
          this.fetchingMore = false;
          console.log(response.data);
          if (response.data.status == "no-new-feed") {
            this.noNewFeed = true;
            console.log("feed exhausted and no more new feed");
            return;
          }
          this.noNewFeed = false;
          let retrievedArrays =
            response.data.feed || response.data.data.articles;
          let total = shuffle(retrievedArrays)
          total = total.filter(x=> x.aid)
          this.$store.commit("updatefeeds", total)
        })
        .catch((err) => {
          this.fetchingMore = false;
          console.error(err.message);
        });
    },
    relayReport: function (event) {
      console.log("from explore articles - event ", event);
      this.$emit("report", event);
    },
  },
  created: function () {
    //this.fetchArticles();
  },
  components: {
    articleItem,
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
