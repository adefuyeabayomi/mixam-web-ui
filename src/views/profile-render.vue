<template>
  <section id="profile-render-page">
    <div class="profile-render-header">
      <section class="pr-items-container">
        <div class="pr-img-box-upper">
          <div
            class="pr-image-container"
            :class="{ avatarcon: accountInfo.profileImageLink == '' }"
          >
            <vs-avatar
              color="#000000"
              v-if="accountInfo.profileImageLink == ''"
              size="200px"
              class="pr-vector-ni"
              :text="accountInfo.username"
            ></vs-avatar>
            <img
              v-if="accountInfo.profileImageLink !== ''"
              class="pr-realimg"
              :src="imgLink"
            />
          </div>
        </div>
        <div>
          <div class="pr-contents-container">
            <p class="prh-name">{{ accountInfo.username }}</p>
            <p class="prh-divider"></p>
            <p class="prh-what-you-do">{{ accountInfo.about }}</p>
            <p class="prh-website">
              <a>{{ accountInfo.website }}</a>
            </p>
          </div>
        </div>
      </section>
    </div>
    <section class="details-next">
      <div>
        <p class="prd-location">
          <i class="fas fa-map-marker" v-if="accountInfo.location"></i
          >{{ accountInfo.location }}
        </p>
        <p class="prd-employment">
          <i class="fas fa-business-time"></i>
          {{ accountInfo.employment_status }}
        </p>
        <p class="prd-follow pointercursor" @click="openFollowModal()">
          {{ userFollowers.length }} followers <strong>*</strong>
          {{ userFollowing.length }} following
        </p>
      </div>
      <div class="my-profile-following-modal" v-if="myProfile">
        <modal
          name="follow-modal"
          :adaptive="true"
          height="auto"
          :max-width="maxWidth"
          width="90%"
        >
          <div class="start-chat-main">
            <div class="scm-header">
              <p>Following</p>
            </div>
            <div class="scm-content">
              <p v-if="userFollowing.length == 0">
                You are not following anyone
              </p>
              <div
                class="scm-user-container"
                v-for="user in userFollowing"
                :key="user.user"
              >
                <div class="scm-user-avater">
                  <vs-avatar
                    v-if="
                      $store.state.userBase[user.user].profileImageLink == ''
                    "
                    size="45px"
                    :text="$store.state.userBase[user.user].username"
                  />
                  <vs-avatar
                    v-if="
                      $store.state.userBase[user.user].profileImageLink !== ''
                    "
                    size="45px"
                    :src="$store.state.userBase[user.user].profileImageLink"
                  />
                </div>
                <div class="scm-username">
                  {{ $store.state.userBase[user.user].username }}
                </div>
                <div class="scm-send-message-container">
                  <vs-button
                    color="#1e87f0"
                    type="filled"
                    @click="goToChat(user.user, user.username, user.imgLink)"
                    >Message</vs-button
                  >
                </div>
              </div>
            </div>
            <div class="scm-header">
              <p>Followers</p>
            </div>
            <div class="scm-content">
              <p v-if="userFollowers.length == 0">
                You do not have any followers yet.
              </p>
              <div
                class="scm-user-container"
                v-for="user in userFollowers"
                :key="user.user"
              >
                <div class="scm-user-avater">
                  <vs-avatar
                    v-if="
                      $store.state.userBase[user.user].profileImageLink == ''
                    "
                    size="45px"
                    :text="$store.state.userBase[user.user].username"
                  />
                  <vs-avatar
                    v-if="
                      $store.state.userBase[user.user].profileImageLink !== ''
                    "
                    size="45px"
                    :src="$store.state.userBase[user.user].profileImageLink"
                  />
                </div>
                <div class="scm-username">
                  {{ $store.state.userBase[user.user].username }}
                </div>
                <div class="scm-send-message-container">
                  <vs-button
                    color="#1e87f0"
                    type="filled"
                    @click="goToChat(user.user, user.username, user.imgLink)"
                    >Message</vs-button
                  >
                </div>
              </div>
            </div>
          </div>
        </modal>
      </div>
      <div class="user-profile-following-modal" v-else>
        <modal
          name="follow-modal"
          :adaptive="true"
          height="auto"
          :max-width="maxWidth"
          width="90%"
        >
          <div class="start-chat-main">
            <div class="scm-header">
              <p>Following</p>
            </div>
            <div class="scm-content">
              <p v-if="userFollowing.length == 0">
                You are not following anyone
              </p>
              <div
                class="scm-user-container"
                v-for="user in userFollowing"
                :key="user.user"
              >
                <div class="scm-user-avater">
                  <vs-avatar
                    color="dark"
                    v-if="getImg(user.user) == ''"
                    size="45px"
                    :text="getUsername(user.user)"
                  />
                  <vs-avatar
                    v-if="getImg(user.user) !== ''"
                    size="45px"
                    :src="getImg(user.user)"
                  />
                </div>
                <div class="scm-username">
                  {{ getUsername(user.user) }}
                </div>
                <div class="scm-send-message-container">
                  <vs-button
                    color="#1e87f0"
                    type="filled"
                    @click="
                      goToChat(
                        user.user,
                        getUsername(user.user),
                        getImg(user.user)
                      )
                    "
                    >Message</vs-button
                  >
                </div>
              </div>
            </div>
            <div class="scm-header">
              <p>Followers</p>
            </div>
            <div class="scm-content">
              <p v-if="userFollowers.length == 0">
                You do not have any followers yet.
              </p>
              <div
                class="scm-user-container"
                v-for="user in userFollowers"
                :key="user.user"
              >
                <div class="scm-user-avater">
                  <vs-avatar
                    color="dark"
                    v-if="getImg(user.user) == ''"
                    size="45px"
                    :text="getUsername(user.user)"
                  />
                  <vs-avatar
                    v-if="getImg(user.user) !== ''"
                    size="45px"
                    :src="getImg(user.user)"
                  />
                </div>
                <div class="scm-username">
                  {{ getUsername(user.user) }}
                </div>
                <div class="scm-send-message-container">
                  <vs-button
                    color="#1e87f0"
                    type="filled"
                    @click="
                      goToChat(
                        user.user,
                        getUsername(user.user),
                        getImg(user.user)
                      )
                    "
                    >Message</vs-button
                  >
                </div>
              </div>
            </div>
          </div>
        </modal>
      </div>
    </section>
    <section class="profile-action-buttons" v-if="!myProfile">
      <div>
        <button
          class="pab-followbtn"
          v-if="!checkIfFollowing"
          @click="followUser()"
        >
          Follow <i class="fas fa-user-plus"></i>
        </button>
        <button
          class="pab-followbtn following"
          v-if="checkIfFollowing"
          @click="unfollowUser()"
        >
          Following <i class="fas fa-user-plus"></i>
        </button>
      </div>
      <div>
        <button
          @click="
            goToChat(
              accountInfo.__mid,
              accountInfo.username,
              accountInfo.profileImageLink
            )
          "
          class="pab-msgbtn"
        >
          Message <i class="fas fa-envelope"></i>
        </button>
      </div>
    </section>
    <section class="edit-button-container" v-if="myProfile">
      <button @click="goToEditProfile()">
        Edit Profile <i class="fas fa-pen"></i>
      </button>
    </section>
    <section class="profile-main-section interest">
      <div class="pms-header-container">
        <p>Interests</p>
      </div>
      <div class="pms-contents">
        <div
          class="pms-content-item-container interest"
          v-for="interest in accountInfo.interests"
          :key="interest"
        >
          {{ interest }}
        </div>
      </div>
    </section>
    <section class="profile-main-section contributions">
      <div class="pms-header-container">
        <p>Recent Contributions</p>
      </div>
      <div class="pms-contents">
        <div v-if="contributions.length == 0">
          <p>No contribtions yet!</p>
        </div>
        <contribution-item
          v-for="contribution in contributions"
          :key="contribution.created"
          v-bind="contribution"
        ></contribution-item>
      </div>
    </section>
    <section class="profile-main-section saved" v-if="myProfile">
      <div class="pms-header-container">
        <p>Saved To My Favourites</p>
      </div>
      <div class="saved-item-container">
        <div v-if="favourites.length == 0">
          <p>No saved item yet!</p>
        </div>
        <div v-for="saved in favourites" :key="saved.created">
          <div v-if="saved.aid">
            <article-item :aid="saved.aid"></article-item>
          </div>
          <div v-if="saved.pid">
            <post-item :pid="saved.pid"></post-item>
          </div>
          <div v-if="saved.cid">
            <courses-item :cid="saved.cid"></courses-item>
          </div>
        </div>
      </div>
    </section>
    <section class="profile-main-section activities" v-if="myProfile"></section>
    <section class="profile-main-section highlight-activities">
      <div class="pms-header-container">
        <p>Posts</p>
      </div>
      <div class="community-activity-render-section">
        <div v-if="myContents.length == 0">
          <p>No posts yet!</p>
        </div>
        <div v-for="content in myContents" :key="content.created">
          <div v-if="content.aid">
            <article-item
              @report="submitReportReq"
              :aid="content.aid"
            ></article-item>
          </div>
          <div v-if="content.pid">
            <post-item @report="submitReportReq" :pid="content.pid"></post-item>
          </div>
          <div v-if="content.cid">
            <courses-item
              @report="submitReportReq"
              :cid="content.cid"
            ></courses-item>
          </div>
        </div>
      </div>
    </section>
    <div>
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
                :href="'http://www.facebook.com/share.php?u=' + shareLink"
              >
                <i class="fab fa-facebook share-item-icon"></i>
              </a>
            </div>
            <div class="share-item whatsapp">
              <a
                @click="share('whatsapp', 'post')"
                target="_blank"
                :href="'https://api.whatsapp.com/send?text=' + shareLink"
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
                <span class="share-to-profile-text">Share to profile</span>
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
            <div @click="share()" v-if="false" class="share-item instagram">
              <i class="fab fa-instagram share-item-icon"></i>
            </div>
            <div @click="copyLink()" class="share-item copylink">
              <i class="fas fa-copy share-item-icon"></i>
            </div>
          </div>
        </section>
      </modal>
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
                :href="'http://www.facebook.com/share.php?u=' + shareLink"
              >
                <i class="fab fa-facebook share-item-icon"></i>
              </a>
            </div>
            <div class="share-item whatsapp">
              <a
                @click="share('whatsapp', 'article')"
                target="_blank"
                :href="'https://api.whatsapp.com/send?text=' + shareLink"
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
                <span class="share-to-profile-text">Share to profile</span>
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
            <div @click="share()" v-if="false" class="share-item instagram">
              <i class="fab fa-instagram share-item-icon"></i>
            </div>
            <div @click="copyLink()" class="share-item copylink">
              <i class="fas fa-copy share-item-icon"></i>
            </div>
          </div>
        </section>
      </modal>
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
                :href="'http://www.facebook.com/share.php?u=' + shareLink"
              >
                <i class="fab fa-facebook share-item-icon"></i>
              </a>
            </div>
            <div class="share-item whatsapp">
              <a
                @click="share('whatsapp', 'course')"
                target="_blank"
                :href="'https://api.whatsapp.com/send?text=' + shareLink"
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
                  'Hi there, Saw this post on mixam business website and I wanted to share it. Check it out here&url=' +
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
                <span class="share-to-profile-text">Share to profile</span>
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
            <div @click="share()" v-if="false" class="share-item instagram">
              <i class="fab fa-instagram share-item-icon"></i>
            </div>
            <div @click="copyLink()" class="share-item copylink">
              <i class="fas fa-copy share-item-icon"></i>
            </div>
          </div>
        </section>
      </modal>
      <modal
        class="report-modal"
        name="report"
        width="90%"
        :maxWidth="maxWidth"
        height="auto"
        :adaptive="true"
        :click-to-close="true"
      >
        <section>
          <div class="report-header">
            <p>Report</p>
          </div>
          <div class="report-body">
            <p>Why are you reporting?</p>
            <div class="form-container">
              <form class="report-reason-form">
                <span class="report-input-container">
                  <input
                    v-model="reportReason"
                    value="Scam Content"
                    type="radio"
                    name="report-reason"
                  />
                  Scam Content
                </span>
                <span class="report-input-container">
                  <input
                    v-model="reportReason"
                    value="Impersonation"
                    type="radio"
                    name="report-reason"
                  />
                  Impersonation
                </span>
                <span class="report-input-container">
                  <input
                    v-model="reportReason"
                    value="Used a copyrighted item without permission"
                    type="radio"
                    name="report-reason"
                  />
                  Used a copyrighted item without permission
                </span>
                <span class="report-input-container">
                  <input
                    v-model="reportReason"
                    value="Untrusted Link"
                    type="radio"
                    name="report-reason"
                  />
                  Untrusted Link
                </span>
                <p class="other-report-reason">
                  You can add More details of why you're reporting below :
                </p>
                <input
                  type="text"
                  v-model="otherReason"
                  class="report-other-reason-input"
                />
              </form>
            </div>
            <div class="report-button-container">
              <vs-button
                @click="sendReportRequest()"
                style="width: 100%; background-color: gray !important"
                class="report-button"
                >Report</vs-button
              >
            </div>
          </div>
        </section>
      </modal>
    </div>
  </section>
