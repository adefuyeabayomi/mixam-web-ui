<template>
    <section id="reply-head-item">
        <div
            class="comment-user-avatar"
            @click="viewAuthorProfile(reply.replyInfo.user)"
        >
            <div v-if="(imgU || imgC) == ''" class="no-image-comment-user">
                <div class="for-reply">
                    <i class="fas fa-user"></i>
                </div>
            </div>
            <div v-if="(imgU || imgC) !== ''" class="image-avatar-container">
                <img :src="imgU || imgC" class="user-avartar-image" />
            </div>
        </div>
        <div class="comment-username">
            <p @click="viewAuthorProfile(reply.replyInfo.user)">
                {{ usernameU || usernameC }}
            </p>
        </div>
    </section>
</template>

<script>
export default {
    computed: {
        updateInfo: function () {
            let updated = this.$store.state.userBase[this.reply.replyInfo.user];
            return updated;
        },
        imgU: function () {
            return this.updateInfo.profileImageLink;
        },
        usernameU: function () {
            return this.updateInfo.username;
        },
        usernameC: function () {
            return this.reply.replyInfo.username;
        },
        imgC: function () {
            return this.reply.replyInfo.profileImageLink;
        },
    },
    props: {
        reply: Object,
    },
};
</script>

<style lang="scss">
#reply-head-item {
    display: flex;
    align-items: center;
}
</style>
