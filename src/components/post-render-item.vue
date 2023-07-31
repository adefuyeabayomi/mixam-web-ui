<template>
    <section :id="'post-render-' + pid" class="post-render">
        <section v-if="!hide" id="post_render_item">
            <section class="post-item-distinct">
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
                        <div
                            v-if="itemData.author !== MID"
                            class="following-container"
                        >
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
                        <div
                            v-if="itemData.imageurl !== ''"
                            class="divider-bar"
                        ></div>
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
                        <div
                            class="option-item pointercursor"
                            @click="copyPostLink()"
                        >
                            <span>Copylink</span>
                        </div>
                        <div
                            class="divider-bar"
                            v-if="itemData.author == MID && commentAllowed"
                        ></div>
                        <div
                            class="option-item pointercursor"
                            v-if="itemData.author == MID && commentAllowed"
                            @click="turnOffCommenting('turn-off')"
                        >
                            <span>Turn off Commenting</span>
                        </div>
                        <div
                            class="divider-bar"
                            v-if="itemData.author == MID && !commentAllowed"
                        ></div>
                        <div
                            class="option-item pointercursor"
                            v-if="itemData.author == MID && !commentAllowed"
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
                        <div
                            class="divider-bar"
                            v-if="itemData.author !== MID"
                        ></div>
                        <div
                            class="option-item pointercursor"
                            @click="removeFromFeed()"
                            v-if="itemData.author !== MID"
                        >
                            <span>Don't want to see this</span>
                        </div>
                        <div
                            class="divider-bar"
                            v-if="itemData.author !== MID"
                        ></div>
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
                        <div
                            class="divider-bar"
                            v-if="itemData.author == MID"
                        ></div>
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
                        :class="{
                            'animate-addtofavourite': addToFavouriteActive,
                        }"
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
                    </p>
                </div>
                <div
                    :id="'post-comment-input-' + pid"
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
                                'animate__animated animate__heartBeat':
                                    shareActive,
                            }"
                        >
                            <i class="fas fa-share"></i>
                            {{ itemData.shareCount }}
                        </div>
                    </div>
                    <div class="likes-container">
                        <div
                            @click="likeClicked()"
                            :class="{
                                'animate__animated animate__heartBeat':
                                    likeActive,
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
                <div class="liked-notif" v-if="liked">
                    <p>
                        <i>You liked this post.</i>
                    </p>
                </div>
            </section>

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
                <p class="comments-disabled" v-if="!commentAllowed">
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
                                                    contentType: 'post',
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
            class="share-post-modal"
            name="share-post"
            width="90%"
            :maxWidth="maxWidth"
            height="auto"
            :adaptive="true"
            :click-to-close="true"
        >
            <section class="share-container">
                <div class="share-header">Share This Post</div>
                <div>
                    <p class="sotxt">Share options</p>
                </div>
                <div class="share-options">
                    <div :title="shareLink" class="share-item facebook">
                        <a
                            @click="share('facebook', 'post')"
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
                            @click="share('whatsapp', 'post')"
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
                            @click="share('twitter', 'post')"
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
                        <span @click="share('profile', 'post')">
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
                    <div @click="copyPostLink()" class="share-item copylink">
                        <i class="fas fa-copy share-item-icon"></i>
                    </div>
                </div>
            </section>
        </modal>
    </section>
</template>

<script>
import { format } from "js-time-ago";
// this section opens comments by default, renders the whole post and gives all the same functionalities but unlike when in a restricted space, this post rendered here is free to do any how.
export default {
    data: function () {
        return {
            itemData: { author: "", pid: "" },
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
            likedNID: "",
            commentAllowed: false,
            deleted: false,
            hide: false,
            shareLink: "",
            showCommentsTo: 10,
            maxWidth: 480,
        };
    },
    computed: {
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
        postBody: function () {
            return this.itemData.postbody;
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
                        this.commentAllowed = this.itemData.commentAllowed;
                        let link = `${this.$store.state.apiServer}/gu/post/?pid=${
                            this.itemData.pid
                        }&guser=${true}&author=${this.itemData.author}`;
                        this.shareLink = link;
                        console.log("link", link);
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
            this.$modal.hide("share-post");
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
                // console.log("item in view", e)
                this.view();
            }
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
                        this.$modal.hide("share-post");
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
        this.fetchPostData();
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
    },
};
</script>

<style lang="scss">
.post-render {
    padding: 15px;
}
#post_render_item {
    padding-bottom: 50px;
}
.post-item-distinct {
    padding: 8px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px #cbe0ff;
}
</style>