</template>

<script>
function reverseArray(arr) {
  let returnArr = [];
  for (let count = arr.length - 1; count >= 0; count--) {
    returnArr.push(arr[count]);
  }
  return returnArr;
}
function getUnique(arr) {
  let uniqueArr = [];

  // loop through array
  for (let i of arr) {
    if (uniqueArr.indexOf(i) === -1) {
      uniqueArr.push(i);
    }
  }
  return uniqueArr;
}
import postItemVue from "@/components/post-item.vue";
import articleItemVue from "@/components/article-item.vue";
import coursesItemVue from "@/components/courses-item.vue";

import contributionItemVue from "@/components/contribution-item.vue";
export default {
  data: function () {
    return {
      accountInfo: {},
      MID: JSON.parse(window.localStorage.getItem("userlogindata")).MID,
      DID: JSON.parse(window.localStorage.getItem("userlogindata")).DID,
      user: "",
      reportReason: "",
      otherReason: "",
      reportInfo: {},
      maxWidth: 480,
      following_folowers_sorted_info: [],
    };
  },
  computed: {
    shareLink: function () {
      return this.$store.state.shareLink;
    },
    userFollowing: function () {
      let following = this.accountInfo.following;
      let sorted = [];
      for (let each of following) {
        if (each) {
          sorted.push(each);
        }
      }
      return getUnique(sorted);
    },
    userFollowers: function () {
      let followers = this.accountInfo.followers;
      let sorted = [];
      for (let each of followers) {
        if (each) {
          sorted.push(each);
        }
      }
      return getUnique(sorted);
    },
    checkIfFollowing: function () {
      let followingThisUser = false;
      this.$store.state.userFollowing.forEach((x) => {
        if (followingThisUser == true || x == null) return;
        else {
          followingThisUser = x.user == this.user;
        }
      });
      return followingThisUser;
    },
    myContents: function () {
      if (this.accountInfo.myContents) {
        return reverseArray(this.accountInfo.myContents);
      }
      return [];
    },
    favourites: function () {
      let sorted = [];
      if (!this.accountInfo.favourites) return [];
      for (let each of this.accountInfo.favourites) {
        sorted = sorted.concat(each.saved);
      }
      console.log("sorted fav", sorted);
      return reverseArray(sorted).slice(0, 5);
    },
    contributions: function () {
      return this.accountInfo.contributions
        ? reverseArray(this.accountInfo.contributions).slice(0, 4)
        : [];
    },

    myProfile: function () {
      return this.MID == this.accountInfo.__mid;
    },

    imgLink: function () {
      return this.accountInfo.profileImageLink
        ? this.accountInfo.profileImageLink
        : "";
    },
  },
  methods: {
    getImg(user) {
      let link;
      this.following_folowers_sorted_info.forEach((x) => {
        if (link !== undefined) {
          return;
        }
        x.__mid == user ? (link = x.profileImageLink) : false;
      });
      return link;
    },
    getUsername(user) {
      let username;
      this.following_folowers_sorted_info.forEach((x) => {
        if (username !== undefined) {
          return;
        }
        x.__mid == user ? (username = x.username) : false;
      });
      return username;
    },
    chatWithUser: function (user) {
      this.$router.push({
        path: "/chat",
        query: {
          user,
        },
      });
    },
    goToEditProfile() {
      this.$router.push({
        path: "/edit-profile",
      });
    },
    fetchAccountData() {
      let url = `${this.$store.state.apiServer}/getaccountinfo/`;
      this.$vs.loading();
      window.axios
        .get(url, {
          params: {
            MID: this.user || this.MID,
            DID: this.DID,
            profile: "true",
            user: this.user ? true : false,
          },
        })
        .then((response) => {
          console.log("res fad", response.data);
          this.$vs.loading.close();
          let data = response.data;
          if (response.data.status == "success") {
            this.accountInfo = response.data.__userAccountData;
            this.following_folowers_sorted_info = response.data.sortedInfo;
          }
        })
        .catch((error) => {
          this.$vs.loading.close();
          this.$modal.show("dialog", {
            title: "Unable to fetch your data.",
            text: "Reason : " + error.message,
            buttons: [
              {
                title: "Okay",
                handler: () => {
                  this.$modal.hide("dialog");
                },
              },
            ],
          });
        });
    },
    followUser: function () {
      let url = `${this.$store.state.apiServer}/followuser/`;
      window.axios
        .get(url, {
          params: {
            DID: this.DID,
            MID: this.MID,
            author: this.user,
            toFollow: this.user,
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
          console.error("ERR_SOURCE_FOLLOW_USER_REQUEST", err.message);
          this.followLoader = false;
        });
      console.log("follow request sent");
    },
    unfollowUser: function () {
      let url = `${this.$store.state.apiServer}/unfollowuser/`;
      window.axios
        .get(url, {
          params: {
            DID: this.DID,
            MID: this.MID,
            author: this.user,
            toUnfollow: this.user,
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
            "ERR UNABLE TO COMPLETE UNFOLLOW OPERATION " + err.message
          );
        });
    },
    openFollowModal() {
      this.$modal.show("follow-modal");
    },
    submitReportReq(event) {
      this.reportInfo = event;
      console.log("");
      this.$modal.show("report");
    },
    copyLink() {
      // look for the appropraite code.
      navigator.clipboard.writeText(this.shareLink);
      this.$vs.notify({
        title: "copied to clipboard",
        color: "#98c2ff",
      });
      this.closeShareModal();
    },
    closeShareModal() {
      this.$modal.hide("share-post");
      this.$modal.hide("share-article");
      this.$modal.hide("share-course");
    },
    share(to, contentType) {
      this.closeShareModal();
      if (to == "profile") {
        this.shareToProfile();
      }
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
            this.$vs.notify({
              position: "bottom-center",
              title: "Shared Successfully",
              color: "#98c2ff",
            });
          } else {
            this.$vs.notify({
              position: "bottom-center",
              title: "Unable to share, try again later",
              color: "#98c2ff",
            });
          }
        })
        .catch((err) => {
          this.$vs.notify({
            position: "bottom-center",
            title: "Unable to share, try again later",
            color: "#98c2ff",
          });
          console.error(err.message);
        });
    },
    goToChat(user, username, img) {
      this.$router.push({
        path: "/chat",
        query: {
          user,
          username,
          imgLink: img,
        },
      });
    },
    shareToProfile() {
      let url = `${this.$store.state.apiServer}/share-to-profile/`;
      console.log("sharing post to profile");
      let parsedLink = new window.URL(this.shareLink);
      window.axios
        .get(url, {
          params: {
            MID: this.MID,
            DID: this.DID,
            pid: parsedLink.searchParams.get("pid"),
          },
        })
        .then((response) => {
          if (response.data.status == "success") {
            console.log("shared to profile success");
          } else {
            console.error("unable to share to profile");
          }
        })
        .catch((err) => {
          this.$vs.notify({
            position: "bottom-center",
            title: "Network connection not available.",
            color: "#cbe0ff",
          });
          console.error(err.message);
        });
    },
    sendReportRequest() {
      this.$vs.loading();
      let url = `${this.$store.state.apiServer}/report/`;
      let DID = JSON.parse(window.localStorage.getItem("userlogindata")).DID;
      let MID = JSON.parse(window.localStorage.getItem("userlogindata")).MID;
      let userAgent = this.$store.state.__userAgent;
      window.axios
        .get(url, {
          params: {
            DID,
            MID,
            userAgent,
            reportReason: this.reportReason,
            otherReason: this.otherReason,
            reportInfo: this.reportInfo,
          },
        })
        .then((response) => {
          this.$vs.loading.close();
          if (response.data.status == "success") {
            console.log("reportSuccess", response.data);
            this.$modal.hide("report");
            (this.otherReason = ""), (this.reportReason = "");
            this.$vs.notify({
              position: "bottom-center",
              title: "Report Action Submitted Successfully",
              text: "We are Processsing your report request and we will take the appropraite action immediately after reviewed",
              color: "#98c2ff",
            });
          } else {
          }
        })
        .catch((err) => {
          this.$vs.loading.close();
          console.error(err.message);
        });
    },
  },
  created: function () {
    console.log(this.$route.query.user);
    this.user = this.$route.query.user;
    this.fetchAccountData();
  },
  components: {
    contributionItem: contributionItemVue,
    postItem: postItemVue,
    articleItem: articleItemVue,
    coursesItem: coursesItemVue,
  },
};
</script>

