<template>
  <section>
    <section v-if="inmain" id="create-article-main">
      <div class="page-title-container">
        <p>Create A Course</p>
      </div>
      <div class="page-desc-container">
        <p>
          <i class="fas fa-light"></i>Share your knowledge and experience by
          teaching others
        </p>
      </div>
      <section id="course-form-container">
        <div class="article-title-container">
          <input
            v-model="courseTitle"
            @blur="save('updateCourseTitle')"
            type="text"
            placeholder=" Input The Course Title Here..."
            class="article_title_input content_input"
          />
        </div>
        <div class="upload_img_vid_container">
          <p class="upload-text">
            <span v-if="showUploadInit"
              >Upload cover image For the course (Optional) :</span
            >
            <span v-if="!showUploadInit"
              >Already uploaded a cover picture, Change it below
              (optional)</span
            >
          </p>
          <form
            class="fileinput"
            enctype="multipart/form-data"
            id="course-cover-image-form"
          >
            <input
              @change="save('updateCourseCoverImage')"
              type="file"
              placeholder="Upload Image"
              id="course-coverimage"
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
            Help the right audience find your course, add hashtags.
          </p>
          <p class="tags_container">
            <span
              class="hashtag"
              v-for="hashtag in hashtags"
              v-bind:key="hashtag.id"
              >{{ hashtag.keyword }}</span
            ><button class="add_hashtag_button" @click="openHashTagPrompt()">
              Add Hashtag <i class="fas fa-plus"></i>
            </button>
          </p>
        </div>
        <div class="function01_container">
          <div class="title content_title_container">
            <div><p class="article_content_title">Course Content</p></div>
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
          <div class="section_title_desc">Course Section Title</div>
          <div
            class="section_container"
            v-for="section in courseSections"
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
          <p @click="autoSaveIndicate()" class="pointercursor">
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
          >Publish Course Draft <i class="fas fa-paper-plane"></i
        ></vs-button>
        <vs-button
          @click="publishDraft('unpublish')"
          v-if="published"
          class="post_article_button"
          block
          >Unpublish Course <i class="fas fa-paper-plane"></i
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
              <span class="edit_section_title">Edit Course Section</span>
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
                Add Image</button
              ><button class="insert_tool_btn" @click="addDocument()">
                Upload Document
              </button>
              <button class="insert_tool_btn" @click="openAddQuizModal()">
                Add Quiz Question
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
        <div v-if="item.contentType == 'document'" class="paragraphbox">
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
              <p>Uploaded Document : {{ item.content }}</p>
            </div>
          </div>
          <div
            :class="{ hidden: !(editActive && presentContentItem == item.id) }"
            class="editbox"
          >
            <div class="upload_img_vid_container">
              <p class="upload-text">
                Upload A document for this section (.pdf or .docx):
              </p>
              <form class="fileinput" enctype="multipart/form-data">
                <input
                  :id="item.realid"
                  type="file"
                  placeholder="Upload Document"
                  @change="updateDoc()"
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
      <section class="quiz_render_section">
        <div class="quiz_render_title">
          <p>Quiz Questions</p>
        </div>
        <p class="no-quiz-text">
          <i v-if="quizcount == 0">No Quiz for this section yet!</i
          ><i v-if="quizcount !== 0">
            {{ quizcount }} quiz question<span v-if="quizcount > 1">s</span> for
            this section</i
          >
          <button class="insert_tool_btn" @click="openAddQuizModal()">
            Add Quiz Question
          </button>
        </p>
        <div class="render_for_quizes">
          <div v-for="quiz in quizes" :key="quiz.id">
            <div>
              <div class="renderbox">
                <div class="function_box">
                  <!--onclick, of the edit button, change the currentSection to items.-->
                  <div class="editFunction">
                    <p
                      class="fi_container pointercursor"
                      @click="openEditQuizModal(quiz.id)"
                    >
                      <i class="fas fa-pen"></i>
                    </p>
                  </div>
                  <div class="deleteFunction">
                    <p
                      class="fi_container pointercursor"
                      @click="openDeleteQuizPrompt(currentSection, quiz.id)"
                    >
                      <i class="fas fa-archive"></i>
                    </p>
                  </div>
                </div>
                <div class="quiz_render_content_container">
                  <div class="question_container">
                    <p class="quiz_desc">Question :</p>
                    <p>{{ quiz.question }}</p>
                  </div>
                  <div class="question_container">
                    <p class="quiz_desc">Answer :</p>
                    <p>{{ quiz.answer }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
    <div class="addquizmodalcontainer">
      <modal
        name="addquiz"
        :adaptive="true"
        height="auto"
        :max-width="maxWidth"
        width="90%"
        class="addquiz_modal"
      >
        <div class="add-quizcontainer">
          <div class="quiz_modal_title_container">
            <p>Add New Quiz Question For The Section.</p>
          </div>
          <div>
            <p class="quiz_desc">Question :</p>
            <textarea
              type="text"
              v-model="quizQuestion"
              class="quiz_input"
            ></textarea>
          </div>
          <div>
            <p class="quiz_desc">Answer :</p>
            <textarea
              type="text"
              v-model="quizAnswer"
              class="quiz_input"
            ></textarea>
          </div>
          <div>
            <vs-button class="add-quiz-button" @click="addQuiz()"
              >Add New Quiz Question <i class="fas fa-plus"></i
            ></vs-button>
          </div>
        </div>
      </modal>
    </div>

    <section v-if="inpreview" id="preview">
      <course-preview :sections="sections"></course-preview>
    </section> 
  </section>
  <!---->
</template>
<script>
// on change of any of the input params, call the save function and initialize auto save(if unsaved is true) after which you can then use individual save functions to do autosave()
import coursePreviewVue from "@/components/course-preview.vue";
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
            content: "Section Title/Heading",
            placeholder: "Input your title/heading here",
          },
          contentItems: [],
          quizes: [],
        },
      ],
      currentSection: 0,
      presentContentItem: "title",
      renderOpen: true,
      editActive: true,
      courseTitle: "untitled",
      quizQuestion: "",
      quizAnswer: "",
      currentQuiz: "latest",
      quizUpdate: false,
      cid: undefined,
      saved: false,
      MID: JSON.parse(window.localStorage.getItem("userlogindata")).MID,
      DID: JSON.parse(window.localStorage.getItem("userlogindata")).DID,
      userAgent: this.$store.state.__userAgent,
      addedToDrafts: false,
      alreadyPublished: false,
      courseData: {},
    };
  },
  created: function () {
    this.$store.commit("updatecurrentroute", "create");
    let courseID = this.$route.query.cid;
    if (courseID !== undefined) {
      this.saved = true;
      this.cid = courseID;
      this.$vs.loading({ text: "fetching your draft data" });
      return this.getCourseContent(courseID);
    } else {
      this.saved = false;
      this.cid =
        String(Math.round(Math.random() * 10000000)) +
        JSON.parse(window.localStorage.getItem("userlogindata")).MID;
      this.__reqSaveInit();
      console.log("saved", this.saved, "newCourseID", this.cid);
      return;
    }
  },
  computed: {
    published: function () {
      return this.alreadyPublished;
    },
    quizcount() {
      let quizCount = this.sections[this.currentSection].quizes.length;
      return quizCount;
    },
    quizes() {
      let currentQuizes = this.sections[this.currentSection].quizes;
      return currentQuizes;
    },
    courseSections() {
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
      if (this.courseData) {
        if (this.saved && !this.courseData) {
          return true;
        } else if (this.saved && this.courseData.coverImage == "") {
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
      let file = document.getElementById("course-coverimage").files[0];
      const url = "https://api.cloudinary.com/v1_1/mixambusiness/image/upload";
      const formData = new FormData();
      formData.append("file",file);
      formData.append("upload_preset","skmmp7bt");
      return await window.axios.post(url,formData);
    },
    async sendPostCloudinaryReq(){
        let file = document.getElementById(
          this.sections[this.currentSection].contentItems[
            this.presentContentItem
          ].realid
        ).files[0];
        const url = "https://api.cloudinary.com/v1_1/mixambusiness/image/upload";
        const formData = new FormData();
        formData.append("file",file);
        formData.append("upload_preset","skmmp7bt");
        return await window.axios.post(url,formData)
    },
    async sendPostCloudinaryReqDoc(){
        let file = document.getElementById(
          this.sections[this.currentSection].contentItems[
            this.presentContentItem
          ].realid
        ).files[0];
        const url = "https://api.cloudinary.com/v1_1/mixambusiness/auto/upload";
        const formData = new FormData();
        formData.append("file",file);
        formData.append("upload_preset","skmmp7bt");
        return await window.axios.post(url,formData)
    },
    addQuiz() {
      console.log(
        "adding quiz",
        "question : " + this.quizQuestion + "answer : " + this.quizAnswer
      );
      this.$modal.hide("addquiz");
      if (this.quizQuestion == "") {
        this.$modal.show("dialog", {
          title: "No Question Added",
          text: "You cannot leave the question input blank.",
          buttons: [
            {
              title: "Okay",
              handler: () => {
                this.$modal.hide("dialog");
              },
            },
          ],
        });
        return;
      }
      let quizObj = {
        id: "",
        question: "",
        answer: "",
      };
      quizObj.question = this.quizQuestion;
      quizObj.answer = this.quizAnswer;
      quizObj.id = this.currentQuiz;
      console.log(
        quizObj.id,
        this.currentQuiz,
        "quizObj.id",
        "this.currentQuiz"
      );
      if (this.currentQuiz !== this.quizcount) {
        this.sections[this.currentSection].quizes[this.currentQuiz] = quizObj;
      } else {
        this.sections[this.currentSection].quizes.push(quizObj);
      }
      console.log(this.sections[this.currentSection].quizes);
      this.quizQuestion = "";
      this.quizAnswer = "";
      if (this.quizUpdate) {
        this.save("updateQuizItem");
        this.quizUpdate = false;
        return;
      }
      this.save("addQuizItem");

      return;
    },
    addDocument() {
      let contentObj = {
        id: "",
        contentType: "document",
        content: "no document uploaded!",
        changed: "",
        realid: "",
        // replaced by cloudinary url
      };
      contentObj.realid =
        "courseEdit" +
        String(Math.round(Math.random() * 100000000)) +
        "document";
      contentObj.id = this.sections[this.currentSection].contentItems.length;
      this.sections[this.currentSection].contentItems.push(contentObj);
      this.presentContentItem = contentObj.id;
      this.editActive = true;
      console.log(contentObj.id);
      this.save("addContentItem");
    },
    updateDoc() {
      let contentItem =
        this.sections[this.currentSection].contentItems[
          this.presentContentItem
        ];
      contentItem.content = document.getElementById(
        contentItem.realid
      ).files[0].name;
      this.editActive = false;
      this.save("updateContentItem");
    },
    addNewSection() {
      let sectionObj = {
        id: this.sections.length,
        title: {
          id: "",
          contentType: "title",
          content: "Section Title/Heading",
          placeholder: "Add Section Title/Heading Here",
        },
        contentItems: [],
        quizes: [],
      };
      //let a = this.sections.length;
      //sectionObj.id= a;
      this.sections.push(sectionObj);
      //console.log("section length HHHHHHHHHH", sectionObj.id)
      console.log("sections", this.sections);
      this.save("addNewSection");
    },
    addParagraph() {
      // on addition of the stuff, change current and renderOpen
      let contentObj = {
        id: "",
        contentType: "paragraph",
        content: "",
        placeholder: "Add New Paragraph Here",
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
        placeholder: "Write Subheading.",
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
        changed: "",
        realid: "",
        // replaced by cloudinary url
      };
      contentObj.realid =
        "courseEdit" + String(Math.round(Math.random() * 100000000)) + "img";
      contentObj.id = this.sections[this.currentSection].contentItems.length;
      this.sections[this.currentSection].contentItems.push(contentObj);
      this.presentContentItem = contentObj.id;
      this.editActive = true;
      console.log(contentObj.id);
      this.save("addContentItem");
    },
    updateImage() {
      // render and add id
      //this.sections[this.currentSection].contentItems[this.presentContentItem]
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
      this.$router.push({ path: "create-course#preview" });
      this.currentSection = currentSection;
    },
    moveToEditSection(currentSection) {
      //edit the section content
      this.$router.push({ path: "create-course#edit" });
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
      this.hashtags.push(hashTagObj);
      this.currentHashtag = "";
      this.$modal.hide("hashTagPrompt");
      this.save("updateCourseHashtags");
    },
    openAddQuizModal: function () {
      this.currentQuiz = this.quizcount;
      console.log("in add quiz");
      this.$modal.show("addquiz");
    },
    openEditQuizModal: function (value) {
      this.currentQuiz = value;
      console.log(
        value,
        this.sections[this.currentSection].quizes[this.currentQuiz]
      );
      let currentQuestion =
        this.sections[this.currentSection].quizes[value].question;
      let currentAnswer =
        this.sections[this.currentSection].quizes[value].answer;
      console.log(
        currentQuestion + " currentQuestion " + currentAnswer + " currentAnswer"
      );
      this.quizQuestion = currentQuestion;
      this.quizAnswer = currentAnswer;
      this.$modal.show("addquiz");
      this.quizUpdate = true;
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
        title: "Are you sure want to continue with this action?",
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
    openDeleteQuizPrompt(sid, qid) {
      this.$modal.show("dialog", {
        title: "Are you sure want to delete this quiz question?",
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
              this.deleteQuiz(sid, qid);
            },
          },
        ],
      });
    },
    createCourseObjectInit: function () {
      let cid = this.cid;
      let title = "";
      let author = this.MID;
      let coverImage = "";
      let hashtags = [];
      let sections = [
        {
          id: 0,
          title: {
            id: "0",
            contentType: "title",
            content: "Section Title/Heading",
            placeholder: "Input your title/heading here",
          },
          contentItems: [],
          quizes: [],
        },
      ];
      let objInit = {
        cid,
        title,
        author,
        coverImage,
        hashtags,
        sections,
      };
      console.log(JSON.stringify(objInit));
      return objInit;
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
    deleteQuiz(sectionID, quizID) {
      this.sections[sectionID].quizes.splice(quizID, 1);
      let counter = 0;
      for (let each of this.sections[sectionID].quizes) {
        each.id = counter;
        counter++;
      }
      console.log("deleted the content item successfully from DOM");
      // send request here
      //this.__reqDeleteContentItem(sectionID,contentItemID);
      this.save("deleteQuiz", { sectionID, quizID });
    },
    getCourseContent(cid) {
      this.$vs.loading();
      let MID = this.MID;
      let DID = this.DID;
      //let url = "/edit-course/";
      let url = "http://localhost/fetchcourses/";
      window.axios
        .get(url, {
          params: {
            MID,
            DID,
            cid,
          },
        })
        .then((response) => {
          this.$vs.loading.close();
          console.log("response", response.data);
          let data = response.data.courseData;
          this.courseTitle = data.title;
          this.alreadyPublished = response.data.courseData.published;
          this.hashtags = data.hashtags;
          this.courseData = data;
          this.addedToDrafts = true;
          this.sections = this.courseData.sections;
        })
        .catch((error) => {
          this.$vs.loading.close();
          console.log("error", error.message);
        });
      console.log("fetch course request ended");
    },
    __reqSaveInit() {
      // intialize the course draft in the database
      let MID = this.MID;
      let DID = this.DID;
      let draftObjectInit = this.createCourseObjectInit();
      draftObjectInit = JSON.stringify(draftObjectInit);
      console.log("courseDraftObject", draftObjectInit);
      //let url = "/edit-course/";
      let url = "http://localhost/edit-course/";
      let formData = new FormData();
      formData.append("MID", MID);
      formData.append("DID", DID);
      formData.append("data", draftObjectInit);
      formData.append("cid", this.cid);
      formData.append("attachedFile", undefined);
      formData.append("editType", "createNew");
      formData.append("userAgent", this.userAgent);
      window.axios
        .post(url, formData)
        .then((response) => {
          console.log(response.data);
          this.saved = true;
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    sc: function (editType) {
      let MID = this.MID;
      let DID = this.DID;
      //let url = "/edit-course/";
      let url = "http://localhost/edit-course/";
      let formData = new FormData();
      formData.append("MID", MID);
      formData.append("DID", DID);
      formData.append("data");
      formData.append("cid", this.cid);
      formData.append("attachedFile", undefined);
      formData.append("editType", editType);
      formData.append("userAgent", this.userAgent);
      window.axios
        .post(url, formData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    __reqAddSection(editType, sectionObj) {
      // this function takes care of the adding a new section.
      let MID = this.MID;
      let DID = this.DID;
      sectionObj = JSON.stringify(sectionObj);
      //let url = "/edit-course/";
      let url = "http://localhost/edit-course/";
      let formData = new FormData();
      formData.append("MID", MID);
      formData.append("DID", DID);
      formData.append("data", sectionObj);
      formData.append("cid", this.cid);
      formData.append("attachedFile", undefined);
      formData.append("editType", editType);
      formData.append("userAgent", this.userAgent);
      window.axios
        .post(url, formData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    __reqAddContentItem(editType, contentObj) {
      let MID = this.MID;
      let DID = this.DID;
      let dataObj = JSON.stringify({
        contentObj,
        sectionID: this.currentSection,
      });
      console.log("data object", contentObj);
      //let url = "/edit-course/";
      let url = "http://localhost/edit-course/";
      let formData = new FormData();
      formData.append("MID", MID);
      formData.append("DID", DID);
      formData.append("data", dataObj);
      formData.append("cid", this.cid);
      formData.append("attachedFile", undefined);
      formData.append("editType", editType);
      formData.append("userAgent", this.userAgent);
      window.axios
        .post(url, formData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    __reqAddQuiz(editType, quizObj) {
      let MID = this.MID;
      let DID = this.DID;
      let dataObj = JSON.stringify(quizObj);
      console.log(dataObj);

      //let url = "/edit-course/";
      let url = "http://localhost/edit-course/";
      let formData = new FormData();
      formData.append("MID", MID);
      formData.append("DID", DID);
      formData.append("data", dataObj);
      formData.append("cid", this.cid);
      formData.append("attachedFile", undefined);
      formData.append("editType", editType);
      formData.append("userAgent", this.userAgent);
      window.axios
        .post(url, formData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    __reqDeleteQuiz(sectionID, quizID) {
      // after confirming that you want to delete a content item from a section,
      // make the request with this function.
      let url = "http://localhost/edit-course/";
      let formData = new FormData();
      formData.append("MID", this.MID);
      formData.append("DID", this.DID);
      formData.append("cid", this.cid);
      formData.append("data", JSON.stringify({ sectionID, quizID }));
      formData.append("editType", "deleteQuiz");
      formData.append("userAgent", this.userAgent);
      window.axios
        .post(url, formData)
        .then((response) => {
          console.log(response.data);
          console.log("deleted quiz successfully");
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    __reqDeleteSection(id) {
      let formData = new FormData();
      let url = "http://localhost/edit-course/";
      formData.append("MID", this.MID);
      formData.append("DID", this.DID);
      formData.append("data", JSON.stringify({ sectionID: id }));
      formData.append("editType", "deleteSection");
      formData.append("cid", this.cid);
      formData.append("attachedFile", undefined);
      formData.append("userAgent", this.userAgent);
      window.axios
        .post(url, formData)
        .then((response) => {
          console.log(response.data);
          console.log("deleted section successfully");
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    /*
        .
        .
        .
        .
        .
        .
        .
        .
        */
    __reqDeleteContentItem(sectionID, contentItemID) {
      // after confirming that you want to delete a content item from a section,
      // make the request with this function.
      let formData = new FormData();
      let url = "http://localhost/edit-course/";
      formData.append("MID", this.MID);
      formData.append("DID", this.DID);
      formData.append("cid", this.cid);
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
    async __reqEditMain(editType, target, value) {
      console.log(target);
      let MID = this.MID;
      let DID = this.DID;
      let data = JSON.stringify({ value });
      //let url = "/edit-course/";
      let url = "http://localhost/edit-course/";
      let file = undefined;
      let formData = new FormData();
      formData.append("MID", MID);
      formData.append("DID", DID);
      formData.append("data", data);
      formData.append("cid", this.cid);
      formData.append("editType", editType);
      formData.append("userAgent", this.userAgent);
      if (editType == "updateCourseTitle") {
        formData.append("attachedFile", file);
        window.axios
          .post(url, formData)
          .then((response) => {
            console.log(response.data);
            console.log("updated course title successfully");
          })
          .catch((error) => {
            console.log(error.message);
            console.log("unable to complete request to update title");
          });
      } else if (editType == "updateCourseHashtags") {
        formData.append("attachedFile", file);
        window.axios
          .post(url, formData)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error.message);
          });
      } else {
        // update course coverimage here
        let imgUrl = await this.sendPostCloudinaryReqCover().catch(()=>{
          this.$vs.loading.close();
        })
        formData.append("attachedFile",imgUrl.data.url);
        window.axios
          .post(url, formData)
          .then((response) => {
          this.$vs.loading.close();
            console.log(response.data);
          })
          .catch((error) => {
          this.$vs.loading.close();
            console.log(error.message);
          });
      }
    },
    __reqUpdateSectionTitle(editType, title) {
      let MID = this.MID;
      let DID = this.DID;
      //let url = "/edit-course/";
      let dataObj = {
        value: title,
        sectionID: this.currentSection,
      };
      console.log("data object", dataObj);
      dataObj = JSON.stringify(dataObj);
      let url = "http://localhost/edit-course/";
      let formData = new FormData();
      formData.append("MID", MID);
      formData.append("DID", DID);
      formData.append("data", dataObj);
      formData.append("cid", this.cid);
      formData.append("attachedFile", undefined);
      formData.append("editType", "updateSectionTitle");
      formData.append("userAgent", this.userAgent);
      window.axios
        .post(url, formData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    async __reqUpdateContentItem(editType, dataObj) {
      let MID = this.MID;
      let DID = this.DID;
      console.log(dataObj);
      let contentType = dataObj.contentType;
      dataObj = JSON.stringify(dataObj);
      //let url = "/edit-course/";
      let url = "http://localhost/edit-course/";
      let formData = new FormData();
      formData.append("MID", MID);
      formData.append("DID", DID);
      formData.append("data", dataObj);
      formData.append("cid", this.cid);
      formData.append("editType", editType);
      formData.append("userAgent", this.userAgent);
      if (contentType == "image" || contentType == "document") {
        let url;
        if(contentType == "image"){
          url = await this.sendPostCloudinaryReq().catch(()=>{
            this.$vs.loading.close();
          })
        }
        else {
          url = await this.sendPostCloudinaryReqDoc().catch(()=>{
            this.$vs.loading.close();
          })          
        }
        formData.append("attachedFile",url.data.url);
      } else {
        formData.append("attachedFile", undefined);
      }
      window.axios
        .post(url, formData)
        .then((response) => {            this.$vs.loading.close();
          console.log(response.data);
        })
        .catch((error) => {            this.$vs.loading.close();
          console.log(error.message);
        });
    },
    __reqUpdateQuiz(editType, dataObj) {
      let MID = this.MID;
      let DID = this.DID;
      console.log(dataObj);
      dataObj = JSON.stringify(dataObj);
      //let url = "/edit-course/";
      let url = "http://localhost/edit-course/";
      let formData = new FormData();
      formData.append("MID", MID);
      formData.append("DID", DID);
      formData.append("data", dataObj);
      formData.append("cid", this.cid);
      formData.append("attachedFile", undefined);
      formData.append("editType", editType);
      formData.append("userAgent", this.userAgent);

      window.axios
        .post(url, formData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    addDraft() {
      let url = "http://localhost/edit-course/";
      let formData = new FormData();
      formData.append("MID", this.MID);
      formData.append("DID", this.DID);
      formData.append("cid", this.cid);
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
      // this function enables auto save for a draft course
      // if the document is a new one, initialize the article in the database.
      if (!this.saved) {
        console.log("initializing the course on the server");
        this.__reqSaveInit();
      }
      if (editType !== "createNew" && !this.addedToDrafts) {
        this.addDraft();
      }
      setTimeout(() => {
        switch (editType) {
          case "updateCourseTitle": {
            console.log("updating the course title");
            this.__reqEditMain(
              "updateCourseTitle",
              "course_title",
              this.courseTitle
            );
            break;
          }
          case "updateCourseCoverImage": {
            console.log("updating the course cover image");
            let imgFile = document.getElementById("course-coverimage").files[0];
            console.log(imgFile);
            this.__reqEditMain(
              "updateCourseCoverImage",
              "cover_image",
              this.cid + "cover_image"
            );
            break;
          }
          case "updateCourseHashtags": {
            console.log("updating the course hashtags");
            this.__reqEditMain(
              "updateCourseHashtags",
              "hashtags",
              this.hashtags
            );
            break;
          }
          case "addNewSection": {
            console.log("adding new course section");
            let newSectionObject = this.sections[this.sections.length - 1];
            console.log("Current Section Objects check here", newSectionObject);
            this.__reqAddSection("addNewSection", newSectionObject);
            break;
          }
          case "updateSectionTitle": {
            console.log("updating course section title");
            let sectionTitle = this.sections[this.currentSection].title.content;
            console.log("section-title ", sectionTitle);
            this.__reqUpdateSectionTitle("updateSectionTitle", sectionTitle);
            break;
          }
          case "addContentItem": {
            console.log("adding content item");
            let contentItem =
              this.sections[this.currentSection].contentItems[
                this.presentContentItem
              ];
            console.log("content item", contentItem);
            this.__reqAddContentItem("addContentItem", contentItem);
            break;
          }
          case "updateContentItem": {
            console.log("updating content item ");
            let value =
              this.sections[this.currentSection].contentItems[
                this.presentContentItem
              ].content;
            let contentType =
              this.sections[this.currentSection].contentItems[
                this.presentContentItem
              ].contentType;
            console.log(value);
            let dataObj = {
              value,
              contentType,
              sectionID: this.currentSection,
              contentItemID: this.presentContentItem,
            };
            this.__reqUpdateContentItem("updateContentItem", dataObj);
            break;
          }
          case "addQuizItem": {
            console.log("adding quiz item");
            let quizObject =
              this.sections[this.currentSection].quizes[this.currentQuiz];
            let dataObj = {
              sectionID: this.currentSection,
              quizObject,
            };
            this.__reqAddQuiz("addQuizItem", dataObj);
            break;
          }
          case "updateQuizItem": {
            console.log("updating quiz item");
            let newQuizObj =
              this.sections[this.currentSection].quizes[this.currentQuiz];
            let dataObj = {
              sectionID: this.currentSection,
              quizID: this.currentQuiz,
              newQuizObj,
            };
            this.__reqUpdateQuiz("updateQuizItem", dataObj);
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
          case "deleteQuiz": {
            console.log("deleting Quiz item", v.qid);
            this.__reqDeleteQuiz(v.sectionID, v.quizID);
          }
        }
      }, 500);
    },
    publishDraft: function (val) {
      let url = "http://localhost/publish-draft/";
      window.axios
        .get(url, {
          params: {
            MID: this.MID,
            DID: this.DID,
            cid: this.cid,
            contentType: "course",
            action: val,
            publishDate : this.courseData? this.courseData.publishDate : "undefined"
          },
        })
        .then((response) => {
          if(val == "publish"){
            this.courseData.publishDate = String(new Date()).split(" ").slice(0,4).join(" ");
          }
          console.log(response.data);
          if (response.data.status == "success") {
            this.alreadyPublished = val == "publish" ? true : false;
            this.$vs.notify({
              position: "bottom-center",
              title: `Successfully ${
                val == "publish" ? "Published" : "Unpublished"
              } your Course`,
              color: "#cbe0ff",
            });
          } else {
            this.$vs.notify({
              position: "bottom-center",
              title: `Unable to ${
                val == "publish" ? "Publish" : "Unpublish"
              } your Course due to technical issues which will be fixed as soon as possible`,
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
    generateHTML(val) {
      let html = val.replaceAll("\n", "<br>");
      return html;
    },
  },
  components: {
    coursePreview: coursePreviewVue,
  },
};
</script>

<style lang="scss">
.quiz_render_section {
  padding: 10px;
  padding-top: 20px;
  border-top: 2px solid gray;
}
.quiz_render_content_container {
  padding: 7px;
  border-radius: 7px;
  box-shadow: 0px 0px 5px gray;
  margin-bottom: 10px;
  margin-top: 5px;
}

.no-quiz-text {
  text-align: center;
}
.quiz_render_title p {
  text-align: center;
  font-size: 140%;
  font-family: antipasto-bold;
  font-weight: 600;
}
.quiz_modal_title_container p {
  text-align: center;
  font-family: antipasto-bold;
  font-size: 125%;
  font-weight: 600;
}
.quiz_modal_title_container {
  margin-bottom: 13px;
  color: #2196f3;
}
.quiz_desc {
  font-size: 105%;
  font-weight: 600;
}
.addquiz_modal {
  border-radius: 10px;
}
.quiz_input {
  height: 50px;
  width: 100%;
  border-radius: 5px;
}
.add-quizcontainer {
  padding: 10px;
}
.add-quiz-button {
  display: block;
  margin: 7px auto;
}
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
  font-size: 120%;
  font-weight: 600;
  width: 100%;
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
    width: 51%;
  }
}
@media (min-width: 1024px) {
  .tools_container_main {
    width: 60%;
  }
}
</style>
