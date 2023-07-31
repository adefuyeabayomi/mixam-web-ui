<template>
    <section class="article-section" :id="'article-section-' + id">
        <h4 class="section-title" v-if="title !== ''">
            {{ title.content }}
        </h4>
        <div
            class="article-content-group"
            v-for="group in smartSortArticle"
            :key="group.id"
        >
            <div
                class="group-subheading"
                v-if="group.group[0].contentType == 'subheading'"
            >
                <p>{{ group.group[0].content }}</p>
            </div>
            <p></p>
            <div v-for="item in group.group" :key="item.id">
                <div class="item-container">
                    <img
                        :class="{
                            firstimageinleft: isEven(group.id),
                            firstimageinright: !isEven(group.id),
                        }"
                        class="paraembeded"
                        :src="extractImages(group.group)[0]"
                        v-if="
                            item.para_id == 0 &&
                            extractImages(group.group).length > 0
                        "
                    />
                    <p
                        v-if="item.contentType == 'paragraph'"
                        v-html="generateHTML(item.content)"
                    ></p>
                </div>
            </div>
            <div
                class="container_for_other_image_carousel"
                v-if="extractImages(group.group).length > 1"
            >
                container_for_other_image_carousel
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data: function () {
        return {};
    },
    computed: {
        smartSortArticle: function () {
            let sortedArticle = [];
            let group = [];
            let id = 0;
            let para_id = 0;
            for (let each of this.contentItems) {
                if (each.contentType !== "subheading") {
                    if (each.contentType == "paragraph") {
                        each.para_id = para_id;
                        para_id++;
                    }
                    group.push(each);
                } else {
                    sortedArticle.push({ group, id });
                    para_id = 0;
                    id++;
                    group = [];
                    group.push(each);
                }
            }
            sortedArticle.push({ group, id });
            console.log(sortedArticle);
            return sortedArticle;
        },
    },
    methods: {
        generateHTML(val) {
            let html = val.replaceAll("\n", "<br>");
            return html;
        },
        extractImages(groupArr) {
            let extracted = [];
            for (let each of groupArr) {
                if (each.contentType == "image") {
                    extracted.push(each.content);
                }
            }
            return extracted;
        },
        isEven(no) {
            console.log("is even", no % 2 == 0);
            return no % 2 == 0;
        },
    },
    components: {},
    created: function () {},
    props: {
        id: Number,
        title: Object,
        contentItems: Array,
    },
};
</script>

<style lang="scss">
.article-section h4 {
    font-family: "signika-regular";
}
.article-section {
    padding: 50px;
    padding-top: 50px;
}
.section-title {
    text-align: center;
    font-weight: 700;
    padding-bottom: 20px;
}
.group-subheading {
    font-size: 120%;
    font-weight: 600;
    margin-top: 30px;
    padding-bottom: 10px;
}
.paraembeded {
    border-radius: 4px;
    margin: 10px auto;
}
.article-render-comments {
    border-top: 2px solid gray;
    padding-top: 10px;
}

@media screen and (max-width: 600px) {
    .article-section {
        padding: 25px;
        padding-top: 40px;
    }
}
@media screen and (min-width: 601px) {
    .firstimageinright {
        width: 50%;
        float: right;
        margin-left: 20px;
        border-radius: 4px;
    }
    .firstimageinleft {
        width: 50%;
        float: left;
        margin-right: 20px;
        border-radius: 4px;
    }
}
</style>
