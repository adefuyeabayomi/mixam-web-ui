<template>
  <section id="post_section">
    <section
      type="post-item"
      id="content-item-container"
      v-for="content in postFeed"
      :key="content.pid"
    >
      <post-item
        @fetchMoreFeed="fetchPosts"
        @report="relayReport"
        v-bind="content"
      ></post-item>
    </section>
    <section class="loading-content-section">
      <p v-if="fetchingMore">
        Fetching More Posts<span class="ui active inline loader"></span>
      </p>
      <div v-else class="noNewFeedSection">
        <div>
          <p v-if="noNewFeed">Sorry we were not able to find any new posts feed content. You can refresh your feed with the button.</p>
        </div>
        <div style="padding-top: 10px;">
          <vs-button @click="fetchPosts()" style="width: 100%; background-color : black !important; color : gray; font-weight : 600"> Load More Posts</vs-button>
        </div>      
      </div>
    </section>
  </section>
</template>

<script>
import shuffle from "shuffle-array";
import postItem from "../components/post-item.vue";

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
    fetchPosts(event) {
      this.fetchingMore = true;
      let vuexFeedAction = this.$store.state.feedAction;
      let url = `${this.$store.state.apiServer}/feed/`;
      window.axios
        .get(url, {
          params: {
            MID: this.MID,
            DID: this.DID,
            feedType: "posts",
            feedAction: vuexFeedAction,
          },
        })
        .then((response) => {
          this.fetchingMore = false;
          if (response.data.status == "no-new-feed") {
            this.noNewFeed = true;
            console.log("feed exhausted and no more new feed");
            return;
          }
          this.noNewFeed = false;
          console.log(response.data);
          let retrievedArrays = response.data.feed || response.data.data.posts;
          let total = shuffle(retrievedArrays);
          this.$store.commit("updatefeeds", total)
        })

        .catch((err) => {
          this.fetchingMore = false;
          console.error(err.message);
        });
    },
    relayReport: function (event) {
      console.log("from explore post - event ", event);
      this.$emit("report", event);
    },
  },
  computed: {
    postFeed: function () {
      return this.$store.state.allFeeds.filter(x=>x.pid);
    },
    fetchMoreR: function () {
      return this.$store.state.fetchMoreReachesP;
    },
  },
  created: function () {
    //this.fetchPosts();

  },
  components: {
    postItem,
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
