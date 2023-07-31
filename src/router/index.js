import Vue from "vue";
import VueRouter from "vue-router";
import home from "../views/home-page.vue";
import apploadingstate from "../views/App-loadingstate.vue";
//import explore from "../views/explore.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: home,
  },
  {
    path: "/explore-main",
    name: "explore-main",
    component: () => import("../views/explore-main.vue"),
  },
  {
    path: "/",
    name: "apploadingstate",
    component: apploadingstate,
  },
  {
    path: "/searchresult",
    name: "searchresult",
    component: () => import("../views/search-result.vue"),
  },
  {
    path: "/create-main",
    name: "create-main",
    component: () => import("../views/create-main.vue"),
  },
  {
    path: "/create-post",
    name: "create-post",
    component: () => import("../views/create-post.vue"),
  },
  {
    path: "/create-article",
    name: "create-article",
    component: () => import("../views/create-article.vue"),
  },
  {
    path: "/create-course",
    name: "create-course",
    component: () => import("../views/create-business-course.vue"),
  },
  {
    path: "/create-product-showcase",
    name: "create-product-showcase",
    component: () => import("../views/create-product-showcase.vue"),
  },
  {
    path: "/learn-main",
    name: "learn-main",
    component: () => import("../views/learn-main.vue"),
  },
  {
    path: "/notifications",
    name: "notifications",
    component: () => import("../views/notification-page.vue"),
  },
  {
    path: "/my-account",
    name: "my-account",
    component: () => import("../views/myaccount-main.vue"),
  },
  {
    path: "/view-profile",
    name: "view-profile",
    component: () => import("../views/profile-render.vue"),
  },
  {
    path: "/full-post",
    name: "full-post-page",
    component: () => import("../views/post-render.vue"),
  },
  {
    path: "/full-article",
    name: "full-article-page",
    component: () => import("../views/article-render.vue"),
  },
  {
    path: "/full-course",
    name: "full-course-page",
    component: () => import("../views/course-render.vue"),
  },
  {
    path: "/classroom",
    name: "classroom-page",
    component: () => import("../views/classroom.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/profile-render.vue"),
  },
  {
    path: "/my-drafts",
    name: "my-drafts",
    component: () => import("../views/drafts-page.vue"),
  },
  {
    path: "/login-settings",
    name: "login-settings",
    component: () => import("../views/login-settings.vue"),
  },
  {
    path: "/privacy",
    name: "privacy",
    component: () => import("../views/privacy-page.vue"),
  },

  {
    path: "/help-center",
    name: "help-center",
    component: () => import("../views/help-center.vue"),
  },

  {
    path: "/terms-and-conditions",
    name: "terms-and-conditions",
    component: () => import("../views/terms-and-conditions.vue"),
  },
  {
    path: "/feedback-and-complaint",
    name: "feedback-and-complaint",
    component: () => import("../views/feedback-and-complaint.vue"),
  },
  {
    path: "/edit-profile",
    name: "edit-profile",
    component: () => import("../views/edit-profile.vue"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../views/search-result.vue"),
  },
  {
    path: "/my-chats",
    name: "my-chats",
    component: () => import("../views/my-chats.vue"),
  },
  {
    path: "/chat",
    name: "chat",
    component: () => import("../views/chat.vue"),
  },
  {
    path: "/admin/update-message/",
    name: "add-admin-message",
    component: () => import("../views/add-admin-message.vue"),
  },
  /*
  {
    path: "",
    name : "",
    component : () => import("../views/")
  },
  */
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (window.userInit) {
    window.userInit = false;
    next({ name: "apploadingstate" });
  } else next();
});

export default router;
