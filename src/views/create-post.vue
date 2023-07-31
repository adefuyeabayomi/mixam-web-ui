<template>
  <section class="create-post-container">
    <!--the post page accepts the users post params i.e post title,-->
    <div class="page-title-container">
      <p>Create Post</p>
    </div>
    <div class="page-desc-container">
      <p><i class="fas fa-bulb"></i>Share your thoughts and ideas.</p>
    </div>
    <section id="post-form-container">
      <form enctype="multipart/form-data" id="create-post">
        <div class="post_body_input_container">
          <textarea
            v-model="postbody"
            placeholder="Write Something here"
            class="content_box post_body"
          ></textarea>
        </div> 
        <div class="add_link_input">
          <input
            class="content_input post_link_input"
            placeholder="Add link here (optional)"
            v-model="postlink"
            type="text"
          />
        </div>
        <form enctype="multipart/form-data" id="photoform">
          <div class="upload_img_vid_container">
            <!--<p>Add Image</p>-->
            <p class="upload-text">Upload a Photo</p>
            <div class="fileinput_container">
              <input
                id="postpic"
                type="file"
                name="postpic"
                placeholder="Upload Image"
                class="post_image_input"
              />
            </div>
          </div>
        </form>
        <div class="hashtags_container">
          <p class="tags_container">
            <span
              class="hashtag"
              v-for="hashtag in hashtags"
              v-bind:key="hashtag.id"
              >{{ hashtag.keyword }}</span
            ><span class="add_hashtag_button" @click="openHashTagPrompt()">
              Add Hashtag <i class="fas fa-plus"></i>
            </span>
          </p>
          <modal
            class="hashtagprompt"
            name="hashTagPrompt"
            :adaptive="true"
            height="auto"
            :max-width="maxWidth"
            width="90%"
          >
            <section class="hashtaginputcontainer">
              <input
                v-model="currentHashtag"
                class="content_input"
                placeholder="Add your hashtag"
              />
              <vs-button class="add-hashtag-button" @click="addHashtag()"
                >Add Hashtag <i class="fas fa-plus"></i
              ></vs-button>
            </section>
          </modal>
        </div>
      </form>
      <div class="post-button-container publish_post_container">
        <vs-button class="post-button" @click="validatePost()" block
          >Post <i class="fas fa-paper-plane"></i
        ></vs-button>
      </div>
    </section>
  </section>
</template>

