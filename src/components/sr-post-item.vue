<template>
    <section
        v-if="!hide"
        :class="{ 'animate__animated animate__slideOutLeft': deleted }"
        v-view="itemInView"
        id="post_item"
    >
        <div :id="itemData.pid">
            <div class="post-item-header">
                <div class="avartar-container">
                    <div
                        class="img-container pointercursor"
                        @click="viewAuthorProfile()"
                    >
                        <img
                            v-if="itemData.author_image !== ''"
                            :src="itemData.author_image"
                            class="post-avartar-image"
                        />
                        <span class="user-icon-container">
                            <img
                                src="../assets/create-main-bgs/user-free/User_perspective_matte.png"
                                class="avatar-pp"
                            />
                        </span>
                    </div>
                </div>
                <div class="username-time-container">
                    <div class="details-container">
                        <p
                            class="name-container pointercursor"
                            @click="viewAuthorProfile()"
                        >
                            {{ itemData.author_username }}
                        </p>
                        <p class="time-container">
                            {{ formattedTime }}
                        </p>
                    </div>
                </div>
                <div v-if="itemData.author !== MID" class="following-container">
                    <div class="follow-button-container">
                        <button
                            class="follow-button"
                            v-if="!checkIfFollowing"
                            @click="followAuthor()"
                        >
                            Follow<span
                                v-if="followLoader"
                                class="ui active inline loader"
                            ></span>
                        </button>
                        <button
                            class="following-button"
                            v-if="checkIfFollowing"
                            @click="unfollowAuthor()"
                        >
                            Following<span
                                v-if="followingLoader"
                                class="ui active inline loader"
                            ></span>
                        </button>
                    </div>
                </div>
                <div class="options-container">
                    <div
                        class="options-button-container"
                        @click="openPostOptionsContainer()"
                    >
                        <div class="options-button">
                            <div class="dot1"></div>
                            <div class="dot1"></div>
                            <div class="dot1"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="options-menu-container" v-if="imActive">
            <div class="close-container">
                <span class="close-icon-wrapper" @click="closeOptions"
                    ><i class="fas fa-times"></i
                ></span>
            </div>
            <div class="options">
                <div
                    class="option-item pointercursor"
                    @click="addPostToFavourites()"
                >
                    <span>Add to favourites</span>
                </div>
                <div class="divider-bar"></div>
                <div
                    class="option-item pointercursor"
                    @click="shareToMyProfile()"
                >
                    <span>Share To My Profile</span>
                </div>
                <div v-if="itemData.imageurl !== ''" class="divider-bar"></div>
                <div
                    v-if="itemData.imageurl !== ''"
                    class="option-item pointercursor"
                >
                    <a
                        :href="itemData.imageurl"
                        @click="closeOptions()"
                        target="_blank"
                        download="mixam-download"
                        class="save-image-link"
                        ><span>Save Image</span></a
                    >
                </div>
                <div class="divider-bar"></div>
                <div class="option-item pointercursor" @click="copyPostLink()">
                    <span>Copylink</span>
                </div>
                <div
                    class="divider-bar"
                    v-if="itemData.author == MID && commentIsAllowed"
                ></div>
                <div
                    class="option-item pointercursor"
                    v-if="itemData.author == MID && commentIsAllowed"
                    @click="turnOffCommenting('turn-off')"
                >
                    <span>Turn off Commenting</span>
                </div>
                <div
                    class="divider-bar"
                    v-if="itemData.author == MID && !commentIsAllowed"
                ></div>
                <div
                    class="option-item pointercursor"
                    v-if="itemData.author == MID && !commentIsAllowed"
                    @click="turnOffCommenting('turn-on')"
                >
                    <span>Turn on Commenting</span>
                </div>
                <div class="divider-bar" v-if="false"></div>
                <div class="option-item pointercursor" v-if="false">
                    <span
                        >Turn <span>On</span>/<span>Off</span>
                        Notification</span
                    >
                </div>
                <div class="divider-bar" v-if="itemData.author !== MID"></div>
                <div
                    class="option-item pointercursor"
                    @click="removeFromFeed()"
                    v-if="itemData.author !== MID"
                >
                    <span>Don't want to see this</span>
                </div>
                <div class="divider-bar" v-if="itemData.author !== MID"></div>
                <div
                    class="option-item pointercursor"
                    v-if="itemData.author !== MID"
                    @click="
                        report({
                            contentType: 'post',
                            pid: itemData.pid,
                            type: 'reporting-post',
                        })
                    "
                >
                    <span>Report</span>
                </div>
                <div class="divider-bar" v-if="itemData.author == MID"></div>
                <div
                    class="option-item pointercursor"
                    v-if="itemData.author == MID"
                    @click="deletePost()"
                >
                    <span>Delete</span>
                </div>
            </div>
        </div>
        <div class="post-item-image" v-if="itemData.imageurl !== ''">
            <div
                @click="addToFavouriteClicked()"
                :class="{ 'animate-addtofavourite': addToFavouriteActive }"
                class="add-to-favourites-container"
            >
                <i class="fas fa-bookmark"></i>
            </div>
            <div class="image-container">
                <img class="post-image" :src="itemData.imageurl" />
            </div>
        </div>
        <div class="post-item-short-text">
            <p @click="changeNormalPostLength()">
                {{ postBody }}
                <span
                    class="read-more-text pointercursor"
                    v-if="
                        !normalPostLength &&
                        !postBodySmall &&
                        itemData.imageurl !== ''
                    "
                >
                    ...read more</span
                >
            </p>
        </div>
        <div class="hashtags-container" v-if="hashtags.length > 0">
            <span
                class="hashtag-item"
                v-for="item in hashtags"
                :key="item.id"
                >{{ item.keyword }}</span
            >
        </div>
        <div
            :id="'post-comment-input-' + pid"
            class="function-and-metrics-container"
        >
            <div class="views-container">
                <div><i class="fas fa-eye"></i> {{ itemData.viewsCount }}</div>
            </div>
            <div class="comments-container">
                <div
                    @click="commentClicked()"
                    :class="{
                        'animate__animated animate__heartBeat': commentActive,
                    }"
                >
                    <i class="fas fa-comment"></i> {{ itemData.commentsCount }}
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
                    <i :class="{ liked_heart: liked }" class="fas fa-heart"></i>
                    {{ itemData.likesCount }}
                </div>
            </div>
        </div>
        <div class="liked-notif" v-if="liked">
            <p>
                <i>You liked this post.</i>
            </p>
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
            <p v-if="commentIsAllowed">
                <span class="comment-input-wrapper">
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
                </span>
            </p>
            <p class="comments-disabled" v-if="!commentIsAllowed">
                <i>Comments are currently disabled for this post.</i>
            </p>
            <div class="comments">
                <p class="comments-heading">Comments</p>
                <p v-if="!commentExists">No comments yet.</p>
                <div class="comments-item-container">
                    <div
                        v-for="comment in serveComments"
                        :key="comment._commentID"
                        class="comment-item"
                    >
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
                                    <div><i class="fas fa-user"></i></div>
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
                                    {{ comment.commentedByInfo.username }}
                                </p>
                            </div>
                        </div>
                        <div class="comment-body">
                            <p>{{ comment.comment }}</p>
                        </div>
                        <div class="comment-functions">
                            <p>
                                <span
                                    v-if="MID == comment.commentedByInfo.MID"
                                    @click="
                                        editCommentClicked(
                                            comment._commentID,
                                            comment.comment
                                        )
                                    "
                                    >Edit</span
                                >
                                <span
                                    v-if="MID == comment.commentedByInfo.MID"
                                    @click="deleteComment(comment._commentID)"
                                    >Delete</span
                                >
                                <span
                                    @click="
                                        replyClicked(
                                            comment._commentID,
                                            comment.commentedByInfo.MID,
                                            comment.commentedByInfo.username,
                                            'replyingTheAuthor',
                                            true,
                                            MID
                                        )
                                    "
                                    >Reply</span
                                >
                                <span
                                    @click="openReplyBox(comment._commentID)"
                                    class="replies"
                                    >{{ comment.replies.length }} replies</span
                                >
                                <span
                                    @click="
                                        report({
                                            commentID: comment._commentID,
                                            type: 'report-comment',
                                            contentType: 'post',
                                        })
                                    "
                                    v-if="MID !== comment.commentedByInfo.MID"
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
                                    <span v-if="comment.likesCount !== 0">
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
                            :id="'comment-reply-input-' + pid"
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
                                    @click="closeReply(comment._commentID)"
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
                                        <i class="fas fa-paper-plane"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div
                            v-if="
                                replyBoxActive &&
                                currentReplyBoxComment == comment._commentID
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
                                                        .profileImageLink == ''
                                                "
                                                class="no-image-comment-user"
                                            >
                                                <div class="for-reply">
                                                    <i class="fas fa-user"></i>
                                                </div>
                                            </div>
                                            <div
                                                v-if="
                                                    reply.replyInfo
                                                        .profileImageLink !== ''
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
                                                        reply.replyInfo.user
                                                    )
                                                "
                                            >
                                                {{ reply.replyInfo.username }}
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
                                                        reply.replyInfo.user
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
                                                                reply.replyInfo
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
                                                        reply.replyInfo.user
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
                                                        reply.replyInfo.user
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
                                                                    'post',
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
                                                    reply.mentionInformation
                                                        .replier !==
                                                    reply.mentionInformation
                                                        .user
                                                "
                                                >@{{
                                                    reply.mentionInformation
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
                                                        reply.replyInfo.user,
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
                                                        reply.replyInfo.user,
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
                                                        reply.likesCount !== 0
                                                    "
                                                >
                                                    {{ reply.likesCount }}</span
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
                                            seePreviousReplies(comment._rCount)
                                        "
                                        ><i class="fas fa-arrow-left"></i>
                                        Previous Replies</span
                                    >
                                    <span class="divider-span"></span>
                                    <span
                                        class="pointercursor"
                                        @click="seeNextReplies(comment._rCount)"
                                        >Next Replies
                                        <i class="fas fa-arrow-right"></i
                                    ></span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="showSeeMoreComment">
                <p class="see-more-comments">
                    <vs-button
                        @click="goToFullPost(pid)"
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
</template>

<script>
import { format } from "js-time-ago";

export default {
    data: function () {
        return {
            normalPostLength: false,
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
            commentBoxOpen: false,
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
            likedNID: "",
            commentAllowed: false,
            deleted: false,
            hide: false,
            shareLink: "",
            nEnd: false,
        };
    },
    computed: {
        itemData: function () {
            return this.resdata;
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
                    for (let count = replies.length - 1; count >= 0; count--) {
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
            let comEnd = 4 + this.commentAddition;

            let CID = 0;
            let sortedCom = [];
            for (let count = sorted.length - 1; count >= 0; count--) {
                sorted[count].CID = CID;
                CID++;
                sortedCom.push(sorted[count]);
            }
            if (sortedCom.length <= 5 + this.commentAddition) {
                this.showSeeMoreComment = false;
            }
            this.moreCommentsCount = sortedCom.length - comEnd;
            return sortedCom.slice(comStart, comEnd); // type array
        },
        postBody: function () {
            if (this.normalPostLength || this.itemData.imageurl == "") {
                return this.itemData.postbody;
            } else {
                //let returnText;
                //returnText = this.itemData.postbody
                //    .split(" ")
                //    .splice(0, 13)
                //    .join(" ");
                //console.log("returnText : ", returnText);
                let a = this.itemData.postbody;
                if (a == undefined) return "";
                let returnText = this.itemData.postbody;
                returnText = returnText.split(" ");
                returnText = returnText.splice(0, 13);
                returnText = returnText.join(" ");
                return returnText;
            }
        },
        hashtags: function () {
            if (this.itemData.hashtags) {
                return this.itemData.hashtags;
            }
            return [];
        },
        postBodySmall: function () {
            if (!this.itemData.postbody) {
                return false;
            }
            let arr = this.itemData.postbody.split(" ");
            let count = arr.length;
            return count < 13;
        },
        imActive() {
            return this.$store.state.activeContentItem == this.itemData.pid;
        },
        commentIsAllowed: function () {
            return this.itemData.commentAllowed;
        },
    },
    methods: {
        // post main operations
        fetchPostData: function () {
            let url = `${this.$store.state.apiServer}/fetchposts/`;
            window.axios
                .get(url, {
                    params: {
                        pid: this.pid,
                    },
                })
                .then((response) => {
                    if (response.data.status == "success") {
                        this.itemData = response.data.postData;
                        format(this.itemData.created).then((res) => {
                            this.formattedTime = res;
                        });
                        this.alreadyLiked();
                        this.viewedPost();
                        this.commentAllowed = this.itemData.commentAllowed;
                        let link = `${this.$store.state.apiServer}/gu/post/?pid=${
                            this.itemData.pid
                        }&guser=${true}&author=${this.itemData.author}`;
                        this.shareLink = link;
                    } else {
                        console.log("unable to update viewcount");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        alreadyLiked: function () {
            let allWhoLiked = [];
            if (this.itemData.likedBy) {
                this.itemData.likedBy.forEach((ini) => {
                    let date = ini.date;
                    ini.likes.forEach((x) => {
                        if (x == null) return;
                        allWhoLiked.push(x.user);
                        if (x.user === this.MID) {
                            this.likedDate = date;
                            console.log("like Date", date, this.likedDate);
                            this.likeNotificationID = x.notificationID;
                        }
                    });
                });
            }
            if (allWhoLiked.includes(this.MID)) {
                this.updateLiked();
            }
        },
        changeNormalPostLength: function () {
            this.normalPostLength = !this.normalPostLength;
        },
        openPostOptionsContainer() {
            if (this.imActive) {
                this.closeOptions();
                return;
            }
            this.$store.commit("updateACI", this.itemData.pid);
        },
        closeOptions() {
            this.$store.commit("updateACI", "noneActive");
        },
        goToFullPost(pid) {
            console.log("going to full post PID ", pid);
            this.$router.push({ path: "/full-post", query: { pid } });
        },
        report: function (info) {
            console.log("report reply clicked type ", "information ", info);
            info.pid = this.pid;
            this.$emit("report", info);
            this.closeOptions();
        },
        copyPostLink() {
            // look for the appropraite code.
            this.closeOptions();
            navigator.clipboard.writeText(this.shareLink);
            this.$vs.notify({
                title: "Copied link to clipboard",
                color: "#98c2ff",
            });
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
                        pid: this.itemData.pid,
                        contentType: "post",
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
                        title: "Unable to turned off commenting due to technical issues.",
                        color: "#98c2ff",
                    });
                    console.error(err.message);
                });
        },
        deletePost() {
            this.closeOptions();
            console.log("delete post operation");
            let url = `${this.$store.state.apiServer}/delete-content/`;
            window.axios
                .get(url, {
                    params: {
                        MID: this.MID,
                        DID: this.DID,
                        pid: this.itemData.pid,
                        contentType: "post",
                    },
                })
                .then((response) => {
                    if (response.data.status == "success") {
                        this.$vs.notify({
                            title: `Successfully deleted post`,
                            color: "#98c2ff",
                        });
                        this.deleted = true;
                        setTimeout(() => {
                            this.hide = true;
                        }, 1500);
                    } else {
                        this.$vs.notify({
                            title: "Unable to delete post due to technical issues.",
                            color: "#98c2ff",
                        });
                    }
                })
                .catch((err) => {
                    this.$vs.notify({
                        title: "Check your network connection.",
                        color: "#98c2ff",
                    });
                    console.error(err.message);
                });
        },
        removeFromFeed: function () {
            this.closeOptions();
            console.log("remove from feed operation");
            let url = `${this.$store.state.apiServer}/mute-content/`;
            window.axios
                .get(url, {
                    params: {
                        MID: this.MID,
                        DID: this.DID,
                        pid: this.itemData.pid,
                    },
                })
                .then((response) => {
                    if (response.data.status == "success") {
                        console.log("successfully muted content");
                        this.$vs.notify({
                            title: "Successfully removed course from your feed.",
                            color: "#98c2ff",
                        });
                    } else {
                        this.$vs.notify({
                            title: "Unable to remove this content from your feed due to technical issues",
                            color: "#98c2ff",
                        });
                    }
                })
                .catch((err) => {
                    this.$vs.notify({
                        title: "Check your network connection.",
                        color: "#98c2ff",
                    });
                    console.error("ERROR IN MUTING CONTENT : ", err.message);
                });
        },

        // operation for updating items in view.
        itemInView: function (e) {
            if (e.percentInView == 1) {
                // console.log("item in view", e)
                this.view();
                if (this.nEnd) {
                    this.$emit("fetchMoreFeed", {
                        id: this.aid || this.cid || this.pid,
                    });
                    this.nEnd = false;
                    console.log("This near End", this.nEnd);
                }
            }
            return;
        },
        viewedPost: function () {
            let viewedThisPost = false;
            this.itemData.viewedBy.forEach((x) => {
                if (viewedThisPost) return;
                x.user == this.MID ? (viewedThisPost = true) : false;
            });
            this.viewed = viewedThisPost;
        },
        view: function () {
            let details = this.itemData.postbody
                .split(" ")
                .slice(0, 9)
                .join(" ");
            //console.log(this.itemData.author,"post author")
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
                        pid: this.itemData.pid,
                        userAgent: this.userAgent,
                        contentType: "post",
                        details,
                    },
                })
                .then((response) => {
                    if (response.data.status == "success") {
                        this.itemData.viewsCount = this.itemData.viewsCount + 1;
                        console.log("updated the viewcount", response.data);
                        this.itemData.viewedBy =
                            response.data.contentData.viewedBy;
                    } else {
                        this.viewed = false;
                        console.log("unable to update the view in the db");
                    }
                })
                .catch((error) => {
                    console.error("response.data add post view", error.message);
                });
        },

        // view author profiles operation
        viewAuthorProfile: function (mid) {
            // go to the profile render page and fetch the users information
            let MID = this.itemData.author;
            if (mid) {
                MID = mid;
            }
            this.$router.push({
                path: "/view-profile",
                query: { user: MID },
            });
        },

        // follow operations
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
            this.addPostToFavourites();
        },
        addPostToFavourites: function () {
            let url = `${this.$store.state.apiServer}/addtofavourite/`;
            console.log("params:", {
                DID: this.DID,
                MID: this.MID,
                author: this.itemData.author,
                pid: this.itemData.pid,
                type: "post",
                content: this.itemData.postbody
                    .split(" ")
                    .slice(0, 4)
                    .join(" "),
            });
            window.axios
                .get(url, {
                    params: {
                        DID: this.DID,
                        MID: this.MID,
                        author: this.itemData.author,
                        pid: this.itemData.pid,
                        type: "post",
                        content: this.itemData.postbody
                            .split(" ")
                            .slice(0, 4)
                            .join(" "),
                    },
                })
                .then((response) => {
                    console.log(
                        "response.data add to favourite",
                        response.data
                    );
                    this.$store.commit("updateACI", "");
                    this.$vs.notify({
                        title: "Successfully added post to favourites",
                        color: "#98c2ff",
                    });
                })
                .catch((error) => {
                    console.error(
                        "response.data add to favourite",
                        error.message
                    );
                    this.$vs.notify({
                        title: "Unable to added post to favourites",
                        color: "#98c2ff",
                    });
                    this.$store.commit("updateACI", "");
                });
        },

        // PostLikeOperations
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
                        pid: this.itemData.pid,
                        action: value,
                        userAgent: this.userAgent,
                        contentType: "post",
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
            console.log("unlike request like date", this.likedDate);
            window.axios
                .get(url, {
                    params: {
                        DID: this.DID,
                        MID: this.MID,
                        author: this.itemData.author,
                        pid: this.itemData.pid,
                        action: value,
                        userAgent: this.userAgent,
                        contentType: "post",
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
                        pid: this.itemData.pid,
                        comment,
                        contentType: "post",
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
                    }
                })
                .catch((error) => {
                    console.error(
                        "ERROR MESSAGE publish comment",
                        error.message
                    );
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
                        pid: this.itemData.pid,
                        contentType: "post",
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
                        this.$vs.notify({
                            position: "bottom-center",
                            title: "comment delete successful",
                            color: "#cbe0ff",
                        });
                    } else {
                        this.$vs.notify({
                            position: "bottom-center",
                            title: "Unable to delete comment due to technical issues which will be fixed as soon as possible",
                            color: "#cbe0ff",
                        });
                        console.log("delete operation unable to complete");
                    }
                })
                .catch((err) => {
                    this.$vs.notify({
                        position: "bottom-center",
                        title: "Network connection not available. ",
                        color: "#cbe0ff",
                    });
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
                        pid: this.itemData.pid,
                        contentType: "post",
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
                        this.$vs.notify({
                            position: "bottom-center",
                            title: "Comment edit successful",
                            color: "#cbe0ff",
                        });
                    } else {
                        console.log(
                            "unable to complete the comment edit operation for the blah blah",
                            response.data
                        );
                        this.$vs.notify({
                            position: "bottom-center",
                            title: "Unable to edit comment due to technical issues which will be fixed as soon as possible",
                            color: "#cbe0ff",
                        });
                    }
                })
                .catch((err) => {
                    console.error(
                        "ERROR OCCURED IN SENDING EDIT COMMENT ",
                        err.message
                    );
                    this.$vs.notify({
                        position: "bottom-center",
                        title: "Network connection not available. ",
                        color: "#cbe0ff",
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
                    author
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
                        pid: this.itemData.pid,
                        userAgent: this.userAgent,
                        action,
                        contentType: "post",
                        commentID,
                        details,
                        notificationID,
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
                    }
                })
                .catch((err) => {
                    console.error(err.message);
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
            let id = "#post-comment-input-" + this.pid;
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
            console.log("mention information", this.mentionInformation);
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
            let pid = this.itemData.pid;
            console.log("req pid", pid, this.mentionInformation);
            window.axios
                .get(url, {
                    params: {
                        DID: this.DID,
                        MID: this.MID,
                        author: this.itemData.author,
                        userAgent: this.userAgent,
                        pid,
                        reply: this.reply,
                        commentID,
                        contentType: "post",
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
                        this.$vs.notify({
                            position: "bottom-center",
                            title: "Reply published succesfully",
                            color: "#cbe0ff",
                        });
                        // debug this section
                    } else {
                        this.$vs.notify({
                            position: "bottom-center",
                            title: "Unable to publish reply due to technical issues. We are working on it and will be fixed as soon as possible",
                            color: "#cbe0ff",
                        });
                        console.log("unable to add reply");
                    }
                })
                .catch((err) => {
                    this.$vs.notify({
                        position: "bottom-center",
                        title: "Network connection not available.",
                        color: "#cbe0ff",
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
                        author,
                        pid: this.itemData.pid,
                        userAgent: this.userAgent,
                        action,
                        notificationID,
                        contentType: "post",
                        commentID,
                        replyID,
                        details,
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
                        pid: this.itemData.pid,
                        contentType: "post",
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
                    }
                })
                .catch((err) => {
                    console.error(err.message);
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
                        pid: this.itemData.pid,
                        contentType: "post",
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
            let id = "#comment-reply-input-" + this.pid;
            let options = {
                offset: -150,
            };
            setTimeout(() => {
                this.$scrollTo(id, 750, options);
            }, 100);
        },

        // share operations
        shareClicked() {
            this.shared = true;
            this.shareActive = true;
            setTimeout(() => {
                this.shareActive = false;
            }, 1500);
            setTimeout(() => {
                this.openShareContainer();
            }, 500);
        },
        openShareContainer() {
            // open the sharepost modal
            this.$modal.show("share-post");
            console.log("showing share post modal", this.shareLink);
            this.$store.commit("updatesharelink", this.shareLink);
        },
        shareToMyProfile() {
            this.share("profile", "post");
            let url = `${this.$store.state.apiServer}/share-to-profile/`;
            console.log("sharing post to profile");
            window.axios
                .get(url, {
                    params: {
                        MID: this.MID,
                        DID: this.DID,
                        pid: this.itemData.pid,
                    },
                })
                .then((response) => {
                    this.$store.commit("updateACI", "");
                    if (response.data.status == "success") {
                        this.$vs.notify({
                            title: "Succesfully shared post to your profile",
                            color: "#98c2ff",
                        });
                    } else {
                        this.$vs.notify({
                            title: "Unable to shared post to your profile",
                            color: "#98c2ff",
                        });
                    }
                })
                .catch((err) => {
                    this.$store.commit("updateACI", "");
                    this.$vs.notify({
                        title: "Unable to shared post to your profile",
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
                    } else {
                        console.error("unable to share");
                    }
                })
                .catch((err) => {
                    console.error(err.message);
                });
        },
    },
    created: function () {
        this.restoreRepliesThrottingDefault();
        //this.fetchPostData();
        let link = `${this.$store.state.apiServer}/gu/post/?pid=${
            this.itemData.pid
        }&guser=${true}&author=${this.itemData.author}`;
        this.shareLink = link;
        this.pid = this.itemData.pid;
        if (this.nearEnd) {
            this.nEnd = true;
        }
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
                this.$store.commit("updateACI", "");
                if (this.direct && this.currentReplyMenu !== "") {
                    this.openReplyMenu("");
                    console.log("here to close with global scroll");
                }
            }, 100);
        });
    },
    props: {
        pid: String,
        nearEnd: Boolean,
        resdata: Object,
    },
    components: {},
    watchers: {},
};
</script>

