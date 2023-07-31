<template>
    <section class="verify-main-container">
        <modal
            name="verify-account"
            :adaptive="true"
            height="auto"
            :max-width="maxWidth"
            width="90%"
        >
            <div @click="closeVerify()" class="closebutton">
                <i class="fas fa-times"></i>
            </div>
            <div class="verify-container">
                <div class="header-container">
                    <p class="verify-header">
                        You Have Not
                        <span class="verify-header-blue"
                            >Verified Your Account</span
                        >
                        Yet
                    </p>
                    <p class="verify-text">
                        This account isn't yet verified. Please check you email
                        {{ $store.state.userAccountInfo.email }}, an email was
                        sent to you which contains a verify button. If you
                        didn't get any mail you can request for it to be Re-Sent
                        To you.
                    </p>
                </div>
                <div class="verify-buttons">
                    <div>
                        <vs-button
                            @click="closeVerify()"
                            style="width: 90%; margin-left: 5%"
                            >Okay. I'll do that now.
                            <i class="fas fa-thumbsup"></i
                        ></vs-button>
                    </div>
                    <div>
                        <vs-button
                            @click="resendRequest()"
                            style="width: 90%; margin-left: 5%"
                            >Re-Send Email</vs-button
                        >
                    </div>
                </div>
            </div>
        </modal>
    </section>
</template>

<script>
export default {
    data: function () {
        return {
            maxWidth: 480,
            MID: JSON.parse(window.localStorage.getItem("userlogindata")).MID,
            DID: JSON.parse(window.localStorage.getItem("userlogindata")).DID,
        };
    },
    computed: {},
    methods: {
        closeVerify() {
            this.$modal.hide("verify-account");
        },
        resendRequest() {
            this.$vs.loading();
            let url = `${this.$store.state.apiServer}/resend-email/`;
            window.axios
                .get(url, {
                    params: {
                        resend_type: "welcome",
                        MID: this.MID,
                        DID: this.DID,
                        email: this.$store.state.userAccountInfo.email,
                    },
                })
                .then((response) => {
                    this.$vs.loading.close();
                    console.log(response);
                    this.$modal.hide("verify-account");
                })
                .catch((err) => {
                    this.$vs.loading.close();
                    console.log(err.message);
                    this.$modal.hide("verify-account");
                });
        },
    },
    watch: {},
};
</script>

<style lang="scss">
.verify-container {
    padding: 15px;
    padding-top: 30px;
}
.verify-buttons {
    display: flex;
    padding-top: 20px;
    padding-bottom: 10px;
}
.verify-header {
    font-size: 200%;
    font-weight: 600;
    text-align: center;
}
.verify-header-blue {
    color: #1e87f0;
}
.verify-text {
    padding-top: 10px;
    line-height: 30px;
}
</style>
