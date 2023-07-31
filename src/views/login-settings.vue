<template>
  <section id="login-settings">
    <div class="login-settings-header-container">
      <div class="lsh-main">
        <p class="lsh-title">Login Information <span>& settings</span></p>
      </div>
    </div>
    <div class="lp-divider"></div>
    <div>
      <div>
        <p class="login-info-title">Login information</p>
      </div>
      <div class="login-info-details">
        <p>
          Account Creation Time : {{ account_creation_time }} ({{
            createdDate
          }})
        </p>
        <p>Sign up method : {{ loginType }}</p>
        <p>Email Used In sign up : {{ accountInfo.email }}</p>
        <p>
          Password : <span v-if="showPassword">{{ accountInfo.password }}</span
          ><span v-if="!showPassword">************</span>
          <button
            class="ptb"
            v-if="!showPassword"
            @click="updateShowPassword()"
          >
            Show Password <i class="fas fa-eye"></i></button
          ><button
            class="ptb"
            v-if="showPassword"
            @click="updateShowPassword()"
          >
            Hide Password <i class="fas fa-eye-slash"></i>
          </button>
        </p>
      </div>
    </div>
    <div class="lp-divider"></div>
    <div class="change-item-container">
      <div class="change-item">
        <p class="lsh-title">Change Password</p>
        <form class="lsh-form-container">
          <div class="login-settings-input-container">
            <p>New Password :</p>
            <input type="password" class="lsh-input" v-model="pChange" />
          </div>
          <div class="login-settings-input-container">
            <p>Confirm New Password :</p>
            <input type="password" class="lsh-input" v-model="pChangeConfirm" />
          </div>
        </form>
        <div class="login-submit-button-container">
          <button
            class="feedback-submit-button"
            @click="submitPasswordUpdate()"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
    <div class="lp-divider"></div>
    <div class="change-item-container">
      <div class="change-item">
        <p class="lsh-title">Change Login Email</p>
        <form class="lsh-form-container">
          <div class="login-settings-input-container">
            <p>Input the new email below :</p>
            <input type="email" class="lsh-input" v-model="eChange" />
          </div>
        </form>
        <div class="login-submit-button-container">
          <button class="feedback-submit-button" @click="submitEmailUpdate()">
            Update your email
          </button>
        </div>
      </div>
    </div>
    <div class="lp-divider"></div>
    <div class="change-item-container">
      <div class="change-item">
        <p class="lsh-title">Change Login Method</p>
        <form class="lsh-form-container">
          <div class="login-settings-input-container">
            <p>Choose preferred login methods :</p>
            <select
              class="lsh-input"
              name="feedback-type"
              v-model="cLoginMethod"
            >
              <option value="" disabled>Select your preferred method</option>
              <option value="google">Google Login</option>
              <option value="manual">Email and Password Login</option>
            </select>
          </div>
        </form>
        <div class="login-submit-button-container">
          <button class="feedback-submit-button" @click="submitLoginUpdate()">
            Change your login method
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
function validatePassword(password) {
  if (
    /[A-Za-z]/.test(password) &&
    /[0-9]/.test(password) &&
    password.length >= 6
  ) {
    return true;
  }
  return false;
}
function validate(mail) {
  if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      mail
    )
  ) {
    return true;
  }
  return false;
}
import { format } from "js-time-ago";
export default {
  data: function () {
    return {
      cLoginMethod: "",
      eChange: "",
      pChange: "",
      pChangeConfirm: "",
      account_creation_time: "",
      signup_method: "",
      signup_email: "",
      account_password: "",
      account_verified: "",
      accountInfo: this.$store.state.userAccountInfo,
      showPassword: false,
      MID: JSON.parse(window.localStorage.getItem("userlogindata")).MID,
      DID: JSON.parse(window.localStorage.getItem("userlogindata")).DID,
    };
  },
  computed: {
    createdDate: function () {
      return String(new Date(this.accountInfo.created))
        .split(" ")
        .slice(0, 4)
        .join(" ");
    },
    loginType: function () {
      return this.accountInfo.loginType == "manual"
        ? "Email and Password"
        : "Google Signin";
    },
  },
  methods: {
    updateShowPassword() {
      this.showPassword = !this.showPassword;
    },
    submitPasswordUpdate() {
      let url = "http://localhost/update-login-details/";
      if (this.pChange !== this.pChangeConfirm) {
        this.$modal.show("dialog", {
          title:
            "The passwords you inputed does not match. Check it and try again.",
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
      if (!validatePassword(this.pChange)) {
        this.$modal.show("dialog", {
          title:
            "Passwords should contain Alphabets and Numbers. Must be greater than six characters long.",
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
      this.$vs.loading();
      window.axios
        .get(url, {
          params: {
            MID: this.MID,
            DID: this.DID,
            password: this.pChange,
            action: "change-password",
          },
        })
        .then((response) => {
          this.$vs.loading.close();
          if (response.data.status == "success") {
            this.accountInfo.password = this.pChange;
            this.$modal.show("dialog", {
              title: "Password Change Was Successful",
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
            this.$modal.show("dialog", {
              title:
                "Unable to complete the password change due to technical issues. We are working to resolve them as soon as possible.",
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
          console.error(error.message);
        });
    },
    submitEmailUpdate() {
      let url = "http://localhost/update-login-details/";
      if (!validate(this.eChange)) {
        this.$modal.show("dialog", {
          title:
            "The email you inputed is not valid. Please input a valid email to proceed.",
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
      this.$vs.loading();
      window.axios
        .get(url, {
          params: {
            MID: this.MID,
            DID: this.DID,
            email: this.eChange,
            action: "email-change-verify",
          },
        })
        .then((response) => {
          this.$vs.loading.close();
          if (response.data.status == "success") {
            this.$modal.show("dialog", {
              title:
                "An email containing a verification link has been sent to " +
                this.eChange +
                ". The change will not be effective until the verification link sent is used to effect the change.",
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
            this.$modal.show("dialog", {
              title:
                "Unable to complete the email change request due to technical issues. We are working to resolve them as soon as possible.",
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
          console.error(error.message);
        });
    },
    submitLoginUpdate() {
      let url = "http://localhost/update-login-details/";
      if (this.cLoginMethod == "") {
        this.$modal.show("dialog", {
          title:
            "Please select the method you prefer to login with from the options before proceeding.",
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
      this.$vs.loading();
      window.axios
        .get(url, {
          params: {
            MID: this.MID,
            DID: this.DID,
            loginType: this.cLoginMethod,
            action: "change-login-type",
          },
        })
        .then((response) => {
          this.$vs.loading.close();
          if (response.data.status == "success") {
            this.$modal.show("dialog", {
              title:
                "You have updated your preferred login method successfully.",
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
            this.$modal.show("dialog", {
              title:
                "Unable to update your preferred login method due to technical issues. We are working to resolve them as soon as possible.",
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
          console.error(error.message);
        });
    },
  },
  created: function () {
    this.eChange = this.accountInfo.email;
    format(this.accountInfo.created)
      .then((res) => {
        this.account_creation_time = res;
      })
      .catch((err) => {
        console.error(err.message);
      });
  },
};
</script>

<style lang="scss">
#login-settings {
  font-family: candara, signika-regular;
  padding: 10px;
  padding-bottom: 90px;
}
.lsh-title {
  font-weight: 900;
  font-size: 200%;
  text-align: center;
  padding-top: 20px;
}
.lsh-title span {
  color: #59adff;
}
.lp-divider {
  height: 2px;
  background: gray;
  border-radius: 10px;
  margin-top: 7px;
}
.login-info-title {
  font-weight: 600;
  padding: 30px 0px 10px 0px;
}
.login-info-details p {
  padding: 10px 0px;
}
.change-item-container {
  padding: 10px;
}
.change-item {
  border-radius: 20px;
  border: 1px solid #cbe0ff;
  box-shadow: 0px 0px 10px #cbe0ff;
  padding-bottom: 20px;
}
.lsh-form-container {
  padding: 10px;
}
.login-settings-input-container {
  padding-top: 10px;
  padding-bottom: 10px;
}
.lsh-input {
  border-radius: 13px;
  border: 1px solid gray;
  width: 100%;
  height: 40px;
  padding-left: 10px;
}
.login-submit-button-container {
  padding: 10px;
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
.ptb {
  padding: 2px 10px 2px 10px;
  border-radius: 5px;
  border: 0px solid;
  background-color: #c0e9e9;
}
</style>
