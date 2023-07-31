<template>
    <section id="comment-item">
        <div>
            <div class="comment-heading">
                <div
                    class="comment-user-avatar"
                    @click="viewAuthorProfile(comment.commentedByInfo.MID)"
                >
                    <div
                        v-if="comment.commentedByInfo.profileImageLink == ''"
                        class="no-image-comment-user"
                    >
                        <div><i class="fas fa-user"></i></div>
                    </div>
                    <div
                        v-if="comment.commentedByInfo.profileImageLink !== ''"
                        class="image-avatar-container"
                    >
                        <img
                            :src="comment.commentedByInfo.profileImageLink"
                            class="user-avartar-image"
                        />
                    </div>
                </div>
                <div class="comment-username">
                    <p @click="viewAuthorProfile(comment.commentedByInfo.MID)">
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
                                'comment-liked': comment.commentLiked,
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
                v-if="replyActive && comment._commentID == currentReply"
                :id="'comment-reply-input-' + pid"
            >
                <p class="replying-to-txt">
                    Replying
                    <span class="mention-type1"
                        >@{{ mentionInformation.username
                        }}<span
                            v-if="
                                mentionInformation.type == 'replyingTheAuthor'
                            "
                            >'s comment</span
                        ></span
                    >
                    <span
                        class="close-reply-button pointercursor"
                        @click="closeReply(comment._commentID)"
                        ><span v-if="!editingReply">Cancel Reply</span
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
                            @click="sendReply(comment._commentID, comment.CID)"
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
                    <p v-if="comment._rCount == 0" class="no-replies-txt">
                        <i>No replies yet</i>
                    </p>
                </div>
                <div
                    class="reply-item"
                    v-for="reply in comment.replies"
                    :key="reply._replyID"
                >
                    <div v-if="reply.RID >= replyStart && reply.RID < replyEnd">
                        <div class="comment-heading">
                            <div
                                class="comment-user-avatar"
                                @click="viewAuthorProfile(reply.replyInfo.user)"
                            >
                                <div
                                    v-if="
                                        reply.replyInfo.profileImageLink == ''
                                    "
                                    class="no-image-comment-user"
                                >
                                    <div class="for-reply">
                                        <i class="fas fa-user"></i>
                                    </div>
                                </div>
                                <div
                                    v-if="
                                        reply.replyInfo.profileImageLink !== ''
                                    "
                                    class="image-avatar-container"
                                >
                                    <img
                                        :src="reply.replyInfo.profileImageLink"
                                        class="user-avartar-image"
                                    />
                                </div>
                            </div>
                            <div class="comment-username">
                                <p
                                    @click="
                                        viewAuthorProfile(reply.replyInfo.user)
                                    "
                                >
                                    {{ reply.replyInfo.username }}
                                </p>
                            </div>
                            <div class="reply-options">
                                <span
                                    class="reply-options-button pointercursor"
                                    @click="openReplyMenu(reply._replyID)"
                                >
                                    <i class="fas fa-ellipsis-v"></i>
                                </span>
                                <div
                                    class="reply-options-menu"
                                    v-if="currentReplyMenu === reply._replyID"
                                >
                                    <div
                                        v-if="MID == reply.replyInfo.user"
                                        class="reply-menu-items"
                                    >
                                        <p
                                            class="dropdown-item pointercursor"
                                            @click="
                                                editReplyClicked(
                                                    comment._commentID,
                                                    comment.commentedByInfo.MID,
                                                    comment.commentedByInfo
                                                        .username,
                                                    'replyingAReply',
                                                    true,
                                                    reply.replyInfo.user,
                                                    reply.reply,
                                                    reply._replyID
                                                )
                                            "
                                        >
                                            Edit
                                        </p>
                                    </div>
                                    <div
                                        v-if="MID == reply.replyInfo.user"
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
                                        v-if="MID !== reply.replyInfo.user"
                                    >
                                        <p
                                            class="dropdown-item pointercursor"
                                            @click="
                                                report({
                                                    commentID:
                                                        comment._commentID,
                                                    replyID: reply._replyID,
                                                    type: 'reporting-reply',
                                                    contentType: 'post',
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
                                        reply.mentionInformation.replier !==
                                        reply.mentionInformation.user
                                    "
                                    >@{{
                                        reply.mentionInformation.username
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
                                            reply.replyInfo.username,
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
                                            'comment-liked': reply.replyLiked,
                                        }"
                                    ></i>
                                    <span v-if="reply.likesCount !== 0">
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
                            @click="seePreviousReplies(comment._rCount)"
                            ><i class="fas fa-arrow-left"></i> Previous
                            Replies</span
                        >
                        <span class="divider-span"></span>
                        <span
                            class="pointercursor"
                            @click="seeNextReplies(comment._rCount)"
                            >Next Replies <i class="fas fa-arrow-right"></i
                        ></span>
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    computed: {
        updateInfo: function () {
            let updated = this.$store.state.userBase[this.reply.replyInfo.user];
            return updated;
        },
    },
    props: {
        comment: Object,
        replyBoxActive: boolean,
    },
};
</script>

<style lang="scss"></style>
