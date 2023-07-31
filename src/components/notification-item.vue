<template>
    <section
        id="notification-item"
        class="pointercursor"
        @click="openNotification()"
    >
        <section
            :class="[iconContainer, unopenedStyle]"
            class="notification-item"
        >
            <div class="notif-icon-container">
                <div class="notif-icon">
                    <i v-bind:class="[iconClass]"></i>
                </div>
            </div>
            <div class="notification-content">
                <p :class="{ 'notseen-notif-text': !opened }">{{ text }}</p>
                <p>{{ formattedTime }}</p>
            </div>
        </section>
    </section>
</template>

<script>
//each notifiction item has i) an icon, ii) the body.
// the ui has a bottom divider
import { format } from "js-time-ago";

export default {
    data: function () {
        return {
            opened: false,
            formattedTime: "",
            typeArray: [
                "new-draft",
                "course-milestone",
                "content-published",
                "content-liked",
                "new-student",
                "content-comment",
                "added-to-favourites",
                "reply",
                "content-shared",
                "comment-liked",
                "reply-liked",
                "content-view",
                "follow-success",
                "new-follower",
                "unfollow-success",
                "report-succcess",
            ],
            notificationRead: this.read,
            MID: JSON.parse(window.localStorage.getItem("userlogindata")).MID,
            DID: JSON.parse(window.localStorage.getItem("userlogindata")).DID,
        };
    },
    props: {
        type: String,
        text: String,
        info: Object,
        seen: Boolean,
        read: Boolean,
        notificationID: String,
        action: String,
        created: Number,
        date: String,
    },
    computed: {
        nRead: function () {
            return this.notificationRead;
        },
        unopenedStyle: function () {
            console.log("notification opened", this.notificationRead);
            return this.nRead ? "opened-style" : "";
        },
        iconContainer: function () {
            if (this.type == "new-draft") {
                return "new-draft";
            } else if (this.type == "course-milestone") {
                return "milestone";
            } else if (this.type == "post-published") {
                return "post-published";
            } else if (this.type == "content-liked") {
                return "liked";
            } else if (this.type == "new-student") {
                return "new-student";
            } else if (this.type == "content-comment") {
                return "content-comment";
            } else if (this.type == "added-to-favourites") {
                return "added-to-fav";
            } else if (this.type == "reply") {
                return "reply";
            } else if (this.type == "content-shared") {
                return "content-shared";
            } else if (this.type == "comment-liked") {
                return "comment-liked-notif";
            } else if (this.type == "reply-liked") {
                return "reply-liked";
            } else if (this.type == "content-view") {
                return "content-view";
            } else if (this.type == "follow-success") {
                return "follow-success";
            } else if (this.type == "unfollow-success") {
                return "unfollow-success";
            }
            return "main";
        },
        iconClass: function () {
            if (this.type == "new-draft") {
                return "fas fa-file-alt";
            } else if (this.type == "course-milestone") {
                return "fas fa-graduation-cap";
            } else if (this.type == "post-published") {
                return "fas fa-paper-plane";
            } else if (this.type == "content-liked") {
                return "fas fa-heart";
            } else if (this.type == "new-student") {
                return "fas fa-user";
            } else if (this.type == "content-comment") {
                return "fas fa-comment";
            } else if (this.type == "added-to-favourites") {
                return "fas fa-check";
            } else if (this.type == "reply") {
                return "fas fa-comment";
            } else if (this.type == "content-shared") {
                return "fas fa-reply";
            } else if (this.type == "comment-liked") {
                return "fas fa-heart";
            } else if (this.type == "reply-liked") {
                return "fas fa-heart";
            } else if (this.type == "content-view") {
                return "fas fa-eye";
            } else if (this.type == "follow-success") {
                return "fas fa-check";
            } else if (this.type == "unfollow-success") {
                return "fas fa-check";
            } else if (this.type == "new-follower") {
                return "fas fa-user-plus";
            }
            return "fas fa-check";
        },
    },
    methods: {
        updateActiveTabE(tab) {
            this.$store.commit("updatelearntab", tab);
        },
        notificationAction() {
            if (this.type === "getting-started") {
                this.$router.push({
                    path: "/help-center",
                });
            }
            if (this.type == "new-draft" || this.type == "course-publish") {
                console.log("in notification action 1");
                this.$router.push({
                    path: "/full-course",
                    query: { cid: this.info.ref },
                });
                return;
            }
            if (this.type === "article-publish") {
                console.log("in notification action 2");
                this.$router.push({
                    path: "/full-article",
                    query: { aid: this.info.ref },
                });
                return;
            }
            if (this.type === "content-publish") {
                console.log("in notification action 3");
                this.$router.push({
                    path: "/full-post",
                    query: { pid: this.info.contentReference },
                });
            }

            if (this.type === "follow-success") {
                console.log("in notification action 4");
                console.log("action for follow success");
                this.$router.push({
                    name: "profile",
                    query: {
                        user: this.info["follow-info"],
                    },
                });
                return;
            }
            if (this.type === "unfollow-success") {
                //no action
                console.log("in notification action 5");
                return;
            }
            if (this.type === "new-follower") {
                console.log("in notification action 6");
                if (this.$route.name !== "profile") {
                    this.$router.push({
                        name: "profile",
                        query: {
                            user: this.info["followed-by"],
                        },
                    });
                }
                return;
            }
            if (this.type === "course-milestone") {
                this.updateActiveTabE("learn-milestones");
                console.log("in notification action 7");
                if (this.$route.name !== "learn-main") {
                    this.$router.push({
                        name: "learn-main",
                        query: {
                            cid: this.info.ref,
                        },
                    });
                }
                return;
            }
            if (this.type === "content-liked") {
                console.log("in notification action 8");
                if (this.info.contentType == "course") {
                    this.$router.push({
                        path: "/full-course",
                        query: { cid: this.info.contentReference },
                    });
                } else if (this.info.contentType == "article") {
                    this.$router.push({
                        path: "/full-article",
                        query: { aid: this.info.contentReference },
                    });
                } else {
                    this.$router.push({
                        path: "/full-post",
                        query: { pid: this.info.contentReference },
                    });
                }
                return;
            }
            if (this.type === "content-comment") {
                console.log("in notification action 9");

                if (this.info.contentType == "course") {
                    this.$router.push({
                        path: "/full-course",
                        query: {
                            cid: this.info.contentReference,
                            commentBy: this.info.commentedBy,
                            commentID: this.info.reviewID,
                        },
                    });
                } else if (this.info.contentType == "article") {
                    this.$router.push({
                        path: "/full-article",
                        query: {
                            aid: this.info.contentReference,
                            commentBy: this.info.commentedBy,
                            commentID: this.info.commentID,
                        },
                    });
                } else {
                    this.$router.push({
                        path: "/full-post",
                        query: {
                            pid: this.info.contentReference,
                            commentBy: this.info.commentedBy,
                            commentID: this.info.commentID,
                        },
                    });
                }
                return;
            }
            if (this.type === "added-to-favourites") {
                console.log("in notification action 10");

                if (this.$route.name !== "profile") {
                    this.$router.push({
                        name: "profile",
                        query: {
                            to: "favourites",
                            ref: this.info.ref,
                        },
                    });
                }
                return;
            }
            if (this.type === "reply") {
                console.log("in notification action 11");

                if (this.info.contentType == "course") {
                    this.$router.push({
                        path: "/full-course",
                        query: {
                            cid: this.info.contentReference,
                            commentBy: this.info.commentedBy,
                            reviewID: this.info["comment-review-id"],
                            repliedBy: this.info["mention-information"].replier,
                            replyID: this.info["reply-id"],
                        },
                    });
                } else if (this.info.contentType == "article") {
                    this.$router.push({
                        path: "/full-article",
                        query: {
                            aid: this.info.contentReference,
                            commentBy: this.info.commentedBy,
                            commentID: this.info["comment-review-id"],
                            repliedBy: this.info["mention-information"].replier,
                            replyID: this.info["reply-id"],
                        },
                    });
                } else {
                    this.$router.push({
                        path: "/full-post",
                        query: {
                            pid: this.info.contentReference,
                            commentBy: this.info.commentedBy,
                            commentID: this.info["comment-review-id"],
                            repliedBy: this.info["mention-information"].replier,
                            replyID: this.info["reply-id"],
                        },
                    });
                }
                return;
            }
            if (this.type === "content-shared") {
                console.log("in notification action 12");
                if (this.info.contentType == "course") {
                    this.$router.push({
                        path: "/full-course",
                        query: { cid: this.info.reference },
                    });
                } else if (this.info.contentType == "article") {
                    this.$router.push({
                        path: "/full-article",
                        query: { aid: this.info.reference },
                    });
                } else {
                    this.$router.push({
                        path: "/full-post",
                        query: { pid: this.info.reference },
                    });
                }
                return;
            }
            if (this.type === "comment-liked") {
                console.log("in notification action 13");
                if (this.info.contentType == "course") {
                    this.$router.push({
                        path: "/full-course",
                        query: {
                            cid: this.info.contentReference,
                            reviewID: this.info.reviewID,
                        },
                    });
                } else if (this.info.contentType == "article") {
                    this.$router.push({
                        path: "/full-article",
                        query: {
                            aid: this.info.contentReference,
                            commentID: this.info.commentID,
                        },
                    });
                } else {
                    this.$router.push({
                        path: "/full-post",
                        query: {
                            pid: this.info.contentReference,
                            commentID: this.info.commentID,
                        },
                    });
                }
                return;
            }
            if (this.type === "reply-liked") {
                console.log("in notification action 14");

                if (this.info.contentType == "course") {
                    this.$router.push({
                        path: "/full-course",
                        query: {
                            cid: this.info.contentReference,
                            reviewID: this.info.reviewID,
                            replyID: this.info.replyID,
                        },
                    });
                } else if (this.info.contentType == "article") {
                    this.$router.push({
                        path: "/full-article",
                        query: {
                            aid: this.info.contentReference,
                            commentID: this.info.commentID,
                            replyID: this.info.replyID,
                        },
                    });
                } else {
                    this.$router.push({
                        path: "/full-post",
                        query: {
                            pid: this.info.contentReference,
                            commentID: this.info.commentID,
                            replyID: this.info.replyID,
                        },
                    });
                }
                return;
            }
            if (
                this.type === "content-view" ||
                this.type === "view-milestone"
            ) {
                console.log("in notification action 15");
                if (this.info.contentType == "course") {
                    this.$router.push({
                        path: "/full-course",
                        query: { cid: this.info.contentReference },
                    });
                } else if (this.info.contentType == "article") {
                    this.$router.push({
                        path: "/full-article",
                        query: { aid: this.info.contentReference },
                    });
                } else {
                    this.$router.push({
                        path: "/full-post",
                        query: { pid: this.info.contentReference },
                    });
                }
                return;
            }
        },
        openNotification() {
            this.readNotification();
            console.log("notification-action for ", this.type);
            this.notificationAction();
        },
        readNotification() {
            if (this.notificationRead) return;
            let url = `${this.$store.state.apiServer}/read-notification/`;
            window.axios
                .get(url, {
                    params: {
                        MID: this.MID,
                        DID: this.DID,
                        notificationID: this.notificationID,
                        day: this.date,
                    },
                })
                .then((response) => {
                    if (response.data.status == "success") {
                        console.log("successfully read notification");
                        this.notificationRead = true;
                    } else {
                    }
                })
                .catch((error) => {});
        },
    },
    created: function () {
        format(this.created).then((res) => {
            this.formattedTime = res;
        });
    },
};
</script>

