<template>
    <div class="pms-content-item-container contribution">
        <!--contributions include content - creation and content-consumption -->
        <p>
            <i class="fas fa-star"></i>
            <span>{{ preText }}{{ contributionDate }}, </span
            ><span class="contribution-what">{{ itemData.title }}</span>
        </p>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            itemData: {},
        };
    },
    props: {
        type: String,
        created: Number,
        cid: String,
        aid: String,
    },
    computed: {
        contributionDate: function () {
            let date = String(new Date(this.created))
                .split(" ")
                .slice(0, 4)
                .join(" ");
            return date;
        },
        preText: function () {
            if (this.type == "completed-a-course") {
                return "Completed a Course on ";
            } else if (this.type == "created-a-course") {
                return "Created A Course on ";
            } else if (this.type == "created-an-article") {
                return "Created an article on ";
            }
        },
    },
    methods: {
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
                })
                .catch((err) => {
                    console.error(err.message);
                });
        },
        fetchArticleData: function () {
            let url = "http://localhost/fetcharticle/";
            window.axios
                .get(url, {
                    params: {
                        aid: this.aid,
                    },
                })
                .then((response) => {
                    //console.log(response.data);
                    this.itemData = response.data.articleData;
                })
                .catch((err) => {
                    console.error(err.message);
                });
        },
    },
    created: function () {
        if (this.aid) {
            this.fetchArticleData();
        } else {
            this.fetchCourseData();
        }
    },
};
</script>
