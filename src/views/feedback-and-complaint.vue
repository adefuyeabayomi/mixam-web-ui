<template>
  <!--design the post blah blah here.-->
  <div id="feedback-and-complaint">
    <div class="feedback-and-complaint-header-container">
      <div class="fbph-main">
        <p class="fbph-title">Feedback &amp; <span>Complaint</span></p>
        <p class="fbph-title-follow">
          Hi, we would love to hear from you. Kindly use the form below to
          appropraitly pass across your message to us.
        </p>
      </div>
    </div>
    <section class="feedback-form-container">
      <form>
        <div class="feedback-message-type-container">
          <p>My message is most accurately described as a :</p>
          <select
            class="feedback-type-select"
            name="feedback-type"
            v-model="feedbackType"
          >
            <option value="complaint">Complaint</option>
            <option value="feedback">Feedback</option>
            <option value="suggestion">Suggestion</option>
          </select>
        </div>
        <div class="feedback-message-container">
          <p>Please Input your message below :</p>
          <textarea
            class="feedback-message-input"
            v-model="feedbackMessage"
          ></textarea>
        </div>
      </form>
      <div class="feedback-submit-button-container">
        <button @click="submitFeedbackReq()" class="feedback-submit-button">
          Submit
        </button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      feedbackType: "complaint",
      feedbackMessage: "",
      MID: JSON.parse(window.localStorage.getItem("userlogindata")).MID,
      DID: JSON.parse(window.localStorage.getItem("userlogindata")).DID,
    };
  },
  methods: {
    submitFeedbackReq() {
      console.log(
        "submitting feedback type : ",
        this.feedbackType,
        this.feedbackMessage
      );
      let url = `${this.$store.state.apiServer}/submit-feedback/`;
      this.$vs.loading();
      window.axios
        .get(url, {
          params: {
            MID: this.MID,
            DID: this.DID,
            feedbackType: this.feedbackType,
            message: this.feedbackMessage,
          },
        })
        .then((response) => {
          this.$vs.loading.close();
          console.log(response.data);
          if (response.data.status == "success") {
            this.$modal.show("dialog", {
              title:
                "Thank you for getting back to us. Your " +
                this.feedbackType +
                " is duly noted. We will get back to you as soon as possible. Thanks. Mixam Business.",
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
          }
        })
        .catch((error) => {
          this.$vs.loading.close();
          console.error(error.message);
        });
    },
  },
};
</script>

<style lang="scss">
#feedback-and-complaint {
  font-family: candara, signika-regular;
  padding: 10px;
  padding-bottom: 90px;
  padding-top: 17px;
}
.fbph-title {
  font-weight: 900;
  font-size: 200%;
}
.fbph-title span {
  color: #59adff;
}
.feedback-and-complaint-header-container {
  text-align: center;
  border: 1px solid #59adff;
  background-color: #e3f1ff;
  border-radius: 20px;
  padding: 10px;
  padding-top: 50px;
  padding-bottom: 50px;
}
.fbph-title-follow {
  color: #767676;
  max-width: 500px;
  line-height: 44px;
  font-size: 125%;
  padding-top: 20px;
  margin: 0px auto;
}
.feedback-form-container form {
  font-weight: 600;
  color: gray;
  font-size: 120%;
}
.feedback-form-container form div {
  margin-top: 40px;
}
.feedback-type-select {
  color: gray;
  height: 46px;
  border-radius: 14px;
  margin-top: 15px;
}
.feedback-submit-button {
  width: 100%;
  height: 50px;
  border-radius: 14px;
  border: 1px solid gray;
  font-weight: 600;
  color: silver;
  background-color: #111111;
}
.feedback-message-input {
  border-radius: 14px;
  width: 100%;
  height: 150px;
  padding: 10px;
}
.feedback-submit-button-container {
  margin-top: 30px;
}
</style>
