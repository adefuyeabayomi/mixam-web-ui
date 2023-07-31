<template>
    <section id="app_menu">
        <!--appmenu container-->
        <section v-if="!$store.state.userLoggedIn">
            <!--guest users menu container-->
            <div>
                <p class="guest_cta_text">
                    You are using this site as a guest user and so cannot access
                    this site's full menu and features. Please login to access
                    our site and menu. You can also give us a feedback, email
                    our admin at :
                    <a
                        class="app-menu-email-link"
                        href="mailto://adefuyeabayomi1@gmail.com"
                        >adefuyeabayomi1@gmail.com</a
                    >
                </p>
                <img
                    class="guest_cta_image"
                    src="../assets/54950.jpg"
                    title="engaging photo"
                />
            </div>
        </section>
        <section v-if="$store.state.userLoggedIn">
            <!--main menu container-->
            <div>
                <!--user profile for easy id container-->
                <div>
                    <!--user image container-->
                    <img :src="profileImageLink" />
                </div>
                <div>
                    <p>{{ username }}</p>
                    <!-- if the user did not set a username, then the name will be  "USER + email"-->
                </div>
            </div>

            <!--{ Mixam : create, explore, learn, my account }-->

            <div class="menu-create-container">
                <!-- create list { post, article, product showcase, course } container-->
                <div class="menu-section-header">
                    <p @click="goToCreateMain()" class="pointercursor">
                        <img
                            src="../assets/create-main-bgs/feather-free/perspective_matte.png"
                            class="header-icon"
                        />
                        Create a Post, Article or Course
                    </p>
                </div>
                <div class="menu-section-content">
                    <ul>
                        <li class="menu-list-item" @click="goToCreatePost()">
                            <i class="fas fa-paper-plane"></i> Create a post
                        </li>
                        <li class="menu-list-item" @click="goToCreateArticle()">
                            <i class="fas fa-receipt"></i>Publish an article
                        </li>
                        <!--<li class="menu-list-item" @click="goToCreateProductShowcase()"><i class="fas fa-object-group"></i>Create a Product Showcase </li> -->
                        <li class="menu-list-item" @click="goToCreateCourse()">
                            <i class="fas fa-book"></i> Teach Others, Create
                            Business Course.
                            <span class="red-clickbait">New Try it</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="menu-explore-container">
                <!-- explore list { posts , articles , product showcase } container-->
                <div class="menu-section-header">
                    <p @click="goToExploreMain()" class="pointercursor">
                        <img
                            src="../assets/create-main-bgs/home-free/Home_perspective_matte.png"
                            class="header-icon"
                        />
                        Explore Community Activities
                    </p>
                </div>
                <div class="menu-section-content">
                    <ul>
                        <li class="menu-list-item" @click="goToAllFeed()">
                            <i class="fas fa-list-ul"></i> All Feed
                        </li>
                        <li class="menu-list-item" @click="goToPostFeed()">
                            <i class="fas fa-paper-plane"></i> Posts Feed
                        </li>
                        <li class="menu-list-item" @click="goToArticleFeed()">
                            <i class="fas fa-receipt"></i> Articles Feed
                        </li>
                        <li class="menu-list-item" @click="goToCourseFeed()">
                            <i class="fas fa-book"></i> Courses Feed
                        </li>
                        <!--<li class="menu-list-item" @click="$router.push('')"><i class="fas fa-object-group"></i> Product showcase</li>-->
                    </ul>
                </div>
            </div>

            <div class="menu-learn-container">
                <!-- learn list { Check For Courses, My Courses , My learning progress. }-->
                <div class="menu-section-header">
                    <p @click="goToLearnMain()" class="pointercursor">
                        <img
                            src="../assets/create-main-bgs/books-free/Books_perspective_matte.png"
                            class="header-icon"
                        />
                        Find Courses / Classroom
                    </p>
                </div>
                <div class="menu-section-content">
                    <ul>
                        <li class="menu-list-item" @click="goToFindCourses()">
                            <i class="fas fa-search-plus"></i>Find a course
                        </li>
                        <li class="menu-list-item" @click="goToSavedCourses()">
                            <i class="fas fa-save"></i>Saved Courses
                        </li>
                        <li class="menu-list-item" @click="goToClassroom()">
                            <i class="fas fa-rocket"></i>Go To Classroom
                        </li>
                        <li
                            class="menu-list-item"
                            @click="goToCourseMilestones()"
                        >
                            <i class="fas fa-user-graduate"></i>Milestones. View
                            Courses You Completed
                        </li>
                    </ul>
                </div>
            </div>

            <div class="menu-myaccount-container">
                <!-- my account list {Account Settings, My profile } container-->
                <div class="menu-section-header">
                    <p @click="goToMyAccount()" class="pointercursor">
                        <img
                            src="../assets/create-main-bgs/user-free/User_perspective_matte.png"
                            class="header-icon"
                        />
                        My Account
                    </p>
                </div>
                <div class="menu-section-content">
                    <ul>
                        <li class="menu-list-item" @click="goToProfile()">
                            <i class="fas fa-user-cog"></i> My profile
                        </li>
                        <li class="menu-list-item" @click="goToDrafts()">
                            <i class="fas fa-file-signature"></i> My Drafts
                        </li>
                        <li class="menu-list-item" @click="goToLoginSettings()">
                            <i class="fas fa-sun"></i> Login Settings
                        </li>
                        <li class="menu-list-item" @click="goToHelpCenter()">
                            <i class="fas fa-vihara"></i> Help Center
                        </li>
                        <!--only show if the media is not desktop, i.e tablet or mobile-->
                    </ul>
                </div>
            </div>
        </section>
        <section class="feedback-section">
            <p><!--feedback text and links here.--></p>
        </section>
    </section>
