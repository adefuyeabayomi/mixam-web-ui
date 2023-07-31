import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuesax from "vuesax";
import Vmodal from "vue-js-modal";
import checkView from "vue-check-view";
//import Scrollspy from 'vue2-scrollspy';
import VueScrollTo from "vue-scrollto";
//import Cloudinary from "cloudinary-vue";
// use default options

//import VueMyToasts from 'vue-my-toasts'
//import 'vue-my-toasts/dist/vue-my-toasts.css'
//import BootstrapComponent from "vue-my-toasts/src/components/toasts/BootstrapComponent";
//import VueBell from "vue-notification-bell";

//import axios from "axios";
import "../public/uikit.css";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import "vue-js-modal/dist/styles.css";
import "../node_modules/vuesax/dist/vuesax.css";
import "../public/loader.css";

import "dtoaster/dist/dtoaster.css";
//import DToaster from "dtoaster";
//import ToasterPresets from "dtoaster/presect.json"; //Your predefined toasts presets (optionally)
/*const ToasterPresets = [
  {
    name: "success",
    icon: "fas fa-check",
    icon_size: "20px",
    duration: "2500",
    background: "rgba(32,105,156,.9)",
    height: "75px",
    color: "#FFFFFF",
    show_progress_timeout: "true",
    progress_background: "#5a9fdc",
    progress_thumb_bg: "rgba(32,105,156,.9)",
    "width":"400px"
  },
  {
    name: "error",
    icon: "mdi mdi-close-circle-outline",
    icon_size: "32px",
    duration: "2500",
    background: "#ff1e1e",
    height: "75px",
    color: "#FFFFFF",
    show_progress_timeout: "true",
    progress_background: "rgb(255 175 175)",
    progress_thumb_bg: "#ff1e1e",
  },
];*/
//Vue.use(Scrollspy);
Vue.use(checkView);
Vue.use(VueScrollTo, {
  container: "body",
  duration: 900,
  easing: "ease",
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true,
});
/*Vue.use(DToaster, {
  presets: ToasterPresets,
  position: "top-left", //toasts container position on the screen
  containerOffset: "10px", //toasts container offset from top/bottom of the screen
});*/

Vue.use(Vmodal, {
  dialog: true,
  dynamicDefaults: { draggable: true, resizable: true },
});
Vue.use(vuesax);
Vue.config.productionTip = false;

let app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
app;
