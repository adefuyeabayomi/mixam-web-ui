<template>
    <section id="course-render">
        <section v-if="noShow">
            <section class="course-render-upper">
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
                                <p
                                    class="author-details"
                                    @click="viewAuthorProfile()"
                                >
                                    Created by
                                    <span>
                                        {{ itemData.author_username }}
                                    </span>
                                </p>
                            </div>
                            <div>
                                <span class="time-of-course-publish"
                                    >Published {{ formattedTime }}</span
                                >
                            </div>
                        </div>
                    </div>
                    <div class="options-container">
                        <div
                            class="options-button-container"
                            @click="openCourseOptionsContainer()"
                        >
                            <div class="options-button">
                                <div class="dot1"></div>
                                <div class="dot1"></div>
                                <div class="dot1"></div>
                            </div>
                        </div>
                    </div>
                    <div class="course options-menu-container" v-if="imActive">
                        <div class="close-container">
                            <span
                                class="close-icon-wrapper"
                                @click="closeOptions"
                                ><i class="fas fa-times"></i
                            ></span>
                        </div>
                        <div class="options">
                            <div
                                @click="takeCourse()"
                                v-if="itemData.author !== MID"
                                class="option-item pointercursor"
                            >
                                <span>Take Course Now</span>
                            </div>
                            <div
                                v-if="itemData.author !== MID"
                                class="divider-bar"
                            ></div>
                            <div
                                @click="saveForLater()"
                                v-if="itemData.author !== MID"
                                class="option-item pointercursor"
                            >
                                <span>Save For Later</span>
                            </div>
                            <div class="divider-bar"></div>
                            <div
                                @click="shareToMyProfile()"
                                class="option-item pointercursor"
                            >
                                <span>Share to profile</span>
                            </div>
                            <div
                                v-if="itemData.coverImage !== ''"
                                class="divider-bar"
                            ></div>
                            <div
                                v-if="itemData.coverImage !== ''"
                                class="option-item pointercursor"
                            >
                                <a
                                    :href="itemData.coverImage"
                                    @click="closeOptions()"
                                    target="_blank"
                                    download="mixam-download"
                                    class="save-image-link"
                                    ><span>Save Image</span></a
                                >
                            </div>
                            <div class="divider-bar"></div>
                            <div
                                @click="copyCourseLink()"
                                class="option-item pointercursor"
                            >
                                <span>Copylink</span>
                            </div>
                            <div
                                v-if="(itemData.author == MID) & reviewAllowed"
                                class="divider-bar"
                            ></div>
                            <div
                                @click="turnOffCommenting('turn-off')"
                                v-if="(itemData.author == MID) & reviewAllowed"
                                class="option-item pointercursor"
                            >
                                <span>Turn off Commenting</span>
                            </div>
                            <div
                                v-if="(itemData.author == MID) & !reviewAllowed"
                                class="divider-bar"
                            ></div>
                            <div
                                @click="turnOffCommenting('turn-on')"
                                v-if="(itemData.author == MID) & !reviewAllowed"
                                class="option-item pointercursor"
                            >
                                <span>Turn on Commenting</span>
                            </div>
                            <div v-if="false" class="divider-bar"></div>
                            <div v-if="false" class="option-item pointercursor">
                                <span
                                    >Turn <span>On</span>/<span>Off</span>
                                    Notification</span
                                >
                            </div>
                            <div
                                v-if="itemData.author !== MID"
                                class="divider-bar"
                            ></div>
                            <div
                                v-if="itemData.author !== MID"
                                class="option-item pointercursor"
                                @click="removeFromFeed()"
                            >
                                <span>I don't want to see this</span>
                            </div>
                            <div
                                v-if="itemData.author !== MID"
                                class="divider-bar"
                            ></div>
                            <div
                                v-if="itemData.author !== MID"
                                class="option-item pointercursor"
                                @click="
                                    report({
                                        contentType: 'course',
                                        cid: itemData.cid,
                                        type: 'reporting-course',
                                    })
                                "
                            >
                                <span>Report</span>
                            </div>
                            <div
                                v-if="itemData.author == MID"
                                class="divider-bar"
                            ></div>
                            <div
                                v-if="itemData.author == MID"
                                class="option-item pointercursor"
                                @click="unpublishCourse()"
                            >
                                <span>Unpublish</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="function-and-metrics-container course-functions">
                    <div class="students-container">
                        <div>
                            <i class="fas fa-graduation-cap"></i>
                            {{ itemData.studentsCount }} Students
                        </div>
                    </div>
                    <!--id for course item-->
                    <div
                        class="reviews-container"
                        :id="'course-review-input-' + cid"
                    >
                        <div
                            class="pointercursor center-function"
                            @click="reviewClicked()"
                            :class="{
                                'animate__animated animate__heartBeat':
                                    reviewActive,
                            }"
                        >
                            <i class="fas fa-comment"></i>
                            {{ itemData.reviewsCount }}
                        </div>
                    </div>
                    <div class="shares-container">
                        <div
                            class="center-function"
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
                            class="center-function"
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
                <div class="function-buttons-container">
                    <div class="take-course-button-container">
                        <vs-button
                            @click="takeCourse()"
                            class="take-course-button"
                            style="background-color: black !important"
                            >Take Course Now
                            <i class="fas fa-external-alternate"></i
                        ></vs-button>
                    </div>
                    <div class="save-course-button-container">
                        <vs-button
                            @click="saveForLater()"
                            class="save-course-button"
                            style="background-color: #6d6308 !important"
                            >Save For Later <i class="fas fa-bookmark"></i
                        ></vs-button>
                    </div>
                </div>
            </section>
            <!--review box for the course item-->
            <div v-if="reviewBoxOpen" class="comment-render-container">
                <div class="edit-comment-txt" v-if="editingReview">
                    <p>
                        <span>Editing Review </span
                        ><span
                            class="cancel-edit-button pointercursor"
                            @click="cancelReviewEdit()"
                            >Cancel Edit
                        </span>
                    </p>
                </div>
                <p v-if="reviewAllowed">
                    <input
                        type="text"
                        class="comment-text-input"
                        v-model="review"
                        placeholder="Write your review here..."
                    /><button class="comment-send-button" @click="sendReview()">
                        <i class="fas fa-location-arrow"></i>
                    </button>
                </p>
                <p v-if="!reviewAllowed" class="reviews-disabled-text">
                    Reviews are currently disabled for this content
                </p>
                <div class="comments">
                    <p class="comments-heading">Reviews</p>
                    <p v-if="!reviewExists">No reviews yet</p>
                    <div class="comments-item-container">
                        <div
                            v-for="review in serveReviews"
                            :key="review._reviewID"
                            class="comment-item"
                            :class="{ hidden: review.CID >= showReviewsTo }"
                        >
                            <div
                                class="comment-container"
                                v-if="review.CID < showReviewsTo"
                            >
                                <div class="comment-heading">
                                    <div
                                        class="comment-user-avatar"
                                        @click="
                                            viewAuthorProfile(
                                                review.reviewedByInfo.MID
                                            )
                                        "
                                    >
                                        <div
                                            v-if="
                                                review.reviewedByInfo
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
                                                review.reviewedByInfo
                                                    .profileImageLink !== ''
                                            "
                                            class="image-avatar-container"
                                        >
                                            <img
                                                :src="
                                                    review.reviewedByInfo
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
                                                    review.reviewedByInfo.MID
                                                )
                                            "
                                        >
                                            {{ review.reviewedByInfo.username }}
                                        </p>
                                    </div>
                                </div>
                                <div class="comment-body">
                                    <p>{{ review.review }}</p>
                                </div>
                                <div class="comment-functions">
                                    <p>
                                        <span
                                            v-if="
                                                MID == review.reviewedByInfo.MID
                                            "
                                            @click="
                                                editReviewClicked(
                                                    review._reviewID,
                                                    review.review
                                                )
                                            "
                                            >Edit</span
                                        >
                                        <span
                                            v-if="
                                                MID == review.reviewedByInfo.MID
                                            "
                                            @click="
                                                deleteReview(review._reviewID)
                                            "
                                            >Delete</span
                                        >
                                        <span
                                            @click="
                                                replyClicked(
                                                    review._reviewID,
                                                    review.reviewedByInfo.MID,
                                                    review.reviewedByInfo
                                                        .username,
                                                    'replyingTheAuthor',
                                                    true,
                                                    MID
                                                )
                                            "
                                            >Reply</span
                                        >
                                        <span
                                            v-if="review.replies.length > 0"
                                            @click="
                                                openReplyBox(review._reviewID)
                                            "
                                            class="replies"
                                            >{{ review.replies.length }}
                                            <span
                                                v-if="
                                                    review.replies.length == 1
                                                "
                                                >reply</span
                                            ><span
                                                v-if="review.replies.length > 1"
                                                >replies</span
                                            ></span
                                        >
                                        <span
                                            @click="
                                                report({
                                                    reviewID: review._reviewID,
                                                    type: 'report-comment',
                                                    contentType: 'course',
                                                })
                                            "
                                            v-if="
                                                MID !==
                                                review.reviewedByInfo.MID
                                            "
                                            >Report</span
                                        >
                                        <span
                                            @click="
                                                reviewLikeClicked(
                                                    review._reviewID,
                                                    review.reviewLiked,
                                                    review.review,
                                                    review.reviewedByInfo.MID,
                                                    review.notificationID
                                                )
                                            "
                                            ><i
                                                class="fas fa-heart"
                                                :class="{
                                                    'comment-liked':
                                                        review.reviewLiked,
                                                }"
                                            ></i>
                                            <span
                                                v-if="review.likesCount !== 0"
                                            >
                                                {{ review.likesCount }}
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
                                        review._reviewID == currentReply
                                    "
                                    :id="'course-reply-input-' + cid"
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
                                                >'s review</span
                                            ></span
                                        >
                                        <span
                                            class="close-reply-button pointercursor"
                                            @click="
                                                closeReply(review._reviewID)
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
                                                        review._reviewID,
                                                        review.CID
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
                                        currentReplyBoxReview ==
                                            review._reviewID
                                    "
                                    class="replies-container"
                                >
                                    <div class="replies-header">
                                        <p>Replies</p>
                                        <p
                                            v-if="review._rCount == 0"
                                            class="no-replies-txt"
                                        >
                                            <i>No replies yet</i>
                                        </p>
                                    </div>
                                    <div
                                        class="reply-item"
                                        v-for="reply in review.replies"
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
                                                                        review._reviewID,
                                                                        review
                                                                            .reviewedByInfo
                                                                            .MID,
                                                                        review
                                                                            .reviewedByInfo
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
                                                                        review._reviewID,
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
                                                                        reviewID:
                                                                            review._reviewID,
                                                                        replyID:
                                                                            reply._replyID,
                                                                        type: 'reporting-reply',
                                                                        contentType:
                                                                            'course',
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
                                                                review._reviewID,
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
                                                                review._reviewID,
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
                                        v-if="review._rCount !== 0"
                                    >
                                        <p>
                                            <span
                                                class="pointercursor"
                                                @click="
                                                    seePreviousReplies(
                                                        review._rCount
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
                                                        review._rCount
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
                <div v-if="showSeeMoreReviews">
                    <p class="see-more-comments">
                        <vs-button
                            @click="revealMoreReviews()"
                            style="
                                width: 100% !important;
                                background-color: black !important;
                            "
                            >{{ moreReviewsCount }} More Reviews</vs-button
                        >
                    </p>
                </div>
            </div>
        </section>
        <modal
            class="share-course-modal"
            name="share-course"
            width="90%"
            :maxWidth="maxWidth"
            height="auto"
            :adaptive="true"
            :click-to-close="true"
        >
            <section class="share-container">
                <div class="share-header">Share This Course</div>
                <div>
                    <p class="sotxt">Share options</p>
                </div>
                <div class="share-options">
                    <div :title="shareLink" class="share-item facebook">
                        <a
                            @click="share('facebook', 'course')"
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
                            @click="share('whatsapp', 'course')"
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
                            @click="share('twitter', 'course')"
                            target="_blank"
                            :href="
                                'https://twitter.com/intent/tweet?text=' +
                                'Hi there, Saw this post on mixam-business.onrender.com and I wanted to share it. Check it out here&url=' +
                                shareLink +
                                '&related=@mixam_business'
                            "
                            ><i class="fab fa-twitter share-item-icon"></i
                        ></a>
                        <!--              <a target="_blank" href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-size="large" data-text="Hi there, Saw this post on mixam.com and I wanted to share it. Check it out here" data-related="@mixam_business" data-show-count="false"><i class="fab fa-twitter share-item-icon"></i></a>-->
                    </div>
                    <div class="share-item profile">
                        <span @click="share('profile', 'course')">
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
                    <div @click="copyCourseLink()" class="share-item copylink">
                        <i class="fas fa-copy share-item-icon"></i>
                    </div>
                </div>
            </section>
        </modal>
    </section>
</template>

<script>
var a = "'course-review-input-' + cid";
import { format } from "js-time-ago";

export default {
    data: function () {
        return {
            MID: JSON.parse(window.localStorage.getItem("userlogindata")).MID,
            DID: JSON.parse(window.localStorage.getItem("userlogindata")).DID,
            userAgent: this.$store.state.__userAgent,
            itemData: { title: "" },
            likeActive: false,
            liked: false,
            reviewActive: false,
            reviewBoxOpen: true,
            review: "",
            // review controls1 above
            shareActive: false,
            noShow: true,
            savedCourse: false,
            takingCourse: false,
            viewed: false,
            liked: false,
            likedDate: "",
            likeActive: false,
            formattedTime: "",
            replyActive: false,
            currentReply: "",
            reply: "",
            replyModel: "",
            pendingReplies: {},
            replyBoxActive: false,
            currentReviewReply: "",
            reviewEdit: "",
            replyEdit: "",
            currentReplyBoxReview: "",
            editingReview: false,
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
            reviewAddition: 0,
            showSeeMoreReviews: true,
            moreReviewsCount: 0,
            likedNID: "",
            reviewAllowed: false,
            showReviewsTo: 5,
            maxWidth: 480,
            shareLink: "",
        };
    },
    computed: {
        imActive() {
            return this.$store.state.activeContentItem == this.itemData.cid;
        },
        reviewExists: function () {
            if (this.itemData.reviews) {
                let sorted = [];
                this.itemData.reviews.forEach((x) => {
                    if (x) {
                        sorted.push(x);
                    }
                });
                return sorted.length !== 0;
            }
            return false;
        },
        serveReviews: function () {
            let sorted = [];
            if (this.itemData.reviews) {
                this.itemData.reviews.forEach((review) => {
                    if (review) {
                        let reviewLiked = false;
                        let notificationID;
                        if (!review.likes) {
                            review.likes = [];
                        }
                        review.likes.forEach((liked) => {
                            if (reviewLiked) return null;
                            if (liked.likedBy == this.MID) {
                                reviewLiked = true;
                                notificationID = liked.notificationID;
                            }
                        });
                        if (!review.replies) comment.replies = [];
                        let replies = [];
                        let RID = 0;
                        review.replies.forEach((reply) => {
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
                        review.replies = sortedCom;
                        review._rCount = replies.length;
                        review.reviewLiked = reviewLiked;
                        review.notificationID = notificationID;
                        sorted.push(review);
                    }
                });
                // which each comment can carry its own identifier as a number property comment.NID = 0,1,2,3
                let comStart = 0;
                let idealReviewsLength = 5;
                let comEnd = idealReviewsLength + this.reviewAddition;

                let CID = 0;
                let sortedCom = [];
                for (let count = sorted.length - 1; count >= 0; count--) {
                    sorted[count].CID = CID;
                    CID++;
                    sortedCom.push(sorted[count]);
                }
                if (
                    sortedCom.length <=
                    idealReviewsLength - 1 + this.reviewAddition
                ) {
                    this.showSeeMoreReviews = false;
                }
                console.log(
                    "sorted reviews ",
                    sortedCom.slice(comStart, comEnd)
                );
                this.moreReviewsCount = sortedCom.length - comEnd;
                return sortedCom; // type array
            }
            return sorted;
        },
        tCourse() {
            let myCourse = this.$store.state.userAccountInfo.myCourses;
            let included = false;
            if (myCourse) {
                myCourse.forEach((x) => {
                    if (included) return;
                    x.cid == this.itemData.cid ? (included = true) : false;
                });
            }
            console.log("tCourse Result below");
            if (this.takingCourse || included) {
                return true;
            }
            return false;
        },
        sCourse() {
            let savedCourses = this.$store.state.userAccountInfo.savedCourses;
            let included = false;
            if (savedCourses) {
                savedCourses.forEach((x) => {
                    if (included) return;
                    x.cid == this.itemData.cid ? (included = true) : false;
                });
            }
            if (this.savedCourse || included) {
                return true;
            }
            return false;
        },
    },
    props: {
        cid: String,
    },
    methods: {
        // course main
        fetchCourseData() {
            console.log("fetching course data from server");
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
                    this.alreadyLiked();
                    this.viewedCourse();
                    let link = `https://mixam-business.onrender.com/gu/course/?cid=${
                        this.itemData.cid
                    }&guser=${true}&author=${this.itemData.author}`;
                    this.shareLink = link;
                    this.reviewAllowed = this.itemData.reviewAllowed;
                    //console.log("course item data",this.itemData,this.cid)
                })
                .catch((err) => {
                    console.err(err.message);
                });
        },
        openCourseOptionsContainer() {
            if (this.imActive) {
                this.closeOptions();
                return;
            }
            this.$store.commit("updateACI", this.itemData.cid);
        },
        closeOptions() {
            this.$store.commit("updateACI", "noneActive");
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
                        }
                    });
                });
            }
            if (allWhoLiked.includes(this.MID)) {
                this.updateLiked();
            }
        },
        report: function (info) {
            console.log("report reply clicked type ", "information ", info);
            info.cid = this.cid;
            this.$emit("report", info);

            this.closeOptions();
        },
        goToFullCourse(cid) {
            console.log("going to full course PID ", cid);
            this.$router.push({ path: "/full-course", query: { cid } });
        },

        // option functionalities.
        copyCourseLink() {
            // look for the appropraite code.
            this.closeOptions();
            navigator.clipboard.writeText(this.shareLink);
            this.$vs.notify({
                title: "Copied to clipboard",
                color: "#98c2ff",
            });

            this.$modal.hide("share-course");
            console.log("the link : ", this.shareLink);
        },
        turnOffCommenting(action) {
            this.closeOptions();
            console.log("comment turn off operation");
            let url = "http://localhost/toggle-content-commenting/";
            window.axios
                .get(url, {
                    params: {
                        MID: this.MID,
                        DID: this.DID,
                        cid: this.itemData.cid,
                        contentType: "course",
                        action,
                    },
                })
                .then((response) => {
                    if (response.data.status == "success") {
                        this.$vs.notify({
                            title: `Successfully ${action} commenting`,
                            color: "#98c2ff",
                        });
                        this.reviewAllowed = !this.reviewAllowed;
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
        unpublishCourse() {
            this.closeOptions();
            console.log("delete post operation");
            let url = "http://localhost/delete-content/";
            window.axios
                .get(url, {
                    params: {
                        MID: this.MID,
                        DID: this.DID,
                        cid: this.itemData.cid,
                        contentType: "course",
                        unpublish: true,
                    },
                })
                .then((response) => {
                    if (response.data.status == "success") {
                        this.$vs.notify({
                            title: `Successfully Unpublished Course`,
                            color: "#98c2ff",
                        });
                        this.deleted = true;
                        setTimeout(() => {
                            this.hide = true;
                        }, 1500);
                    } else {
                        this.$vs.notify({
                            title: "Unable to Unpublished Course due to technical issues.",
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
        removeFromFeed: function () {
            this.closeOptions();
            console.log("remove from feed operation");
            let url = "http://localhost/mute-content/";
            window.axios
                .get(url, {
                    params: {
                        MID: this.MID,
                        DID: this.DID,
                        cid: this.itemData.cid,
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
        revealMoreReviews() {
            console.log("revealing more reviewss");
            console.log("this.showCommentsTo", this.showReviewsTo);
            this.showReviewsTo += 1;
            if (this.serveReviews.length > this.showReviewsTo) {
                // update the morecommentscount
                this.moreReviewsCount =
                    this.serveReviews.length - this.showReviewsTo;
            } else {
                // update the show more comment
                this.showSeeMoreReviews = false;
            }
        },

        // operation for updating items in view.
        itemInView: function (e) {
            if (e.percentInView == 1) {
                //console.log("item in view", e)
                this.view();
            }
        },
        viewedCourse: function () {
            let viewedThisCourse = false;
            this.itemData.viewedBy.forEach((x) => {
                if (viewedThisCourse) return;
                x.user == this.MID ? (viewedThisCourse = true) : false;
            });
            this.viewed = viewedThisCourse;
        },
        view: function () {
            if (this.viewed) return;
            if (!this.itemData.viewedBy) return;
            this.viewed = true;
            let url = "http://localhost/update-item-view/";
            window.axios
                .get(url, {
                    params: {
                        DID: this.DID,
                        MID: this.MID,
                        author: this.itemData.author,
                        author: this.itemData.author,
                        cid: this.itemData.cid,
                        userAgent: this.userAgent,
                        contentType: "course",
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
                    console.error(
                        "response.data add course view",
                        error.message
                    );
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

        // course - reg operations
        takeCourse() {
            this.closeOptions();
            if (this.tCourse) {
                console.log("t course", this.tCourse);
                return;
            }
            let url = "http://localhost/take-course/";
            window.axios
                .get(url, {
                    params: {
                        DID: this.DID,
                        MID: this.MID,
                        author: this.itemData.author,
                        userAgent: this.userAgent,
                        cid: this.itemData.cid,
                    },
                })
                .then((response) => {
                    if (response.data.status == "success") {
                        console.log("added to my courses dear");
                        console.log(response.data);
                        this.takingCourse = true;
                        this.$vs.notify({
                            title: "Successfully added to your courses",
                            color: "#98c2ff",
                        });
                    } else {
                        this.$vs.notify({
                            title: "Unable to add course to your courses",
                            color: "#98c2ff",
                        });
                        console.log(
                            "unable to add the course now due to server issues"
                        );
                    }
                })
                .catch((err) => {
                    this.$vs.notify({
                        title: "Check your network connection",
                        color: "#98c2ff",
                    });
                    console.error(
                        "TAKE COURSE OPEREATION ERROR " + err.message
                    );
                });
        },
        saveForLater() {
            this.closeOptions();
            if (this.sCourse) {
                console.log("s course", this.sCourse);
                return;
            }
            let url = "http://localhost/savecourseforlater/";
            window.axios
                .get(url, {
                    params: {
                        DID: this.DID,
                        MID: this.MID,
                        author: this.itemData.author,
                        userAgent: this.userAgent,
                        cid: this.itemData.cid,
                    },
                })
                .then((response) => {
                    if (response.data.status == "success") {
                        console.log("saved course");
                        console.log(response.data);
                        this.savedCourse = true;
                        this.$vs.notify({
                            title: "Successfully saved course",
                            color: "#98c2ff",
                        });
                    } else {
                        this.$vs.notify({
                            title: "Unable to save course now due to technical issues. We are working to fix it and get you up and running as soon as possible.",
                            color: "#98c2ff",
                        });
                        console.log(
                            "unable to save course now due to server issues"
                        );
                    }
                })
                .catch((err) => {
                    this.$vs.notify({
                        title: "Check your network connection",
                        color: "#98c2ff",
                    });
                    console.error(
                        "SAVE COURSE OPEREATION ERROR " + err.message
                    );
                });
        },

        // like operations

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
            let url = "http://localhost/like/";
            window.axios
                .get(url, {
                    params: {
                        DID: this.DID,
                        MID: this.MID,
                        author: this.itemData.author,
                        author: this.itemData.author,
                        cid: this.itemData.cid,
                        action: value,
                        userAgent: this.userAgent,
                        contentType: "course",
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
            let url = "http://localhost/unlike/";
            window.axios
                .get(url, {
                    params: {
                        DID: this.DID,
                        MID: this.MID,
                        author: this.itemData.author,
                        cid: this.itemData.cid,
                        action: value,
                        userAgent: this.userAgent,
                        contentType: "course",
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

        // course comment and commenting operations
        reviewClicked() {
            this.reviewActive = true;
            setTimeout(() => {
                this.reviewActive = false;
            }, 1500);
        },
        sendReview: function () {
            if (this.editingReview) {
                this.editReview();
                console.log("sending review edit request");
                return;
            }
            let review = this.review;
            let url = "http://localhost/comment/";
            window.axios
                .get(url, {
                    params: {
                        DID: this.DID,
                        MID: this.MID,
                        author: this.itemData.author,
                        author: this.itemData.author,
                        cid: this.itemData.cid,
                        review,
                        contentType: "course",
                        userAgent: this.userAgent,
                    },
                })
                .then((response) => {
                    if (response.data.status == "success") {
                        console.log(
                            "comment published successfully",
                            response.data
                        );
                        this.review = "";
                        this.reviewAddition = this.reviewAddition + 1;
                        this.itemData.reviews =
                            response.data.contentData.reviews;
                        this.itemData.reviewsCount =
                            this.itemData.reviewsCount + 1;
                        console.log(this.itemData.reviews);
                    } else {
                        console.log("unable to publish comment");
                    }
                })
                .catch((error) => {
                    console.error(
                        "ERROR MESSAGE unable to publish review",
                        error.message
                    );
                });
        },
        deleteReview: function (reviewID) {
            console.log("delete review Clicked", reviewID);
            let url = "http://localhost/deletecomment/";
            window.axios
                .get(url, {
                    params: {
                        DID: this.DID,
                        MID: this.MID,
                        author: this.itemData.author,
                        author: this.itemData.author,
                        cid: this.itemData.cid,
                        contentType: "course",
                        userAgent: this.userAgent,
                        reviewID,
                    },
                })
                .then((response) => {
                    if (response.data.status == "success") {
                        console.log("deleteSuccess");
                        this.itemData.reviewsCount =
                            this.itemData.reviewsCount - 1;
                        this.itemData.reviews =
                            response.data.contentData.reviews;
                    } else {
                        console.log("delete operation unable to complete");
                    }
                });
        },
        editReview: function () {
            // the request redirect was implemented in the method sendComment check for reference
            let reviewID = this.currentEditID;
            console.log("edit review clicked ", reviewID);
            let url = "http://localhost/editcomment/";
            window.axios
                .get(url, {
                    params: {
                        DID: this.DID,
                        MID: this.MID,
                        author: this.itemData.author,
                        author: this.itemData.author,
                        cid: this.itemData.cid,
                        contentType: "course",
                        userAgent: this.userAgent,
                        reviewID,
                        review: this.review,
                    },
                })
                .then((response) => {
                    if (response.data.status == "success") {
                        console.log(
                            "success, comment-edit-response-data",
                            response.data
                        );
                        this.review = "";
                        this.editingReview = false;
                        this.itemData.reviews =
                            response.data.contentData.reviews;
                    } else {
                        console.log(
                            "unable to complete the comment edit operation for the blah blah",
                            response.data
                        );
                    }
                })
                .catch((err) => {
                    console.error(
                        "ERROR OCCURED IN SENDING EDIT COMMENT ",
                        err.message
                    );
                });
        },
        reviewLikeClicked(
            reviewID,
            reviewLiked,
            review,
            author,
            notificationID
        ) {
            let details = review.split(" ").slice(0, 9).join(" ");
            console.log(
                "review like clicked",
                reviewID,
                reviewLiked,
                author,
                notificationID,
                details
            );
            if (!reviewLiked) {
                this.sendReviewLikedRequest(reviewID, "like", details, author);
            } else {
                this.sendReviewLikedRequest(
                    reviewID,
                    "unlike",
                    "",
                    author,
                    notificationID
                );
            }
        },
        sendReviewLikedRequest(
            reviewID,
            action,
            details,
            author,
            notificationID
        ) {
            let url = "http://localhost/updatecommentlikes/";
            window.axios
                .get(url, {
                    params: {
                        DID: this.DID,
                        MID: this.MID,
                        author,
                        cid: this.itemData.cid,
                        userAgent: this.userAgent,
                        action,
                        contentType: "course",
                        reviewID,
                        notificationID,
                        details,
                    },
                })
                .then((response) => {
                    if (response.data.status == "success") {
                        console.log(action, "ReviewSuccess");
                        this.itemData.reviews =
                            response.data.contentData.reviews;
                    } else {
                        console.log("review like operation unable to complete");
                    }
                })
                .catch((err) => {
                    console.error(err.message);
                });
        },
        cancelReviewEdit() {
            this.editingReview = false;
            this.review = "";
        },
        editReviewClicked(reviewID, review) {
            console.log(
                "edit review clicked reviewID : ",
                reviewID,
                "the review",
                review
            );
            this.scrollToReviewInput();
            this.review = review;
            this.editingReview = true;
            this.currentEditID = reviewID;
        },
        scrollToReviewInput() {
            let id = "#course-review-input-" + this.cid;
            let options = {
                offset: -100,
            };
            setTimeout(() => {
                this.$scrollTo(id, 750, options);
            }, 100);
        },

        // comment REPLY operations.
        replyClicked(
            reviewID,
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
            };
            console.log("mention information", this.mentionInformation);
            if (this.replyActive) {
                this.pendingReplies[this.currentReply] = this.reply;
            }
            if (reviewID == this.currentReply && this.replyActive && !openVal) {
                this.replyActive = false;
                return;
            }
            this.replyActive = true;
            if (!this.pendingReplies[reviewID]) {
                this.reply = "";
            } else {
                this.reply = this.pendingReplies[reviewID];
            }
            this.currentReply = reviewID;
            if (type == "replyingAReply") {
                this.scrollToReplyInput();
            }
            if (this.editingReply) {
                this.reply = reply;
                console.log("this.reply", this.reply);
            }
        },
        sendReply: function (reviewID, commentCID) {
            if (this.editingReply) {
                this.editReply(reviewID, this.editReplyID, this.reply);
                return;
            }
            let url = "http://localhost/reply/";
            let cid = this.itemData.cid;
            console.log("req cid", cid, this.mentionInformation);
            window.axios
                .get(url, {
                    params: {
                        DID: this.DID,
                        MID: this.MID,
                        author: this.itemData.author,
                        author: this.itemData.author,
                        userAgent: this.userAgent,
                        cid,
                        reply: this.reply,
                        reviewID,
                        contentType: "course",
                        mentionInformation: this.mentionInformation,
                    },
                })
                .then((response) => {
                    if (response.data.status == "success") {
                        console.log("send reply response", response.data);
                        this.itemData.reviews =
                            response.data.contentData.reviews;
                        // using the information gathered from the reply, when a reply is published, the reply should come up on the screen.
                        this.pendingReplies[reviewID] = "";
                        this.reply = "";
                        this.replyActive = false;
                        this.replyBoxActive = true;
                        this.currentReplyBoxReview = reviewID;
                        this.restoreRepliesThrottingDefault();
                        // debug this section
                    } else {
                        console.log("unable to add reply");
                    }
                });
        },
        openReplyBox(reviewID) {
            console.log(this.replyBoxActive);
            if (this.replyBoxActive && this.currentReplyBoxReview == reviewID) {
                this.replyBoxActive = false;
            } else {
                this.currentReplyBoxReview = reviewID;
                this.replyBoxActive = true;
            }
            this.restoreRepliesThrottingDefault();
        },
        closeReply(reviewID) {
            this.replyActive = false;
            this.editingReply = false;
            this.reply = "";
            this.pendingReplies[reviewID] = "";
            this.editReplyID = "";
        },
        replyLikeClicked(
            reviewID,
            replyID,
            replyLiked,
            reply,
            author,
            notificationID,
            replyLikeID
        ) {
            let details = reply.split(" ").slice(0, 9).join(" ");
            if (!replyLiked) {
                this.sendReplyLikeRequest(
                    reviewID,
                    replyID,
                    "like",
                    details,
                    author,
                    notificationID,
                    replyLikeID
                );
            } else {
                this.sendReplyLikeRequest(
                    reviewID,
                    replyID,
                    "unlike",
                    "",
                    author,
                    notificationID
                );
            }
        },
        sendReplyLikeRequest(
            reviewID,
            replyID,
            action,
            details,
            author,
            notificationID,
            replyLikeID
        ) {
            let url = "http://localhost/updatereplylikes/";
            window.axios
                .get(url, {
                    params: {
                        DID: this.DID,
                        MID: this.MID,
                        author,
                        cid: this.itemData.cid,
                        userAgent: this.userAgent,
                        action,
                        contentType: "course",
                        reviewID,
                        replyID,
                        notificationID,
                        details,
                        replyLikeID,
                    },
                })
                .then((response) => {
                    if (response.data.status == "success") {
                        console.log(
                            action,
                            "ReplySuccess",
                            response.data.contentData.reviews
                        );
                        this.itemData.reviews =
                            response.data.contentData.reviews;

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
            reviewID,
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
                reviewID,
                author,
                username,
                type,
                openVal,
                replier,
                reply
            );
        },
        editReply: function (reviewID, replyID, reply) {
            console.log(
                "editing reply",
                reviewID,
                "replyID",
                replyID,
                "reply",
                reply
            );
            let url = "http://localhost/editreply/";
            window.axios
                .get(url, {
                    params: {
                        DID: this.DID,
                        MID: this.MID,
                        author: this.itemData.author,
                        author: this.itemData.author,
                        cid: this.itemData.cid,
                        contentType: "course",
                        userAgent: this.userAgent,
                        reviewID,
                        replyID,
                        reply,
                    },
                })
                .then((response) => {
                    if (response.data.status == "success") {
                        this.itemData.reviews =
                            response.data.contentData.reviews;
                        this.closeReply(reviewID);
                        console.log(
                            "edit reply response",
                            response.data.contentData.reviews
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
        deleteReply: function (reviewID, replyID) {
            console.log("edit reply", reviewID, replyID);
            let url = "http://localhost/deletereply/";
            window.axios
                .get(url, {
                    params: {
                        DID: this.DID,
                        MID: this.MID,
                        author: this.itemData.author,
                        author: this.itemData.author,
                        cid: this.itemData.cid,
                        contentType: "course",
                        userAgent: this.userAgent,
                        reviewID,
                        replyID,
                    },
                })
                .then((response) => {
                    if (response.data.status == "success") {
                        console.log(
                            "edit reply response",
                            response.data.contentData.reviews
                        );
                        this.itemData.reviews =
                            response.data.contentData.reviews;
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
            let id = "#course-reply-input-" + this.cid;

            let options = {
                offset: -100,
            };
            setTimeout(() => {
                this.$scrollTo(id, 750, options);
            }, 100);
        },
        shareClicked() {
            setTimeout(() => {
                this.$modal.show("share-course");
                this.$store.commit("updatesharelink", this.shareLink);
            });
            this.shareActive = true;
            setTimeout(() => {
                this.shareActive = false;
            }, 1500);
        },
        shareToMyProfile() {
            this.share("profile", "course");
            let url = "http://localhost/share-to-profile/";
            console.log("sharing post to profile");
            window.axios
                .get(url, {
                    params: {
                        MID: this.MID,
                        DID: this.DID,
                        cid: this.itemData.cid,
                    },
                })
                .then((response) => {
                    this.$store.commit("updateACI", "");
                    if (response.data.status == "success") {
                        this.$vs.notify({
                            title: "Succesfully shared course to your profile",
                            color: "#98c2ff",
                        });
                    } else {
                        this.$vs.notify({
                            title: "Unable to shared course to your profile",
                            color: "#98c2ff",
                        });
                    }
                })
                .catch((err) => {
                    this.$store.commit("updateACI", "");
                    this.$vs.notify({
                        title: "Unable to shared course to your profile",
                        color: "#98c2ff",
                    });
                    console.error(err.message);
                });
        },
        share(to, contentType) {
            let url = "http://localhost/share/";
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
                        this.$modal.hide("share-course");
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
        if (this.cid == undefined) {
            this.noShow = false;
        } else {
            this.fetchCourseData();
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
                if (this.direct && this.currentReplyMenu !== "") {
                    this.openReplyMenu("");
                    console.log("here to close with global scroll");
                }
            }, 100);
        });
    },
    components: {},
};
</script>

<style lang="scss">
#course-render {
    padding: 8px;
    padding-bottom: 40px;
}
.course-render-upper {
    padding: 8px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px #cbe0ff;
}
#course-render .reviews-container div,
#course-render .students-container div {
    padding: 3px 10px 3px 10px;
    box-shadow: 0px 0px 6px #98b6c3;
    border-radius: 10px;
    width: max-content;
}
.take-course-button-container {
    padding-right: 5px;
}
.save-course-button-container {
    padding-left: 5px;
}
</style>
