<template>
  <section id="edit-profile">
    <section class="edit-profile-header">
      <div class="eph-page-title">
        <p class="eph-title">Edit Profile</p>
      </div>
      <form enctype="multipart/form-data" id="photoform">
        <div class="eph-change-profile-picture-container">
          <div class="eph-chp">
            <div class="eph-img-box-upper">
              <div class="eph-image-container">
                <img
                  v-if="accountInfo.profileImageLink == ''"
                  class="pr-vector-ni"
                  src="../assets/create-main-bgs/user-free/User_perspective_matte.png"
                />
                <img
                  v-if="accountInfo.profileImageLink !== ''"
                  class="pr-realimg"
                  :src="imgLink"
                />
              </div>
            </div> 
            <div class="cpp-input-container">
              <p class="cpp-input-desc">Change Profile Picture :</p>
              <input
                id="cpp-edit"
                name="postpic"
                class="pic-input"
                type="file"
                placeholder="choose-image"
              />
            </div>
          </div>
        </div>
      </form>
    </section>
    <section class="ep-item-container">
      <div>
        <p class="ep-label">Fullname (eg Jane Doe)</p>
        <input v-model="username" type="text" class="ep-input" />
      </div>
    </section>
    <section class="ep-item-container">
      <div>
        <p class="ep-label">About Me (Briefly tell us about yourself)</p>
        <textarea v-model="about" class="ep-input ep-textarea"></textarea>
      </div>
    </section>
    <section class="ep-item-container">
      <div>
        <p class="ep-label">Location (eg Ali Samad Tower, Abu Dhabi, UAE)</p>
        <input v-model="location" type="text" class="ep-input" />
      </div>
    </section>
    <section class="ep-item-container">
      <div>
        <p class="ep-label">Website <i>( eg www.mywebsite.com )</i></p>
        <input v-model="website" type="text" class="ep-input" />
      </div>
    </section>
    <section class="ep-item-container">
      <div>
        <p class="ep-label">Interests</p>
        <vs-chip
          :key="interest"
          @click="remove(interest)"
          close-icon="delete"
          v-for="interest in interests"
          closable
        >
          {{ interest }}
        </vs-chip>

        <span class="addnewinterestcontainer">
          <vs-input
            v-model="chip"
            type="text"
            placeholder="Add new interest"
          ></vs-input>
          <button class="add-interest-button" @click="addInterest()">
            Add Interest
          </button>
        </span>
      </div>
    </section>
    <section class="ep-item-container">
      <div>
        <p class="ep-label">Employment Status</p>
        <vs-select v-model="employmentStatus">
          <vs-select-item
            disabled
            :value="''"
            :text="'Select one from the options'"
          />
          <vs-select-item
            :key="employmentStatus.id"
            :value="employmentStatus.status"
            :text="employmentStatus.status"
            v-for="employmentStatus in employementOptions"
          />
        </vs-select>
      </div>
    </section>
    <section class="submit-profile-edit-button-container">
      <button @click="sendEditRequest()" class="pointercursor">
        Save Changes
      </button>
    </section>
  </section>
</template>

