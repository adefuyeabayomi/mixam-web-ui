<template>
  <section>
    <section v-if="inmain" id="create-article-main">
      <div class="page-title-container">
        <p>Create Article</p>
      </div>
      <div class="page-desc-container">
        <p><i class="fas fa-bulb"></i>Create an article to share your ideas.</p>
      </div>
      <section id="article-form-container">
        <div class="article-title-container">
          <input
            v-model="articleTitle"
            @blur="save('updateArticleTitle')"
            type="text"
            placeholder=" Input Article Title Here..."
            class="article_title_input content_input"
          />
        </div>
        <div class="upload_img_vid_container">
          <p class="upload-text">
            <span v-if="showUploadInit"
              >Upload cover image For the article (Optional) :</span
            >
            <span v-if="!showUploadInit"
              >Already uploaded a cover picture, Change it below
              (optional)</span
            >
          </p>
          <form
            class="fileinput"
            enctype="multipart/form-data"
            id="article-cover-image"
          >
            <input
              id="coverimageinput"
              @change="save('updateArticleCoverImage')"
              type="file"
              placeholder="Upload Image"
              class="post_image_input"
            />
          </form>
        </div>
        <div class="hashtags_container">
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
          <p class="hashtag_desc">
            Help the right audience find your article, add hashtags.
          </p>
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
        </div>
        <div class="function01_container">
          <div class="title content_title_container">
            <div><p class="article_content_title">Article Content</p></div>
            <div>
              <div class="add_new_section">
                <p
                  class="add_new_section_button pointercursor"
                  @click="addNewSection()"
                >
                  Add New Section <i class="fas fa-plus"></i>
                </p>
              </div>
            </div>
          </div>
          <div class="section_title_desc">Section Title</div>
          <div
            class="section_container"
            v-for="section in articleSections"
            v-bind:key="section.id"
          >
            <div class="section_id">
              <p class="section_title">{{ section.title }}</p>
            </div>
            <div class="edit_container">
              <p
                @click="moveToEditSection(section.id)"
                class="edit_section_button"
              >
                Edit <span class="hidden-this">This </span>Section
                <i class="fas fa-pen"></i>
              </p>
              <p
                class="delete_section_button"
                @click="openSectionDeletePrompt(section.id)"
              >
                <i class="fas fa-archive delete_section_icon"></i>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section class="function02">
        <div>
          <p class="pointercursor" @click="autoSaveIndicate()">
            Save as draft <i class="fas fa-save"></i>
          </p>
        </div>
        <div>
          <p class="p02" @click="moveToPreview('preview')">
            Preview <i class="fas fa-eye"></i>
          </p>
        </div>
      </section>
      <section>
        <vs-button
          @click="publishDraft('publish')"
          v-if="!published"
          class="post_article_button"
          block
          >Publish Article <i class="fas fa-paper-plane"></i
        ></vs-button>
        <vs-button
          @click="publishDraft('unpublish')"
          v-if="published"
          class="post_article_button"
          block
          >Unpublish Article <i class="fas fa-paper-plane"></i
        ></vs-button>
      </section>
    </section>
    <section v-if="inedit" id="editSection">
      <!--edit title coming up
            <div class="edit-title-container">
                <p>Edit Article Section Below.<p>
                <p>
                    <button class="goBack" @click="back()"><i class="fas fa-arrow-left"></i> Go Back</button>
                    <button @click="saveSection()" class="save"><i class="fas fa-save"></i> Save Progress</button>
                </p>
            </div>
            <div class="section-title">
                <p>Add Section Title :</p>
                <input type="text" class="section-title-input">
            </div>
            <div class="section-img">
                <p>Add Image : </p>
                <form enctype="multipart/form-data" id="section-img-container">
                    <input type="file" class="section-img-input">
                </form>
            </div>
            <div class="section-content">
                <p>Add Section Content : </p>
                <textarea class="section_content"></textarea>
            </div>-->
      <div class="tools_container_main">
        <div class="top_tools">
          <div class="top01">
            <div v-if="false">
              <p class="edit_section_title">Edit Section</p>
            </div>
            <div class="otherFunctions">
              <span class="edit_section_title">Edit Section</span>
              <button class="editbtn01 done_button" @click="autoSaveIndicate()">
                Save <i class="fas fa-save"></i>
              </button>
              <button class="editbtn02 done_button" @click="back()">
                Go Back <i class="fas fa-arrow-left"></i>
              </button>
            </div>
          </div>
          <div class="tools_wrapper">
            <div class="tools_container">
              <span class="tools_text">Tools : </span>
              <button class="insert_tool_btn" @click="addParagraph()">
                Add Paragraph
              </button>
              <button class="insert_tool_btn" @click="addSubheading()">
                Add Sub_Heading
              </button>
              <button class="insert_tool_btn" @click="addImage()">
                Add Image
              </button>
            </div>
          </div>
        </div>
        <div class="bottom_divider_tools"></div>
        <!--so we have the edit and render in one box.-->
      </div>
      <div class="space-opener"></div>
      <!--Create First Edit and render box
                use the v - if directive to select which type= of edit / render document to display
            -->
      <div class="titlebox">
        <div
          v-if="!editActive || !(editActive && presentContentItem == 'title')"
          class="renderbox"
        >
          <div class="function_box">
            <div class="editFunction">
              <p
                class="fi_container pointercursor"
                @click="openEditBox('title')"
              >
                <i class="fas fa-pen"></i>
              </p>
            </div>
          </div>
          <div class="render_content_container">
            <p>{{ title }}</p>
          </div>
        </div>
        <div v-if="editActive && presentContentItem == 'title'" class="editbox">
          <textarea
            v-model="title"
            class="content_box title_content_box"
            :placeholder="sections[currentSection].title.placeholder"
            name="article-title"
          ></textarea>
          <div class="done_container">
            <button @click="save('updateSectionTitle')" class="done_button">
              Done <i class="fas fa-check"></i>
            </button>
          </div>
        </div>
      </div>
      <div v-for="item in currentContentItems" :key="item.id">
        <div v-if="item.contentType == 'subheading'" class="subheadingbox">
          <div
            v-if="!editActive || !(editActive && presentContentItem == item.id)"
            class="renderbox"
          >
            <div class="function_box">
              <!--onclick, of the edit button, change the currentSection to items.-->
              <div class="editFunction">
                <p
                  class="fi_container pointercursor"
                  @click="openEditBox(item.id)"
                >
                  <i class="fas fa-pen"></i>
                </p>
              </div>
              <div class="deleteFunction">
                <p
                  class="fi_container pointercursor"
                  @click="openContentDeletePrompt(currentSection, item.id)"
                >
                  <i class="fas fa-archive"></i>
                </p>
              </div>
            </div>
            <div class="render_content_container">
              <p class="edit_article_subheading">{{ item.content }}</p>
            </div>
          </div>
          <div
            v-if="editActive && presentContentItem == item.id"
            class="editbox"
          >
            <textarea
              v-model="currentContentItem"
              class="content_box"
              placeholder="Input a subheading..."
              name="article-subheading"
            ></textarea>
            <div class="done_container">
              <button @click="save('updateContentItem')" class="done_button">
                Done <i class="fas fa-check"></i>
              </button>
            </div>
          </div>
        </div>
        <div v-if="item.contentType == 'paragraph'" class="paragrahpbox">
          <div
            v-if="!editActive || !(editActive && presentContentItem == item.id)"
            class="renderbox"
          >
            <div class="function_box">
              <!--onclick, of the edit button, change the currentSection to items.-->
              <div class="editFunction">
                <p
                  class="fi_container pointercursor"
                  @click="openEditBox(item.id)"
                >
                  <i class="fas fa-pen"></i>
                </p>
              </div>
              <div class="deleteFunction">
                <p
                  class="fi_container pointercursor"
                  @click="openContentDeletePrompt(currentSection, item.id)"
                >
                  <i class="fas fa-archive"></i>
                </p>
              </div>
            </div>
            <div class="render_content_container">
              <p v-html="generateHTML(item.content)"></p>
            </div>
          </div>
          <div
            v-if="editActive && presentContentItem == item.id"
            class="editbox"
          >
            <textarea
              v-model="currentContentItem"
              class="content_box"
              placeholder="Edit your paragraph here"
              name="article-paragraph"
            ></textarea>
            <div class="done_container">
              <button @click="save('updateContentItem')" class="done_button">
                Done <i class="fas fa-check"></i>
              </button>
            </div>
          </div>
        </div>
        <div v-if="item.contentType == 'image'" class="imagebox">
          <div
            v-if="!editActive || !(editActive && presentContentItem == item.id)"
            class="renderbox"
          >
            <div class="function_box">
              <!--onclick, of the edit button, change the currentSection to items.-->
              <div class="editFunction">
                <p
                  class="fi_container pointercursor"
                  @click="openEditBox(item.id)"
                >
                  <i class="fas fa-pen"></i>
                </p>
              </div>
              <div class="deleteFunction">
                <p
                  class="fi_container pointercursor"
                  @click="openContentDeletePrompt(currentSection, item.id)"
                >
                  <i class="fas fa-archive"></i>
                </p>
              </div>
            </div>
            <div class="render_content_container">
              <img :src="item.content" alt="article image" />
            </div>
          </div>
          <div
            :class="{ hidden: !(editActive && presentContentItem == item.id) }"
            class="editbox"
          >
            <div class="upload_img_vid_container">
              <p class="upload-text">Add Image To this section :</p>
              <form class="fileinput" enctype="multipart/form-data">
                <input
                  :id="item.realid"
                  type="file"
                  placeholder="Upload Image"
                  @change="updateImage()"
                  class="post_image_input"
                />
              </form>
            </div>
            <div class="done_container">
              <button @click="save('updateContentItem')" class="done_button">
                Done <i class="fas fa-check"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section v-if="inpreview" id="preview">
      <article-preview
        :title="articleTitle"
        :date="date"
        :author="$store.state.userAccountInfo.username"
        :coverImage="coverImage"
        :sections="sections"
      ></article-preview>
    </section>
  </section>
  <!---->
