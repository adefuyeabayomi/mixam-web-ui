<template>
    <section class="article-render-item">
        <!--Structure. Render an article here and show the comments, and other post metrics.-->
        <section class="article-header-section">
            <div class="cover-image-present">
                <div class="contents">
                    <div class="article-header-details">
                        <div class="article-header-contents">
                            <p class="article-render-title">
                                {{ itemData.title }}
                            </p>
                            <p class="article-author">
                                Article Published By
                                <span>{{ itemData.author_username }}</span>
                            </p>
                            <p class="article-date-published">
                                Date Published : {{ itemData.date }}
                            </p>
                            <p
                                class="article-comments-count"
                                v-if="serveComments.length > 0"
                            >
                                <i class="fas fa-comments"></i>
                                {{ serveComments.length }} Comment<span
                                    v-if="serveComments.length > 1"
                                    >s</span
                                >
                            </p>
                        </div>
                    </div>
                    <div
                        class="article-cover-image-container"
                        v-if="itemData.coverImage !== ''"
                    >
                        <div class="cover-image-main">
                            <img :src="itemData.coverImage" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="article-content">
            <article-section-item
                v-for="section in itemData.sections"
                :key="section.id"
                v-bind="section"
            ></article-section-item>
        </section>
        <section class="article-render-comments">
            <div
                :id="'post-comment-input-' + aid"
                class="function-and-metrics-container"
            >
                <div class="views-container">
                    <div>
                        <i class="fas fa-eye"></i> {{ itemData.viewsCount }}
                    </div>
                </div>
                <div class="comments-container">
                    <div
                        :class="{
                            'animate__animated animate__heartBeat':
                                commentActive,
                        }"
                    >
                        <i class="fas fa-comment"></i>
                        {{ itemData.commentsCount }}
                    </div>
                </div>
                <div class="shares-container">
                    <div
                        @click="shareClicked()"
                        :class="{
                            'animate__animated animate__heartBeat': shareActive,
                        }"
                    >
                        <i class="fas fa-share"></i> {{ itemData.shareCount }}
                    </div>
                </div>
                <div class="likes-container">
                    <div
                        @click="likeClicked()"
                        :class="{
                            'animate__animated animate__heartBeat': likeActive,
                        }"
                    >
                        <i
                            :class="{ liked_heart: liked }"
                            class="fas fa-heart"
                        ></i>
                        {{ itemData.likesCount }}
                    </div>
                </div>
            </div>
            <div v-if="commentBoxOpen" class="comment-render-container">
                <div class="edit-comment-txt" v-if="editingComment">
                    <p>
                        <span>Editing Comment </span
                        ><span
                            class="cancel-edit-button pointercursor"
                            @click="cancelCommentEdit()"
                            >Cancel Edit
                        </span>
                    </p>
                </div>
                <p v-if="commentAllowed">
                    <input
                        type="text"
                        class="comment-text-input"
                        v-model="comment"
                        placeholder="Write your comment here..."
                    /><button
                        class="comment-send-button"
                        @click="sendComment()"
                    >
                        <i class="fas fa-location-arrow"></i>
                    </button>
                </p>
                <p v-if="!commentAllowed" class="reviews-disabled-text">
                    Comments are currently disabled for this content
                </p>

                <div class="comments">
                    <p class="comments-heading">Comments</p>
                    <p v-if="!commentExists">No comments yet.</p>
                    <div class="comments-item-container">
                        <div
                            v-for="comment in serveComments"
                            :key="comment._commentID"
                            class="comment-item"
                            :class="{ hidden: comment.CID >= showCommentsTo }"
                        >
                            <div v-if="comment.CID < showCommentsTo">
                                <div class="comment-heading">
                                    <div
                                        class="comment-user-avatar"
                                        @click="
                                            viewAuthorProfile(
                                                comment.commentedByInfo.MID
                                            )
                                        "
                                    >
                                        <div
                                            v-if="
                                                comment.commentedByInfo
                                                    .profileImageLink == ''
                                            "
                                            class="no-image-comment-user"
                                        >
                                            <div>
                                                <i class="fas fa-user"></i>
                                            </div>
                                        </div>
                                        <div
                                            v-if="
                                                comment.commentedByInfo
                                                    .profileImageLink !== ''
                                            "
                                            class="image-avatar-container"
                                        >
                                            <img
                                                :src="
                                                    comment.commentedByInfo
                                                        .profileImageLink
                                                "
                                                class="user-avartar-image"
                                            />
                                        </div>
                                    </div>
                                    <div class="comment-username">
                                        <p
                                            @click="
                                                viewAuthorProfile(
                                                    comment.commentedByInfo.MID
                                                )
                                            "
                                        >
                                            {{
                                                comment.commentedByInfo.username
                                            }}
                                        </p>
                                    </div>
                                </div>
                                <div class="comment-body">
                                    <p>{{ comment.comment }}</p>
                                </div>
                                <div class="comment-functions">
                                    <p>
                                        <span
                                            v-if="
                                                MID ==
                                                comment.commentedByInfo.MID
                                            "
                                            @click="
                                                editCommentClicked(
                                                    comment._commentID,
                                                    comment.comment
                                                )
                                            "
                                            >Edit</span
                                        >
                                        <span
                                            v-if="
                                                MID ==
                                                comment.commentedByInfo.MID
                                            "
                                            @click="
                                                deleteComment(
                                                    comment._commentID
                                                )
                                            "
                                            >Delete</span
                                        >
                                        <span
                                            @click="
                                                replyClicked(
                                                    comment._commentID,
                                                    comment.commentedByInfo.MID,
                                                    comment.commentedByInfo
                                                        .username,
                                                    'replyingTheAuthor',
                                                    true,
                                                    MID
                                                )
                                            "
                                            >Reply</span
                                        >
                                        <span
                                            @click="
                                                openReplyBox(comment._commentID)
                                            "
                                            class="replies"
                                            >{{
                                                comment.replies.length
                                            }}
                                            replies</span
                                        >
                                        <span
                                            @click="
                                                report({
                                                    commentID:
                                                        comment._commentID,
                                                    type: 'report-comment',
                                                    contentType: 'article',
                                                })
                                            "
                                            v-if="
                                                MID !==
                                                comment.commentedByInfo.MID
                                            "
                                            >Report</span
                                        >
                                        <span
                                            @click="
                                                commentLikeClicked(
                                                    comment._commentID,
                                                    comment.commentLiked,
                                                    comment.comment,
                                                    comment.commentedByInfo.MID,
                                                    comment.notificationID
                                                )
                                            "
                                            ><i
                                                class="fas fa-heart"
                                                :class="{
                                                    'comment-liked':
                                                        comment.commentLiked,
                                                }"
                                            ></i>
                                            <span
                                                v-if="comment.likesCount !== 0"
                                            >
                                                {{ comment.likesCount }}
                                            </span>
                                            <!-- 
                                            like<span v-if="comment.likesCount > 1"
                                                >s</span
                                            >--></span
                                        >
                                    </p>
                                </div>
                                <div
                                    v-if="
                                        replyActive &&
                                        comment._commentID == currentReply
                                    "
                                    :id="'comment-reply-input-' + aid"
                                >
                                    <p class="replying-to-txt">
                                        Replying
                                        <span class="mention-type1"
                                            >@{{ mentionInformation.username
                                            }}<span
                                                v-if="
                                                    mentionInformation.type ==
                                                    'replyingTheAuthor'
                                                "
                                                >'s comment</span
                                            ></span
                                        >
                                        <span
                                            class="close-reply-button pointercursor"
                                            @click="
                                                closeReply(comment._commentID)
                                            "
                                            ><span v-if="!editingReply"
                                                >Cancel Reply</span
                                            ><span v-if="editingReply"
                                                >Cancel Reply Edit</span
                                            ></span
                                        >
                                    </p>
                                    <div class="reply-input-container">
                                        <!--comment-reply-->
                                        <div class="rep-inp-cont">
                                            <input
                                                type="text"
                                                v-model="reply"
                                                placeholder="Write a reply here"
                                                class="reply-input"
                                            />
                                        </div>
                                        <div class="rep-btn-cont">
                                            <button
                                                @click="
                                                    sendReply(
                                                        comment._commentID,
                                                        comment.CID
                                                    )
                                                "
                                                class="reply-send-button"
                                            >
                                                <i
                                                    class="fas fa-paper-plane"
                                                ></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    v-if="
                                        replyBoxActive &&
                                        currentReplyBoxComment ==
                                            comment._commentID
                                    "
                                    class="replies-container"
                                >
                                    <div class="replies-header">
                                        <p>Replies</p>
                                        <p
                                            v-if="comment._rCount == 0"
                                            class="no-replies-txt"
                                        >
                                            <i>No replies yet</i>
                                        </p>
                                    </div>
                                    <div
                                        class="reply-item"
                                        v-for="reply in comment.replies"
                                        :key="reply._replyID"
                                    >
                                        <div
                                            v-if="
                                                reply.RID >= replyStart &&
                                                reply.RID < replyEnd
                                            "
                                        >
                                            <div class="comment-heading">
                                                <div
                                                    class="comment-user-avatar"
                                                    @click="
                                                        viewAuthorProfile(
                                                            reply.replyInfo.user
                                                        )
                                                    "
                                                >
                                                    <div
                                                        v-if="
                                                            reply.replyInfo
                                                                .profileImageLink ==
                                                            ''
                                                        "
                                                        class="no-image-comment-user"
                                                    >
                                                        <div class="for-reply">
                                                            <i
                                                                class="fas fa-user"
                                                            ></i>
                                                        </div>
                                                    </div>
                                                    <div
                                                        v-if="
                                                            reply.replyInfo
                                                                .profileImageLink !==
                                                            ''
                                                        "
                                                        class="image-avatar-container"
                                                    >
                                                        <img
                                                            :src="
                                                                reply.replyInfo
                                                                    .profileImageLink
                                                            "
                                                            class="user-avartar-image"
                                                        />
                                                    </div>
                                                </div>
                                                <div class="comment-username">
                                                    <p
                                                        @click="
                                                            viewAuthorProfile(
                                                                reply.replyInfo
                                                                    .user
                                                            )
                                                        "
                                                    >
                                                        {{
                                                            reply.replyInfo
                                                                .username
                                                        }}
                                                    </p>
                                                </div>
                                                <div class="reply-options">
                                                    <span
                                                        class="reply-options-button pointercursor"
                                                        @click="
                                                            openReplyMenu(
                                                                reply._replyID
                                                            )
                                                        "
                                                    >
                                                        <i
                                                            class="fas fa-ellipsis-v"
                                                        ></i>
                                                    </span>
                                                    <div
                                                        class="reply-options-menu"
                                                        v-if="
                                                            currentReplyMenu ===
                                                            reply._replyID
                                                        "
                                                    >
                                                        <div
                                                            v-if="
                                                                MID ==
                                                                reply.replyInfo
                                                                    .user
                                                            "
                                                            class="reply-menu-items"
                                                        >
                                                            <p
                                                                class="dropdown-item pointercursor"
                                                                @click="
                                                                    editReplyClicked(
                                                                        comment._commentID,
                                                                        comment
                                                                            .commentedByInfo
                                                                            .MID,
                                                                        comment
                                                                            .commentedByInfo
                                                                            .username,
                                                                        'replyingAReply',
                                                                        true,
                                                                        reply
                                                                            .replyInfo
                                                                            .user,
                                                                        reply.reply,
                                                                        reply._replyID
                                                                    )
                                                                "
                                                            >
                                                                Edit
                                                            </p>
                                                        </div>
                                                        <div
                                                            v-if="
                                                                MID ==
                                                                reply.replyInfo
                                                                    .user
                                                            "
                                                            class="reply-menu-items"
                                                        >
                                                            <p
                                                                class="dropdown-item pointercursor"
                                                                @click="
                                                                    deleteReply(
                                                                        comment._commentID,
                                                                        reply._replyID
                                                                    )
                                                                "
                                                            >
                                                                Delete
                                                            </p>
                                                        </div>
                                                        <div
                                                            class="reply-menu-items"
                                                            v-if="
                                                                MID !==
                                                                reply.replyInfo
                                                                    .user
                                                            "
                                                        >
                                                            <p
                                                                class="dropdown-item pointercursor"
                                                                @click="
                                                                    report({
                                                                        commentID:
                                                                            comment._commentID,
                                                                        replyID:
                                                                            reply._replyID,
                                                                        type: 'reporting-reply',
                                                                        contentType:
                                                                            'article',
                                                                    })
                                                                "
                                                            >
                                                                Report
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="comment-body">
                                                <p>
                                                    <span
                                                        class="mention-wrapper"
                                                        v-if="
                                                            reply
                                                                .mentionInformation
                                                                .replier !==
                                                            reply
                                                                .mentionInformation
                                                                .user
                                                        "
                                                        >@{{
                                                            reply
                                                                .mentionInformation
                                                                .username
                                                        }} </span
                                                    >{{ reply.reply }}
                                                </p>
                                            </div>
                                            <div class="reply-functions">
                                                <p>
                                                    <span
                                                        class="pointercursor"
                                                        @click="
                                                            replyClicked(
                                                                comment._commentID,
                                                                reply.replyInfo
                                                                    .user,
                                                                reply.replyInfo
                                                                    .username,
                                                                'replyingAReply',
                                                                true,
                                                                MID
                                                            )
                                                        "
                                                    >
                                                        Reply
                                                    </span>
                                                    <span
                                                        class="pointercursor"
                                                        @click="
                                                            replyLikeClicked(
                                                                comment._commentID,
                                                                reply._replyID,
                                                                reply.replyLiked,
                                                                reply.reply,
                                                                reply.replyInfo
                                                                    .user,
                                                                reply.LikeNotificationID
                                                            )
                                                        "
                                                        ><i
                                                            class="fas fa-heart"
                                                            :class="{
                                                                'comment-liked':
                                                                    reply.replyLiked,
                                                            }"
                                                        ></i>
                                                        <span
                                                            v-if="
                                                                reply.likesCount !==
                                                                0
                                                            "
                                                        >
                                                            {{
                                                                reply.likesCount
                                                            }}</span
                                                        >
                                                    </span>
                                                </p>
                                            </div>
                                            <div class="reply-divider"></div>
                                        </div>
                                    </div>
                                    <div
                                        class="see-more-replies-container"
                                        v-if="comment._rCount !== 0"
                                    >
                                        <p>
                                            <span
                                                class="pointercursor"
                                                @click="
                                                    seePreviousReplies(
                                                        comment._rCount
                                                    )
                                                "
                                                ><i
                                                    class="fas fa-arrow-left"
                                                ></i>
                                                Previous Replies</span
                                            >
                                            <span class="divider-span"></span>
                                            <span
                                                class="pointercursor"
                                                @click="
                                                    seeNextReplies(
                                                        comment._rCount
                                                    )
                                                "
                                                >Next Replies
                                                <i
                                                    class="fas fa-arrow-right"
                                                ></i
                                            ></span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="showSeeMoreComment">
                    <p class="see-more-comments">
                        <vs-button
                            @click="revealMoreComments()"
                            style="
                                width: 100% !important;
                                background-color: black !important;
                            "
                            >{{ moreCommentsCount }} More Comments</vs-button
                        >
                    </p>
                </div>
            </div>
        </section>
        <modal
            class="share-article-modal"
            name="share-article"
            width="90%"
            :maxWidth="maxWidth"
            height="auto"
            :adaptive="true"
            :click-to-close="true"
        >
            <section class="share-container">
                <div class="share-header">Share This Article</div>
                <div>
                    <p class="sotxt">Share options</p>
                </div>
                <div class="share-options">
                    <div :title="shareLink" class="share-item facebook">
                        <a
                            @click="share('facebook', 'article')"
                            target="_blank"
                            class="facebook-share-link"
                            :href="
                                'http://www.facebook.com/share.php?u=' +
                                shareLink
                            "
                        >
                            <i class="fab fa-facebook share-item-icon"></i>
                        </a>
                    </div>
                    <div class="share-item whatsapp">
                        <a
                            @click="share('whatsapp', 'article')"
                            target="_blank"
                            :href="
                                'https://api.whatsapp.com/send?text=' +
                                shareLink
                            "
                        >
                            <i class="fab fa-whatsapp share-item-icon"></i>
                        </a>
                    </div>
                    <div class="share-item twitter">
                        <a
                            @click="share('twitter', 'article')"
                            target="_blank"
                            :href="
                                'https://twitter.com/intent/tweet?text=' +
                                'Hi there, Saw this post on mixam business website and I wanted to share it. Check it out here&url=' +
                                shareLink +
                                '&related=@mixam_business'
                            "
                            ><i class="fab fa-twitter share-item-icon"></i
                        ></a>
                        <!--              <a target="_blank" href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-size="large" data-text="Hi there, Saw this post on mixam.com and I wanted to share it. Check it out here" data-related="@mixam_business" data-show-count="false"><i class="fab fa-twitter share-item-icon"></i></a>-->
                    </div>
                    <div class="share-item profile">
                        <span @click="share('profile', 'article')">
                            <div class="share-to-profile-container">
                                <img
                                    src="../assets/create-main-bgs/user-free/User_perspective_matte.png"
                                />
                            </div>
                            <span class="share-to-profile-text"
                                >Share to profile</span
                            >
                        </span>
                    </div>
                    <div v-if="false" class="share-item linkedin">
                        <a
                            @click="share()"
                            :href="
                                'https://www.linkedin.com/sharing/share-offsite/?url=' +
                                shareLink
                            "
                            target="_blank"
                        >
                            <i class="fab fa-linkedin share-item-icon"></i>
                        </a>
                    </div>
                    <div
                        @click="share()"
                        v-if="false"
                        class="share-item instagram"
                    >
                        <i class="fab fa-instagram share-item-icon"></i>
                    </div>
                    <div @click="copyArticleLink()" class="share-item copylink">
                        <i class="fas fa-copy share-item-icon"></i>
                    </div>
                </div>
            </section>
        </modal>
    </section>