<style lang="scss">
#post_item {
    border-radius: 10px;
    box-shadow: 0px 0px 5px #cbe0ff;
    background-color: white;
    padding: 13px;
    margin-top: 20px;
    font-family: signika-light;
}
.post-item-header {
    display: flex;
}
.post-item-header {
    height: max-content;
}
.avartar-container .img-container {
    width: 60px;
    overflow: hidden;
    border-radius: 88px;
    background: #cbe0ff !important;
}
#feed_section {
    padding-top: 12px;
}
.time-container {
    font-size: 75%;
    color: gray;
}
.name-container {
    font-weight: 700;
}
.avartar-container,
.following-container,
.options-container {
    width: max-content;
}
.user-icon-container .avatar-pp {
    margin: auto auto;
    height: 60%;
    width: auto;
    display: block;
    margin-top: 17%;
}
.username-time-container {
    flex: 1;
    padding: 8px 0px 0px 11px;
}
.follow-button-container {
    padding-left: 6px;
}
.follow-button {
    padding: 8px 18px 8px 18px;
    border-radius: 10px;
    border: 0px solid;
    font-weight: 600;
    color: white;
    background-color: #0d403c;
}
.following-button {
    padding: 8px 18px 8px 18px;
    border-radius: 10px;
    border: 2px solid #0d403c;
    font-weight: 600;
    color: #0d403c;
    background-color: white;
}
.dot1 {
    width: 4px;
    height: 4px;
    border-radius: 99px;
    background: #265063;
    margin-top: 3px;
    margin-left: 10px;
}
.options-button-container {
    padding-top: 5px;
    padding-right: 5px;
    padding-bottom: 5px;
}
.function-and-metrics-container {
    display: flex;
    margin-top: 10px;
}
.add-to-favourites-container {
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content;
    position: absolute;
    right: 5%;
}
.add-to-favourites-container i {
    color: #203332;
    font-size: 200%;
    outline-style: dotted;
    outline-color: white;
    padding: 4px;
}
.image-container {
    height: max-content;
    overflow: hidden;
    border-radius: 15px 0px 15px 0px;
    margin-bottom: 15px;
}
.post-image {
    margin: auto auto;
    display: block;
    border: 1px solid #dfecff;
    border-radius: 15px 0px 15px 0px;
}
.post-item-image {
    margin-top: 10px;
}
.views-container,
.likes-container,
.comments-container,
.shares-container {
    font-size: 90%;
    flex: 1;
}
.views-container:hover,
.likes-container:hover,
.comments-container:hover,
.shares-container:hover {
    cursor: pointer;
}
.views-container div,
.likes-container div,
.comments-container div,
.shares-container div {
    padding: 5px 15px 5px 15px;
    box-shadow: 0px 0px 6px #98b6c3;
    border-radius: 10px;
    width: max-content;
}
.likes-container {
    float: right;
    width: max-content;
    margin-right: -4%;
}
.read-more-text {
    font-weight: 700;
}
.post-item-short-text p {
    font-family: segoe ui;
    margin-bottom: 15px;
}
/** post item design */
.options-menu-container {
    background: white;
    padding: 20px 10px;
    border-radius: 10px;
    position: absolute;
    height: max-content;
    color: #0a2137;
    box-shadow: 0px 0px 10px #cbe0ff;
    z-index: 1;
}
.option-item span {
    font-weight: 600;
}
.divider-bar {
    border-top: 2px solid;
    margin: 15px 0px 15px 0px;
}
.close-container {
    width: 100%;
    text-align: right;
}
span.close-icon-wrapper {
    padding: 11px 15px;
    border-radius: 43px;
    background: #f8f8f8;
}
input.comment-text-input {
    border: 2px solid #cbe0ff;
    height: 40px;
    width: 90%;
    margin-top: 20px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    padding-left: 7px;
    border-right: 0px solid;
    color: #5e97cf;
}

