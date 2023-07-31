<template>
  <section id="course-render" v-if="cid !== ''">
    <course-render-item
      @report="submitReportReq"
      :cid="cid"
    ></course-render-item>
    <modal
      class="report-modal"
      name="report"
      width="90%"
      :maxWidth="maxWidth"
      height="auto"
      :adaptive="true"
      :click-to-close="true"
    >
      <section>
        <div class="report-header">
          <p>Report</p>
        </div>
        <div class="report-body">
          <p>Why are you reporting?</p>
          <div class="form-container">
            <form class="report-reason-form">
              <span class="report-input-container">
                <input
                  v-model="reportReason"
                  value="Scam Content"
                  type="radio"
                  name="report-reason"
                />
                Scam Content
              </span>
              <span class="report-input-container">
                <input
                  v-model="reportReason"
                  value="Impersonation"
                  type="radio"
                  name="report-reason"
                />
                Impersonation
              </span>
              <span class="report-input-container">
                <input
                  v-model="reportReason"
                  value="Used a copyrighted item without permission"
                  type="radio"
                  name="report-reason"
                />
                Used a copyrighted item without permission
              </span>
              <span class="report-input-container">
                <input
                  v-model="reportReason"
                  value="Untrusted Link"
                  type="radio"
                  name="report-reason"
                />
                Untrusted Link
              </span>
              <p class="other-report-reason">
                You can add More details of why you're reporting below :
              </p>
              <input
                type="text"
                v-model="otherReason"
                class="report-other-reason-input"
              />
            </form>
          </div>
          <div class="report-button-container">
            <vs-button
              @click="sendReportRequest()"
              style="width: 100%; background-color: gray !important"
              class="report-button"
              >Report</vs-button
            >
          </div>
        </div>
      </section>
    </modal>
  </section>
</template>

<script>
import courseRenderItemVue from "@/components/course-render-item.vue";
export default {
  data: function () {
    return {
      cid: "",
      reportReason: "",
      otherReason: "",
      reportInfo: {},
      maxWidth: 480,
    };
  },
  computed: {},
  methods: {
    submitReportReq(event) {
      this.reportInfo = event;
      console.log("");
      this.$modal.show("report");
    },
    sendReportRequest() {
      this.$vs.loading();
      let url = "http://localhost/report/";
      let DID = JSON.parse(window.localStorage.getItem("userlogindata")).DID;
      let MID = JSON.parse(window.localStorage.getItem("userlogindata")).MID;
      let userAgent = this.$store.state.__userAgent;
      window.axios
        .get(url, {
          params: {
            DID,
            MID,
            userAgent,
            reportReason: this.reportReason,
            otherReason: this.otherReason,
            reportInfo: this.reportInfo,
          },
        })
        .then((response) => {
          this.$vs.loading.close();
          if (response.data.status == "success") {
            console.log("reportSuccess", response.data);
            this.$modal.hide("report");
            (this.otherReason = ""), (this.reportReason = "");
            this.$vs.notify({
              position: "bottom-center",
              title: "Report Action Submitted Successfully",
              text: "We are Processsing your report request and we will take the appropraite action immediately after reviewed",
              color: "#98c2ff",
            });
          } else {
          }
        })
        .catch((err) => {
          this.$vs.loading.close();
          console.error(err.message);
        });
    },
  },
  components: {
    courseRenderItem: courseRenderItemVue,
  },
  created: function () {
    console.log("this.route", this.$route);
    this.cid = this.$route.query.cid;
  },
};
</script>

<style lang="scss"></style>
