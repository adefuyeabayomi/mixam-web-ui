<template>
    <section class="sidebar-container">
        <section class="sb-user-details-container">
            <div class="udc-avatar-container">
                <div class="udc-ac-main">
                    <vs-avatar
                        size="50px"
                        v-if="
                            $store.state.userAccountInfo.profileImageLink == ''
                        "
                        color="dark"
                        :text="$store.state.userAccountInfo.username"
                    ></vs-avatar>
                    <vs-avatar
                        size="50px"
                        v-if="
                            $store.state.userAccountInfo.profileImageLink !== ''
                        "
                        :src="$store.state.userAccountInfo.profileImageLink"
                    ></vs-avatar>
                </div>
            </div>
            <div class="udc-details-container">
                <div class="udc-dc-main">
                    <p class="udc-dc-username">
                        {{  $store.state.userAccountInfo.username }}
                    </p>
                    <p class="udc-dc-email">
                        {{ $store.state.userAccountInfo.email }}
                    </p>
                </div>
            </div>
        </section>
        <section class="sidebar-section-divider"></section>
        <section class="sidebar-mainmenu-container">
            <div class="smc-header-container">
                <p>Menu</p>
            </div>
            <div class="smc-menu-container">
                <div @click="goToExplore()" class="smc-menu-item pointercursor">
                    <div class="smc-mi-container">
                        <span class="smc-menu-icon">
                            <img
                                src="../assets/create-main-bgs/home-free/Home_perspective_matte.png"
                                class="header-icon-user pointercursor"
                            />
                        </span>
                    </div>
                    <div class="smc-desc-container">
                        <p :class="{ 'smc-menu-is-active': onExploreRoute }">
                            Explore Community Activities
                        </p>
                        <div
                            v-if="onExploreRoute"
                            class="smc-menu-underline"
                        ></div>
                    </div>
                </div>
                <div @click="goToLearn()" class="smc-menu-item pointercursor">
                    <div class="smc-mi-container">
                        <span class="smc-menu-icon">
                            <img
                                src="../assets/create-main-bgs/books-free/Books_perspective_matte.png"
                                class="header-icon-user"
                            />
                        </span>
                    </div>
                    <div class="smc-desc-container">
                        <p :class="{ 'smc-menu-is-active': onLearnRoute }">
                            Find Courses / Classroom.
                        </p>
                        <div
                            v-if="onLearnRoute"
                            class="smc-menu-underline"
                        ></div>
                    </div>
                </div>
                <div @click="goToCreate()" class="smc-menu-item pointercursor">
                    <div class="smc-mi-container">
                        <span class="smc-menu-icon">
                            <img
                                src="../assets/create-main-bgs/feather-free/perspective_matte.png"
                                class="header-icon-user"
                            />
                        </span>
                    </div>
                    <div class="smc-desc-container">
                        <p :class="{ 'smc-menu-is-active': onCreateRoute }">
                            Create a Post, Article or Course
                        </p>
                        <div
                            v-if="onCreateRoute"
                            class="smc-menu-underline"
                        ></div>
                    </div>
                </div>
                <div
                    @click="goToNotification()"
                    class="smc-menu-item pointercursor"
                >
                    <div class="smc-mi-container">
                        <span class="smc-menu-icon">
                            <img
                                src="../assets/create-main-bgs/Notification bell 3d cartoon style icon on white background.png"
                                class="header-icon-user"
                            />
                        </span>
                    </div>
                    <div class="smc-desc-container">
                        <p
                            :class="{
                                'smc-menu-is-active': onNotificationRoute,
                            }"
                        >
                            Notifications
                        </p>
                        <div
                            v-if="onNotificationRoute"
                            class="smc-menu-underline"
                        ></div>
                    </div>
                </div>
                <div @click="goToAccount()" class="smc-menu-item pointercursor">
                    <div class="smc-mi-container">
                        <span class="smc-menu-icon">
                            <img
                                src="../assets/create-main-bgs/user-free/User_perspective_matte.png"
                                class="header-icon-user"
                            />
                        </span>
                    </div>
                    <div class="smc-desc-container">
                        <p :class="{ 'smc-menu-is-active': onMyAccountRoute }">
                            My Account / Settings
                        </p>
                        <div
                            v-if="onMyAccountRoute"
                            class="smc-menu-underline"
                        ></div>
                    </div>
                </div>
            </div>
        </section>
        <section class="sidebar-options-container">
            <div class="smc-header-container soc">
                <p>Section Options</p>
            </div>
            <div v-if="onExploreRoute" class="smc-menu-container explore">
                <div class="smc-menu-item pointercursor" @click="goToAllFeed()">
                    <div class="smc-desc-container soc">
                        <p>All Feed</p>
                    </div>
                </div>
                <div
                    class="smc-menu-item pointercursor"
                    @click="goToPostFeed()"
                >
                    <div class="smc-desc-container soc">
                        <p>Posts</p>
                    </div>
                </div>
                <div
                    class="smc-menu-item pointercursor"
                    @click="goToArticleFeed()"
                >
                    <div class="smc-desc-container soc">
                        <p>Articles</p>
                    </div>
                </div>
                <div
                    class="smc-menu-item pointercursor"
                    @click="goToCourseFeed()"
                >
                    <div class="smc-desc-container soc">
                        <p>Courses</p>
                    </div>
                </div>
            </div>
            <div v-if="onCreateRoute" class="smc-menu-container create">
                <div
                    class="smc-menu-item pointercursor"
                    @click="goToCreatePost()"
                >
                    <div class="smc-desc-container soc">
                        <p>Create a Post</p>
                    </div>
                </div>
                <div
                    class="smc-menu-item pointercursor"
                    @click="goToCreateArticle()"
                >
                    <div class="smc-desc-container soc">
                        <p>Create an Article</p>
                    </div>
                </div>
                <div
                    class="smc-menu-item pointercursor"
                    @click="goToCreateCourse()"
                >
                    <div class="smc-desc-container soc">
                        <p>Create a Course</p>
                    </div>
                </div>
            </div>
            <div v-if="onLearnRoute" class="smc-menu-container learn">
                <div
                    class="smc-menu-item pointercursor"
                    @click="goToFindCourses()"
                >
                    <div class="smc-desc-container soc">
                        <p>Find a Course</p>
                    </div>
                </div>
                <div
                    class="smc-menu-item pointercursor"
                    @click="goToSavedCourses()"
                >
                    <div class="smc-desc-container soc">
                        <p>Saved Courses</p>
                    </div>
                </div>
                <div
                    class="smc-menu-item pointercursor"
                    @click="goToClassroom()"
                >
                    <div class="smc-desc-container soc">
                        <p>Go To Classroom</p>
                    </div>
                </div>
                <div
                    class="smc-menu-item pointercursor"
                    @click="goToCourseMilestones()"
                >
                    <div class="smc-desc-container soc">
                        <p>Milestones, View Courses you completed</p>
                    </div>
                </div>
            </div>
            <div
                v-if="onNotificationRoute"
                class="smc-menu-container notification"
            >
                <div
                    class="smc-menu-item pointercursor"
                    @click="markAllAsRead()"
                >
                    <div class="smc-desc-container soc">
                        <p>Mark all as Opened</p>
                    </div>
                </div>
                <div class="smc-menu-item pointercursor">
                    <div class="smc-desc-container soc">
                        <p>Clear Notifications</p>
                    </div>
                </div>
            </div>
            <div v-if="onMyAccountRoute" class="smc-menu-container account">
                <div class="smc-menu-item pointercursor" @click="goToProfile()">
                    <div class="smc-desc-container soc">
                        <p>My Profile</p>
                    </div>
                </div>
                <div class="smc-menu-item pointercursor" @click="goToDrafts()">
                    <div class="smc-desc-container soc">
                        <p>My Drafts</p>
                    </div>
                </div>
                <div
                    class="smc-menu-item pointercursor"
                    @click="goToLoginSettings()"
                >
                    <div class="smc-desc-container soc">
                        <p>Login Settings</p>
                    </div>
                </div>
                <div
                    class="smc-menu-item pointercursor"
                    @click="goToFeedback()"
                >
                    <div class="smc-desc-container soc">
                        <p>Feedback & Complaint</p>
                    </div>
                </div>
                <div
                    class="smc-menu-item pointercursor"
                    @click="goToHelpCenter()"
                >
                    <div class="smc-desc-container soc">
                        <p>Help Center</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="general-options-mobile">
            <div class="mobile-options-container">
                <div>
                    <!--home-->
                    <div
                        class="mobile-option-item pointercursor"
                        :class="{ 'active-nav-section': onExploreRoute }"
                        @click="$router.push('explore-main')"
                    >
                        <!-- <img src="../assets/create-main-bgs/home-free/Home_perspective_matte.png">
                         -->
                        <i class="fas fa-home"></i>
                    </div>
                </div>

                <div>
                    <!--learn-->
                    <div
                        class="mobile-option-item pointercursor"
                        :class="{ 'active-nav-section': onLearnRoute }"
                        @click="$router.push('learn-main')"
                    >
                        <!--  <img src="../assets/create-main-bgs/books-free/Books_perspective_matte.png">
                          -->
                        <i class="fas fa-pen"></i>
                    </div>
                </div>
                <div>
                    <!--create-->
                    <div
                        :class="{ 'active-nav-section': onCreateRoute }"
                        class="mobile-option-item center-button pointercursor"
                        @click="$router.push('create-main')"
                    >
                        <!-- <img src="../assets/create-main-bgs/feather-free/perspective_matte.png">
                        -->
                        <i class="fas fa-plus"></i>
                    </div>
                </div>
                <div>
                    <!--notification-->
                    <div
                        :class="{ 'active-nav-section': onNotificationRoute }"
                        class="user-notification-icon pointercursor"
                        @click="$router.push('notifications')"
                    >
                        <div class="notification-icon-container">
                            <i class="fas fa-bell"></i>
                        </div>
                        <div
                            class="notification-badge-container"
                            v-if="unseenNotificationCount !== 0"
                        >
                            <div class="notification-count">
                                <p class="notification">
                                    {{ unseenNotificationCount }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <!--
                            <i class="fas fa-"></i>
                        -->
                </div>
                <div>
                    <!--user-account-->
                    <div
                        :class="{ 'active-nav-section': onMyAccountRoute }"
                        class="mobile-option-item pointercursor"
                        @click="$router.push('my-account')"
                    >
                        <!--   <img src="../assets/create-main-bgs/user-free/User_perspective_matte.png">
                        -->
                        <i class="fas fa-user"></i>
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
export default {
    data: function () {
        return {
            route: this.$store.state.currentRoute,
            MID: JSON.parse(window.localStorage.getItem("userlogindata")).MID,
            DID: JSON.parse(window.localStorage.getItem("userlogindata")).DID,
        };
    },
    computed: {
        unseenNotificationCount() {
            let theNotifications = this.$store.state.userNotifications;
            if (!theNotifications) {
                return 0;
            }
            let notificationCount = 0;
            if (theNotifications == null) {
                return notificationCount;
            }
            for (let each of Object.keys(theNotifications)) {
                let notifDay = theNotifications[each].notifications;
                for (let notification of notifDay) {
                    if (notification) {
                        notification.seen !== true
                            ? notificationCount++
                            : false;
                    }
                }
            }
            return notificationCount;
        },
        presentRoute: function () {
            let route = this.$store.state.currentRoute;
            return route;
        },
        onCreateRoute: function () {
            console.log(this.presentRoute, "presentGeneralRoute");
            return this.presentRoute == "create";
        },
        onExploreRoute: function () {
            return this.presentRoute == "explore";
        },
        onLearnRoute: function () {
            return this.presentRoute == "learn";
        },
        onMyAccountRoute: function () {
            return this.presentRoute == "myaccount";
        },
        onNotificationRoute: function () {
            return this.presentRoute == "notification";
        },

    },
    methods: {
        goToExplore() {
            if (this.$route.name !== "explore-main") {
                this.$router.push("explore-main");
            }
        },
        goToCreate() {
            if (this.$route.name !== "create-main") {
                this.$router.push("create-main");
            }
        },
        goToNotification() {
            if (this.$route.name !== "notifications") {
                this.$router.push("notifications");
            }
        },
        goToAccount() {
            if (this.$route.name !== "my-account") {
                this.$router.push("my-account");
            }
        },
        goToLearn() {
            if (this.$route.name !== "learn-main") {
                this.$router.push("learn-main");
            }
        },
        goToAllFeed() {
            this.updateActiveTab("all");
            if (this.$route.name !== "explore-main") {
                this.$router.push("explore-main");
            }
        },
        goToPostFeed() {
            this.updateActiveTab("posts");
            if (this.$route.name !== "explore-main") {
                this.$router.push("explore-main");
            }
        },
        goToArticleFeed() {
            this.updateActiveTab("articles");
            if (this.$route.name !== "explore-main") {
                this.$router.push("explore-main");
            }
        },
        goToCourseFeed() {
            this.updateActiveTab("courses");
            if (this.$route.name !== "explore-main") {
                this.$router.push("explore-main");
            }
        },
        updateActiveTab(tab) {
            this.$store.commit("updateexploretab", tab);
        },
        goToCourseMilestones() {
            this.updateActiveTabE("learn-milestones");
            if (this.$route.name !== "learn-main") {
                this.$router.push("learn-main");
            }
        },
        goToClassroom() {
            this.updateActiveTabE("my-courses");
            if (this.$route.name !== "learn-main") {
                this.$router.push("learn-main");
            }
        },
        goToSavedCourses() {
            this.updateActiveTabE("saved");
            if (this.$route.name !== "learn-main") {
                this.$router.push("learn-main");
            }
        },
        goToFindCourses() {
            this.updateActiveTabE("find-courses");
            if (this.$route.name !== "learn-main") {
                this.$router.push("learn-main");
            }
        },
        goToCreatePost: function () {
            if (this.$route.name !== "create-post") {
                this.$router.push("create-post");
            }
        },
        goToCreateArticle: function () {
            if (this.$route.name !== "create-article") {
                this.$router.push("create-article");
            }
        },
        goToCreateCourse: function () {
            if (this.$route.name !== "create-course") {
                this.$router.push("create-course");
            }
        },
        updateActiveTabE(tab) {
            this.$store.commit("updatelearntab", tab);
        },
        goToProfile: function () {
            if (this.$route.name !== "profile") {
                this.$router.push("profile");
            }
        },
        goToDrafts: function () {
            if (this.$route.name !== "my-drafts") {
                this.$router.push("my-drafts");
            }
        },
        goToLoginSettings: function () {
            if (this.$route.name !== "login-settings") {
                this.$router.push("login-settings");
            }
        },
        goToHelpCenter: function () {
            if (this.$route.name !== "help-center") {
                this.$router.push("help-center");
            }
        },
        goToFeedback: function () {
            if (this.$route.name !== "feedback-and-complaint") {
                this.$router.push("feedback-and-complaint");
            }
        },
        markAllAsRead() {
            let url = `${this.$store.state.apiServer}/mark-all-notification-read/`;
            window.axios
                .get(url, {
                    params: {
                        MID: this.MID,
                        DID: this.DID,
                    },
                })
                .then((response) => {
                    if (response.data.status == "success") {
                        this.$store.commit("signalnotificationopen", true);
                        console.log(response.data);
                        this.$vs.notify({
                            title: "Successfully marked all as opened.",
                            color: "#98c2ff",
                        });
                    } else {
                    }
                })
                .catch((err) => {
                    console.error(err.message);
                });
        },
    },
};
</script>

<style lang="scss">
.header-icon-user {
    border: 2px solid #cbe0ff;
    border-radius: 10px;
    background: white;
}
.sidebar-container {
    padding: 15px 10px 10px 10px;
    font-family: highgate-regular;
}
.sb-user-details-container {
    padding: 5px 0px 5px 0px;
    display: flex;
    align-items: center;
    color: white;
}
.sidebar-section-divider {
    height: 3px;
    border-radius: 10px;
    background-color: #9bc3ff;
}
.udc-avatar-container {
    width: max-content;
}
.udc-details-container {
    flex: 1;
}
.udc-ac-main {
}
.udc-dc-main {
}
.udc-dc-username {
    font-weight: 600;
    font-size: 100%;
}
.udc-dc-email {
    font-size: 85%;
}
.sidebar-mainmenu-container {
    margin-top: 30px;
}
.smc-header-container {
    font-weight: 600;
    font-size: 110%;
    color: #074199;
}
.smc-menu-container {
    margin-top: 15px;
}
.smc-menu-item {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}
.smc-menu-icon img {
    width: 30px;
}
.smc-mi-container {
    width: max-content;
}
.smc-desc-container {
    width: max-content;
    padding-left: 10px;
    font-size: 90%;
    color: #1f519c;
}
.smc-desc-container.soc {
    padding-left: 0px;
}
.smc-menu-is-active {
    color: white;
    font-weight: 600;
}
.smc-menu-underline {
    height: 2px;
    background: white;
    border-radius: 5px;
}
.smc-header-container.soc {
    margin-top: 40px;
}
.genopts-container li {
    list-style-type: none;
    margin-top: 14px;
    margin-left: -32px;
}
.genopts-container {
    padding-left: 15px;
    padding-top: 30%;
}
.geno-header {
    font-weight: 600;
    font-size: 100%;
}
.gen-header {
    font-family: antipasto-bold;
    font-size: 125%;
    color: white;
}
.geno-section-header p {
    font-family: antipasto-bold;
    font-size: 125%;
    color: white;
}
.geno-section-content ul li {
    list-style-type: none;
    margin-left: -30px;
    margin-top: 10px;
    font-weight: 600;
    letter-spacing: 1px;
    color: #0f3637;
}
.options-explore,
.options-create,
.options-myaccount,
.options-learn {
    font-family: antipasto-bold;
    font-size: 125%;
    color: #5ccdff;
    padding-left: 15px;
    padding-top: 15%;
}
#options-explore,
#options-create,
#options-myaccount,
#options-learn {
    padding: 15px;
}
.mobile-option-item img {
    width: 25px;
}
.mobile-option-item {
    box-shadow: 0px 0px 10px grey;
    position: relative;
    top: 3px;
    display: block;
    margin: 0px auto;
}
.center-button {
    top: -1px !important;
}
.mobile-option-item .fa-home {
    padding: 10px;
}
.mobile-option-item .fa-plus {
    padding: 12px 13px;
}
.mobile-option-item .fa-user {
    padding: 10px;
}
.mobile-option-item .fa-pen {
    padding: 10px;
}
.active-nav-section {
    background: #093d54 !important;
    color: white;
}
.user-notification-icon {
    box-shadow: 0px 0px 10px grey;
    padding: 6px 8px 0px 10px;
    height: 33px !important;
    position: relative;
    top: 3px;
    display: block;
    margin: 0px auto;
}
.active-nav-section .notification-icon-container {
    background: #093d54 !important;
}
.mobile-options-container {
    display: flex;
}
.mobile-options-container div {
    flex: 1;
    padding: 0px px 0px px;
}
.mobile-options-container div div {
    border-radius: 50px;
    background-color: white;
    height: max-content;
    width: max-content;
}
.mobile-option-item img {
    display: block;
    margin: 0px auto;
    padding-top: 5px;
    margin-left: 35%;
}
.notification-badge-container {
    background: #2196f3 !important;
    padding: 1px 3px 1px 2px !important;
    margin-top: 0px !important;
    margin-left: 0px !important;
}
.notification-count {
    height: 15px !important;
    background: transparent !important;
    color: white !important;
    width: max-content !important;
    padding: 0px !important;
}
#options-account {
    padding: 12px;
}
@media (max-width: 768px) {
    .general-options-desktop-tablet {
        display: none;
    }
    .sidebar-container {
        position: fixed;
        z-index: 2;
        padding: 0px;
    }
    .sb-user-details-container,
    .sidebar-section-divider,
    .sidebar-mainmenu-container,
    .sidebar-options-container {
        display: none;
    }
}
@media (max-width: 1024px) and (min-width: 768px) {
    .general-options-desktop-tablet {
        display: block;
    }
    .general-options-mobile {
        display: none;
    }
}
@media (min-width: 1024px) {
    .general-options-mobile {
        display: none;
    }
    .general-options-desktop-tablet {
        display: block;
    }
}
</style>
