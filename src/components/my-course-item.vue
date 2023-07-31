<template>
    <section id="course_item">
        <div class="course-details-container">
            <div v-if="itemData.coverImage !== ''">
                <div class="course-image-container">
                    <img :src="itemData.coverImage" />
                </div>
            </div>
            <div>
                <div class="course-details-items-container">
                    <div class="title-container">
                        <p class="course-title">
                            {{ itemData.title }}
                        </p>
                    </div>
                    <div class="author-container">
                        <p class="author-details">
                            Created By <i>{{ itemData.author_username }}</i>
                        </p>
                    </div>
                    <div class="author-container">
                        <p class="course-published-details">
                            Published {{ formattedTime }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="function-buttons-container">
            <div class="take-course-button-container" v-if="!completed">
                <vs-button
                    @click="goToClass()"
                    class="take-course-button"
                    style="background-color: black !important"
                    >Go to class <i class="fas fa-arrow-right"></i
                ></vs-button>
            </div>
            <div class="take-course-button-container" v-if="completed">
                <vs-button
                    @click="openClassRoom()"
                    class="take-course-button"
                    style="background-color: black !important"
                    >You Have completed this course</vs-button
                >
            </div>
        </div>
    </section>
</template>

<script>
import { format } from "js-time-ago";

export default {
    data: function () {
        return {
            itemData: {},
            formattedTime: "",
        };
    },
    props: {
        cid: String,
        firstEntry: Boolean,
        currentSection: Number,
        completed: Boolean,
    },
    methods: {
        goToClass() {
            console.log("going to class room for", this.cid);
            this.$router.push({
                path: "/classroom",
                query: {
                    cid: this.cid,
                    firstEntry: this.firstEntry,
                    currentSection: this.currentSection,
                },
            });
        },
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
        // course main
        fetchCourseData() {
            let url = "http://localhost/fetchcourses/";
            window.axios
                .get(url, {
                    params: {
                        cid: this.cid,
                    },
                })
                .then((response) => {
                    //console.log(response.data);
                    this.itemData = response.data.courseData;
                    format(this.itemData.created).then((res) => {
                        this.formattedTime = res;
                    });
                    //console.log("course item data",this.itemData,this.cid)
                })
                .catch((err) => {
                    console.error(err.message);
                });
        },
    },
    created: function () {
        this.fetchCourseData();
    },
};
</script>

<style lang="scss">
#course_item {
    margin-top: 20px;
    padding: 15px;
    box-shadow: 0px 0px 6px gray;
    border-radius: 15px;
}
.students-container,
.likes-container,
.reviews-container,
.shares-container {
    font-size: 90%;
    flex: 1;
}
#course_item .students-container div,
#course_item .likes-container div,
#course_item .reviews-container div,
#course_item .shares-container div {
    padding: 3px 10px 3px 10px;
    box-shadow: 0px 0px 6px #98b6c3;
    border-radius: 10px;
    width: max-content;
}
.likes-container {
    float: right;
    width: max-content;
    margin-right: -4%;
}
.function-and-metrics-container {
    display: flex;
}
.add-to-favourites-container {
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content;
    position: absolute;
    right: 10%;
}
.add-to-favourites-container i {
    color: #203332;
    font-size: 200%;
}
.course-details-container {
    display: flex;
}
.function-buttons-container {
    display: flex;
    margin-top: 20px;
}
.course-title {
    font-family: segoe ui;
    font-weight: 700;
}
.author-details {
    font-style: italic;
}
.take-course-button,
.save-course-button {
    width: 100%;
}
.save-course-button {
    margin-left: 6%;
}
.course-image-container {
    height: max-content;
    max-height: 200px;
    overflow: hidden;
    border-radius: 10px;
}
.course-details-items-container {
    padding-left: 8px;
}
.course-published-details {
    font-weight: 600;
}
</style>