<style lang="scss">
.comment-notification {
    background-color: #d9ffda;
    box-shadow: 0px 6px 4px #d9ffda;
}
.likes-notification {
    background-color: #ffe2e0;
    box-shadow: 0px 0px 5px #ffe2e0;
}
.share-notification {
    background-color: #505050;
    color: white;
    box-shadow: 0px 0px 5px #505050;
}
.welcome-notification {
    background-color: #fff8bd;
    box-shadow: 0px 4px 5px #fff59c;
}
.congratulatory-notification {
    background-color: white;
    box-shadow: 0px 0px 5px gray;
}
.follow-success-notification {
    background-color: #acf6d9;
    box-shadow: 0px 4px 5px #b0b0b0;
}
.post-published-notification {
    background-color: rgb(206, 206, 206);
    box-shadow: 0px 0px 5px gray;
}
#notification-item section {
    margin: 18px 0px 4px 0px;
    padding: 5px;
    border-radius: 5px;
    align-items: center;
}
.notif-container {
    display: flex;
}
.notif-icon-container {
    width: max-content;
}
.notification-content {
    padding-left: 10px;
}
.notif-icon {
    width: 70px;
    height: 70px;
    padding: 11px 10px 10px 13px;
    background: white;
    border-radius: 50px;
}
.notification-item.new-draft {
    background: #fff8bd;
    box-shadow: 0px 4px 5px #fff59c;
}
.notification-item.new-draft i {
    color: #736f62;
}