</template>

<script>
export default {
    data: function () {
        return {
            username: "",
            profileImageLink: "",
        };
    },
    methods: {
        closeMenu: function () {
            this.$store.commit("updatemenustatus");
        },
        goToCreatePost: function () {
            this.closeMenu();
            this.$store.commit("updateHamVis");
            if (this.$route.name !== "create-post") {
                this.$router.push("create-post");
            }
            setTimeout(() => {
                this.$store.commit("updateHamVis");
            }, 0);
        },
        goToCreateArticle: function () {
            this.closeMenu();
            this.$store.commit("updateHamVis");
            if (this.$route.name !== "create-article") {
                this.$router.push("create-article");
            }
            setTimeout(() => {
                this.$store.commit("updateHamVis");
            }, 0);
        },
        goToCreateCourse: function () {
            this.closeMenu();
            this.$store.commit("updateHamVis");
            if (this.$route.name !== "create-course") {
                this.$router.push("create-course");
            }
            setTimeout(() => {
                this.$store.commit("updateHamVis");
            }, 0);
        },
        goToCreateProductShowcase: function () {
            this.closeMenu();
            this.$store.commit("updateHamVis");
            this.$router.push("create-product-showcase");
            setTimeout(() => {
                this.$store.commit("updateHamVis");
            }, 0);
        },
        goToCreateMain: function () {
            this.closeMenu();
            this.$store.commit("updateHamVis");
            this.$router.push("create-main");
            setTimeout(() => {
                this.$store.commit("updateHamVis");
            }, 0);
        },
        goToExploreMain: function () {
            this.closeMenu();
            this.$store.commit("updateHamVis");
            if (this.$route.name !== "explore-main") {
                this.$router.push("explore-main");
            }
            setTimeout(() => {
                this.$store.commit("updateHamVis");
            }, 0);
        },
        goToAllFeed() {
            this.closeMenu();
            this.$store.commit("updateHamVis");
            this.updateActiveTab("all");
            if (this.$route.name !== "explore-main") {
                this.$router.push("explore-main");
            }
            setTimeout(() => {
                this.$store.commit("updateHamVis");
            }, 0);
        },
        goToPostFeed() {
            this.closeMenu();
            this.$store.commit("updateHamVis");
            this.updateActiveTab("posts");
            if (this.$route.name !== "explore-main") {
                this.$router.push("explore-main");
            }
            setTimeout(() => {
                this.$store.commit("updateHamVis");
            }, 0);
        },
        goToArticleFeed() {
            this.closeMenu();
            this.$store.commit("updateHamVis");
            this.updateActiveTab("articles");
            if (this.$route.name !== "explore-main") {
                this.$router.push("explore-main");
            }
            setTimeout(() => {
                this.$store.commit("updateHamVis");
            }, 0);
        },
        goToCourseFeed() {
            this.closeMenu();
            this.updateActiveTab("courses");
            this.$store.commit("updateHamVis");
            if (this.$route.name !== "explore-main") {
                this.$router.push("explore-main");
            }
            setTimeout(() => {
                this.$store.commit("updateHamVis");
            }, 0);
        },
        updateActiveTab(tab) {
            this.$store.commit("updateexploretab", tab);
        },
        goToLearnMain: function () {
            this.closeMenu();
            this.$store.commit("updateHamVis");
            if (this.$route.name !== "learn-main") {
                this.$router.push("learn-main");
            }
            setTimeout(() => {
                this.$store.commit("updateHamVis");
            }, 0);
        },
        goToMyAccount: function () {
            this.closeMenu();
            this.$store.commit("updateHamVis");
            if (this.$route.name !== "my-account") {
                this.$router.push("my-account");
            }
            setTimeout(() => {
                this.$store.commit("updateHamVis");
            }, 0);
        },
        goToCourseMilestones() {
            this.closeMenu();
            this.$store.commit("updateHamVis");
            this.updateActiveTabE("learn-milestones");
            if (this.$route.name !== "learn-main") {
                this.$router.push("learn-main");
            }
            setTimeout(() => {
                this.$store.commit("updateHamVis");
            }, 0);
        },
        goToClassroom() {
            this.closeMenu();
            this.$store.commit("updateHamVis");
            this.updateActiveTabE("my-courses");
            if (this.$route.name !== "learn-main") {
                this.$router.push("learn-main");
            }
            setTimeout(() => {
                this.$store.commit("updateHamVis");
            }, 0);
        },
        goToSavedCourses() {
            this.closeMenu();
            this.$store.commit("updateHamVis");
            this.updateActiveTabE("saved");
            if (this.$route.name !== "learn-main") {
                this.$router.push("learn-main");
            }
            setTimeout(() => {
                this.$store.commit("updateHamVis");
            }, 0);
        },
        goToFindCourses() {
            this.closeMenu();
            this.$store.commit("updateHamVis");
            this.updateActiveTabE("find-courses");
            if (this.$route.name !== "learn-main") {
                this.$router.push("learn-main");
            }
            setTimeout(() => {
                this.$store.commit("updateHamVis");
            }, 0);
        },
        updateActiveTabE(tab) {
            this.$store.commit("updatelearntab", tab);
        },
        goToProfile: function () {
            this.closeMenu();
            this.$store.commit("updateHamVis");
            if (this.$route.name !== "profile") {
                this.$router.push("profile");
            }
            setTimeout(() => {
                this.$store.commit("updateHamVis");
            }, 0);
        },
        goToDrafts: function () {
            this.closeMenu();
            this.$store.commit("updateHamVis");
            if (this.$route.name !== "my-drafts") {
                this.$router.push("my-drafts");
            }
            setTimeout(() => {
                this.$store.commit("updateHamVis");
            }, 0);
        },
        goToLoginSettings: function () {
            this.closeMenu();
            this.$store.commit("updateHamVis");
            if (this.$route.name !== "login-settings") {
                this.$router.push("login-settings");
            }
            setTimeout(() => {
                this.$store.commit("updateHamVis");
            }, 0);
        },
        goToHelpCenter: function () {
            this.closeMenu();
            this.$store.commit("updateHamVis");
            if (this.$route.name !== "help-center") {
                this.$router.push("help-center");
            }
            setTimeout(() => {
                this.$store.commit("updateHamVis");
            }, 0);
        },
    },
};
</script>

