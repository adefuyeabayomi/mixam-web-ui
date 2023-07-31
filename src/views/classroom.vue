<template>
  <section id="classroom-area" v-if="cid !== ''">
    <modal
      name="classroom-welcome"
      :adaptive="true"
      height="auto"
      :max-width="maxWidth"
      width="90%"
      :click-to-close="false"
    >
      <section class="welcome-to-class-container">
        <div class="w-header-container">
          <h4>
            Welcome <span v-if="!firstEntry">back</span> to Class
            {{ $store.state.userAccountInfo.username }}
          </h4>
        </div>
        <div class="w-encourage-text">
          <p>
            We hope you have fun and a great exprience in the time you take this
            course. Goodluck.
          </p>
        </div>
        <div class="w-course-title">
          <p>
            <span class="w-bold-init">Course Title : </span>
            {{ courseData.title }}
          </p>
          <p class="w-bold-init">Section Quizes Included</p>
        </div>
        <div class="w-course-contents">
          <p class="wcc-header">What you'll learn in this course</p>
          <div class="w-contents-list">
            <ul>
              <li v-for="section in courseData.sections" :key="section.id">
                {{ section.title.content }}
              </li>
            </ul>
          </div>
        </div>
        <div class="w-start-class-button">
          <button @click="closeWelcome()">
            <span v-if="firstEntry">Start Class Now </span
            ><span v-if="!firstEntry">Resume your class now </span>
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </section>
    </modal>
    <modal
      name="section-quiz"
      :adaptive="true"
      :height="'auto'"
      :max-width="maxWidth"
      width="90%"
      :click-to-close="false"
      :max-height="maxHeight"
    >
      <section class="section-quiz-container">
        <div class="section-quiz-header-section">
          <h4>Section Quiz</h4>
          <p>
            Attempt all the questions given for this section before you can
            proceed to the next section
          </p>
        </div>
        <div class="section-quiz-contents">
          <div
            :class="{ 'unanswered-quiz': undoneSections.includes(quiz.id) }"
            class="classroom-quiz-item"
            v-for="quiz in sectionQuiz"
            :key="quiz.id"
          >
            <p class="cqq">Question :</p>
            <p class="classroom-quiz-question">{{ quiz.question }}</p>
            <textarea
              v-model="sectionQuizAnswers[quiz.id]"
              class="classroom-quiz-answer-container"
              placeholder="Write your answer"
            ></textarea>
          </div>
        </div>
        <div class="section-quiz-controls">
          <div class="w-start-class-button">
            <button @click="submitSectionQuiz()">
              <span v-if="!finalSection"
                >Submit and Proceed To Next Section </span
              ><span v-if="finalSection"
                >Submit Last Quiz For this Course.
              </span>
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </section>
    </modal>
    <modal
      name="course-completed"
      :adaptive="true"
      height="auto"
      :max-width="maxWidth"
      width="90%"
    >
      <div class="course-completed">
        <div class="section-quiz-header-section">
          <h4>
            <i class="fas fa-graduation-cap"></i> Congratulations. You just
            completed this course.
          </h4>
        </div>
      </div>
    </modal>
    <modal
      name="reviewQuiz"
      :adaptive="true"
      height="auto"
      :max-width="maxWidth"
      width="90%"
      :click-to-close="true"
    >
      <div id="quiz-attempt">
        <div class="section-quiz-header-section qah">
          <h4>Your Quiz Attempt</h4>
        </div>
        <div v-if="answerKeys.length > 0">
          <div v-for="answer in answerKeys" :key="answer">
            <div class="quiz-attempt-item-container">
              <div class="qai-question-container">
                <p class="qai-qm-header">Question :</p>
                <p class="qai-qm-question">
                  {{ courseData.sections[currentSID].quizes[answer].question }}
                </p>
              </div>
              <div class="qai-answer-container">
                <p class="qai-qm-header">Your Answer :</p>
                <p class="qai-qm-answer">{{ answerRender[answer] }}</p>
              </div>
            </div>
          </div>
          <div class="attempt-section-quiz">
            <button @click="closeQuizReview()">Close</button>
          </div>
        </div>
        <div v-else>No Quiz available in this section!</div>
      </div>
    </modal>
    <div class="classroom-contents">
      <classroom-render-item v-bind="currentSection"></classroom-render-item>
    </div>
    <div class="class-controls">
      <div class="attempt-section-quiz">
        <button
          v-if="sectionHasQuiz && currentSID == progressLevel && !completed"
          @click="openQuizContainer()"
        >
          Attempt Section Quiz <i class="fas fa-newspaper"></i>
        </button>
        <button
          v-if="(sectionHasQuiz && currentSID !== progressLevel) || completed"
          @click="openQuizReviewContainer()"
        >
          View Your Quiz Attempt <i class="fas fa-newspaper"></i>
        </button>
        <button
          v-if="!sectionHasQuiz && !completed"
          @click="submitSectionQuiz()"
        >
          <span v-if="!finalSection">Move To Next Section</span
          ><span v-if="finalSection">Click To Finish Course</span>
          <i class="fas fa-newspaper"></i>
        </button>
      </div>
      <div class="course-section-navigation">
        <div class="c-s-prev-container">
          <p @click="moveToPreviousSection()">
            <span class="c-s-prev pointercursor"
              ><i class="fas fa-arrow-left"></i
            ></span>
            Previous Section
          </p>
        </div>
        <div class="c-s-next-container">
          <p @click="moveToNextSection()">
            Next Section
            <span class="c-s-next pointercursor"
              ><i class="fas fa-arrow-right"></i
            ></span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import classroomRenderItemVue from "@/components/classroom-render-item.vue";