.notification-item.milestone {
    background: #c5c5ff;
    box-shadow: 0px 0px 5px #bfbff0;
}
.notification-item.milestone i {
    color: #6969e4;
}

.notification-item.liked,
.notification-item.comment-liked-notif {
    background-color: #ffdada;
    box-shadow: 0px 0px 6px #ffd8d8;
}

.notification-item.liked i,
.notification-item.comment-liked-notif i {
    color: #ff6767;
}

.notification-item.new-student,
.notification-item.main {
    background: #eaeaea;
    box-shadow: 0px 0px 12px #dfdfdf;
}

.notification-item.new-student i,
.notification-item.main i {
    color: #515151;
}

.notification-item.content-comment {
    background-color: #adceff;
    box-shadow: 0px 0px 10px #cbe0ff;
}
.notification-item.content-comment i {
    color: #1e87f0;
}

.notification-item.content-view {
    background-color: #d1f9ff;
    box-shadow: 0px 0px 10px #d1f9ff;
}

.notification-item.content-view i {
    color: #61b4b4;
}

.notification-item.added-to-fav {
    background-color: #d7ffd7;
    box-shadow: 0px 0px 10px #a1ffa1;
}
.notification-item.added-to-fav i {
    color: gray;
}

.notification-item {
    background-color: #e1ecfc;
    box-shadow: 0px 0px 10px #cbe0ff;
    display: flex;
}
.notif-content-container {
    padding-left: 8px;
}
.notifActionContainer {
    font-weight: 800;
}
.span-name {
    font-weight: 800;
}
.span-time {
    color: gray;
}
.notseen-notif-text {
    font-weight: 600;
}
.notif-icon i {
    display: block;
    margin: auto auto;
    width: max-content;
    height: max-content;
    font-size: 200%;
    padding-top: 8px;
    color: #17478e;
}

.opened-style {
    background-color: white !important;
    box-shadow: 0px 0px 10px #cbe0ff !important;
}
.opened-style .notif-icon {
    border: 1px solid #dedede !important;
}
.opened-style .notseen-notif-text {
    font-weight: 500 !important;
}
</style>
