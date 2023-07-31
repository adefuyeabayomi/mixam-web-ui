<template>
    <div
        :class="{ mobile_search_active: mobileSearchActive }"
        class="search-wrapper"
        v-if="$store.state.userLoggedIn"
    >
        <vs-button
            color="#cbe0ff"
            type="border"
            icon="fa-search"
            icon-pack="fas"
            @click="openSearch()"
        ></vs-button>
        <div :class="[searchClass]" class="search-container">
            <div class="sc-button-container">
                <vs-button
                    @click="closeSearch()"
                    color="#363b40"
                    type="filled"
                    icon="fa-times"
                    icon-pack="fas"
                ></vs-button>
            </div>
            <div class="sc-input-container">
                <vs-input
                    class="vs-search-input-c"
                    style="width: 100% !important"
                    placeholder="Search"
                    v-model="searchinput"
                />
            </div>
            <div class="sc-button-container">
                <vs-button
                    @click="searchValidator()"
                    color="gray"
                    type="border"
                    icon="fa-search"
                    icon-pack="fas"
                ></vs-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "top-search",
    data: function () {
        return {
            searchinput: "",
            searchClass: "hidden",
        };
    },
    computed: {
        mobileSearchActive() {
            return this.$store.state.mobileSearchActive;
        },
    },
    methods: {
        openSearch: function () {
            this.searchClass = "animate__animated animate__fadeIn";
        },
        closeSearch: function () {
            this.searchClass = "animate__animated animate__fadeOut";
            setTimeout(() => {
                this.searchClass = "hidden";
            }, 1000);
        },
        searchValidator: function () {
            if (this.searchinput == "") {
                this.$modal.show("dialog", {
                    title: "No Input.",
                    text: "Please input something to search for ",
                    buttons: [
                        {
                            title: "Okay",
                            handler: () => {
                                this.$modal.hide("dialog");
                                //this.$modal.
                            },
                        },
                        {
                            title: "Cancel",
                            handler: () => {
                                this.$modal.hide("dialog");
                                this.closeSearch();
                                //this.$modal.
                            },
                        },
                    ],
                });
            } else {
                this.searchFor();
            }
        },
        searchFor: function () {
            this.closeSearch();
            let hash = this.searchinput[0] == "#";
            this.$router.push({
                path: "/search",
                query: { hashsearch: hash, search: this.searchinput },
            });
            this.searchinput = "";
        },
    },
};
</script>
<style lang="scss">
.search-wrapper {
    padding: 0px 10px;
}
.search-container {
    position: absolute;
    padding: 14px;
    background: #6ea8ff;
    color: white;
    width: 100%;
    left: 0%;
    top: 0%;
    z-index: 1000;
    height: 60px;
    display: flex;
}
.sc-input-container {
    flex: 1;
    position: relative;
    padding-left: 5px;
    padding-right: 5px;
}
.sc-button-container {
    width: max-content;
}
.vs-search-input-c input {
    color: gray !important;
}
.sc-button-container .includeIconOnly {
    width: 30px !important;
    height: 31px !important;
}
.hidden {
    display: none;
}
</style>
