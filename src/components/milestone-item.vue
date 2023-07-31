<template>
    <section class="milestone-item" @click="openClassRoom()">
        <div>
            <div class="milestone-top">Completed On {{ completionDate }}</div>
            <div class="milestone-main">
                <div>
                    <div class="champion-image-container">
                        <img src="../assets/well-done-golden-trophy (1).gif" />
                    </div>
                </div>
                <div>
                    <div class="milestone-details-container">
                        <p class="milestone-detail-title c">Course Title :</p>
                        <p class="milestone-detail-title t">
                            {{ sectionTitle }}
                        </p>
                        <p class="milestone-detail-author">
                            Published By {{ courseData.author_username }}
                        </p>
                        <p class="milestone-completion-date">
                            You completed this course {{ formattedtime }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { format } from "js-time-ago";
export default {
    data: function () {
        return {
            courseData: {},
            formattedtime: "",
        };
    },
    computed: {
        completionDate: function () {
            console.log(this.completed, "completed");
            let date = String(new Date(this.completed))
                .split(" ")
                .slice(0, 4)
                .join(" ");
            return date;
        },
        sectionTitle: function () {
            if (this.courseData.title) {
                return this.courseData.title;
            }
            return "";
        },
    },
    methods: {
        openClassRoom() {
            console.log("going to class room for", this.cid);
            this.$router.push({
                path: "/classroom",
                query: {
                    cid: this.cid,
                    firstEntry: this.firstEntry,
                    currentSection: 0,
                    completed: true,
                },
            });
        },
        fetchCourseData() {
            this.$vs.loading();
            let url = `${this.$store.state.apiServer}/fetchcourses/`;
            window.axios
                .get(url, {
                    params: {
                        cid: this.cid,
                    },
                })
                .then((response) => {
                    //console.log(response.data);
                    this.courseData = response.data.courseData;
                    this.$vs.loading.close();
                    this.$modal.show("classroom-welcome");
                    format(this.completed).then((res) => {
                        this.formattedtime = res;
                    });
                    //console.log("course item data",this.itemData,this.cid);
                })
                .catch((err) => {
                    this.$vs.loading.close();
                    this.$modal.show("dialog", {
                        title: "Failed",
                        text: "Unable to fetch the course now. Please try again.",
                        buttons: [
                            {
                                title: "Try Again",
                                handler: () => {
                                    this.$modal.hide("dialog");
                                    this.fetchCourseData();
                                },
                            },
                        ],
                    });
                    console.error(err);
                });
        },
    },
    props: {
        cid: String,
        completed: Number,
    },
    created: function () {
        this.fetchCourseData();
        console.log("fetching course data for the milestone item");
    },
};
</script>

<style lang="scss">
.milestone-top {
    background: black;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    color: white;
    padding: 5px;
    font-size: 120%;
    font-weight: 900;
    font-family: candara, "signika-regular";
    text-align: center;
}
.milestone-main {
    display: flex;
    align-items: center;
}
.milestone-item {
    border-radius: 10px;
    box-shadow: 0px 0px 10px #f3f188;
    margin: 20px auto;
}
.milestone-detail-title {
    font-size: 150%;
    font-weight: 600;
    padding: 10px 0px;
}
.milestone-detail-title.c {
    padding-bottom: 0px;
}
.milestone-detail-title.t {
    padding-top: 0px;
}
.milestone-container {
}
.milestone-details-container {
    padding: 10px;
}
.milestone-completion-date {
    padding: 5px 0px;
    font-weight: 600;
    font-style: italic;
}
</style>