<style lang="scss">
#profile-render-page {
  font-family: candara, signika-regular;
  color: #676767;
  padding-bottom: 65px;
}

.profile-render-header {
  background-image: url(../assets/v748-toon-103.jpg);
  background-size: cover;
}
.pr-image-container img {
  height: 200px;
  width: 200px;
  border-radius: 100px;
  display: block;
  margin: 0px auto;
  background: #706c6c;
}
.pr-realimg {
}
.pr-vector-ni {
  background-color: white;
}
.pr-items-container {
  display: flex;
  flex-direction: column;
}
.pr-image-container {
  width: max-content;
  border: 4px solid gray;
  border-radius: 150px;
  padding: 0px;
  margin: 0px auto;
  height: max-content;
  overflow: hidden;
}
.pr-image-container.avatarcon {
  padding: 5px 4px 0px 4px;
}
.pr-img-box-upper {
  padding-top: 20px;
}
.pr-contents-container {
  padding: 15px;
}
.prh-name {
  font-weight: 600;
  font-size: 130%;
  padding-top: 25px;
}
.prh-divider {
  height: 2px;
  border-radius: 10px;
  background-color: gray;
  margin-top: 10px !important;
  margin-bottom: 10px !important;
}
.prh-what-you-do {
  padding: 0px 0px 5px 0px;
}
.details-next {
  padding: 10px;
  padding-top: 15px;
  text-align: center;
}
.profile-action-buttons {
  display: flex;
}
.profile-action-buttons button {
  width: 100%;
  height: 40px;
  border-radius: 10px;
}
.profile-action-buttons div {
  padding: 10px;
}
.pab-followbtn {
  background-color: #1e87f0;
  font-weight: 600;
  color: white;
  border: 1px solid #cbe0ff;
}
.pab-followbtn.following {
  background-color: #ffffff;
  font-weight: 600;
  color: #1e87f0;
  border: 3px solid #cbe0ff;
}
.pab-msgbtn {
  background-color: #3c3c3c;
  border: 1px solid gray;
  font-weight: 600;
  color: white;
}
@media (min-width: 600px) {
  .pr-items-container {
    flex-direction: row;
    align-items: flex-end;
  }
  .pr-image-container {
    position: relative;
    top: 80px;
  }
  .pr-img-box-upper {
    width: max-content;
    padding: 10px;
  }
  .details-next {
    width: 60%;
    margin-left: 233px;
    text-align: left;
  }
}