.comment-send-button {
    height: 40px;
    width: 10%;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    border: 0px solid;
    background: #cbe0ff;
}
.comment-send-button i {
    color: #1e87f0;
}
.comments-heading {
    padding-top: 10px;
    font-size: 140%;
    font-weight: 600;
}
.comments-item-container {
    padding-top: 15px;
}
.animate-addtofavourite i {
    animation-name: favanim;
    animation-duration: 2s;
    animation-delay: 0s;
    animation-timing-function: ease;
}
.liked-notif p {
    text-align: right;
    color: gray;
    padding: 8px 12px 0px 0px;
}
.no-image-comment-user div {
    padding: 10px 15px 10px 15px;
    border-radius: 20px;
    width: max-content;
    background: #cbe0ff;
    color: white;
}
.no-image-comment-user .for-reply {
    border: 3px solid;
    padding: 7px 12px 7px 12px;
}
.comment-item {
    padding: 7px;
    border-radius: 15px;
    box-shadow: 0px 0px 13px #cbe0ff;
    margin: 0px 0px 10px 0px;
}
.comment-heading {
    display: flex;
}
.comment-heading div {
    width: max-content;
}
.comment-username {
    font-weight: 600;
    position: relative;
    top: 10px;
    left: 10px;
}
.comment-body {
    font-size: 100%;
    font-weight: 500;
    padding-left: 52px;
}
.comment-functions p {
    font-weight: 600;
    margin-left: 51px;
    padding-top: 3px;
}
.comment-functions span {
    padding-left: 0px;
    display: inline-block;
    margin-right: 16px;
}
.comment-functions span:hover {
    cursor: pointer;
}
.reply-send-button {
    border-radius: 30px;
    padding: 6px 8px;
    border: 1px solid gray;
    color: #1e87f0;
}
.reply-input-container {
    margin-top: 14px !important;
    box-shadow: 0px 0px 10px #efefef;
    border-radius: 13px;
    display: flex;
}
.rep-inp-cont {
    flex: 1 !important;
}
.rep-btn-cont {
    width: max-content;
}
.reply-input {
    height: 30px;
    width: 100%;
    border-top: 0px solid;
    border-left: 0px solid;
    border-right: 0px solid;
    border-bottom: 1px solid #bcd7ff;
    padding-left: 10px;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 14px;
}
.replies-container {
    background: #cbe0ff;
    padding: 15px;
    border-radius: 14px;
    box-shadow: 0px 0px 10px #cbe0ff;
    margin-top: 24px;
    margin-bottom: 10px;
}
.replies-header {
    font-weight: 600;
    font-size: 140%;
    text-align: center;
}
.reply-options {
    text-align: right;
    flex: auto;
    font-weight: 600;
}
.no-replies-txt {
    font-size: 80%;
    font-weight: 500;
}
.edit-comment-txt {
    padding: 29px 0px 0px 10px;
    font-size: 120%;
    font-weight: 600;
}
.cancel-edit-button {
    text-decoration: underline;
}
.reply-options-button {
    background: white;
    padding: 8px;
    border-radius: 60px;
    color: #1e87f0;
    position: relative;
    top: 5px;
}
.reply-options-menu {
    position: absolute;
    background: white;
    padding: 15px;
    right: 40px;
    border-radius: 12px;
    width: 160px !important;
    box-shadow: 0px 0px 10px #cbe0ff;
    z-index: 1;
}
.reply-menu-items {
    border-bottom: 1px solid;
    width: -webkit-fill-available !important;
    margin-bottom: 15px !important;
}
.comment-liked {
    color: #eb3d3d;
}
.reply-divider {
    border-bottom: 1px solid white;
    margin-top: 10px;
    margin-bottom: 10px;
}

