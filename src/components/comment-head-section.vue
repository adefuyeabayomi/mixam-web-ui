<template>
    <section id="chs-section-cont-main">
        <div class="comment-heading">
            <div
                class="comment-user-avatar"
                @click="viewAuthorProfile(comment.commentedByInfo.MID)"
            >
                <div v-if="(imgU || imgC) == ''" class="no-image-comment-user">
                    <div><i class="fas fa-user"></i></div>
                </div>
                <div
                    v-if="(imgU || imgC) !== ''"
                    class="image-avatar-container"
                >
                    <img :src="imgU || imgC" class="user-avartar-image" />
                </div>
            </div>
            <div class="comment-username">
                <p @click="viewAuthorProfile(comment.commentedByInfo.MID)">
                    {{ usernameU || usernameC }}
                </p>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    computed: {
        updateInfo: function () {
            let updated =
                this.$store.state.userBase[this.comment.commentedByInfo.MID];
            return updated;
        },
        imgU: function () {
            return this.updateInfo.profileImageLink;
        },
        imgC: function () {
            return this.comment.commentedByInfo.profileImageLink;
        },
        usernameU: function () {
            return this.updateInfo.username;
        },
        usernameC: function () {
            return this.comment.commentedByInfo.username;
        },
    },
    props: {
        comment: Object,
    },
};
</script>

<style lang="scss"></style>