import { format } from "js-time-ago";
export default {
  data: function () {
    return {
      cid: "",
      courseData: {},
      currentSID: 0,
      maxWidth: 480,
      firstEntry: true,
      MID: JSON.parse(window.localStorage.getItem("userlogindata")).MID,
      DID: JSON.parse(window.localStorage.getItem("userlogindata")).DID,
      sectionQuizAnswers: [],
      undoneSections: [],
      progressLevel: 0,
      completed: false,
      classroomState: {},
      QA: {},
    };
  },
  computed: {
    currentSection: function () {
      if (this.courseData.title) {
        console.log(this.couseData);
        return this.courseData.sections[this.currentSID];
      }
    },
    sectionHasQuiz: function () {
      if (this.courseData.sections) {
        console.log(
          "quizes exist",
          this.courseData.sections[this.currentSID].quizes.length
        );
        return this.courseData.sections[this.currentSID].quizes.length > 0;
      }
      return false;
    },
    sectionQuiz: function () {
      if (this.courseData.sections) {
        let quizCount = 0;
        for (let each of this.courseData.sections[this.currentSID].quizes) {
          quizCount++;
        }
        return this.courseData.sections[this.currentSID].quizes;
      }
      return [];
    },
    finalSection: function () {
      if (this.courseData.title) {
        let sections = this.courseData.sections;
        if (this.currentSID == sections.length - 1) {
          return true;
        }
      }
      return false;
    },
    maxHeight: function () {
      console.log("height for the window", window.innerHeight);
      return window.innerHeight - 100;
    },
    answerRender: function () {
      if (!this.classroomState.answers) {
        return [];
      }
      console.log("classroom state answers", this.classroomState.answers);
      let a = this.classroomState.answers[this.currentSID].quizAnswers;
      console.log("answer keys", Object.keys(JSON.parse(a)));
      return JSON.parse(a);
    },
    answerKeys: function () {
      if (!this.classroomState.answers) {
        return [];
      }
      console.log("classroom state answers", this.classroomState.answers);
      let a = this.classroomState.answers[this.currentSID].quizAnswers;
      return Object.keys(JSON.parse(a));
    },
  },
  methods: {
    // course main
    fetchCourseData() {
      this.$vs.loading();
      let url = "http://localhost/fetchcourses/";
      window.axios
        .get(url, {
          params: {
            cid: this.cid,
          },
        })
        .then((response) => {
          //console.log(response.data);
          this.courseData = response.data.courseData;
          this.$vs.loading.close();
          this.$modal.show("classroom-welcome");
          format(this.courseData.created).then((res) => {
            this.formattedTime = res;
          });
          if (this.$route.query.completed == "true") {
            this.progressLevel = this.courseData.sections.length - 1;
            this.completed = true;
          }
          //console.log("course item data",this.itemData,this.cid);
        })
        .catch((err) => {
          this.$vs.loading.close();
          this.$modal.show("dialog", {
            title: "Failed",
            text: "Unable to fetch the course now. Please try again.",
            buttons: [
              {
                title: "Try Again",
                handler: () => {
                  this.$modal.hide("dialog");
                  this.fetchCourseData();
                },
              },
            ],
          });
          console.error(err);
        });
    },
    constructQuizAnswers() {
      let sections = this.courseData.sections;
      let QAObj = {};
      for (let each of sections) {
        QAObj[each.id] = {};
      }
      this.QA = QAObj;
      console.log("QAObject", QAObj);
    },
    fetchClassroomState() {
      let url = "http://localhost/fetchClassRoomState/";
      window.axios
        .get(url, {
          params: {
            MID: this.MID,
            DID: this.DID,
            cid: this.cid,
          },
        })
        .then((response) => {
          console.log("response classroom state", response);
          this.classroomState = response.data.theCourse;
        })
        .catch((error) => {
          console.log("error", error.message);
        });
    },
    closeWelcome() {
      this.$modal.hide("classroom-welcome");
    },
    updateFirstEntry() {
      let url = "http://localhost/update-classroom-firstentry/";
      window.axios
        .get(url, {
          params: {
            MID: this.MID,
            DID: this.DID,
            cid: this.cid,
          },
        })
        .then((response) => {
          console.log("f-e-r response", response.data);
        })
        .catch((error) => {
          console.error(error.message);
        });
    },
    openQuizContainer() {
      this.sectionQuizAnswers = {};
      for (let each of this.courseData.sections[this.currentSID].quizes) {
        this.sectionQuizAnswers[each.id] = "";
      }
      this.$modal.show("section-quiz");
    },
    submitSectionQuiz() {
      let url = "http://localhost/move-to-next-section/";
      console.log("section Quiz Answers", this.sectionQuizAnswers);
      let undoneSections = [];
      let quizAnswerCount = 0;
      for (let each of this.courseData.sections[this.currentSID].quizes) {
        this.sectionQuizAnswers[each.id] == ""
          ? undoneSections.push(quizAnswerCount)
          : false;
        quizAnswerCount++;
        console.log("undone sections", undoneSections);
      }
      console.log("undone sections", undoneSections);
      this.undoneSections = undoneSections;
      if (this.undoneSections.length > 0) {
        setTimeout(() => {
          this.$vs.loading.close();
          this.$vs.notify({
            title: "You have not answered all the questions yet",
            color: "#98c2ff",
          });
        }, 100);
        return;
      }
      window.axios
        .get(url, {
          params: {
            MID: this.MID,
            DID: this.DID,
            cid: this.cid,
            hasQuiz: this.sectionHasQuiz,
            quizAnswers: this.sectionQuizAnswers,
            sectionID: this.currentSID,
            finalSection: this.finalSection,
          },
        })
        .then((response) => {
          this.$vs.loading.close();
          this.$modal.hide("section-quiz");
          console.log("f-e-r response", response.data);
          if (response.data.status == "success") {
            if (this.finalSection) {
              this.$modal.show("course-completed");
              this.completed = true;
              return;
            }
            this.undoneSections = [];
            this.currentSID = this.currentSID + 1;
            this.progressLevel = this.progressLevel + 1;
          } else {
            this.$vs.notify({
              title:
                "Unable to save your progress due to technical issues we are currently experiencing. We are working to fix it as soon as possible.",
              color: "#98c2ff",
            });
          }
        })
        .catch((error) => {
          this.$vs.loading.close();
          console.error(error.message);
        });
      this.fetchClassroomState();
    },
    moveToNextSection() {
      console.log("moving to next section");
      let nextSection = this.currentSID + 1;
      if (this.finalSection) {
        console.log("You are in the final section of this course");
        this.$vs.notify({
          title:
            "You are in the final section of this course. You can't go any further.",
          color: "#98c2ff",
        });
        return;
      } else if (this.currentSID < this.progressLevel) {
        this.currentSID = nextSection;
        return;
      } else {
        this.submitSectionQuiz();
      }
    },
    moveToPreviousSection() {
      let previousSection = this.currentSID - 1;
      if (this.currentSID !== 0) {
        this.currentSID = previousSection;
      } else {
        this.$vs.notify({
          title:
            "You are in the first section of this course. You can go back anymore.",
          color: "#98c2ff",
        });
      }
      console.log("moving to previous section");
    },
    openQuizReviewContainer: function () {
      this.$modal.show("reviewQuiz");
      console.log(this, "opening quiz review container");
    },
    closeQuizReview() {
      this.$modal.hide("reviewQuiz");
    },
  },
  components: {
    classroomRenderItem: classroomRenderItemVue,
  },
  created: function () {
    console.log("this.route", this.$route);
    this.cid = this.$route.query.cid;
    this.firstEntry = this.$route.query.firstEntry == "true" ? true : false;
    this.progressLevel = Number(this.$route.query.currentSection);
    this.currentSID = Number(this.$route.query.currentSection);
    if (this.firstEntry) {
      this.updateFirstEntry();
    }
    if (this.$route.query.completed == "true") {
      this.completed = true;
    }
    if (this.completed) {
      this.fetchClassroomState();
    }
    this.fetchCourseData();
    this.$modal.show("course-completed");
  },
};
</script>

