<template>
    <header>
        <div class="topbar-container">
            <div class="app-logo-container">
                <div class="app-logo-container-main">
                    <img class="mixam-logo" src="../assets/logo.png" />
                </div>
            </div>
            <div class="logo-container">
                <p class="company-name">Mixam</p>
                <p class="company-name-follow">BUSINESS</p>
            </div>
            <div class="util-container">
                <!--<div class="utils-wrapper" v-if="$store.state.userLoggedIn">
                     <div class="user-account-shortcut">
                        <div class="user-icon-container">
                            <i class="fas fa-user-circle"></i>
                        </div>
                    </div>

                    <div @click="openNotification()" class="user-notification-icon">
                        <div class="notification-icon-container">
                            <i class="fas fa-bell"></i>
                        </div>
                        <div class="notification-badge-container">
                            <div class="notification-count">
                                <p class="notification">1</p>
                            </div>
                        </div>
                    </div>
                </div> -->
                <div class="auth-wrapper" v-if="!$store.state.userLoggedIn">
                    <div class="login-container">
                        <div class="login-position-refrence">
                            <button
                                @click="openLogin()"
                                class="top-login-button"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                    <div class="signup-container">
                        <div class="signup-position-refrence">
                            <button
                                @click="openSignup()"
                                class="top-signup-button"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
                <chat-comp></chat-comp>
                <top-search></top-search>
            </div>
            <div class="hamburger-menu-container">
                <span class="menu-text">MENU</span>
                <div class="ham-wrapper">
                    <tasty-burger-button
                        v-if="$store.state.hamvis"
                        style="display: inline"
                        :type="ham.buttonType"
                        :active="active"
                        :size="ham.size"
                        :color="ham.color"
                        :active-color="ham.activeColor"
                        v-on:toggle="onToggle"
                    />
                </div>
            </div>
        </div>
    </header>
</template>
<script>
import { TastyBurgerButton } from "vue-tasty-burgers";
import topSearch from "./top-search.vue";
import topMessageIconVue from "./top-message-icon.vue";

export default {
    data() {
        return {
            name: "topbar",
            ham: {
                buttonType: "elastic",
                size: "xs",
                color: "#ffffff",
                activeColor: "#fff",
            },
            active: this.$store.state.menuOpen,
        };
    },
    methods: {
        onToggle: function () {
            this.$store.commit("updatemenustatus");
        },
        openLogin: function () {
            this.$store.commit("openlogin");
        },
        openSignup: function () {
            this.$store.commit("opensignup");
        },
        openNotification: function () {
            this.$store.commit("updatenotificationopen");
        },
    },
    computed: {},
    components: {
        "tasty-burger-button": TastyBurgerButton,
        topSearch,
        chatComp: topMessageIconVue,
    },
};
</script>
<style lang="scss">
.row {
    margin: 0px !important;
}
header {
    height: 60px;
    background-color: #1e87f0;
    position: fixed;
    top: 0px;
    z-index: 10;
    @include padding-left2;
    @include padding-right2;
    box-shadow: 0px 0px 3px #9eccd1;
    border-bottom: inset;
}
.mixam-logo {
    width: 70px;
}
.topbar-container {
    height: inherit;
    display: flex;
    align-items: center;
}
.logo-container,
.search-wrapper,
.auth-wrapper,
.utils-wrapper {
    width: max-content;
    height: max-content;
}

@media (min-width: 0px) {
    .logo-container {
        height: inherit;
        flex: 1;
        padding-top: 7px;
    }
    .util-container {
        height: inherit;
    }
    .hamburger-menu-container {
        height: inherit;
        flex: 1;
        padding: 20px 10px 0px 10px;
        display: flex;
    }
    .menu-text {
        display: block;
        padding-right: 4px;
        padding-top: 2px;
        font-weight: 600;
        color: white;
        font-size: 96%;
        font-family: "Antipasto-Bold";
    }
}
@media (max-width: 500px) {
    header {
        padding-left: 8px;
        padding-right: 8px;
    }
    .menu-text {
        display: none !important;
    }
    .company-name-follow {
        font-size: 100%;
        letter-spacing: 3px !important;
    }
    .auth-wrapper {
        padding-right: 0px !important;
    }
    .hamburger-menu-container {
        padding-right: 0px !important;
    }
}

.util-container {
    padding-top: 13px;
}
.util-container div {
    float: right;
}

.auth-wrapper {
    display: flex;
    padding: 0px 10px;
}
.utils-wrapper {
    display: flex;
    font-size: 128%;
    padding: 0px 10px;
    padding-top: 3px;
}
.notification {
    text-align: center;
    width: auto;
}
.notification-badge-container {
    padding: 0px 2px 0px 2px;
    font-size: 10px;
    background-color: white;
    height: 14px;
    border-radius: 30px;
    position: relative;
    bottom: 30px;
    left: 9px;
}
.company-name,
.company-name-follow {
    margin: 0px;
    font-family: Montserrat-Bold;
}
.company-name-follow {
    letter-spacing: 6px;
    font-size: 110%;
    color: white;
}

.top-login-button {
    border: 0px;
    padding: 5px 15px 5px 15px;
    border-radius: 8px;
    font-family: signika-regular;
    letter-spacing: 1px;
    background: white;
    color: #1e87f0;
}
.top-login-button:hover,
.top-signup-button:hover {
    color: white;
    background: transparent;
    box-shadow: 0px 0px 10px white;
    cursor: pointer;
    border-radius: 10px;
}
.top-signup-button:hover {
    width: 70px;
}
.top-signup-button {
    padding: 5px;
    font-family: signika-regular;
    letter-spacing: 1px;
    border: 0px;
    background-color: transparent;
    color: white;
}
.app-logo-container {
    width: max-content;
}
.app-logo-container-main {
    padding: 5px;
    padding-right: 10px;
}
@media (min-width: 700px) {
    .mixam-logo {
        width: 70px;
    }
}
@media (min-width: 1024px) {
    .mixam-logo {
        width: 60px;
    }
}
@media (max-width: 700px) {
    .mixam-logo {
        width: 90px;
    }
}
@media (max-width: 600px) {
    .mixam-logo {
        width: 100px;
    }
}
@media (max-width: 500px) {
    .mixam-logo {
        width: 90px;
    }
}
@media (max-width: 400px) {
    .mixam-logo {
        width: 100px;
    }
}
</style>
