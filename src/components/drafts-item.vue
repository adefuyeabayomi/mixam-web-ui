<template>
    <!--design the post blah blah here.-->
    <div v-if="draftContent !== undefined" class="draft-item-container">
        <div class="di-details-container">
            <p>
                <span class="d-filter-main">Title :</span>
                {{ draftContent.title }}
            </p>
            <p><span class="d-filter-main"> On :</span> {{ formattedTime }}</p>
            <p>
                <span class="d-filter-main">Draft Content Type :</span>
                {{ type.toUpperCase() }}
            </p>
            <p v-if="alreadyPublished">
                <i
                    >You have
                    <span class="d-filter-main">already published</span> this
                    {{ type }}</i
                >
            </p>
            <p v-if="!alreadyPublished">
                <i
                    >You have
                    <span class="d-filter-main">not yet published</span> this
                    {{ type }}</i
                >
            </p>
        </div>
        <div class="draft-item-buttons">
            <div>
                <div class="di-button-container edit">
                    <vs-button @click="goToEdit()">Edit This Draft</vs-button>
                </div>
            </div>
            <div>
                <div class="di-button-container publish">
                    <vs-button
                        @click="publishDraft('unpublish')"
                        v-if="alreadyPublished"
                        >Unpublish Draft</vs-button
                    >
                    <vs-button
                        @click="publishDraft('publish')"
                        v-if="!alreadyPublished"
                        >Publish Draft</vs-button
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { format } from "js-time-ago";

export default {
    data: function () {
        return {
            draftContent: {},
            formattedTime: "",
            MID: JSON.parse(window.localStorage.getItem("userlogindata")).MID,
            DID: JSON.parse(window.localStorage.getItem("userlogindata")).DID,
            alreadyPublished: false,
        };
    },
    computed: {},
    props: {
        created: Number,
        aid: String,
        cid: String,
        type: String,
    },
    methods: {
        fetchDraftInfoC() {
            let url = `${this.$store.state.apiServer}/fetchcourses/`;
            window.axios
                .get(url, {
                    params: {
                        cid: this.cid,
                    },
                })
                .then((response) => {
                    //console.log(response.data);
                    this.draftContent = response.data.courseData;
                    this.alreadyPublished = this.draftContent.published;
                    format(this.created).then((res) => {
                        this.formattedTime = res;
                    });
                    //console.log("course item data",this.itemData,this.cid)
                })
                .catch((err) => {
                    console.error(err.message);
                });
        },
        fetchDraftInfoA: function () {
            let url = `${this.$store.state.apiServer}/fetcharticle/`;
            window.axios
                .get(url, {
                    params: {
                        aid: this.aid,
                    },
                })
                .then((response) => {
                    //console.log(response.data);
                    this.draftContent = response.data.articleData;
                    this.alreadyPublished = this.draftContent.published;
                    format(this.created).then((res) => {
                        this.formattedTime = res;
                    });
                })
                .then(() => {})
                .catch((err) => {
                    console.error(err.message);
                });
        },
        publishDraft: function (val) {
            let url = `${this.$store.state.apiServer}/publish-draft/`;
            window.axios
                .get(url, {
                    params: {
                        MID: this.MID,
                        DID: this.DID,
                        cid: this.cid,
                        aid: this.aid,
                        contentType: this.type,
                        action: val,
                        publishDate: this.draftContent.publishDate,
                    },
                })
                .then((response) => {
                    console.log(response.data);
                    if (response.data.status == "success") {
                        this.alreadyPublished = !this.alreadyPublished;
                        val == "publish"
                            ? (this.draftContent.publishDate = String(
                                  new Date()
                              )
                                  .split(" ")
                                  .slice(0, 4)
                                  .join(" "))
                            : (this.draftContent.publishDate = undefined);
                        this.$vs.notify({
                            position: "bottom-center",
                            title: `Successfully ${
                                val == "publish" ? "Published" : "Unpublished"
                            } your ${this.type}`,
                            color: "#cbe0ff",
                        });
                    } else {
                        this.$vs.notify({
                            position: "bottom-center",
                            title: `Unable to ${
                                val == "publish" ? "Publish" : "Unpublish"
                            } your ${
                                this.type
                            } due to technical issues which will be fixed as soon as possible`,
                            color: "#cbe0ff",
                        });
                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.$vs.notify({
                        position: "bottom-center",
                        title: error.message,
                        color: "#cbe0ff",
                    });
                });
        },
        goToEdit() {
            console.log("type == ", this.type);
            if (this.type == "article") {
                this.$router.push({
                    path: "/create-article",
                    query: {
                        aid: this.aid,
                    },
                });
            } else {
                this.$router.push({
                    path: "/create-course",
                    query: {
                        cid: this.cid,
                    },
                });
            }
        },
    },
    created: function () {
        if (this.type == "course") {
            this.fetchDraftInfoC();
        } else {
            this.fetchDraftInfoA();
        }
    },
};
</script>

<style lang="scss">
.draft-item-container {
    padding: 10px;
    border: 1px solid #e1f0ff;
    border-radius: 15px;
    background: #f1fdff;
    box-shadow: 0px 0px 10px #cef8ff;
}
.draft-item-buttons {
    display: flex;
}
.draft-item-buttons button {
    width: 100%;
}
.di-button-container {
    padding: 5px 10px 5px 10px;
}
.di-button-container.edit button {
    background-color: #cbe0ff !important;
    color: gray;
}
.di-button-container.publish {
}
</style>
