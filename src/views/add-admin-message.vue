<template>
  <!--design the post blah blah here.-->
  <section class="add-admin-messages-section">
    <div class="page-header-main">
      <h4 class="aam-header-desc">Update Daily App Messages</h4>
      <p class="aams-desc">
        Every Thing is an art. Create for your self and unlock all your hidden
        talents
      </p>
    </div>
    <div class="update-center">
      <div class="aam-uc-container">
        <p class="aam-uc-header">Add new messages</p>
      </div>
      <div class="admin-ucm-contents">
        <vs-input
          type="text"
          label="Message Title Here :"
          v-model="messageTitle"
        ></vs-input>
        <p class="vs-con-input-label">
          Message Content (max 120 words)
          <span :class="{ exceeded: exceeded }"
            >{{ count }} words remaining</span
          >
        </p>
        <textarea
          :class="{ exceeded: exceeded }"
          v-model="messageContent"
          @input="checkInput()"
          class="admin-message-textarea"
        ></textarea>
        <form enctype="multipart/form-data" id="aam-msg">
          <vs-input
            name="aamImage"
            type="file"
            v-model="filename"
            label="Choose Message Image"
          ></vs-input>
        </form>
        <vs-select
          class="selectExample"
          label="Select Theme : "
          v-model="theme"
        >
          <vs-select-item :value="'item-theme-one'" :text="'Theme One'" />
          <vs-select-item :value="'item-theme-two'" :text="'Theme Two'" />
        </vs-select>
      </div>
    </div>
    <div class="credentials-container">
      <div class="aam-uc-container">
        <p class="aam-uc-header">Credentials</p>
      </div>
      <div>
        <p>Input all three admin security passcode to complete the action.</p>
        <vs-input type="text" label="key1" v-model="key1"></vs-input>
        <vs-input type="text" label="key2" v-model="key2"></vs-input>
        <vs-input type="text" label="key3" v-model="key3"></vs-input>
      </div>
    </div>
    <div class="proceed-button-container">
      <vs-button
        @click="sendUpdateRequest()"
        style="width: 100% !important; background-coor: #555408 !important"
        >Add Message</vs-button
      >
    </div>
  </section>
</template>

<script>
export default {
  data: function () {
    return {
      filename: "",
      messageTitle: "",
      key1: "",
      key2: "",
      key3: "",
      messageContent: "",
      count: 120,
      theme: "item-theme-one",
      existingMessages: [],
      exceeded: false,
    };
  },
  methods: {
    checkInput() {
      let count = this.messageContent.split(" ").length;
      let remaining = 120 - count;
      this.count = remaining;
      if (remaining < 0) {
        this.exceeded = true;
      } else {
        this.exceeded = false;
      }
    },
    sendUpdateRequest: function () {
      if (this.messageTitle == "") {
        this.$modal.show("dialog", {
          title: "You didn't add a title for the message.",
          buttons: [
            {
              title: "Okay",
              handler: () => this.$modal.hide("dialog"),
            },
          ],
        });
        return;
      } else if (this.messageContent == "") {
        this.$modal.show("dialog", {
          title: "You didn't add any content for the message.",
          buttons: [
            {
              title: "Okay",
              handler: () => this.$modal.hide("dialog"),
            },
          ],
        });
        return;
      }
      if (this.exceeded) {
        this.$modal.show("dialog", {
          title: "Message Content Has exceeded the set limit at 120 words",
          buttons: [
            {
              title: "Okay",
              handler: () => this.$modal.hide("dialog"),
            },
          ],
        });
        return;
      } else if (this.filename == "") {
        this.$modal.show("dialog", {
          title: "You didn't add any image for the message.",
          buttons: [
            {
              title: "Okay",
              handler: () => this.$modal.hide("dialog"),
            },
          ],
        });
        return;
      } else {
        let url = "http://localhost/update-daily-admin-message/";
        let formData = new FormData(document.getElementById("aam-msg"));
        formData.append("messageTitle", this.messageTitle);
        formData.append("messageContent", this.messageContent);
        formData.append("key1", this.key1);
        formData.append("key2", this.key2);
        formData.append("key3", this.key3);
        formData.append("theme", this.theme);
        window.axios
          .post(url, formData, {
            "Content-Type": "multipart/form-data",
          })
          .then((response) => {
            this.$modal.show("dialog", {
              title: response.data.message,
              buttons: [
                {
                  title: "Okay",
                  handler: () => this.$modal.hide("dialog"),
                },
              ],
            });
          })
          .catch((err) => {
            this.$modal.show("dialog", {
              title: err.message,
              buttons: [
                {
                  title: "Okay",
                  handler: () => this.$modal.hide("dialog"),
                },
              ],
            });
          });
      }
    },
  },
  created: function () {
    console.log("created add admin message");
  },
};
</script>

<style lang="scss">
.add-admin-messages-section {
  padding-bottom: 70px;
}
.aam-header-desc {
  text-align: center;
}

.aams-desc {
  color: gray;
  text-align: center;
}
.aam-uc-header {
  font-weight: 600;
  font-size: 150%;
  color: #484848;
  font-family: "highgate-regular";
}
.update-center {
  padding-top: 40px !important;
}
.credentials-container {
  padding-top: 40px !important;
}
.proceed-button-container {
  padding-top: 40px !important;
}
.admin-ucm-contents .vs-con-input-label {
  width: 100%;
  color: gray;
}
.admin-message-textarea {
  width: 100%;
  height: 120px;
  border: 1px solid #c9c9c9;
  border-radius: 12px;
  padding: 15px;
}
.admin-ucm-contents .vs-con-input-label,
.credentials-container .vs-con-input-label,
.admin-ucm-contents .con-select {
  padding-top: 15px;
}
@media (max-width: 768px) {
  .update-center,
  .credentials-container,
  .proceed-button-container {
    padding: 0px 15px 0px 15px;
  }
  .admin-ucm-contents .vs-con-input-label,
  .credentials-container .vs-con-input-label {
    padding-top: 15px;
  }
}
span.exceeded {
  color: #b21b1b;
}
.admin-message-textarea.exceeded {
  border-color: #b21b1b;
}
</style>
