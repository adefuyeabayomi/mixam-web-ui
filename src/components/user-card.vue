<template>
    <div class="frame">
        <div class="center">
            <div class="profile-user">
                <div class="image">
                    <div class="circle-1"></div>
                    <div class="circle-2"></div>
                    <img
                        :src="userData.profileImageLink"
                        width="70"
                        height="70"
                        :alt="userData.username"
                    />
                </div>

                <div class="name">{{ userData.username }}</div>
                <div class="job">{{ about }}</div>

                <div class="actions">
                    <button @click="goToProfile()" class="btn">Profile</button>
                    <button
                        @click="
                            goToChat(
                                userData.__mid,
                                userData.username,
                                userData.profileImageLink
                            )
                        "
                        class="btn"
                    >
                        Message
                    </button>
                </div>
            </div>

            <div class="stats">
                <div class="box">
                    <span class="value">{{ userData.myContents.length }}</span>
                    <span class="parameter">Posts</span>
                </div>
                <div class="box">
                    <span class="value">{{ userData.following.length }}</span>
                    <span class="parameter">Following</span>
                </div>
                <div class="box">
                    <span class="value">{{ userData.followers.length }}</span>
                    <span class="parameter">Followers</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            name: "user-card",
        };
    },
    computed: {
        about: function () {
            let about = this.userData.about;
            return about.split(" ").slice(0, 17).join(" ");
        },
    },
    methods: {
        goToProfile() {
            this.$router.push({
                name: "profile",
                query: {
                    user: this.userData.__mid,
                },
            });
        },
        goToChat(user, username, img) {
            this.$router.push({
                path: "/chat",
                query: {
                    user,
                    username,
                    imgLink: img,
                },
            });
        },
    },
    props: {
        userData: Object,
    },
};
</script>
<style lang="scss">
.profile-user img {
    height: -webkit-fill-available;
}
</style>