<style lang="scss">
#classroom-area {
  padding-bottom: 50px;
}
.w-header-container {
  text-align: center;
}
.w-header-container h4 {
  color: #1e87f0;
  font-family: "Antipasto-Bold";
  font-size: 200%;
  padding: 20px 0px 0px 0px;
}
.welcome-to-class-container {
  padding: 15px;
}
.w-encourage-text {
  text-align: center;
}
.w-course-title {
  margin-top: 20px;
}
.w-bold-init {
  font-weight: 600;
}
.w-course-contents {
  margin-top: 40px;
}
.wcc-header {
  font-size: 110%;
  font-weight: 600;
}

.w-start-class-button {
  margin-top: 40px;
}
.w-start-class-button button,
.attempt-section-quiz button {
  width: 100%;
  height: 40px;
  border-radius: 20px;
  border: 1px solid #88c4ff;
  background-color: #a8d2fa;
  color: #0e7be6;
  font-family: Antipasto-Bold;
  font-size: 120%;
}
.course-section-navigation {
  margin-top: 50px;
  display: flex;
}
.c-s-next,
.c-s-prev {
  padding: 10px 12px;
  border-radius: 20px;
  margin: 0px 0px;
  border: 1px solid #88c4ff;
  background: #88c4ff;
}
.c-s-prev-container,
.c-s-next-container {
  font-weight: 600;
  color: gray;
}
.c-s-next-container {
  text-align: right;
}
.class-controls {
  padding: 10px;
}
.c-s-prev i,
.c-s-next i {
  color: white;
}
.section-quiz-header-section h4 {
  font-family: signika-regular;
  font-weight: 600;
  text-align: center;
}
.section-quiz-header-section {
  padding: 20px 0px 20px 0px;
  text-align: center;
}

.classroom-quiz-item {
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #cbe0ff;
  margin-bottom: 15px;
}
.section-quiz-container {
  padding: 10px;
  padding-bottom: 30px;
  max-height: 600px;
  overflow-y: scroll;
}
.cqq {
  font-weight: 600;
  padding: 5px 0px;
}
.classroom-quiz-question {
  padding: 10px 0px;
}
.classroom-quiz-answer-container {
  width: 100%;
  height: 80px;
  border-radius: 15px;
  padding: 10px 0px 0px 5px;
}
.unanswered-quiz {
  box-shadow: 0px 0px 6px #ff0000 !important;
}
.course-completed {
  padding: 10px;
}
.course-completed h4 {
  color: #d4a800;
}
.section-quiz-container.qah {
  text-align: center;
}
#quiz-attempt {
  padding: 10px;
  max-height: 550px;
  overflow-y: scroll;
}
.quiz-attempt-item-container {
  padding: 10px;
  box-shadow: 0px 0px 10px #cbe0ff;
  border-radius: 13px;
  margin-bottom: 20px;
}
.qai-qm-header {
  font-size: 105%;
  font-weight: 600;
}
</style>
