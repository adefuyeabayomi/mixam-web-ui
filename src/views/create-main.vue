<template>
  <!--design the post blah blah here.-->
  <!--this page is just ui that redirects to the main content creation page.-->
  <section id="create-main-container">
    <section class="create-post-container">
      <div class="create-header">
        <p class="first-cmh">Create Post</p>
      </div>
      <div class="interactive-container">
        <div class="create-post-bg-container post">
          <div class="create-post-text-desc">
            <p>
              Share your ideas, insights, and information with the Mixam
              business community and get feedback from the community.
            </p>
          </div>
          <div class="create-item-image">
            <img src="../assets/bermuda-784.png" />
          </div>
          <div class="cm-button-container">
            <vs-button @click="goToCreatePost()" class="cm-btn" block
              >Create Post <i class="fas fa-paper-plane"></i
            ></vs-button>
          </div>
        </div>
      </div>
    </section>

    <div class="create-item-divider"></div>

    <section class="create-post-container">
      <div class="create-header">
        <p>Write an Article.</p>
      </div>
      <div class="interactive-container">
        <div class="create-post-bg-container article">
          <div class="create-post-text-desc">
            <p>
              Share your ideas, insights, and information with the Mixam
              business community with an interactive piece of writing and get
              feedback from the community.
            </p>
          </div>
          <div class="create-item-image">
            <img src="../assets/asset1fixed.png" />
          </div>
          <div class="cm-button-container">
            <vs-button @click="goToCreateArticle()" class="cm-btn" block
              >Create Article <i class="fas fa-paper-plane"></i
            ></vs-button>
          </div>
        </div>
      </div>
    </section>

    <div class="create-item-divider"></div>

    <section class="create--container">
      <div class="create-header">
        <p>Create Business Course</p>
      </div>
      <div class="interactive-container">
        <div class="create-post-bg-container course">
          <div class="create-post-text-desc">
            <p>
              Help others learn from your own knowledge and experiences. Create
              a business course, book review and other learning medium to impact
              entrepreneurs.
            </p>
          </div>
          <div class="create-item-image">
            <img src="../assets/urban-852.png" />
          </div>
          <div class="cm-button-container">
            <vs-button @click="goToCreateCourse()" class="cm-btn" block
              >Create Business Course <i class="fas fa-paper-plane"></i
            ></vs-button>
          </div>
        </div>
      </div>
    </section>

    <div class="create-item-divider"></div>
    <!--    
        <section class="create-productshowcase-container">
            <div class="create-header">
                <p>Create Product Showcase</p>
            </div>
            <div class="interactive-container">
                <div class="create-post-bg-container pro-s">
                    <div class="create-post-text-desc">
                        <p>Create an amazing product showcase frame today and share with the mixam community and on all your social and advert platforms.</p>
                    </div>
                    <div class="create-item-image">
                        <img src="../assets/bermuda-784.png">
                    </div>
                    <div class="cm-button-container">
                        <vs-button @click="goToCreateProductShowcase()" class="cm-btn" block>Create Product Showcase <i class="fas fa-paper-plane"></i></vs-button>
                    </div>                    
                </div>
            </div>
        </section>
        -->
  </section>
</template>

<script>
export default {
  data: function () {
    return {};
  },
  created: function () {
    this.$store.commit("updatecurrentroute", "create");
  },
  methods: {
    goToCreatePost() {
      this.$router.push("create-post");
    },
    goToCreateArticle() {
      this.$router.push("create-article");
    },
    goToCreateCourse() {
      this.$router.push("create-course");
    },
    goToCreateProductShowcase() {
      this.$router.push("create-product-showcase");
    },
  },
};
</script>

<style lang="scss">
#create-main-container {
  padding: 0px 15px 0px 15px;
  padding-bottom: 100px;
}
.create-header p {
  text-align: center;
  font-family: antipasto-bold;
  font-size: 150%;
  padding-top: 100px;
  color: #445664;
}
.create-post-bg-container {
  /*background-image: url("");*/
  background-color: gray;
  border-radius: 25px;
  padding: 15px;
  text-align: center;
  color: white;
  background-size: cover;
  margin-top: 10px;
}
.create-post-bg-container.post {
  background-image: url("../assets/create-main-bgs/post.png");
}
.create-post-bg-container.article {
  background-image: url("../assets/create-main-bgs/article.png");
}
.create-post-bg-container.course {
  background-image: url("../assets/create-main-bgs/course.png");
}
.create-post-bg-container.pro-s {
  background-image: url("../assets/create-main-bgs/product-s.png");
}
.create-post-text-desc p {
  width: 80%;
  margin: 0px auto;
  padding-top: 15px;
  font-weight: 600;
}
.create-item-image img {
  width: 50%;
  display: block;
  margin: 0px auto;
  color: white;
}
.cm-btn {
  width: 100%;
  display: block;
  margin: 15px auto;
  border-radius: 5px;
  height: 30px;
}
.first-cmh {
  padding-top: 30px !important;
}
</style>
