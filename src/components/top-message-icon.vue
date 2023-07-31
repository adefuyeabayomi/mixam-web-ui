<template>
    <div id="message-icon" v-if="$store.state.userLoggedIn">
        <span class="message-badge" v-if="newMessagesCount > 0">{{
            count
        }}</span>
        <vs-button
            @click="goToChats()"
            color="#0e447a"
            type="filled"
            icon="fa-comment-dots"
            icon-pack="fas"
        >
        </vs-button>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            MID: JSON.parse(window.localStorage.getItem("userlogindata")).MID,
            DID: JSON.parse(window.localStorage.getItem("userlogindata")).DID,
            newMessagesCount: 0,
            count: 0,
        };
    },
    computed: {
        chatHistory: function () {
            return this.$store.state.chatHistory;
        },
        chatsig: function () {
            return this.$store.state.historyChangeSignal2;
        },
    },
    methods: {
        goToChats: function () {
            this.$router.push({
                path: "/my-chats",
            });
        },
        sortNewMessages: function () {
            let chatHistory = this.$store.state.chatHistory;
            let count = 0;
            for (let each of chatHistory) {
                if (each.lastMsgSentBy !== this.MID) {
                    count += each.unreadMsgCount;
                }
            }

            if (count < 20) {
                this.count = count;
            } else {
                this.count = "19+";
            }
            this.newMessagesCount = count;
            this.$store.commit("reformatHCS2");
        },
    },
    created: function () {
        setTimeout(() => {
            this.sortNewMessages();
        }, 4000);
    },
    watch: {
        chatsig(newVal, oldVal) {
            console.log("new Val detected for chat history", newVal);
            if (newVal !== "") {
                this.sortNewMessages();
            } else {
                console.log("idle history update");
            }
        },
    },
};
</script>

<style lang="scss">
#message-icon {
    width: max-content;
}
.message-badge {
    padding: 2px 5px;
    background: #ff3d3d;
    color: white;
    border-radius: 10px;
    z-index: 1;
    position: relative;
    right: 10px;
    bottom: 10px;
    font-size: 78%;
    font-weight: 600;
}
</style>
