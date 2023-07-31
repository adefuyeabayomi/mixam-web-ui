<template>
    <section id="signup-container">
        <modal
            @opened="attachGoogleHandler()"
            name="signup"
            height="auto"
            width="90%"
            :max-width="maxWidth"
            :adaptive="true"
            @closed="closeSignupHandler()"
        >
            <div @click="$store.commit('closesignup')" class="closebutton">
                <i class="fas fa-times"></i>
            </div>
            <div id="signupForm" class="signup-form">
                <div class="signup-header">
                    <h4>
                        Welcome to
                        <span
                            style="display: inline-block"
                            class="login-text animate__animated animate__bounce"
                            >Mixam</span
                        ><br />
                        Register Here
                    </h4>
                </div>
                <text-input
                    @blur="validateSignupEmail()"
                    @focus="clearSignupEmailValidity()"
                    :validationsuccessful="signupEmailValid"
                    :validationfailed="signupEmailNotValid"
                    v-model="signupEmail"
                    v-bind="emailOptionsSignup"
                ></text-input>
                <text-input
                    @blur="validatePasswordSignupInit()"
                    @focus="clearSignupPasswordValidityInit()"
                    :validationfailed="signupPasswordInitNotValid"
                    :validationsuccessful="signupPasswordInitValid"
                    v-model="signupPasswordInit"
                    v-bind="signupPasswordOptions"
                    :showpassword="showPasswordSignup"
                ></text-input>
                <text-input
                    @blur="validatePasswordSignupConfirm()"
                    @focus="clearSignupPasswordValildityConfirm()"
                    :validationfailed="signupPasswordConfirmNotValid"
                    :validationsuccessful="signupPasswordConfirmValid"
                    v-model="signupPasswordConfirm"
                    v-bind="signupPasswordOptions"
                    :showpassword="showPasswordSignup"
                ></text-input>
                <div class="util1-container">
                    <div>
                        <input
                            type="checkbox"
                            v-model="showPasswordSignup"
                            class="show-password-style"
                        />
                        Show Password
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            v-model="termsAndCondition"
                            class="show-password-style"
                        />
                        I have a read and agree with the
                        <span
                            class="tems-c pointercursor"
                            @click="openTermsAndConditions()"
                        >
                            terms and conditions
                        </span>
                    </div>
                </div>
                <div class="util2-container">
                    <vs-button
                        v-on:click="manualLoginHandler()"
                        class="login-btn"
                        block
                        >Sign Up</vs-button
                    >
                </div>
                <div class="login-divider"></div>
                <div class="social-login-container">
                    <google-login
                        :termsAndCondition="termsAndCondition"
                    ></google-login>
                </div>
                <div class="util3-container">
                    <p class="new-acct-text">
                        Already have an account?
                        <span
                            @click="switchToLogin()"
                            class="new-acct-link pointercursor"
                            >Login Here</span
                        >
                    </p>
                </div>
            </div>
        </modal>
        <p v-bind:signupstatus="signupStatus"></p>
        <v-dialog
            :adaptive="true"
            height="auto"
            :max-width="maxWidth"
            width="90%"
        />
        <p v-bind:title="googleLoginStatus"></p>
        <modal
            name="terms-modal"
            :adaptive="true"
            height="auto"
            :max-width="maxWidth"
            width="90%"
        >
            <terms style="max-height: 500px; overflow-y: scroll"></terms>
        </modal>
    </section>
</template>

