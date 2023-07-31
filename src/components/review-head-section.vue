<template>
    <section id="chs-section-cont-main">
        <div class="comment-heading">
            <div
                class="comment-user-avatar"
                @click="viewAuthorProfile(review.reviewedByInfo.MID)"
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
                <p @click="viewAuthorProfile(review.reviewedByInfo.MID)">
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
                this.$store.state.userBase[this.review.reviewedByInfo.MID];
            return updated;
        },
        imgU: function () {
            return this.updateInfo.profileImageLink;
        },
        imgC: function () {
            return this.review.reviewedByInfo.profileImageLink;
        },
        usernameU: function () {
            return this.updateInfo.username;
        },
        usernameC: function () {
            return this.review.reviewedByInfo.username;
        },
    },
    props: {
        review: Object,
    },
};
</script>

<style lang="scss"></style>