</template>

<script>
// on change of any of the input params, call the save function and initialize auto save(if unsaved is true) after which you can then use individual save functions to do autosave()
import articlePreviewVue from "@/components/article-preview.vue";
export default {
  data: function () {
    return {
      hashtags: [],
      hashtag: "",
      currentHashtag: "",
      maxWidth: 480,
      sections: [
        {
          id: 0,
          title: {
            id: "0",
            contentType: "title",
            content: "Section Heading/Title Here",
            placeholder: "Input your article title here",
          },
          contentItems: [],
        },
      ],
      currentSection: 0,
      presentContentItem: "title",
      renderOpen: true,
      editActive: true,
      articleTitle: "untitled",
      aid: undefined, 
      saved: undefined,
      MID: JSON.parse(window.localStorage.getItem("userlogindata")).MID,
      DID: JSON.parse(window.localStorage.getItem("userlogindata")).DID,
      userAgent: this.$store.state.__userAgent,
      addedToDrafts: false,
      alreadyPublished: false,
      date: String(new Date()).split(" ").slice(0, 4).join(" "),
      coverImage: "",
      articleData : {}
    };
  },
  created: function () {
    // check if it is a new article. check the route for the id parameter. if it exists the n it is not a new article.
    this.$store.commit("updatecurrentroute", "create");
    let articleID = this.$route.query.aid;
    console.log(articleID), "Article ID";
    if (articleID !== undefined) {
      this.saved = true;
      this.aid = articleID;
      this.$vs.loading({ text: "Fetching your draft. Please Wait." });
      return this.getArticleContent(articleID);
    } else {
      this.saved = false;
      this.aid =
        String(Math.round(Math.random() * 10000000)) +
        JSON.parse(window.localStorage.getItem("userlogindata")).MID;
      this.__reqSaveInit();
      console.log("saved", this.saved, "newArticleID", this.aid);
      return;
    }
  },
  computed: {
    published: function () {
      return this.alreadyPublished;
    },
    sectionID: {
      set: function (value) {
        this.sections[value] = value;
      },
      get: function () {
        return this.sections.length;
      },
    },
    articleSections() {
      let sectionsArray = [];
      for (let each of this.sections) {
        sectionsArray.push({ id: each.id, title: each.title.content });
      }
      return sectionsArray;
    },
    currentContentItems: function () {
      let arr = this.sections[this.currentSection].contentItems;
      console.log(arr);
      return arr;
    },
    title: {
      set(value) {
        this.sections[this.currentSection].title.content = value;
      },
      get() {
        console.log(this.sections[this.currentSection].title.content);
        return this.sections[this.currentSection].title.content;
      },
    },
    currentContentItem: {
      set(value) {
        this.sections[this.currentSection].contentItems[
          this.presentContentItem
        ].content = value;
      },
      get() {
        return this.sections[this.currentSection].contentItems[
          this.presentContentItem
        ].content;
      },
    },
    inmain() {
      let hash = this.$route.hash;
      return hash == "";
    },
    inedit() {
      let hash = this.$route.hash;
      return hash == "#edit";
    },
    inpreview() {
      let hash = this.$route.hash;
      return hash == "#preview";
    },
    showUploadInit() {
      if (this.articleData) {
        if (this.saved && !this.articleData) {
          return true;
        } else if (this.saved && this.articleData.coverImage == "") {
          return true;
        } else {
          return false;
        }
      }
      return true;
    },
  },
  methods: {
    async sendPostCloudinaryReqCover(){
      this.$vs.loading();
      let file = document.getElementById("coverimageinput").files[0];
      const url = "https://api.cloudinary.com/v1_1/mixambusiness/image/upload";
      const formData = new FormData();
      formData.append("file",file);
      formData.append("upload_preset","skmmp7bt");
      return await window.axios.post(url,formData);
    },
    async sendPostCloudinaryReqContentImg(){
      this.$vs.loading();
      let file = document.getElementById(
          this.sections[this.currentSection].contentItems[
            this.presentContentItem
          ].realid
        ).files[0];
      console.log("file", file);
      const url = "https://api.cloudinary.com/v1_1/mixambusiness/image/upload";
      const formData = new FormData();
      formData.append("file",file);
      formData.append("upload_preset","skmmp7bt");
      return await window.axios.post(url,formData).catch(()=>{
        this.$vs.loading.close();
      });
    },
    addNewSection() {
      let sectionObj = {
        id: "",
        title: {
          id: "",
          contentType: "title",
          content: "Section Title/Heading",
          placeholder: "Add Section Title/Heading Here",
        },
        contentItems: [],
      };
      sectionObj.id = this.sections.length;
      this.sections.push(sectionObj);
      this.save("addNewSection");
    },
    addParagraph() {
      // on addition of the stuff, change current and renderOpen
      let contentObj = {
        id: "",
        contentType: "paragraph",
        content: "",
      };
      contentObj.id = this.sections[this.currentSection].contentItems.length;
      this.sections[this.currentSection].contentItems.push(contentObj);
      console.log(this.sections[this.currentSection].contentItems);
      this.presentContentItem = contentObj.id;
      this.editActive = true;
      console.log(contentObj.id);
      this.save("addContentItem");
    },
    addSubheading() {
      let contentObj = {
        id: "",
        contentType: "subheading",
        content: "",
      };
      contentObj.id = this.sections[this.currentSection].contentItems.length;
      this.sections[this.currentSection].contentItems.push(contentObj);
      this.presentContentItem = contentObj.id;
      console.log(contentObj.id);
      this.editActive = true;
      this.save("addContentItem");
    },
    addImage() {
      let contentObj = {
        id: "",
        contentType: "image",
        content: "",
        realid: "",
        // replaced by cloudinary url
      };
      contentObj.realid =
        "articleEdit" + String(Math.round(Math.random() * 100000000)) + "img";
      contentObj.id = this.sections[this.currentSection].contentItems.length;
      this.sections[this.currentSection].contentItems.push(contentObj);
      this.presentContentItem = contentObj.id;
      this.editActive = true;
      console.log(contentObj.id);
      this.save("addContentItem");
    },
    openContentDeletePrompt(sid, ciid) {
      this.$modal.show("dialog", {
        title: "Are you sure want to delete this content?",
        buttons: [
          {
            title: "Cancel",
            handler: () => {
              this.$modal.hide("dialog");
            },
          },
          {
            title: "Delete",
            handler: () => {
              this.$modal.hide("dialog");
              this.deleteContentItem(sid, ciid);
            },
          },
        ],
      });
    },
    openSectionDeletePrompt(sid) {
      this.$modal.show("dialog", {
        title: "Are you sure want to continue with this action",
        buttons: [
          {
            title: "Cancel",
            handler: () => {
              this.$modal.hide("dialog");
            },
          },
          {
            title: "Delete",
            handler: () => {
              this.$modal.hide("dialog");
              this.deleteSection(sid);
            },
          },
        ],
      });
    },
    deleteSection(id) {
      // after updating the ui,
      // send the request.
      // update the dom by removing the deleted section object
      this.sections.splice(id, 1);
      let counter = 0;
      for (let each of this.sections) {
        each.id = counter;
        counter++;
      }
      // after update, send request to update the database.
      this.save("deleteSection", id);
    },
    deleteContentItem(sectionID, contentItemID) {
      this.sections[sectionID].contentItems.splice(contentItemID, 1);
      let counter = 0;
      for (let each of this.sections[sectionID].contentItems) {
        each.id = counter;
        counter++;
      }
      console.log("deleted the content item successfully from DOM");
      // send request here
      //this.__reqDeleteContentItem(sectionID,contentItemID);
      this.save("deleteContentItem", { sectionID, contentItemID });
    },
    updateImage() {
      // render and add id
      //this.sections[this.currentSection].contentItems[this.presentContentItem]
      console.log("updating image in the front-end only");
      let contentItem =
        this.sections[this.currentSection].contentItems[
          this.presentContentItem
        ];
      contentItem.content = window.URL.createObjectURL(
        document.getElementById(contentItem.realid).files[0]
      );
      console.log(contentItem.content);
      this.editActive = false;
      this.save("updateContentItem");
    },
    openEditBox(value) {
      this.editActive = true;
      this.presentContentItem = value;
    },
    closeEditBox() {
      this.editActive = false;
    },
    moveToPreview(currentSection) {
      //preview the article
      this.$router.push({ path: "create-article#preview" });
      this.currentSection = currentSection;
    },
    moveToEditSection(currentSection) {
      //edit the section content
      this.$router.push({ path: "create-article#edit" });
      this.currentSection = currentSection;
      console.log("this.currentSection", this.currentSection);
    },
    back() {
      this.$router.go(-1);
    },
    openHashTagPrompt: function () {
      this.$modal.show("hashTagPrompt");
    },
    addHashtag: function () {
      let hashTagObj = {
        id: this.hashtags.length,
        keyword: "#" + this.currentHashtag,
      };
      if (this.currentHashtag == "") {
        return;
      }
      this.hashtags.push(hashTagObj);
      this.currentHashtag = "";
      this.save("updateArticleHashTags");
      this.$modal.hide("hashTagPrompt");
      console.log("reached here");
    },
    getArticleContent: function (aid) {
      let MID = this.MID;
      let DID = this.DID;
      //let url = "/fetcharticle/";
      let url = "http://localhost/fetcharticle/";
      window.axios
        .get(url, {
          params: {
            MID,
            DID,
            aid,
            userAgent: this.userAgent,
          },
        })
        .then((response) => {
          this.$vs.loading.close();
          console.log(response.data);
          this.saved = true;
          this.addedToDrafts = true;
          let data = response.data.articleData;
          this.articleTitle = data.title;
          this.hashtags = data.hashtags;
          this.articleData = data;
          this.alreadyPublished = this.articleData.published;
          this.addedToDrafts = true;
          this.sections = this.articleData.sections;
        })
        .catch((error) => {
          this.$vs.loading.close();
          console.error(error.message);
          alert(error.message);
        });
      console.log("fetch article content reequest ended");
      return;
    },
    __reqSaveInit: function () {
      // this function initializes the article draft in the database.
      // the purpose of this functoin is to ensure that the proper article object is created, JSON Stringified and sent to the server and initialized in the database before any other save request can be sent without being responded to with a request denied.
      let MID = this.MID;
      let DID = this.DID;
      let userAgent = this.userAgent;
      console.log(this.$store.state.__userAgent);
      console.log("userAgent", userAgent);
      let draftObjectInit = this.CreateArticleObjectInit();
      console.log("draftObjInit", draftObjectInit);
      //let url = "/edit-article/";
      let url = "http://localhost/edit-article/";
      let formData = new FormData();
      formData.append("MID", MID);
      formData.append("DID", DID);
      formData.append("data", draftObjectInit);
      formData.append("aid", this.aid);
      formData.append("attachedFile", undefined);
      formData.append("editType", "createNew");
      formData.append("userAgent", this.userAgent);
      window.axios
        .post(url, formData)
        .then((response) => {
          console.log("response", response.data);
          this.saved = true;
        })
        .catch((error) => {
          console.error("error:", error.message);
        });
    },
    __reqAddSection() {
      // After clicking add new section. On click of edit this section.,
      // make the request to save the section with this function.
      let MID = this.MID;
      let DID = this.DID;
      console.log(String(this.sections.length - 1));
      let sectionObj = {
        id: this.sections.length - 1,
        title: {
          contentType: "title",
          content: "Section Heading/Title Here",
          placeholder: "Input your article title here",
        },
        contentItems: [],
      };
      sectionObj = JSON.stringify(sectionObj);
      console.log("new section object");
      //let url = "/edit-article/";
      let url = "http://localhost/edit-article/";
      let formData = new FormData();
      formData.append("MID", MID);
      formData.append("DID", DID);
      formData.append("data", sectionObj);
      formData.append("aid", this.aid);
      formData.append("attachedFile", undefined);
      formData.append("editType", "addNewSection");
      formData.append("userAgent", this.userAgent);
      window.axios
        .post(url, formData)
        .then((response) => {
          console.log("response", response.data);
        })
        .catch((error) => {
          console.error("error:", error.message);
        });
    },
    __reqUpdateSectionTitle() {
      let MID = this.MID;
      let DID = this.DID;
      let dataObj = {
        value: this.sections[this.currentSection].title.content,
        sectionID: this.currentSection,
      };
      console.log("data object", dataObj);
      dataObj = JSON.stringify(dataObj);
      //let url = "/edit-article/";
      let url = "http://localhost/edit-article/";
      let formData = new FormData();
      formData.append("MID", MID);
      formData.append("DID", DID);
      formData.append("data", dataObj);
      formData.append("aid", this.aid);
      formData.append("attachedFile", undefined);
      formData.append("editType", "updateSectionTitle");
      formData.append("userAgent", this.userAgent);
      window.axios
        .post(url, formData)
        .then((response) => {
          console.log("response", response.data);
        })
        .catch((error) => {
          console.error("error:", error.message);
        });
    },
    __reqAddContentItem() {
      // afterAdding a section item,
      // make the request to add it to a part of the section item
      let MID = this.MID;
      let DID = this.DID;
      let contentItemObj = {
        id: this.presentContentItem,
        contentType:
          this.sections[this.currentSection].contentItems[
            this.presentContentItem
          ].contentType,
        content: "",
        sectionID: this.currentSection,
      };
      console.log("contentItemObject", {
        contentItemObj,
        sectionID: this.currentSection,
      });
      contentItemObj = JSON.stringify(contentItemObj);
      //let url = "/edit-article/";
      let url = "http://localhost/edit-article/";
      let formData = new FormData();
      formData.append("MID", MID);
      formData.append("DID", DID);
      formData.append("data", contentItemObj);
      formData.append("aid", this.aid);
      formData.append("editType", "addContentItem");
      formData.append("userAgent", this.userAgent);
      // this is the initialization.
      formData.append("attachedFile", undefined);
      window.axios
        .post(url, formData)
        .then((response) => {
          console.log("response", response.data);
        })
        .catch((error) => {
          console.error("error:", error.message);
        });
    },
    async __reqUpdateContentItem() {
      let MID = this.MID;
      let DID = this.DID;
      let contentType =
        this.sections[this.currentSection].contentItems[this.presentContentItem]
          .contentType;
      let dataObj = {
        value: this.currentContentItem,
        sectionID: this.currentSection,
        contentItemID: this.presentContentItem,
        contentType,
      };
      console.log("dataobj", dataObj, contentType);
      dataObj = JSON.stringify(dataObj);
      //let url = "/edit-article/";
      let formData = new FormData();
      let url = "http://localhost/edit-article/";
      formData.append("MID", MID);
      formData.append("DID", DID);
      formData.append("data", dataObj);
      formData.append("aid", this.aid);
      formData.append("editType", "updateContentItem");
      formData.append("userAgent", this.userAgent);
      if (contentType == "image") {
        let imgUrl =await this.sendPostCloudinaryReqContentImg().catch(()=>{
          this.$vs.loading.close();
        })
        formData.append("attachedFile", imgUrl.data.url);
      } else {
        formData.append("attachedFile", undefined);
      }
      window.axios
        .post(url, formData)
        .then((response) => {
          this.$vs.loading.close();
          console.log("response", response.data);
        })
        .catch((error) => {
          this.$vs.loading.close();
          console.error("error:", error.message);
        });
    },
    __reqDeleteSection(id) {
      let formData = new FormData();
      let url = "http://localhost/edit-article/";
      formData.append("MID", this.MID);
      formData.append("DID", this.DID);
      formData.append("data", JSON.stringify({ sectionID: id }));
      formData.append("editType", "deleteSection");
      formData.append("aid", this.aid);
      formData.append("attachedFile", undefined);
      formData.append("userAgent", this.userAgent);
      window.axios
        .post(url, formData)
        .then((response) => {        this.$vs.loading.close();
          console.log(response.data);
          console.log("deleted section successfully");
        })
        .catch((error) => {        this.$vs.loading.close();
          console.log(error.message);
        });
    },

    __reqDeleteContentItem(sectionID, contentItemID) {
      // after confirming that you want to delete a content item from a section,
      // make the request with this function.
      let formData = new FormData();
      let url = "http://localhost/edit-article/";
      formData.append("MID", this.MID);
      formData.append("DID", this.DID);
      formData.append("aid", this.aid);
      formData.append("data", JSON.stringify({ sectionID, contentItemID }));
      formData.append("editType", "deleteContentItem");
      formData.append("userAgent", this.userAgent);
      window.axios
        .post(url, formData)
        .then((response) => {
          console.log(response.data);
          console.log("deleted content item successfully");
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    async __reqEditMain(edit_type, target, value) {
      // update information in the main article object.
      console.log("update Target", target);
      let MID = this.MID;
      let DID = this.DID;
      let aid = this.aid;
      let data = JSON.stringify({ value });
      let editType = edit_type;
      let file = undefined;
      let formData = new FormData();
      formData.append("MID", MID);
      formData.append("DID", DID);
      formData.append("aid", aid);
      formData.append("editType", editType);
      formData.append("data", data);
      formData.append("userAgent", this.userAgent);
      //let url = "/edit-article/";
      let url = "http://localhost/edit-article/";
      if (editType == "updateArticleTitle") {
        // nofile, to avoid complication append undefined.
        formData.append("attachedFile", file);
        //send the request here
        window.axios
          .post(url, formData)
          .then((response) => {
            console.log(response.data);
            console.log("updated the article title successfully");
          })
          .catch((error) => {
            console.log(error.message);
          });
      } else if (editType == "updateArticleCoverImage") {
        let photoUrl = await this.sendPostCloudinaryReqCover().catch(()=>{
        this.$vs.loading.close();
      });
        // append user file with the name changed.
        file = document.getElementById("coverimageinput").files[0];
        formData.append("coverImageUrl", photoUrl.data.url);
        window.axios
          .post(url, formData)
          .then((response) => {
            this.$vs.loading.close();
            console.log(response.data);
            this.coverImage = response.data.coverImageLink;
            console.log("updated the coverImage successfully");
          })
          .catch((error) => {
            this.$vs.loading.close();
            console.log(error.message);
          });
      } else if (editType == "updateArticleHashTags") {
        // update hashtag request.
        console.log("in request condition");
        formData.append("attachedFile", file);
        window.axios
          .post(url, formData)
          .then((response) => {
            console.log(response.data);
            console.log("updated the article hashtag successfully");
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    },
    __reqUpdateHashTags() {
      let formData = new FormData();
      let url = "http://localhost/edit-article/";
      formData.append("MID", this.MID);
      formData.append("DID", this.DID);
      formData.append("aid", this.aid);
      formData.append("editType", "updateArticleHashTags");
      formData.append("data", JSON.stringify({ hashtags: this.hashtags }));
      window.axios
        .post(url, formData)
        .then((response) => {
          if (response.data.status == "success") {
            console.log("response.data", response.data);
          } else {
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    addDraft() {
      let url = "http://localhost/edit-article/";
      let formData = new FormData();
      formData.append("MID", this.MID);
      formData.append("DID", this.DID);
      formData.append("aid", this.aid);
      formData.append("editType", "addDraft");
      window.axios
        .post(url, formData)
        .then((response) => {
          console.log("added to draft response", response.data);
          if (response.data.status == "success") {
            this.addedToDrafts = true;
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    save(editType, v = undefined) {
      this.closeEditBox();
      console.log("closed edit box in save");
      console.log(editType);
      // this function enables auto save
      if (!this.saved) {
        this.__reqSaveInit();
      }
      if (editType !== "createNew" && !this.addedToDrafts) {
        this.addDraft();
      }
      setTimeout(() => {
        switch (editType) {
          case "updateArticleTitle": {
            // this block will carry out the request for the updating of the article title
            // __reqEditMain("scope","editType","target","value")
            console.log("saving article title, please wait.");
            this.__reqEditMain(editType, "title", this.articleTitle);
            break;
          }
          case "updateArticleCoverImage": {
            console.log("saving article cover image+, please wait.");
            this.__reqEditMain(
              editType,
              "cover_image",
              this.aid + "cover_image"
            );
            break;
          }
          case "addNewSection": {
            console.log("adding new section, please wait.");
            this.__reqAddSection();
            break;
          }
          case "updateSectionTitle": {
            console.log("update section title");
            this.__reqUpdateSectionTitle();
            break;
          }
          case "addContentItem": {
            console.log("adding new content item");
            this.__reqAddContentItem();
            break;
          }
          case "updateContentItem": {
            console.log("updating current content item");
            this.__reqUpdateContentItem();
            break;
          }
          case "deleteSection": {
            console.log("deleting Section : " + v);
            this.__reqDeleteSection(v);
            break;
          }
          case "deleteContentItem": {
            console.log("deleting content item");
            this.__reqDeleteContentItem(v.sectionID, v.contentItemID);
            break;
          }
          case "updateArticleHashTags": {
            console.log("updating Article hash tags");
            this.__reqUpdateHashTags();
          }
        }
      }, 200);
    },
    publishDraft: function (val) {
      let url = "http://localhost/publish-draft/";
      window.axios
        .get(url, {
          params: {
            MID: this.MID,
            DID: this.DID,
            aid: this.aid,
            contentType: "article",
            action: val,
            publishDate : this.articleData ? this.articleData.publishDate : undefined
          },
        })
        .then((response) => {
          if(val == "publish"){
            this.articleData.publishDate = String(new Date()).split(" ").slice(0,4).join(" ");
          }
          console.log(response.data);
          if (response.data.status == "success") {
            this.alreadyPublished = val == "publish" ? true : false;
            this.$vs.notify({
              position: "bottom-center",
              title: `Successfully ${
                val == "publish" ? "Published" : "Unpublished"
              } your Article`,
              color: "#cbe0ff",
            });
          } else {
            this.$vs.notify({
              position: "bottom-center",
              title: `Unable to ${
                val == "publish" ? "Publish" : "Unpublish"
              } your Article due to technical issues which will be fixed as soon as possible`,
              color: "#cbe0ff",
            });
          }
        })
        .catch((error) => {
          console.error(error);
          this.$vs.notify({
            position: "bottom-center",
            title: error.message,
            color: "#cbe0ff",
          });
        });
    },
    autoSaveIndicate() {
      this.$vs.notify({
        position: "bottom-center",
        title: `Auto Save is On. Your work is automatically saved. This only works when your internet connection is active.`,
        color: "#cbe0ff",
      });
    },
    CreateArticleObjectInit: function () {
      let aid = this.aid;
      let title = "Untitled";
      let author = this.MID;
      let coverImage = "";
      let hashtags = [];
      let sections = [
        {
          id: 0,
          title: {
            contentType: "title",
            content: "Section Heading/Title Here",
            placeholder: "Input your article title here",
          },
          contentItems: [],
        },
      ];
      let objInit = {
        aid,
        title,
        author,
        coverImage,
        hashtags,
        sections,
      };
      console.log(JSON.stringify(objInit));
      return JSON.stringify(objInit);
    },
    generateHTML(val) {
      let html = val.replaceAll("\n", "<br>");
      return html;
    },
  },

  components: {
    articlePreview: articlePreviewVue,
  },
};
</script>

<style lang="scss">
#editSection {
  padding-bottom: 120px;
}
#create-article-main {
  padding: 15px;
}
.edit_article_subheading {
  font-size: 110%;
  font-weight: 600;
}
.title_content_box {
  margin-top: 20px;
}
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
.content_title_container {
  display: flex;
  padding-top: 10px;
}
.content_title_container div {
  flex: 1;
}
.article_content_title {
  padding: 3px;
  font-size: 120%;
  font-weight: 600;
}
.function01_container {
  padding: 5px;
  border: 2px solid gray;
  border-radius: 5px;
  margin-top: 10px;
  padding-bottom: 20px;
}
.section_title {
  font-weight: 600;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
  top: 2px;
}
.editbox .content_box {
  margin-top: 6px;
}
.edit_section_button {
  width: max-content;
  background: white;
  color: gray;
  border: 2px solid #808080;
  padding: 1px 8px 1px 8px;
  border-radius: 5px;
  display: inline-block;
  float: right;
}

.edit_section_button:hover {
  cursor: pointer;
}
.add_new_section_button {
  width: max-content;
  padding: 1px 10px 1px 10px;
  border-radius: 6px;
  border: 2px solid #42c4ff;
  background: #03a9f4;
  float: right;
  color: white;
}
.section_container {
  display: flex;
  margin: 5px auto;
  background: #252323;
  color: white;
  padding: 8px;
  border-radius: 5px;
}
.section_container div {
  flex: 1;
}
.edit-container {
  flex: 0;
  display: flex;
  width: max-content;
}
.delete_section_button {
  width: max-content;
  margin-left: 10px;
  background: gray;
  padding: 5px 11px 5px 5px;
  border-radius: 24px;
  display: inline-block;
  float: right;
  margin-right: 5px;
}
.delete_section_icon {
  position: relative;
  left: 3px;
  top: 1px;
}
.section_title_desc {
  font-weight: 600;
  margin-top: 10px;
  width: max-content;
  margin-left: 5px;
}
.function02 {
  display: flex;
  margin-top: 15px;
}
.function02 div p {
  text-align: center;
  background: #03a9f4;
  border-radius: 5px;
  padding: 5px;
  width: 98%;
  color: white;
}
.p02 {
  margin-left: 2%;
}
.p02:hover {
  cursor: pointer;
}
.tags_container {
  padding: 5px;
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid #b7d0db;
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
.add-hashtag-button {
  width: max-content;
  padding-left: 7px;
  padding-right: 7px;
  display: block;
  margin: 0px auto;
  margin-top: 7px;
}
.post_article_button {
  display: block;
  width: 100%;
  margin: 30px 0px 50px 0px;
}
.upload_img_vid_container form {
  border-radius: 5px;
  padding: 5px;
  border: 2px solid gray;
}
.hashtag_desc {
  margin-top: 10px !important;
}
.hashtaginputcontainer {
  padding: 15px;
}
.hashtagprompt {
  padding: 15px;
}
.hashtag {
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
.top_tools {
  width: 95%;
  margin: 0px auto;
  padding: 5px;
  border-radius: 5px;
  background: white;
  color: black;
  box-shadow: 0px 0px 5px grey;
}
.tools_container_main {
  padding-top: 10px;
  background: white;
  position: fixed;
  z-index: 1;
}
.tools_container {
  text-align: center;
  width: max-content;
}
.tools_wrapper {
  width: 100%;
  overflow-x: scroll;
}
.tools_wrapper::-webkit-scrollbar {
  height: 4px;
}
.tools_wrapper::-webkit-scrollbar-thumb {
  background: gray;
}
.space-opener {
  padding-top: 80px;
}
@media (max-width: 430px) {
  .hidden-this {
    display: none;
  }
  .edit_section_button {
    font-size: 80%;
  }
  .delete_section_button {
    width: max-content;
    background: gray;
    padding: 5px 12px 5px 6px;
    border-radius: 24px;
    display: inline-block;
    float: right;
    font-size: 80%;
    margin-right: 5px;
  }
}
@media (max-width: 345px) {
  .space-opener {
    padding-top: 100px;
  }
}
@media (max-width: 330px) {
  .space-opener {
    padding-top: 125px;
  }
}
.bottom_divider_tools {
  border-top: 3px solid #e7e7e7;
  margin-top: 7px;
}
.edit_section_title,
.tools_text {
  text-align: center;
  font-family: antipasto-bold;
  font-size: 120%;
  font-weight: 500;
  color: #03a9f4;
}
.insert_tool_btn {
  padding: 2px 5px 2px 5px;
  border-radius: 4px;
  border: 1px solid #c6c3c3;
  font-size: 80%;
  background: #03a9f4;
  color: white;
}
.titlebox {
  padding-top: 15px;
  margin-bottom: 5px;
}
.editbox {
  padding: 5px;
}
.content_box {
  padding: 5px;
}
.titlebox p {
  font-weight: 600;
  font-size: 140%;
  letter-spacing: 1px;
}
.fi_container {
  font-size: 10px !important;
}
.render_content_container p {
  padding: 8px;
  border: 1px solid #f3f3f3;
  border-radius: 5px;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
}
.function_box {
  display: flex;
  width: max-content;
  margin-top: -15px;
  margin-right: 10px;
  position: relative;
  margin-left: 85%;
  top: 15px;
}
.editFunction {
  margin-right: 4px;
}
.function_box div {
  width: max-content;
  padding: 4px 5px 4px 5px;
  font-size: 60%;
  border-radius: 30px;
  background: #e1e1e1;
  border: 1px solid rgb(206, 205, 205);
}
.renderbox i {
  position: relative;
  top: 2px;
  left: 1px;
}
.done_button {
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content;
  padding: 4px 10px 4px 10px;
  border-radius: 4px;
  border: 1px solid #d8d4d4;
  background: #1e87f0;
  color: #ffffff;
  margin-top: 4px;
  margin-bottom: 5px;
  margin-left: 5px;
}
.top01 {
  text-align: center;
}
@media (min-width: 768px) {
  .tools_container_main {
    width: 68%;
  }
}
@media (min-width: 1024px) {
  .tools_container_main {
    width: 51%;
  }
}
</style>