<script>
import textInput from "../components/text-input.vue";
import googleLogin from "../components/google-login-button.vue";
import termsAndConditionsVue from "@/views/terms-and-conditions.vue";
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
            name: "app-signup",
            maxWidth: 480,
            termsAndCondition: false,
            // signup data
            showPasswordSignup: false,
            signupEmailValid: false,
            signupEmailNotValid: false,
            signupPasswordInitValid: false,
            signupPasswordInitNotValid: false,
            signupPasswordConfirmValid: false,
            signupPasswordConfirmNotValid: false,
            signupEmail: "",
            signupPasswordInit: "",
            signupPasswordConfirm: "",

            // email options signup
            emailOptionsSignup: {
                labeltrue: true,
                label: "Email",
                iconstyleobj: {},
                inputicon: "",
                inputtype: "text",
                inputplaceholder: "eg : you@domain.com",
                successtext: "Email Valid",
                failuretext: "Please input a valid email",
                icontext: "@",
                icon: true,
                showpassword: false,
            },
            // password options forgot password
            signupPasswordOptions: {
                labeltrue: true,
                label: "Password",
                iconstyleobj: {},
                inputicon: "fas fa-lock",
                inputtype: "password",
                inputplaceholder: "Set your password",
                successtext: "Password Is Valid",
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
        signupStatus: function () {
            let status = this.$store.state.signupOpen;
            return status;
        },
        updateSignupEmailValid: {
            get: function () {
                return this.signupEmailValid;
            },
            set: function (value) {
                return (this.signupEmailValid = value);
            },
        },
        updateSignupEmailNotValid: {
            get: function () {
                return this.signupEmailNotValid;
            },
            set: function (value) {
                return (this.signupEmailNotValid = value);
            },
        },
        updateSignupPasswordInitValid: {
            get: function () {
                return this.signupPasswordInitValid;
            },
            set: function (value) {
                return (this.signupPasswordInitValid = value);
            },
        },
        updateSignupPasswordInitNotValid: {
            get: function () {
                return this.signupPasswordInitNotValid;
            },
            set: function (value) {
                return (this.signupPasswordInitNotValid = value);
            },
        },
        updateSignupPasswordConfirmValid: {
            get: function () {
                return this.signupPasswordConfirmValid;
            },
            set: function (value) {
                return (this.signupPasswordConfirmValid = value);
            },
        },
        updateSignupPasswordConfirmNotValid: {
            get: function () {
                return this.signupPasswordConfirmNotValid;
            },
            set: function (value) {
                return (this.signupPasswordConfirmNotValid = value);
            },
        },
    },
    methods: {
        openTermsAndConditions() {
            console.log("opening terms and conditions");
            this.$modal.show("terms-modal");
        },
        googleLoginHandler() {
            if (this.$store.state.googleLoginOrigin == "signup") {
                console.log(
                    " in google login handler. Email = ",
                    window.googleUser.getBasicProfile().getEmail()
                );
                console.log(window.googleUser);
                if (!this.termsAndCondition) {
                    this.$vs.notify({
                        title: "Terms and condition must be accepted",
                        text: "You have to agree to the terms and conditions before you can proceed to to sign up",
                        position: "bottom-center",
                        color: "#03a4ee",
                    });
                    return;
                }
                this.submitForm({
                    login_type: "google",
                    email: window.googleUser.getBasicProfile().getEmail(),
                });
            }
        },
        manualLoginHandler() {
            let valid = this.signupFormValid();
            if (!this.termsAndCondition) {
                this.$vs.notify({
                    title: "Terms and condition must be accepted",
                    text: "You have to agree to the terms and conditions before you can proceed to to sign up",
                    position: "bottom-center",
                    color: "#03a4ee",
                });
                return;
            }
            console.log(
                "signup email valid",
                this.signupEmail,
                "signup password init",
                this.signupPasswordInit,
                "signup password confirm valid",
                this.signupPasswordConfirm
            );
            if (valid) {
                this.submitForm({
                    login_type: "manual",
                    password: this.signupPasswordConfirm,
                    email: this.signupEmail,
                });
            } else {
                if (!validate(this.signupEmail)) {
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
                } else {
                    this.$modal.show("dialog", {
                        title: "Check the passwords you inputed",
                        text: "It seems your password combinations don't match or are not up to our security standard. Check again and proceed. NB: Passwords must contain alphabets, numbers and must be at least six characters long",
                        buttons: [
                            {
                                title: "okay",
                                handler: () => {
                                    this.$modal.hide("dialog");
                                },
                            },
                        ],
                    });
                    return;
                }
            }
        },
        attachGoogleHandler() {
            this.$store.commit("updategoogleloginorigin", "signup");
            let googleSigninButton =
                document.getElementById("google-login-btn");
            console.log(googleSigninButton, "signin attached to googlesignin");
            window.attachGoogleSignin(googleSigninButton);
        },
        validateSignupEmail() {
            validate(this.signupEmail)
                ? (this.updateSignupEmailValid = true)
                : (this.updateSignupEmailNotValid = true);
        },
        validatePasswordSignupInit() {
            validatePassword(this.signupPasswordInit)
                ? (this.updateSignupPasswordInitValid = true)
                : (this.updateSignupPasswordInitNotValid = true);
            //
        },
        validatePasswordSignupConfirm() {
            validatePassword(this.signupPasswordConfirm)
                ? (this.updateSignupPasswordConfirmValid = true)
                : (this.updateSignupPasswordConfirmNotValid = true);
        },
        clearSignupEmailValidity() {
            this.updateSignupEmailValid = false;
            this.updateSignupEmailNotValid = false;
        },
        clearSignupPasswordValidityInit() {
            this.updateSignupPasswordInitValid = false;
            this.updateSignupPasswordInitNotValid = false;
        },
        clearSignupPasswordValildityConfirm() {
            this.signupPasswordConfirmValid = false;
            this.signupPasswordConfirmNotValid = false;
        },
        openSignup: function () {
            this.$modal.show("signup");
        },
        closeSignup: function () {
            this.$modal.hide("signup");
        },
        closeSignupHandler: function () {
            this.$store.commit("closesignup");
            this.clearSignupEmailValidity();
            this.clearSignupPasswordValidityInit();
            this.clearSignupPasswordValildityConfirm();
        },
        switchToLogin() {
            this.closeSignupHandler();
            setTimeout(() => {
                this.$store.commit("openlogin");
            }, 700);
        },
        signupFormValid: function () {
            let valid =
                this.signupEmailValid &&
                this.signupPasswordInitValid &&
                this.signupPasswordConfirmValid &&
                this.signupPasswordInit == this.signupPasswordConfirm;
            return valid;
        },
        submitForm(data) {
            console.log(data);
            let email = data.email;
            let password = data.password;
            let loginType = data.login_type;
            let authType = "signup";
            let userAgent = this.$store.state.__userAgent;
            let deviceID = generateDeviceID();
            console.log(deviceID);
            //it means it is a new device logging in to the app, so we assign a device ID.
            if (window.localStorage.getItem("userlogindata") == null) {
                deviceID = generateDeviceID();
            }

            let url = `${this.$store.state.apiServer}/apiservice/auth/`;
            //let url = "apiservice/auth/";
            console.log(
                email +
                    " email " +
                    password +
                    " password " +
                    loginType +
                    " loginType " +
                    authType +
                    " authType " +
                    url +
                    " url ",
                " signup request options ",
                "userAgent : ",
                userAgent
            );
            this.$vs.loading({
                text: "Signing you up.., Please wait",
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
                    },
                })
                .then((response) => {
                    this.$vs.loading.close();
                    if (response.data.status == "success") {
                        window.userIsAuthenticated = true;
                        this.$store.commit(
                            "updatedeviceinformation",
                            response.data.deviceInfo
                        );

                        this.$store.commit(
                            "updateloginstatus",
                            response.data.__userAccountData
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
                        this.closeSignupHandler();
                        // change page to explore
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
                            this.$vs.notify({
                                title:
                                    "Welcome " +
                                    response.data.__userAccountData.email,
                            });
                        }
                        console.log("user account data", response.data);
                    } else {
                        this.$modal.show("dialog", {
                            title: "Unable to process login request",
                            text:
                                "Reason : " +
                                response.data.errorMessage +
                                ". Please follow the instructions given or send an email to adefuyeabayomi1@gmail.com to report the issue.",
                            buttons: [
                                {
                                    title: "OKAY",
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
    },
    watch: {
        signupStatus(old, value) {
            this.signupStatus ? this.openSignup() : this.closeSignup();
            console.log("signup operation detected", value);
        },
    },
    components: {
        textInput,
        googleLogin,
        terms: termsAndConditionsVue,
    },
};
</script>

<style lang="scss">
.new-acct-text {
    text-align: center;
}
.signup-header h4 {
    font-family: $theme-view-font1-regular !important;
    font-family: "signika-regular";
    font-weight: 600;
}
.tems-c {
    font-weight: 600;
    text-decoration: underline;
}
</style>