.pms-header-container {
  margin-top: 30px;
  padding-left: 10px;
}
.pms-header-container p {
  font-weight: 600;
  font-size: 200%;
}
.pms-content-item-container.interest {
  background: #cbe0ff;
  border-radius: 64px;
  padding: 5px 15px;
  width: max-content;
  border: 2px solid white;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
  box-shadow: 0px 0px 5px #b7d4ff;
}
.profile-main-section {
  padding: 10px;
}
.pms-content-item-container.contribution {
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #cbe0ff;
  margin: 5px auto 15px auto;
}
.contribution-what {
  font-weight: 600;
}
.edit-button-container {
  padding: 10px;
}
.edit-button-container button {
  width: 100%;
  border-radius: 13px;
  height: 40px;
  border: 1px solid #cbe0ff;
  background-color: #f3f8ff;
  box-shadow: 0px 0px 10px #d7e5f9;
}
.start-chat-main {
  padding: 10px;
  max-height: 650px;
  overflow-y: scroll;
}
.scm-header {
  font-family: highgate-bold;
  font-size: 150%;
}
.scm-header {
  font-family: highgate-bold;
  font-size: 150%;
}
.scm-content {
  margin-bottom: 30px;
}
.scm-user-container {
  display: flex;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #cbe0ff;
  margin-top: 15px;
}
.scm-username {
  flex: 1;
  font-weight: 600;
  text-align: left;
  font-family: highgate-light;
}
.scm-user-avater,
.scm-send-message-container {
  width: max-content;
  padding: 5px;
}
.scm-send-message-container {
  padding-right: 15px;
}
.pr-image-container .vs-con-avatar {
  margin: 0px;
}
</style>