<script>
//every create page sends a post request
export default {
  data: function () {
    return {
      postbody: "",
      postlink: "",
      hashtags: [],
      maxWidth: 480,
      currentHashtag: "",
      userAgent: this.$store.state.__userAgent,
    };
  },
  created: function () {
    this.$store.commit("updatecurrentroute", "create");
  },
  methods: {
    async sendPostCloudinaryReq(){
      this.$vs.loading();
      let file = document.getElementById("postpic").files[0];
      const url = "https://api.cloudinary.com/v1_1/mixambusiness/image/upload";
      const formData = new FormData();
      formData.append("file",file);
      formData.append("upload_preset","skmmp7bt");
      return await window.axios.post(url,formData);
    },
    openHashTagPrompt: function () {
      this.$modal.show("hashTagPrompt");
    },
    addHashtag: function () {
      let hashTagObj = {
        id: this.hashtags.length,
        keyword: "#" + this.currentHashtag,
      };
      this.hashtags.push(hashTagObj);
      this.currentHashtag = "";
      this.$modal.hide("hashTagPrompt");
    },
    validatePost: function () {
      // check to make sure that at least the post body is present.
      if (this.postbody === "") {
        this.$modal.show("dialog", {
          title: "Add content for the post",
          text: "Please add some text for your post before you can proceed",
          buttons: [
            {
              title: "Okay",
              handler: () => {
                this.$modal.hide("dialog");
              },
            },
          ],
        });
      } else {
        this.sendPost();
      }
      // if the post is okay send the request of notify tthe
      //userto input a post body withe a ui notiicatio of red border for the ompusolry ones
    },
    sendPost: async function () {
      // axios.post();
      let MID = JSON.parse(window.localStorage.getItem("userlogindata")).MID,
        DID = JSON.parse(window.localStorage.getItem("userlogindata")).DID;

      let postbody = this.postbody;
      let postlink = this.postlink;
      let hashtags = this.hashtags;
      let actiontype = "init";
      let photoUploaded =
        document.getElementById("postpic").value !== "" ? true : false; 
        //let url = "/publishpost/";
      let formData = new FormData(); 
      let photoUrl;
      if(photoUploaded){
        photoUrl = await this.sendPostCloudinaryReq().catch(()=>{
        this.$vs.loading.close();
        });
               
      }
      let url = "http://localhost/publishpost/";
      //formdata;

      formData.append(
        "params",
        JSON.stringify({
          MID,
          DID,
          postbody,
          postlink,
          hashtags,
          photoUploaded,
          photoUrl : photoUrl.data.url,
          actiontype,
          userAgent: this.userAgent,
        })
      );
      window.axios
        .post(url, formData)
        .then((response) => {
          this.$vs.loading.close();
          if (response.data.status == "success") {
            console.log("response.data", response.data);
            this.$modal.show("dialog", {
              title: "done",
              text: "Your post has been published",
              buttons: [
                {
                  title: "Okay",
                  handler: () => {
                    this.$modal.hide("dialog");
                  },
                },
              ],
            });
            this.$router.push("create-main");
          } else {
            this.$modal.show("dialog", {
              title: "Server Error",
              text: "Your post has not been published" + response.data.reason,
              buttons: [
                {
                  title: "Okay",
                  handler: () => {
                    this.$modal.hide("dialog");
                  },
                },
              ],
            });
          }
        })
        .catch((error) => {
          this.$vs.loading.close();
          this.$modal.show("dialog", {
            title: "Something Went Wrong",
            text: error.message,
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
    },
  },
};
</script>

<style lang="scss">
.page-title-container {
  font-size: 200%;
  font-family: antipasto-bold;
  text-align: center;
  margin-top: 30px;
}
.page-desc-container {
  font-size: 150%;
  font-weight: 600;
  width: max-content;
  text-align: center;
  margin: 10px auto;
}
.create-post-container {
  padding: 15px;
}
.add-hashtag-button {
  width: max-content;
  padding-left: 7px;
  padding-right: 7px;
  display: block;
  text-align: center;
  margin: 0px auto;
  margin-top: 7px;
}
.add_hashtag_button {
  border-radius: 6px;
  padding: 3px;
  padding-left: 12px;
  padding-right: 12px;
  color: #ffffff;
  border: 2px solid #42c4ff;
  background: #03a9f4;
}
.hashtaginputcontainer {
  padding: 15px;
}
.hashtagprompt {
  padding: 15px;
}
.hashtags_container {
  padding-top: 15px;
}
.tags_container {
  padding: 5px;
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid #b7d0db;
}
span.hashtag {
  background: #cbe0ff;
  border-radius: 5px;
  padding: 3px 10px 3px 10px;
  margin-right: 10px;
}
.hashtahsbox {
  background-color: #b1e9ffdc;
  margin: 2px 5px;
  padding: 3px 5px;
  display: inline-block;
}
.content_box {
  width: 100%;
  border-radius: 10px;
  height: 100px;
  border: 2px solid gray;
}
.content_input {
  width: 100%;
  border-radius: 5px;
  border: 2px solid gray;
  height: 36px;
  margin-top: 15px;
}
.fileinput_container {
  padding: 5px;
  border: 2px solid gray;
  border-radius: 5px;
}
.upload-text {
  font-size: 100%;
  font-weight: 500;
  margin-top: 10px !important;
}
.hashtag-button {
  width: 30%;
  background: #ffab30;
  border-radius: 3px;
  padding: 0px 4px;
  margin-top: 10px !important;
  margin-bottom: 10px !important;
  color: white;
  position: relative;
  left: 70%;
  text-align: center;
}
.post-button {
  display: block;
  width: 100%;
  margin: 50px 0px;
}
</style>