</template>

<script>
import articleSectionItem from "./article-section-item.vue";
import { format } from "js-time-ago";
export default {
    data: function () {
        return {
            itemData: { title: "" },
            MID: JSON.parse(window.localStorage.getItem("userlogindata")).MID,
            DID: JSON.parse(window.localStorage.getItem("userlogindata")).DID,
            userAgent: this.$store.state.__userAgent,
            comment: "",
            type: "",
            shareContainerOpened: false,
            commentActive: false,
            shareActive: false,
            shared: false,
            liked: false,
            likedDate: "",
            likeActive: false,
            formattedTime: "",
            commentBoxOpen: true,
            addToFavouriteActive: false,
            followLoader: false,
            followingLoader: false,
            viewed: false,
            replyActive: false,
            currentReply: "",
            reply: "",
            replyModel: "",
            pendingReplies: {},
            replyBoxActive: false,
            currentCommentReply: "",
            commentEdit: "",
            replyEdit: "",
            currentReplyBoxComment: "",
            editingComment: false,
            currentEditID: "",
            currentReplyMenu: "",
            direct: true,
            mentionInformation: {
                user: "",
                username: "",
                type: "",
                commentAuthor: "",
                replyAuthor: "",
            },
            editingReply: "",
            editReplyID: "",
            moreReplies: true,
            replyStart: 0,
            replyEnd: 0,
            commentAddition: 0,
            showSeeMoreComment: true,
            moreCommentsCount: 0,
            showCommentsTo: 10,
            commentAllowed: false,
            maxWidth: 480,
        };
    },
    props: {
        aid: String,
    },
    computed: {
        backgroundStyle: function () {
            if (this.itemData.coverImage !== "") {
                return {
                    "background-image": `url(${this.itemData.coverImage})`,
                    "text-align": "center",
                };
            }
        },
        imActive: function () {
            return this.$store.state.activeContentItem == this.itemData.aid;
        },
        checkIfFollowing: function () {
            let followingThisUser = false;
            this.$store.state.userFollowing.forEach((x) => {
                if (followingThisUser == true || x == null) return;
                else {
                    followingThisUser = x.user == this.itemData.author;
                }
            });
            return followingThisUser;
        },
        commentExists: function () {
            if (this.itemData.comments) {
                let sorted = [];
                console.log("itemDatacomments", this.itemData.comments);
                this.itemData.comments.forEach((x) => {
                    if (x) {
                        sorted.push(x);
                    }
                });
                return sorted.length !== 0;
            }
            return false;
        },
        serveComments: function () {
            let sorted = [];
            if (this.itemData.comments) {
                this.itemData.comments.forEach((comment) => {
                    if (comment) {
                        let commentLiked = false;
                        let notificationID;
                        if (!comment.likes) {
                            comment.likes = [];
                        }
                        comment.likes.forEach((liked) => {
                            if (commentLiked) return null;
                            if (liked.likedBy == this.MID) {
                                commentLiked = true;
                                notificationID = liked.notificationID;
                            }
                        });
                        if (!comment.replies) comment.replies = [];
                        let replies = [];
                        let RID = 0;
                        comment.replies.forEach((reply) => {
                            // reply is repped by reply here;
                            if (reply) {
                                if (!reply.likes) {
                                    reply.likes = [];
                                }
                                let replyLiked = false;
                                let RnotificationID;
                                reply.likes.forEach((liked) => {
                                    if (replyLiked) return;
                                    if (!liked) return;
                                    if (liked.likedBy == this.MID) {
                                        replyLiked = true;
                                        RnotificationID = liked.notificationID;
                                    }
                                });
                                reply.replyLiked = replyLiked;
                                reply.LikeNotificationID = RnotificationID;
                                replies.push(reply);
                            }
                        });
                        let sortedCom = [];
                        for (
                            let count = replies.length - 1;
                            count >= 0;
                            count--
                        ) {
                            replies[count].RID = RID;
                            RID++;
                            sortedCom.push(replies[count]);
                        }
                        comment.replies = sortedCom;
                        comment._rCount = replies.length;
                        comment.commentLiked = commentLiked;
                        comment.notificationID = notificationID;
                        sorted.push(comment);
                    }
                });
                // which each comment can carry its own identifier as a number property comment.NID = 0,1,2,3
                let comStart = 0;
                let idealCommentLength = 10;
                let comEnd = idealCommentLength + this.commentAddition;

                let CID = 0;
                let sortedCom = [];
                for (let count = sorted.length - 1; count >= 0; count--) {
                    sorted[count].CID = CID;
                    CID++;
                    sortedCom.push(sorted[count]);
                }

                if (
                    sortedCom.length <=
                    idealCommentLength - 1 + this.commentAddition
                ) {
                    this.showSeeMoreComment = false;
                }
                this.moreCommentsCount = sortedCom.length - comEnd;
                // the work is here
                return sortedCom;
            }

            // type array
            return sorted;
        },
    },
    methods: {
        // article main operations
        fetchArticleData: function () {
            let url = `${this.$store.state.apiServer}/fetcharticle/`;
            window.axios
                .get(url, {
                    params: {
                        aid: this.aid,
                    },
                })
                .then((response) => {
                    //console.log(response.data);
                    this.itemData = response.data.articleData;
                    console.log("from article render", response.data);
                    format(this.itemData.created).then((res) => {
                        this.formattedTime = res;
                    });
                    this.viewedArticle();
                    this.commentAllowed = this.itemData.commentAllowed;
                    let link = `${this.$store.state.apiServer}/gu/article/?aid=${
                        this.itemData.aid
                    }&guser=${true}&author=${this.itemData.author}`;
                    this.shareLink = link;
                    console.log("link", link);
                })
                .then(() => {
                    this.alreadyLiked();
                })
                .catch((err) => {
                    console.error(err.message);
                });
        },
        alreadyLiked: function () {
            let allWhoLiked = [];
            if (this.itemData.likedBy) {
                this.itemData.likedBy.forEach((x) => {
                    let date = x.date;
                    x.likes.forEach((x) => {
                        if (x == null) return;
                        allWhoLiked.push(x.user);
                        if (x.user === this.MID) {
                            this.likedDate = date;
                            this.likeNotificationID = x.notificationID;
                            console.log(
                                "from article item",
                                this.likeNotificationID
                            );
                        }
                    });
                });
            }
            if (allWhoLiked.includes(this.MID)) {
                this.updateLiked();
            }
        },
        viewAuthorProfile() {
            console.log("moving to author profile", this.itemData.author);
            this.$router.push({
                path: "/view-profile?user=" + this.itemData.author,
            });
        },
        openArticleOptionsContainer() {
            if (this.imActive) {
                this.closeOptions();
                return;
            }
            console.log("opening article options container");
            this.$store.commit("updateACI", this.itemData.aid);
        },
        closeOptions() {
            this.$store.commit("updateACI", "noneActive");
        },
        goToFullArticle(aid) {
            console.log("going to full post PID ", aid);
            this.$router.push({ path: "/full-article", query: { aid } });
        },
        report: function (info) {
            console.log("report reply clicked type ", "information ", info);
            info.aid = this.aid;
            this.$emit("report", info);

            this.closeOptions();
        },
        // option functionalities.
        copyArticleLink() {
            // look for the appropraite code.
            this.closeOptions();
            navigator.clipboard.writeText(this.shareLink);
            this.$vs.notify({
                title: "Copied to clipboard",
                color: "#98c2ff",
            });
            this.$modal.hide("share-article");
            console.log("the link : ", this.shareLink);
        },
        turnOffCommenting(action) {
            this.closeOptions();
            console.log("comment turn off operation");
            let url = `${this.$store.state.apiServer}/toggle-content-commenting/`;
            window.axios
                .get(url, {
                    params: {
                        MID: this.MID,
                        DID: this.DID,
                        aid: this.itemData.aid,
                        contentType: "article",
                        action,
                    },
                })
                .then((response) => {
                    if (response.data.status == "success") {
                        this.$vs.notify({
                            title: `Successfully ${action} commenting`,
                            color: "#98c2ff",
                        });
                        this.commentAllowed = !this.commentAllowed;
                    } else {
                        this.$vs.notify({
                            title: "Unable to turned off commenting due to technical issues.",
                            color: "#98c2ff",
                        });
                    }
                })
                .catch((err) => {
                    this.$vs.notify({
                        title: "Check your network connections",
                        color: "#98c2ff",
                    });
                    console.error(err.message);
                });
        },
        unpublishArticle() {
            this.closeOptions();
            console.log("delete post operation");
            let url = `${this.$store.state.apiServer}/delete-content/`;
            window.axios
                .get(url, {
                    params: {
                        MID: this.MID,
                        DID: this.DID,
                        aid: this.itemData.aid,
                        contentType: "article",
                        unpublish: true,
                    },
                })
                .then((response) => {
                    if (response.data.status == "success") {
                        this.$vs.notify({
                            title: `Successfully Unpublished Article`,
                            color: "#98c2ff",
                        });
                        this.deleted = true;
                        setTimeout(() => {
                            this.hide = true;
                        }, 1500);
                    } else {
                        this.$vs.notify({
                            title: "Unable to Unpublished Article due to technical issues.",
                            color: "#98c2ff",
                        });
                    }
                })
                .catch((err) => {
                    this.$vs.notify({
                        title: "Check your network connection",
                        color: "#98c2ff",
                    });
                    console.error(err.message);
                });
        },
        revealMoreComments() {
            console.log("revealing more comments");
            console.log("this.showCommentsTo", this.showCommentsTo);
            this.showCommentsTo += 1;
            if (this.serveComments.length > this.showCommentsTo) {
                // update the morecommentscount
                this.moreCommentsCount =
                    this.serveComments.length - this.showCommentsTo;
            } else {
                // update the show more comment
                this.showSeeMoreComment = false;
            }
        },
        // operation for updating items in view.
        itemInView: function (e) {
            if (e.percentInView == 1) {
                //console.log("item in view", e)
                this.view();
            }
        },
        viewedArticle: function () {
            let viewedThisArticle = false;
            this.itemData.viewedBy.forEach((x) => {
                if (viewedThisArticle) return;
                x.user == this.MID ? (viewedThisArticle = true) : false;
            });
            this.viewed = viewedThisArticle;
        },
        view: function () {
            let details = this.itemData.title.split(" ").slice(0, 9).join(" ");
            if (this.viewed) return;
            if (!this.itemData.viewedBy) return;
            this.viewed = true;
            let url = `${this.$store.state.apiServer}/update-item-view/`;
            window.axios
                .get(url, {
                    params: {
                        DID: this.DID,
                        MID: this.MID,
                        author: this.itemData.author,
                        aid: this.itemData.aid,
                        userAgent: this.userAgent,
                        contentType: "article",
                        details,
                    },
                })
                .then((response) => {
                    if (response.data.status == "success") {
                        console.log(
                            "previous/current viewscount",
                            this.itemData.viewsCount,
                            this.itemData.viewsCount + 1
                        );
                        this.itemData.viewsCount = this.itemData.viewsCount + 1;
                        console.log(
                            "updated the viewcount",
                            response.data,
                            "this.viewed",
                            this.viewed
                        );
                        this.itemData.viewedBy =
                            response.data.contentData.viewedBy;
                    } else {
                        this.viewed = false;
                        console.log("unable to update the view in the db");
                    }
                })
                .catch((error) => {
                    console.error(
                        "response.data add article view",
                        error.message
                    );
                });
        },

        //follow operations
        followAuthor: function () {
            this.followLoader = true;
            let url = `${this.$store.state.apiServer}/followuser/`;
            window.axios
                .get(url, {
                    params: {
                        DID: this.DID,
                        MID: this.MID,
                        author: this.itemData.author,
                        toFollow: this.itemData.author,
                        userAgent: this.userAgent,
                    },
                })
                .then((response) => {
                    console.log(response.data);
                    this.followLoader = false;
                    if (response.data.status == "success") {
                        let realFollowers = [];
                        response.data.userData.following.forEach((x) => {
                            if (x !== null) {
                                realFollowers.push(x);
                            }
                        });
                        this.$store.commit("addtouserfollowing", realFollowers);
                        //this.updateActivityLog();
                    } else {
                        this.modal.show("dialog", {
                            title: "unable to complete unfollow action now.",
                            buttons: [
                                {
                                    title: "Okay",
                                    handler: function () {
                                        this.$modal.hide("dialog");
                                    },
                                },
                            ],
                        });
                    }
                })
                .catch((err) => {
                    console.error(
                        "ERR_SOURCE_FOLLOW_USER_REQUEST",
                        err.message
                    );
                    this.followLoader = false;
                });
            console.log("follow request sent");
        },
        unfollowAuthor: function () {
            this.followingLoader = true;
            let url = `${this.$store.state.apiServer}/unfollowuser/`;
            window.axios
                .get(url, {
                    params: {
                        DID: this.DID,
                        MID: this.MID,
                        author: this.itemData.author,
                        toUnfollow: this.itemData.author,
                        userAgent: this.userAgent,
                    },
                })
                .then((response) => {
                    console.log(response.data);
                    this.followingLoader = false;
                    if (response.data.status == "success") {
                        let realFollowers = [];
                        response.data.userData.following.forEach((x) => {
                            if (x !== null) {
                                realFollowers.push(x);
                            }
                        });
                        this.$store.commit("addtouserfollowing", realFollowers);
                        console.log("unfollow response", response.data);
                    } else {
                        this.modal.show("dialog", {
                            title: "unable to complete unfollow action now.",
                            buttons: [
                                {
                                    title: "Okay",
                                    handler: function () {
                                        this.$modal.hide("dialog");
                                    },
                                },
                            ],
                        });
                    }
                })
                .catch((err) => {
                    this.followingLoader = false;
                    console.error(
                        "ERR UNABLE TO COMPLETE UNFOLLOW OPERATION " +
                            err.message
                    );
                });
        },

        // all add to favourite operations
        addToFavouriteClicked() {
            // add the animation class for the add to favourite active
            this.addToFavouriteActive = true;
            // then remove while the return is pending
            setTimeout(() => {
                this.addToFavouriteActive = false;
            }, 2000);
            // then the request function will handle the notification
            this.addArticleToFavourites();
        },
        addArticleToFavourites: function () {
            this.closeOptions();
            let url = `${this.$store.state.apiServer}/addtofavourite/`;
            console.log("params:", {
                DID: this.DID,
                MID: this.MID,
                author: this.itemData.author,
                aid: this.itemData.aid,
                type: "article",
                userAgent: this.userAgent,
            });
            window.axios
                .get(url, {
                    params: {
                        DID: this.DID,
                        MID: this.MID,
                        author: this.itemData.author,
                        aid: this.itemData.aid,
                        type: "article",
                        userAgent: this.userAgent,
                    },
                })
                .then((response) => {
                    if (response.data.status == "success") {
                        this.$vs.notify({
                            title: `Added to favourites successfully`,
                            color: "#98c2ff",
                        });
                    } else {
                        this.$vs.notify({
                            title: "Unable to add article to favourites due to technical issues.",
                            color: "#98c2ff",
                        });
                    }
                })
                .catch((err) => {
                    this.$vs.notify({
                        title: "Check your network connections",
                        color: "#98c2ff",
                    });
                    console.error(err.message);
                });
        },

        // article liking operation.

        likeClicked() {
            // update liked to be used for UI Updating.
            this.updateLiked();
            // Update like active to show animation for the
            this.likeActive = true;
            setTimeout(() => {
                this.likeActive = false;
            }, 1500);
            if (this.liked) {
                this.like("add");
                console.log("adding like");
            } else {
                this.unlike("remove");
                console.log("removing like");
            }
        },
        updateLiked() {
            this.liked = !this.liked;
        },
        like: function (value) {
            let url = `${this.$store.state.apiServer}/like/`;
            window.axios
                .get(url, {
                    params: {
                        DID: this.DID,
                        MID: this.MID,
                        author: this.itemData.author,
                        aid: this.itemData.aid,
                        action: value,
                        userAgent: this.userAgent,
                        contentType: "article",
                    },
                })
                .then((response) => {
                    if (response.data.status == "success") {
                        this.itemData.likesCount = this.itemData.likesCount + 1;
                        this.likeNotificationID =
                            response.data.likeDoc.notificationID;
                        console.log(
                            "like operation successful",
                            this.likeNotificationID
                        );
                        this.likeDate = String(Date.now())
                            .split(" ")
                            .slice(0, 4)
                            .join(" ");
                    } else {
                        console.log("like operation unsuccessful");
                    }
                })
                .catch((error) => {
                    console.error(
                        "unlike operation unable to complete",
                        error.message
                    );
                });
        },
        unlike: function (value) {
            let url = `${this.$store.state.apiServer}/unlike/`;
            console.log;
            window.axios
                .get(url, {
                    params: {
                        DID: this.DID,
                        MID: this.MID,
                        author: this.itemData.author,
                        aid: this.itemData.aid,
                        action: value,
                        userAgent: this.userAgent,
                        contentType: "article",
                        dateLiked: this.likedDate,
                        notificationID: this.likeNotificationID,
                    },
                })
                .then((response) => {
                    console.log(response.data);
                    if (response.data.status == "success") {
                        this.itemData.likesCount = this.itemData.likesCount - 1;
                        console.log("unlike operation successful");
                    } else {
                        console.log("unlike operation unsuccessful");
                    }
                })
                .catch((error) => {
                    console.error(
                        "like operation unable to complete",
                        error.message
                    );
                });
        },

        // post comment and commenting operations
        commentClicked() {
            this.commentActive = true;
            // open the comment box
            this.commentBoxOpen = !this.commentBoxOpen;
            setTimeout(() => {
                this.commentActive = false;
            }, 2000);
        },
        sendComment: function () {
            if (this.editingComment) {
                this.editComment();
                console.log("sending comment edit request");
                return;
            }
            let comment = this.comment;
            let url = `${this.$store.state.apiServer}/comment/`;
            window.axios
                .get(url, {
                    params: {
                        DID: this.DID,
                        MID: this.MID,
                        author: this.itemData.author,
                        aid: this.itemData.aid,
                        comment,
                        contentType: "article",
                        userAgent: this.userAgent,
                    },
                })
                .then((response) => {
                    if (response.data.status == "success") {
                        console.log(
                            "comment published successfully",
                            response.data
                        );
                        this.comment = "";
                        this.commentAddition = this.commentAddition + 1;
                        this.itemData.comments =
                            response.data.contentData.comments;
                        this.itemData.commentsCount =
                            this.itemData.commentsCount + 1;
                        console.log(this.itemData.comments);
                    } else {
                        console.log("unable to publish comment");
                        this.$vs.notify({
                            title: "Unable to post comment due to technical issues we are currently experiencing. We are working to fix it as soon as possible",
                            color: "#98c2ff",
                        });
                    }
                })
                .catch((error) => {
                    console.error(
                        "ERROR MESSAGE publish comment",
                        error.message
                    );
                    this.$vs.notify({
                        title: "Unable to process request. Check your network connection",
                        color: "#98c2ff",
                    });
                });
        },
        deleteComment: function (commentID) {
            console.log("delete comment Clicked", commentID);
            let url = `${this.$store.state.apiServer}/deletecomment/`;
            window.axios
                .get(url, {
                    params: {
                        DID: this.DID,
                        MID: this.MID,
                        author: this.itemData.author,
                        aid: this.itemData.aid,
                        contentType: "article",
                        userAgent: this.userAgent,
                        commentID,
                    },
                })
                .then((response) => {
                    if (response.data.status == "success") {
                        console.log("deleteSuccess");
                        this.itemData.commentsCount =
                            this.itemData.commentsCount - 1;
                        this.itemData.comments =
                            response.data.contentData.comments;
                    } else {
                        console.log("delete operation unable to complete");
                    }
                });
        },
        editComment: function () {
            // the request redirect was implemented in the method sendComment check for reference
            let commentID = this.currentEditID;
            console.log("edit comment clicked ", commentID);
            let url = `${this.$store.state.apiServer}/editcomment/`;
            window.axios
                .get(url, {
                    params: {
                        DID: this.DID,
                        MID: this.MID,
                        author: this.itemData.author,
                        aid: this.itemData.aid,
                        contentType: "article",
                        userAgent: this.userAgent,
                        commentID,
                        comment: this.comment,
                    },
                })
                .then((response) => {
                    if (response.data.status == "success") {
                        console.log(
                            "success, comment-edit-response-data",
                            response.data
                        );
                        this.comment = "";
                        this.editingComment = false;
                        this.itemData.comments =
                            response.data.contentData.comments;
                    } else {
                        console.log(
                            "unable to complete the comment edit operation for the blah blah",
                            response.data
                        );
                        this.$vs.notify({
                            title: "Unable to edit comment due to technical issues which we will resolve as soon as possible.",
                            color: "#98c2ff",
                        });
                    }
                })
                .catch((err) => {
                    console.error(
                        "ERROR OCCURED IN SENDING EDIT COMMENT ",
                        err.message
                    );
                    this.$vs.notify({
                        title: "Unable to edit comment. Check your internet connection",
                        color: "#98c2ff",
                    });
                });
        },
        commentLikeClicked(
            commentID,
            commentLiked,
            comment,
            author,
            notificationID
        ) {
            let details = comment.split(" ").slice(0, 9).join(" ");
            console.log(
                "comment author ",
                author,
                "notification id ",
                notificationID
            );
            if (!commentLiked) {
                this.sendCommentLikedRequest(
                    commentID,
                    "like",
                    details,
                    author,
                    notificationID
                );
            } else {
                this.sendCommentLikedRequest(
                    commentID,
                    "unlike",
                    "",
                    author,
                    notificationID
                );
            }
        },
        sendCommentLikedRequest(
            commentID,
            action,
            details,
            author,
            notificationID
        ) {
            let url = `${this.$store.state.apiServer}/updatecommentlikes/`;
            window.axios
                .get(url, {
                    params: {
                        DID: this.DID,
                        MID: this.MID,
                        author,
                        aid: this.itemData.aid,
                        userAgent: this.userAgent,
                        action,
                        contentType: "article",
                        commentID,
                        notificationID,
                        details,
                    },
                })
                .then((response) => {
                    if (response.data.status == "success") {
                        console.log(action, "CommentSuccess");
                        this.itemData.comments =
                            response.data.contentData.comments;
                    } else {
                        console.log(
                            "comment like operation unable to complete"
                        );
                        this.$vs.notify({
                            title: "Unable to complete like operation due to technical issues we are currently experiencing. We are working to fix it as soon as possible",
                            color: "#98c2ff",
                        });
                    }
                })
                .catch((err) => {
                    console.error(err.message);
                    this.$vs.notify({
                        title: "Unable to process request. Check your network connection",
                        color: "#98c2ff",
                    });
                });
        },
        cancelCommentEdit() {
            this.editingComment = false;
            this.comment = "";
        },
        editCommentClicked(commentID, comment) {
            console.log(
                "edit comment clicked commentID : ",
                commentID,
                "the comment",
                comment
            );
            this.scrollToCommentInput();
            this.comment = comment;
            this.editingComment = true;
            this.currentEditID = commentID;
        },
        scrollToCommentInput() {
            let id = "#post-comment-input-" + this.aid;
            let options = {
                offset: -100,
            };
            setTimeout(() => {
                this.$scrollTo(id, 750, options);
            }, 100);
        },

        // comment REPLY operations.
        replyClicked(
            commentID,
            author,
            username,
            type,
            openVal,
            replier,
            reply
        ) {
            // the mention information is the comment author and the only information i need is the authors MID and username
            this.mentionInformation = {
                user: author,
                username,
                type,
                replier,
                commentID,
            };
            console.log("mention information", this.mentionInformation, reply);
            if (this.replyActive) {
                this.pendingReplies[this.currentReply] = this.reply;
            }
            if (
                commentID == this.currentReply &&
                this.replyActive &&
                !openVal
            ) {
                this.replyActive = false;
                return;
            }
            this.replyActive = true;
            if (!this.pendingReplies[commentID]) {
                this.reply = "";
            } else {
                this.reply = this.pendingReplies[commentID];
            }
            this.currentReply = commentID;
            if (type == "replyingAReply") {
                this.scrollToReplyInput();
            }
            if (this.editingReply) {
                this.reply = reply;
                console.log("this.reply", this.reply);
            }
        },
        sendReply: function (commentID, commentCID) {
            if (this.editingReply) {
                this.editReply(commentID, this.editReplyID, this.reply);
                return;
            }
            let url = `${this.$store.state.apiServer}/reply/`;
            let aid = this.itemData.aid;
            window.axios
                .get(url, {
                    params: {
                        DID: this.DID,
                        MID: this.MID,
                        author: this.itemData.author,
                        userAgent: this.userAgent,
                        aid,
                        reply: this.reply,
                        commentID,
                        contentType: "article",
                        mentionInformation: this.mentionInformation,
                    },
                })
                .then((response) => {
                    if (response.data.status == "success") {
                        console.log("send reply response", response.data);
                        this.itemData.comments =
                            response.data.contentData.comments;
                        // using the information gathered from the reply, when a reply is published, the reply should come up on the screen.
                        this.pendingReplies[commentID] = "";
                        this.reply = "";
                        this.replyActive = false;
                        this.replyBoxActive = true;
                        this.currentReplyBoxComment = commentID;
                        this.restoreRepliesThrottingDefault();
                        // debug this section
                    } else {
                        console.log("unable to add reply");
                        this.$vs.notify({
                            title: "Unable to post reply due to technical issued we are currently experiencing. We are working to fix it as soon as possible",
                            color: "#98c2ff",
                        });
                    }
                })
                .catch((err) => {
                    console.error(err.message);
                    this.$vs.notify({
                        title: "Unable to process request. Check your network connection",
                        color: "#98c2ff",
                    });
                });
        },
        openReplyBox(commentID) {
            console.log(this.replyBoxActive);
            if (
                this.replyBoxActive &&
                this.currentReplyBoxComment == commentID
            ) {
                this.replyBoxActive = false;
            } else {
                this.currentReplyBoxComment = commentID;
                this.replyBoxActive = true;
            }
            this.restoreRepliesThrottingDefault();
        },
        closeReply(commentID) {
            this.replyActive = false;
            this.editingReply = false;
            this.reply = "";
            this.pendingReplies[commentID] = "";
            this.editReplyID = "";
        },
        replyLikeClicked(
            commentID,
            replyID,
            replyLiked,
            reply,
            author,
            notificationID,
            replyLikeID
        ) {
            let details = reply.split(" ").slice(0, 9).join(" ");
            console.log(author, notificationID, "from reply like click");
            if (!replyLiked) {
                this.sendReplyLikeRequest(
                    commentID,
                    replyID,
                    "like",
                    details,
                    author,
                    notificationID,
                    replyLikeID
                );
            } else {
                this.sendReplyLikeRequest(
                    commentID,
                    replyID,
                    "unlike",
                    "",
                    author,
                    notificationID
                );
            }
        },
        sendReplyLikeRequest(
            commentID,
            replyID,
            action,
            details,
            author,
            notificationID,
            replyLikeID
        ) {
            let url = `${this.$store.state.apiServer}/updatereplylikes/`;
            window.axios
                .get(url, {
                    params: {
                        DID: this.DID,
                        MID: this.MID,
                        aid: this.itemData.aid,
                        userAgent: this.userAgent,
                        action,
                        contentType: "article",
                        commentID,
                        replyID,
                        details,
                        author,
                        notificationID,
                        replyLikeID,
                    },
                })
                .then((response) => {
                    if (response.data.status == "success") {
                        console.log(
                            action,
                            "ReplySuccess",
                            response.data.contentData.comments
                        );
                        this.itemData.comments =
                            response.data.contentData.comments;

                        // scroll to the reply.
                    } else {
                        console.log("reply like operation unable to complete");
                    }
                })
                .catch((err) => {
                    console.error(err.message);
                });
        },
        editReplyClicked: function (
            commentID,
            author,
            username,
            type,
            openVal,
            replier,
            reply,
            replyID
        ) {
            console.log("this.reply", this.reply, "reply", reply);
            this.editingReply = true;
            this.editReplyID = replyID;
            this.replyClicked(
                commentID,
                author,
                username,
                type,
                openVal,
                replier,
                reply
            );
        },
        editReply: function (commentID, replyID, reply) {
            console.log(
                "editing reply",
                commentID,
                "replyID",
                replyID,
                "reply",
                reply
            );
            let url = `${this.$store.state.apiServer}/editreply/`;
            window.axios
                .get(url, {
                    params: {
                        DID: this.DID,
                        MID: this.MID,
                        author: this.itemData.author,
                        aid: this.itemData.aid,
                        contentType: "article",
                        userAgent: this.userAgent,
                        commentID,
                        replyID,
                        reply,
                    },
                })
                .then((response) => {
                    if (response.data.status == "success") {
                        this.itemData.comments =
                            response.data.contentData.comments;
                        this.closeReply(commentID);
                        console.log(
                            "edit reply response",
                            response.data.contentData.comments
                        );
                    } else {
                        this.$vs.notify({
                            title: "Unable to edit reply due to technical issued we are currently experiencing. We are working to fix it as soon as possible",
                            color: "#98c2ff",
                        });
                    }
                })
                .catch((err) => {
                    console.error(err.message);
                    this.$vs.notify({
                        title: "Unable to process request. Check your network connection",
                        color: "#98c2ff",
                    });
                });
        },
        deleteReplyClicked: function () {
            console.log("delete reply clicked");
        },
        deleteReply: function (commentID, replyID) {
            console.log("edit reply", commentID, replyID);
            let url = `${this.$store.state.apiServer}/deletereply/`;
            window.axios
                .get(url, {
                    params: {
                        DID: this.DID,
                        MID: this.MID,
                        author: this.itemData.author,
                        aid: this.itemData.aid,
                        contentType: "article",
                        userAgent: this.userAgent,
                        commentID,
                        replyID,
                    },
                })
                .then((response) => {
                    if (response.data.status == "success") {
                        console.log(
                            "edit reply response",
                            response.data.contentData.comments
                        );
                        this.itemData.comments =
                            response.data.contentData.comments;
                    }
                })
                .catch((err) => {
                    console.error(err.message);
                });
        },
        openReplyMenu(replyID) {
            console.log("open reply menu clicked", replyID);
            this.direct = false;
            if (this.currentReplyMenu == replyID) {
                this.currentReplyMenu = "";
                return;
            }
            this.currentReplyMenu = replyID;
            setTimeout(() => {
                this.direct = true;
            }, 250);
            console.log(this.currentReplyMenu, "waiting over");
        },
        seeNextReplies(repliesCount) {
            console.log("replies count", repliesCount);
            // the job here is to provide an update to the reply throtting params start,end
            if (this.replyEnd >= repliesCount) {
                console.log(
                    "bare end you cant view more replies cos your have viewed all"
                );
                this.$vs.notify({
                    position: "bottom-center",
                    text: "No more replies.",
                    color: "dark",
                });
                return;
            }
            let NFactor = 3;
            this.replyStart = this.replyStart + NFactor;
            this.replyEnd = this.replyEnd + NFactor;
            console.log(
                "replyStart",
                this.replyStart,
                "replyEnd",
                this.replyStart
            );
            // update the see more to know if there is still more replies.
        },
        seePreviousReplies(repliesCount) {
            console.log("replies count", repliesCount);
            if (this.replyStart == 0) {
                console.log("bare end you cant view more replies");
                this.$vs.notify({
                    position: "bottom-center",
                    text: "No previous replies.",
                    width: "max-content",
                    color: "dark",
                });
                return;
            }
            let NFactor = 3;
            this.replyStart = this.replyStart - NFactor;
            this.replyEnd = this.replyEnd - NFactor;
            console.log(
                "replyStart",
                this.replyStart,
                "replyEnd",
                this.replyStart
            );
        },
        restoreRepliesThrottingDefault() {
            this.replyStart = 0;
            this.replyEnd = 3;
        },
        scrollToReplyInput() {
            let id = "#comment-reply-input-" + this.aid;
            let options = {
                offset: -150,
            };
            setTimeout(() => {
                this.$scrollTo(id, 750, options);
            }, 100);
        },

        shareClicked() {
            this.shareActive = true;
            this.$modal.show("share-article");
            this.$store.commit("updatesharelink", this.shareLink);
            setTimeout(() => {
                this.shareActive = false;
            }, 1500);
        },
        shareToMyProfile() {
            this.share("profile", "article");
            let url = `${this.$store.state.apiServer}/share-to-profile/`;
            console.log("sharing post to profile");
            window.axios
                .get(url, {
                    params: {
                        MID: this.MID,
                        DID: this.DID,
                        aid: this.itemData.aid,
                    },
                })
                .then((response) => {
                    this.$store.commit("updateACI", "");
                    if (response.data.status == "success") {
                        this.$vs.notify({
                            title: "Succesfully shared article to your profile",
                            color: "#98c2ff",
                        });
                    } else {
                        this.$vs.notify({
                            title: "Unable to shared article to your profile",
                            color: "#98c2ff",
                        });
                    }
                })
                .catch((err) => {
                    this.$store.commit("updateACI", "");
                    this.$vs.notify({
                        title: "Check your internet connections.",
                        color: "#98c2ff",
                    });
                    console.error(err.message);
                });
        },
        share(to, contentType) {
            let url = `${this.$store.state.apiServer}/share/`;
            let parsedLink = new window.URL(this.shareLink);
            window.axios
                .get(url, {
                    params: {
                        MID: this.MID,
                        DID: this.DID,
                        to,
                        contentType,
                        ref:
                            parsedLink.searchParams.get("pid") ||
                            parsedLink.searchParams.get("aid") ||
                            parsedLink.searchParams.get("cid"),
                        author: parsedLink.searchParams.get("author"),
                    },
                })
                .then((response) => {
                    if (response.data.status == "success") {
                        console.log("share success");
                        this.$modal.hide("share-article");
                    } else {
                        console.error("unable to share");
                    }
                })
                .catch((err) => {
                    console.error(err.message);
                });
        },
    },
    props: ["aid"],
    created: function () {
        this.restoreRepliesThrottingDefault();
        this.fetchArticleData();
        document.body.addEventListener("click", () => {
            setTimeout(() => {
                if (this.direct && this.currentReplyMenu !== "") {
                    this.openReplyMenu("");
                    console.log("here to close with global click");
                }
            }, 100);
        });
        document.addEventListener("scroll", () => {
            setTimeout(() => {
                if (this.direct && this.currentReplyMenu !== "") {
                    this.openReplyMenu("");
                    console.log("here to close with global scroll");
                }
            }, 100);
        });
    },
    components: {
        articleSectionItem,
    },
};
</script>

<style lang="scss">
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

@media screen and (max-width: 600px) {
    .contents {
        flex-direction: column;
    }
    .article-render-title {
        font-size: 30px;
    }
}
</style>
