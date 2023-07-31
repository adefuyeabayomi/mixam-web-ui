<template>
    <section id="login-container">
        <modal
            @opened="attachGoogleHandler()"
            v-on:closed="closeLoginHandler()"
            name="login-modal"
            :adaptive="true"
            height="auto"
            :max-width="maxWidth"
            width="90%"
        >
            <div v-on:click="$store.commit('closelogin')" class="closebutton">
                <i class="fas fa-times"></i>
            </div>
            <div id="loginForm" class="login-form">
                <div class="login-header">
                    <h4>
                        Welcome to
                        <span
                            style="display: inline-block"
                            class="login-text animate__animated animate__bounce"
                            >Mixam</span
                        ><br />
                        Login Here
                    </h4>
                </div>
                <text-input
                    v-on:blur="validateLoginEmail()"
                    v-on:focus="clearLoginEmailValidity()"
                    v-bind:validationsuccessful="emailValidLogin"
                    v-bind:validationfailed="emailNotValidLogin"
                    v-bind="emailOptionsLogin"
                    v-model="loginEmail"
                ></text-input>
                <text-input
                    v-on:blur="validateLoginPassword()"
                    v-on:focus="clearLoginPasswordValidity()"
                    v-bind:validationsuccessful="passwordValidLogin"
                    v-bind:validationfailed="passwordNotValidLogin"
                    v-bind="passwordOptionsLogin"
                    v-model="loginPassword"
                    v-bind:showpassword="showPasswordLogin"
                ></text-input>
                <div class="util1-container">
                    <div class="row">
                        <div class="col-6">
                            <input
                                type="checkbox"
                                v-model="showPasswordLogin"
                                class="show-password-style"
                            />
                            Show Password
                        </div>
                        <div class="col-6">
                            <p
                                @click="switchToForgotPassword()"
                                class="forgotpassword-text pointercursor"
                            >
                                <i v-bind:title="loginStatus"></i>
                                Forgot Password?
                            </p>
                        </div>
                    </div>
                </div>
                <div class="util2-container">
                    <vs-button
                        v-on:click="manualLoginHandler()"
                        class="login-btn"
                        block
                        >Login</vs-button
                    >
                </div>
                <div class="login-divider"></div>
                <div class="social-login-container">
                    <google-login></google-login>
                </div>
                <div class="util3-container">
                    <p class="new-acct-text">
                        New here?
                        <span
                            @click="switchToSignup()"
                            class="new-acct-link pointercursor"
                            >Create New Account.</span
                        >
                    </p>
                </div>
            </div>
        </modal>
        <p v-bind:loginstatus="loginStatus"></p>
        <v-dialog
            :adaptive="true"
            height="auto"
            :max-width="maxWidth"
            width="90%"
        />
        <p v-bind:title="googleLoginStatus"></p>
    </section>
</template>

