<template>
    <section id="forgotpassword-section">
        <modal
            name="forgotpassword"
            height="auto"
            width="90%"
            :max-width="maxWidth"
            :adaptive="true"
            :clickToClose="false"
        >
            <section
                class="fill-email-section animate__animated animate__fadeInUp"
                :class="[emailInputActive]"
                v-if="currentTab == 'emailInput'"
            >
                <div @click="closeForgotpasswordHandler()" class="closebutton">
                    <i class="fas fa-times"></i>
                </div>
                <div class="forgotpassword-container">
                    <div class="signup-header">
                        <h4>Recover your password here.</h4>
                    </div>
                    <p class="recovery-instruction">
                        Kindly fill in the email you used to register the
                        account below
                    </p>
                    <text-input
                        @blur="validateForgotPaswordEmail()"
                        @focus="clearForgotpasswordEmailValidity()"
                        :validationfailed="forgotpasswordEmailNotValid"
                        :validationsuccessful="forgotpasswordEmailValid"
                        v-model="forgotpasswordEmail"
                        v-bind="emailOptionsForgotPassword"
                    ></text-input>
                    <div class="util2-container">
                        <vs-button
                            v-on:click="submitRecoveryForm()"
                            class="login-btn"
                            block
                            >Proceed</vs-button
                        >
                    </div>
                </div>
            </section>
            <section
                class="otp-section animate__animated animate__fadeInUp"
                v-if="currentTab !== 'emailInput'"
            >
                <div @click="closeForgotpasswordHandler()" class="closebutton">
                    <i class="fas fa-times"></i>
                </div>
                <div class="otp-container">
                    <h4 class="signup-header">
                        Your Password Was Reset Successfully.
                    </h4>
                    <p class="recovery-instruction">
                        An email with a new password has been sent to
                        {{ forgotpasswordEmail }}. Please check your email and
                        use the new email to complete your login. For security
                        Reasons, change it immediately upon successful login.
                    </p>
                    <div class="util2-container">
                        <vs-button
                            style="background: black !important"
                            v-on:click="goToLogin()"
                            class="login-btn"
                            block
                            >Okay Thanks <i class="fas fa-thumbs-up"></i
                        ></vs-button>
                    </div>
                    <div class="util2-container">
                        <vs-button
                            v-on:click="submitRecoveryForm()"
                            class="login-btn"
                            block
                            >I didn't get any email, Resend
                            <i class="fas fa-undo-alt"></i
                        ></vs-button>
                    </div>
                </div>
            </section>
        </modal>
        <p v-bind:forgotpasswordstatus="forgotpasswordStatus"></p>
        <v-dialog
            :adaptive="true"
            height="auto"
            :max-width="maxWidth"
            width="90%"
        />
    </section>
</template>
<script>
import textInput from "../components/text-input.vue";
import axios from "axios";
import exploreArticlesVue from "../views/explore-articles.vue";

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

export default {
    data: function () {
        return {
            name: "app-forgotpassword",
            maxWidth: 480,
            emailInputActive: "",
            currentTab: "emailInput",
            //forgotpassword data section.
            forgotpasswordEmail: "",
            forgotpasswordEmailValid: false,
            forgotpasswordEmailNotValid: false,

            // forgotpassword email options
            emailOptionsForgotPassword: {
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
        };
    },
    computed: {
        forgotpasswordStatus: function () {
            let status = this.$store.state.forgotpasswordOpen;
            return status;
        },
        updateForgotpasswordEmailValidity: {
            get: function () {
                return this.forgotpasswordEmailValid;
            },
            set: function (value) {
                return (this.forgotpasswordEmailValid = value);
            },
        },
    },
    methods: {
        validateForgotPaswordEmail() {
            validate(this.forgotpasswordEmail)
                ? (this.forgotpasswordEmailValid = true)
                : (this.forgotpasswordEmailNotValid = true);
        },
        clearForgotpasswordEmailValidity() {
            this.forgotpasswordEmailValid = false;
            this.forgotpasswordEmailNotValid = false;
        },
        openForgotpassword: function () {
            this.$modal.show("forgotpassword");
        },
        closeForgotpassword: function () {
            this.$modal.hide("forgotpassword");
        },
        closeForgotpasswordHandler: function () {
            console.log("closing fogot pass");
            this.$store.commit("closeforgotpassword");
        },
        submitRecoveryForm() {
            // needs to be checked and analyzed cos quite frankly, it needs to have a
            // check form validity
            if (this.forgotpasswordEmailValid) {
                this.$vs.loading();
                let url = "http://localhost/forgotpassword/";
                axios
                    .get(url, {
                        params: {
                            email: this.forgotpasswordEmail,
                        },
                    })
                    .then((res) => {
                        this.$vs.loading.close();
                        if (res.data.status == "success") {
                            // report to user and close the forgotpassword modal.
                            this.currentTab = "successPage";
                            this.$modal.show("dialog", {
                                title: "Changed password successfully",
                                text:
                                    "A mail with your new password has been sent to " +
                                    this.forgotpasswordEmail,
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
                            //server error
                            this.$modal.show("dialog", {
                                title: "500 server error, unable to process request",
                                text: response,
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
                    })
                    .catch((error) => {
                        //client error
                        this.$vs.loading.close();
                        this.$modal.show("dialog", {
                            text: error,
                            buttons: [
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
            } else {
                // invalid form error
                this.$modal.show("dialog", {
                    text: "Check the email you filled again and make sure it is correct before you can proceed",
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
        },
        goToLogin() {
            this.closeForgotpasswordHandler();
            setTimeout(() => {
                this.$store.commit("openlogin");
            }, 700);
        },
    },
    watch: {
        forgotpasswordStatus(old, value) {
            this.forgotpasswordStatus
                ? this.openForgotpassword()
                : this.closeForgotpassword();
            console.log("forgotpassword operation detected ", value);
        },
    },
    components: {
        textInput,
    },
};
</script>

<style lang="scss">
.forgotpassword-container h4,
.otp-container h4 {
    padding-bottom: 0px;
    font-size: 130%;
    font-weight: 700;
    font-family: $theme-view-font1-regular !important;
}
.otp-container {
    padding: 16px;
}
</style>
