<template>
    <section id="daily-at-sidebar">
        <section class="for-today-section">
            <div class="das-fts-header-main">
                <p>For You Today</p>
            </div>
            <div
                class="showadmin-messages"
                v-if="adminMessages.status !== 'error occured'"
            >
                <div v-for="item in adminMessages.messages" :key="item.id">
                    <div :class="[item.theme]">
                        <div class="das-css-header">
                            <p>{{ item.title }}</p>
                        </div>
                        <div class="das-item-content-container">
                            <img :src="item.imgLink" class="das-item-image" />
                            <span class="das-item-content">{{
                                item.content
                            }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="community-standard-section">
            <div class="das-css-header">
                <p>Mixam Standards</p>
            </div>
            <div class="das-css-desc-container">
                <p class="das-css-desc">
                    Mixam community is focused to be an helpful resource for
                    experienced entrepreneurs to share their knowledge with easy
                    and also those who are just starting out in entrepreneurship
                    and even those who are still just trying to express their
                    ideas . Therefore we implore you to partner with us as we
                    seek to contribute positively to the community and our
                    resource base which will impact millions of lives. Thank
                    you. MIxam.
                </p>
            </div>
        </section>
    </section>
</template>

<script>
//Liked posts,My Posts, My Favourites, Recent Searches.
export default {
    data: function () {
        return {
            name: "activities",
            MID: window.localStorage.getItem("userlogindata").MID,
            DID: window.localStorage.getItem("userlogindata").DID,
            adminMessages: {
                status: true,
                messages: [],
            },
        };
    },
    computed: {},
    methods: {
        fetchAdminMessages() {
            let url = `${this.$store.state.apiServer}/fetch-admin-daily-message/`;
            window.axios
                .get(url)
                .then((response) => {
                    if (response.data.status == "success") {
                        this.adminMessages = {
                            status: true,
                            messages: response.data.messages,
                        };
                        console.log("admin messages ", this.adminMessages);
                    } else {
                        this.adminMessages = { status: "error occured" };
                    }
                })
                .catch((err) => [
                    (this.adminMessages = { status: "error occured" }),
                ]);
        },
    },
    component: {},
    created: function () {
        this.fetchAdminMessages();
    },
};
</script>

<style lang="scss">
#daily-at-sidebar {
    padding: 20px 10px 10px 10px;
    font-family: highgate-regular;
    height: 92vh;
    padding-bottom: 30px;
}
.das-css-header p {
    font-weight: 600;
    color: #074199;
    padding-top: 10px;
}
.das-css-desc {
    font-size: 80%;
    color: #074199;
}
.das-fts-header-main {
    font-size: 130%;
    font-weight: 600;
    color: #074199;
}
.for-today-section {
    padding-bottom: 10px;
}
.das-item-image {
    background: white;
    width: 80px;
    height: 80px;
}
.item-theme-one img {
    margin-right: 10px;
    float: left;
}
.item-theme-two img {
    margin-left: 10px;
    float: right;
}
.das-item-content {
    font-size: 75%;
    color: white;
    line-height: 18px;
    display: block;
}
</style>