<script>
import textInput from "../components/text-input.vue";
import googleLogin from "../components/google-login-button.vue";
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
function generateDeviceID() {
    return String(Math.round(Math.random() * 10000000000000000000));
}
export default {
    data: function () {
        return {
            name: "app-login",
            maxWidth: 480,

            //login data
            emailValidLogin: false,
            emailNotValidLogin: false,
            passwordNotValidLogin: false,
            passwordValidLogin: false,
            loginEmail: "",
            loginPassword: "",
            showPasswordLogin: false,

            // email options login
            emailOptionsLogin: {
                labeltrue: true,
                label: "Email",
                iconstyleobj: {},
                inputicon: "",
                inputtype: "text",
                inputplaceholder: "eg : you@domain.com",
                successtext: "Email Valid",
                failuretext: "Please Input a Valid Email...",
                icontext: "@",
                icon: true,
                showpassword: false,
            },

            // password options login
            passwordOptionsLogin: {
                labeltrue: true,
                label: "Password",
                iconstyleobj: {},
                inputicon: "fas fa-lock",
                inputtype: "password",
                inputplaceholder: "Your password",
                successtext: "Password Valid",
                failuretext:
                    "Must contain Alphabets, numbers and must be at least six characters...",
                icontext: "",
                icon: true,
            },
        };
    },
    computed: {
        googleLoginStatus: function () {
            let res = this.$store.state.googleLogin;
            if (res) {
                console.log(window.googleUser);
                this.googleLoginHandler();
            }
            return this.$store.state.googleLogin;
        },
        loginStatus: function () {
            let status = this.$store.state.loginOpen;
            console.log("login Status from app auth", status);
            return status;
        },
        updateLoginEmailValid: {
            get: function () {
                return this.emailValidLogin;
            },
            set: function (value) {
                this.emailValidLogin = value;
            },
        },
        updateLoginPasswordValid: {
            get: function () {
                return this.passwordValidLogin;
            },
            set: function (value) {
                return (this.passwordValidLogin = value);
            },
        },
        updateLoginEmailNotValid: {
            get: function () {
                return this.emailNotValidLogin;
            },
            set: function (value) {
                this.emailNotValidLogin = value;
            },
        },
        updateLoginPasswordNotValid: {
            get: function () {
                return this.passwordNotValidLogin;
            },
            set: function (value) {
                this.passwordNotValidLogin = value;
            },
        },
        loginFormValid: function () {
            if (this.emailValidLogin && this.passwordValidLogin) {
                return true;
            }
            return false;
        },
    },
    methods: {
        googleLoginHandler() {
            if (this.$store.state.googleLoginOrigin == "login") {
                console.log(
                    " in google login handler. Email = ",
                    window.googleUser.getBasicProfile().getEmail()
                );
                console.log(window.googleUser);
                this.submitForm({
                    login_type: "google",
                    email: window.googleUser.getBasicProfile().getEmail(),
                });
            }
        },
        manualLoginHandler() {
            let valid = this.loginFormValid;
            if (valid) {
                this.submitForm({
                    login_type: "manual",
                    email: this.loginEmail,
                    password: this.loginPassword,
                });
            } else {
                if (!this.validateLoginEmail) {
                    this.$modal.show("dialog", {
                        title: "Invalid Email",
                        text: "Please Input a valid Email",
                        buttons: [
                            {
                                title: "okay",
                                handler: () => {
                                    this.$modal.hide("dialog");
                                },
                            },
                        ],
                    });
                }
                if (!this.validateLoginPassword) {
                    this.$modal.show("dialog", {
                        title: "Passowrd not Valid",
                        text: "Must contain Alphabets, numbers and must be at least six characters...",
                        buttons: [
                            {
                                title: "okay",
                                handler: () => {
                                    this.$modal.hide("dialog");
                                },
                            },
                        ],
                    });
                }
            }
        },
        attachGoogleHandler() {
            this.$store.commit("updategoogleloginorigin", "login");
            let googleSigninButton =
                document.getElementById("google-login-btn");
            console.log(googleSigninButton, "signin attached to googlesignin");
            window.attachGoogleSignin(googleSigninButton);
        },
        validateLoginEmail: function () {
            validate(this.loginEmail)
                ? (this.updateLoginEmailValid = true)
                : (this.updateLoginEmailNotValid = true);
        },
        clearLoginEmailValidity: function () {
            this.updateLoginEmailValid = false;
            this.updateLoginEmailNotValid = false;
        },
        validateLoginPassword: function () {
            validatePassword(this.loginPassword)
                ? (this.updateLoginPasswordValid = true)
                : (this.updateLoginPasswordNotValid = true);
        },
        clearLoginPasswordValidity: function () {
            this.passwordNotValidLogin = false;
            this.passwordValidLogin = false;
        },
        openLogin: function () {
            this.$modal.show("login-modal");
        },
        closeLogin: function () {
            this.$modal.hide("login-modal");
        },
        closeLoginHandler: function () {
            this.$store.commit("closelogin");
            this.clearLoginEmailValidity();
            this.clearLoginPasswordValidity();
        },
        switchToForgotPassword: function () {
            this.closeLoginHandler();
            console.log("closing login and moving to forgot password");
            setTimeout(() => {
                this.$store.commit("openforgotpassword");
            }, 700);
        },
        switchToSignup() {
            this.closeLoginHandler();
            setTimeout(() => {
                this.$store.commit("opensignup");
            }, 700);
        },
        submitForm(data = {}) {
            let email = data.email;
            let password = data.password;
            let loginType = data.login_type;
            let authType = "login";
            let deviceID = "";
            let newDevice = false;
            let userAgent = this.$store.state.__userAgent;
            if (window.localStorage.getItem("userlogindata") == null) {
                deviceID = generateDeviceID();
                window.localStorage.setItem(
                    "userlogindata",
                    JSON.stringify({ DID: deviceID })
                );
                newDevice = true;
            } else {
                deviceID = JSON.parse(
                    window.localStorage.getItem("userlogindata")
                ).DID;
            }
            console.log("data", data);
            let url = `${this.$store.state.apiServer}/apiservice/auth/`;
            //let url = "/apiservice/auth/";
            this.$vs.loading({
                text: "Logging You in..., Please wait",
                scale: "0.5",
            });
            window.axios
                .get(url, {
                    params: {
                        email,
                        password,
                        loginType,
                        authType,
                        DID: deviceID,
                        userAgent,
                        newDevice,
                    },
                })
                .then((response) => {
                    // response has four key values. status, errorMessage||successMessage, __userAccountData if successful , new_user true if it is a sign up.
                    console.log("login response", response.data);
                    this.$vs.loading.close();
                    // set window login data
                    console.log(window.localStorage.getItem("userlogindata"));
                    if (response.data.status == "success") {
                        window.userIsAuthenticated = true;
                        this.$store.commit(
                            "updateloginstatus",
                            response.data.__userAccountData
                        );
                        this.$store.commit(
                            "updatedeviceinformation",
                            response.data.deviceInfo
                        );
                        this.$store.commit(
                            "addtouserfollowing",
                            response.data.__userAccountData.following
                        );
                        this.$store.commit(
                            "addtouserfollowers",
                            response.data.__userAccountData.followers
                        );
                        this.$store.commit(
                            "updateusername",
                            response.data.__userAccountData.username
                        );
                        this.$store.commit(
                            "updateemail",
                            response.data.__userAccountData.email
                        );
                        this.$store.commit(
                            "updatenotifications",
                            response.data.__userAccountData.notifications
                        );
                        this.$store.commit(
                            "updateactivitylog",
                            response.data.__userAccountData.activityLog
                        );
                        this.closeLoginHandler();
                        //changepage to explore
                        //this.$router.location == "explore" ? true : this.$router.push("explore")
                        if (this.$route.name !== "explore-main") {
                            this.$router.push("explore-main");
                        }
                        if (response.data.new_user) {
                            this.$store.commit("updateprofilebuilder", true);
                            let dataObj = {
                                DID: deviceID,
                                MID: response.data.__userAccountData.__mid,
                            };
                            window.localStorage.setItem(
                                "userlogindata",
                                JSON.stringify(dataObj)
                            );
                        } else {
                            let windowLoginData = {
                                DID: JSON.parse(
                                    window.localStorage.getItem("userlogindata")
                                ).DID,
                                MID: response.data.__userAccountData.__mid,
                            };
                            window.localStorage.setItem(
                                "userlogindata",
                                JSON.stringify(windowLoginData)
                            );
                            this.$vs.notify({
                                title:
                                    "Welcome Back " +
                                    response.data.__userAccountData.username,
                            });
                        }
                    } else if (
                        response.data.status == "verification_required"
                    ) {
                        this.$modal.show("dialog", {
                            title: "Verification Required for every new login.",
                            text:
                                response.data.message +
                                ". Please follow the instructions given or send an email to mixambusiness@gmail.com to report the issue.",
                            buttons: [
                                {
                                    title: "Okay",
                                    handler: () => {
                                        this.$modal.hide("dialog");
                                    },
                                },
                                {
                                    title: "Re-Send Email",
                                    handler: () => {
                                        this.$modal.hide("dialog");
                                        console.log(
                                            "resending verification email for device now."
                                        );
                                        this.resendVerifyEmail();
                                    },
                                },
                            ],
                        });
                    } else {
                        this.$modal.show("dialog", {
                            title: "Unable to process login request",
                            text:
                                response.data.errorMessage +
                                ". Please follow the instructions given or send an email to mixambusiness@gmail.com to report the issue.",
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
                    // client errors
                    // open dialog to report error and next step is to close dialog but still leave signupmodal for users to try again.
                    this.$vs.loading.close();
                    this.$modal.show("dialog", {
                        text: error,
                        button: [
                            {
                                title: "okay",
                                handler: () => {
                                    this.$modal.hide("dialog");
                                },
                            },
                        ],
                    });
                })
                .then(() => {
                    console.log("request ended");
                });
        },
        resendVerifyEmail: function () {
            let url = `${this.$store.state.apiServer}/resend-email/`;
            window.axios
                .get(url, {
                    params: {
                        email: this.loginEmail,
                        DID: JSON.parse(
                            window.localStorage.getItem("userlogindata")
                        ).DID,
                        resend_type: "verify",
                    },
                })
                .then((response) => {
                    console.log("Verify Email", response);
                    setTimeout(() => {
                        console.log("in the modal container");
                        this.$modal.show("dialog", {
                            title: "Done - Verification Email has been sent successfully",
                            text: "Success",
                            buttons: [
                                {
                                    title: "Okay, Thanks.",
                                    handler: () => {
                                        this.$modal.hide("dialog");
                                    },
                                },
                            ],
                        });
                    }, 1000);
                })
                .catch((err) => {
                    console.error("verify-resend", err.message);
                });
        },
    },
    watch: {
        loginStatus(old, value) {
            this.loginStatus == true ? this.openLogin() : this.closeLogin();
            console.log("old", old, "login operation detected", value);
        },
    },
    components: {
        textInput,
        googleLogin,
    },
};
</script>

<style lang="scss">
.facebookLoginWrapper {
    margin: 0px auto;
    width: max-content;
}
.login-form,
.signup-form,
.forgotpassword-container {
    @include padding1;
}
.forgotpassword-container h4 {
    @include padding-bottom1;
}
.login-header h4 {
    font-family: $theme-view-font1-regular !important;
    font-weight: 600;
}
.recovery-instruction {
    text-align: center;
}
[class~="login-text"] {
    color: rgb(3, 164, 238);
    font-size: 120%;
}
.login-header,
.signup-header {
    font-size: 18px;
    text-align: center;
    word-spacing: 2px;
    @include padding-top8;
    @include padding-bottom8;
}
.closebutton {
    background-color: gray;
    width: 20px;
    height: 20px;
    padding: 2px 0px 0px 5px;
    border-radius: 50%;
    position: absolute;
    right: 0px;
    top: 0px;
}
.closebutton i {
    color: white;
}
.util1-container {
    @include padding-top8;
    @include padding-bottom8;
    color: #4285f4;
}

.forgotpassword-text {
    text-align: right;
    font-weight: 600;
    color: #6a6a6a;
}
.login-btn {
    width: 100%;
    display: block;
    margin: 15px auto;
    border-radius: 15px;
    height: 30px;
}
.new-acct-link {
    color: #4285f4;
    font-weight: 600;
}
.login-divider {
    width: 100%;
    height: 1px;
    background: #d9eeff;
    margin: 17px auto;
    margin-bottom: 21px;
}
</style>