.see-more-replies-container p {
    text-align: center;
    width: max-content;
    font-weight: 600;
    margin: auto auto;
}
.replying-to-txt {
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content;
    background: #edf4ff;
    margin: 5px 0px 10px 0px !important;
    border-radius: 4px;
    padding: 0px 7px;
}

.reply-functions p {
    font-weight: 600;
    margin-left: 50px;
}
.reply-functions p span {
    padding-right: 10px;
}
.image-avatar-container {
    border: 3px solid #f79acd;
    width: 40px !important;
    height: 40px;
    overflow: hidden;
    border-radius: 37px;
}

.comment-functions span span,
.reply-functions span span {
    padding: 0px !important;
    display: inline;
}

.mention-type1 {
    color: gray;
}
.close-reply-button {
    font-weight: 600;
    text-decoration: underline;
    padding-left: 10px;
}
.mention-wrapper {
    color: gray;
}
.divider-span {
    padding-left: 40px;
    padding-right: 40px;
}
.save-image-link {
    color: #0a2137;
}
.save-image-link:hover {
    color: #0a2137;
    text-decoration: none;
}
.post-item-short-text {
    padding: 15px 0px 10px 0px;
}
.comments-disabled {
    padding-top: 15px;
}
span.hashtag-item {
    margin-right: 5px;
    padding: 3px 10px 3px 10px;
    box-shadow: 0px 0px 10px #cbe0ff;
    border-radius: 6px;
}
@keyframes favanim {
    0% {
        color: #0a2137;
        font-size: 100%;
    }
    40% {
        color: #fef88c;
        font-size: 300%;
    }
    70% {
        color: #ffffff;
        font-size: 250%;
    }
    90% {
        color: #7a8484;
        font-size: 200%;
    }
}

@media (max-width: 360px) {
    .options-menu-container {
        margin-left: 38%;
        width: 51%;
    }
}

@media (max-width: 450px) {
    .options-menu-container {
        margin-left: 40%;
        width: 51%;
    }
}

@media (max-width: 650px) {
    .options-menu-container {
        margin-left: 43%;
        width: 51%;
    }
}
@media (max-width: 768px) {
    .options-menu-container {
        margin-left: 44%;
        width: 51%;
    }
}
@media (max-width: 1024px) and (min-width: 769px) {
    .options-menu-container {
        width: 50%;
        margin-left: 16.5%;
    }
}
@media (min-width: 1025px) {
    .options-menu-container {
        width: 30%;
        margin-left: 20%;
    }
    .add-to-favourites-container {
        right: 27% !important;
    }
    .reply-options-menu {
        margin-right: 23.9%;
    }
}
@media (min-width: 1300px) {
    .options-menu-container {
        width: 30%;
        margin-left: 21%;
    }
}
@media (min-width: 1550px) {
    .options-menu-container {
        margin-left: 22%;
    }
}
@media (min-width: 1920px) {
    .options-menu-container {
        margin-left: 23%;
    }
}
</style>
