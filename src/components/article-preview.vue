<template>
    <section class="article-preview">
        <section>
            <div class="preview-indicator">Article Draft Preview</div>
        </section>
        <section class="article-preview-contents">
            <section class="article-header-section">
                <div class="cover-image-present">
                    <div class="contents">
                        <div class="article-header-details">
                            <div class="article-header-contents">
                                <p class="article-render-title">{{ title }}</p>
                                <p class="article-author">
                                    Article Published By
                                    <span>{{ author }}</span>
                                </p>
                                <p class="article-date-published">
                                    Date Published : {{ date }}
                                </p>
                            </div>
                        </div>
                        <div
                            class="article-cover-image-container"
                            v-if="coverImage !== ''"
                        >
                            <div class="cover-image-main">
                                <img :src="coverImage" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="article-content">
                <article-section-item
                    v-for="section in sections"
                    :key="section.id"
                    v-bind="section"
                ></article-section-item>
            </section>
            <section class="go-back-button-container">
                <vs-button
                    @click="goBack()"
                    style="width: 100% !important; display: block !important"
                    ><i class="fas fa-arrow-left"></i> Go Back</vs-button
                >
            </section>
        </section>
    </section>
</template>

<script>
//title
//author-username
//date
//coverimage
//sections
import articleSectionItem from "./article-section-item.vue";
export default {
    data: function () {
        return {};
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
    },
    props: {
        title: String,
        author: String,
        date: String,
        coverImage: String,
        sections: Array,
    },
    components: {
        articleSectionItem,
    },
};
</script>

<style lang="scss">
.preview-indicator {
    font-family: candara, signika-regular;
    font-weight: 600;
    font-size: 160%;
    text-align: center;
    padding: 10px 0px 15px 0px;
    color: white;
    background: #181818;
    margin-bottom: 15px;
}
.article-preview {
    padding-bottom: 60px;
}
.article-preview-contents {
    padding: 10px;
}
.article-render-item {
    padding: 10px;
    padding-bottom: 60px;
}
.cover-image-main img {
    border-radius: 30px;
    border: 4px solid;
    box-shadow: 0px 0px 10px #cbe0ff;
}
.contents {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}
.cover-image-present {
    background-image: url("../assets/article-head-background.png");
    background-size: cover;
    border-radius: 10px;
    padding: 10px;
}
.article-render-title {
    font-family: "signika-regular";
    font-weight: 900;
    color: white;
    padding: 20px 0px 20px 0px !important;
    font-size: 30px;
}
.article-header-section {
    color: white;
    font-weight: 600;
    font-size: 110%;
}
.article-header-section p {
    padding: 5px 0px 0px 0px;
}
.article-comments-count {
    padding: 35px 0px 15px 0px !important;
}
.article-author span {
    font-style: italic;
}
.article-header-details {
    padding-right: 10px;
}
.contents div {
    flex: 1;
}
.go-back-button-container {
    padding-top: 20px;
}

@media screen and (max-width: 600px) {
    .contents {
        flex-direction: column;
    }
    .article-render-title {
        font-size: 30px;
    }
}
</style>