<script>
export default {
  data: function () {
    return {
      name: "edit-profile",
      accountInfo: {},
      MID: JSON.parse(window.localStorage.getItem("userlogindata")).MID,
      DID: JSON.parse(window.localStorage.getItem("userlogindata")).DID,
      username: "",
      website: "",
      interests: "",
      about: "",
      employmentStatus: "",
      location: "",
      profileImageLink: "",
      employementOptions: [
        { id: 0, status: "Student" },
        { id: 1, status: "Self Employed" },
        { id: 2, status: "Employed" },
        { id: 3, status: "Retired" },
        { id: 4, status: "Unemployed" },
      ],
      interestModel: "",
      chip: "",
      name : ""
    };
  },
  computed: {
    imgLink: function () {
      return this.accountInfo.profileImageLink
        ? this.accountInfo.profileImageLink
        : "";
    },
      userName : function () {
        return this.name;
      }
  },
  methods: {
    async sendPostCloudinaryReq(){
      this.$vs.loading();
      let file = document.getElementById("cpp-edit").files[0];
      const url = "https://api.cloudinary.com/v1_1/mixambusiness/image/upload";
      const formData = new FormData();
      formData.append("file",file);
      formData.append("upload_preset","skmmp7bt");
      return await window.axios.post(url,formData);
      },
    remove(item) {
      this.interests.splice(this.interests.indexOf(item), 1);
    },
    sendEditRequest: async function () {
      let url = `${this.$store.state.apiServer}/edit-profile/`;
      let formData = new FormData();
      formData.append("username", this.username ? this.username : "");
      formData.append("website", this.website ? this.website : "");
      formData.append("location", this.location ? this.location : "");
      formData.append("about", this.about ? this.about : "");
      formData.append("interests", JSON.stringify(this.interests));
      formData.append("employmentStatus", this.employmentStatus);
      formData.append("MID", this.MID);
      formData.append("DID", this.DID);
      formData.append(
        "photoUploaded",
        document.getElementById("cpp-edit").value !== ""
      );
      if(document.getElementById("cpp-edit").value !== ""){
        let profileUrl = await this.sendPostCloudinaryReq().catch(()=>{
        this.$vs.loading.close();
      });;
        formData.append("profileURL", profileUrl.data.url);
      }
      window.axios
        .post(url, formData)
        .then((response) => {
          this.$vs.loading.close();
          if (response.data.status == "success") {
            this.name = this.username
            console.log("editprofile-req-res", response.data);
            if (response.data.imgLink) {
              this.accountInfo.profileImageLink = response.data.imgLink;
            }
          } else {
            console.log("unable to fetch data from server");
          }
        })
        .catch((error) => {
          this.$vs.loading.close();
          console.error(error.message);
        });
    },
    fetchAccountData() {
      let url = `${this.$store.state.apiServer}/getaccountinfo/`;
      this.$vs.loading();
      window.axios
        .get(url, {
          params: {
            MID: this.user || this.MID,
            DID: this.DID,
            profile: "true",
          },
        })
        .then((response) => {
          console.log("res fad", response.data);
          this.$vs.loading.close();
          if (response.data.status == "success") {
            this.accountInfo = response.data.__userAccountData;
            this.username = this.accountInfo.username;
            this.website = this.accountInfo.website;
            this.interests = this.accountInfo.interests;
            this.location = this.accountInfo.location;
            this.about = this.accountInfo.about;
            this.employmentStatus = this.accountInfo.employment_status;
          }
        })
        .catch((error) => {
          this.$vs.loading.close();
          this.$modal.show("dialog", {
            title: "Unable to fetch your data.",
            text: "Reason : " + error.message,
            buttons: [
              {
                title: "Okay",
                handler: () => {
                  this.$modal.hide("dialog");
                },
              },
              {
                title: "Try Again",
                handler: () => {
                  this.$modal.hide("dialog");
                  this.fetchAccountData();
                },
              },
            ],
          });
        });
    },
    addInterest() {
      this.interests.push(this.chip);
      this.chip = "";
    },
  },
  watch: {
    imgLink: function (newVal, oldVal) {
      console.log("updating user picture in the vuex", newVal, oldVal);
      this.$store.commit("updateuserphoto", newVal);
    },
    userName : function (newVal,oldVal) {
      console.log("updating username in the vuex", newVal, oldVal);
      this.$store.commit("updateusername", this.username);
    }
  },
  created: function () {
    this.fetchAccountData();
  },
};
</script>

<style lang="scss">
#edit-profile {
  padding-bottom: 70px;
}
.eph-page-title {
  text-align: center;
  font-weight: 600;
  font-family: candara, signika-regular;
  font-size: 200%;
  color: inherit;
  padding-top: 20px;
}
.eph-change-profile-picture-container {
  padding: 30px 10px 10px 10px;
}
.eph-chp {
  background: #e3efff;
  border-radius: 10px;
  padding-bottom: 15px;
  box-shadow: 0px 0px 10px #cbe0ff;
  border: 1px solid #cbe0ff;
}
.eph-image-container img {
  height: 215px;
  width: 200px;
  border-radius: 100px;
  display: block;
  margin: 0px auto;
}
.eph-vector-ni {
  background-color: white;
}
.eph-img-box-upper {
  padding-top: 20px;
}
.eph-image-container {
  width: max-content;
  border: 4px solid gray;
  border-radius: 150px;
  padding: 0px;
  margin: 0px auto;
  height: 215px;
  overflow: hidden;
}
.pic-input {
  width: max-content;
  display: block;
  margin: 0px auto;
  padding: 10px;
  border-radius: 10px;
  margin-top: 5px;
  color: gray;
  border: 1px solid;
}
.cpp-input-desc {
  text-align: center;
  margin-top: 15px !important;
}
.ep-item-container {
  padding: 10px;
}
.ep-item-container .con-select {
  width: 100% !important;
}
.ep-item-container:first-child {
  border-radius: 10px;
  box-shadow: 0px 0px 10px #cbe0ff;
  padding: 10px;
}
.ep-input {
  width: 100%;
  border-radius: 10px;
  border: 1px solid #bcdeff;
  height: 40px;
  margin-top: 10px;
  padding-left: 10px;
}
.ep-input.ep-textarea {
  height: 100px;
}
.total {
  width: 100%;
}
.submit-profile-edit-button-container {
  padding: 10px;
}
.submit-profile-edit-button-container button {
  width: 100%;
  border-radius: 13px;
  height: 40px;
  border: 1px solid #cbe0ff;
  background-color: #1e87f0;
  box-shadow: 0px 0px 10px #d7e5f9;
  font-weight: 600;
  color: white;
}
.add-interest-button {
  background-color: #4f4f4f;
  margin-top: 8px;
  padding: 5px;
  border-radius: 10px;
  border: 0px solid;
  height: 40px;
  color: white;
  font-weight: 600;
}
.ep-label {
  font-weight: 600;
  color: gray;
}
</style>