<style lang="scss">
#app_menu {
    background: white;
    z-index: 1;
    padding: 17px;
    padding-top: 70px;
    padding-bottom: 35px;
    height: 120vh;
}
.guest_cta_text {
    text-align: center;
    padding-bottom: 20px;
    color: gray;
    padding-top: 20px;
}
.guest_cta_image {
    display: block;
    width: 90%;
    margin: 0px auto;
    border-radius: 54px;
    max-width: 350%;
}
.header-icon {
    width: 25px;
}
.menu-create-container,
.menu-explore-container,
.menu-learn-container,
.menu-myaccount-container {
    box-shadow: 0px 0px 7px #b5d2d3;
    border-radius: 18px;
    padding: 14px;
    margin: 20px auto;
}
.menu-section-header {
    font-family: Highgate-regular;
    font-size: 16px;
    color: #2268ae;
    font-weight: 600;
    letter-spacing: 0.5px;
}
.menu-section-content ul {
    list-style-type: none;
    padding-top: 7px;
    color: #32495b;
}
.menu-section-content ul li:hover {
    cursor: pointer;
}
.menu-section-content ul li {
    margin-top: 10px;
}
.menu-list-item {
    margin-left: -26px;
}

.menu-list-item i {
    margin-right: 5px;
}
.red-clickbait {
    background: #f44336;
    border-radius: 5px;
    padding: 0px 5px;
    color: white;
    font-weight: 600;
    font-size: 70%;
}
@media (min-width: 400px) {
    .guest_cta_text {
        font-size: 120%;
        max-width: 600px;
        margin: 0px auto;
    }
}
@media (min-width: 750px) {
    .menu-create-container,
    .menu-explore-container,
    .menu-learn-container,
    .menu-myaccount-container {
        float: left;
        width: 47.5%;
    }
    .menu-explore-container,
    .menu-myaccount-container {
        margin-left: 5%;
    }
}
@media (min-width: 768px) {
    #app_menu {
        height: 100vh;
    }
}
@media (max-width: 396px) {
    #app_menu {
        height: 125vh;
    }
}
.app-menu-email-link {
    font-size: 90%;
    color: #1e87f0;
}
</style>
