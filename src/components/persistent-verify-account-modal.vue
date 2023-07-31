<template>
    <div>
        <modal
            name="verifyaccount"
            height="auto"
            width="90%"
            :max-width="maxWidth"
            :adaptive="true"
            @closed="closeVerifyAccount()"
            :clickToClose="false"
        >
        </modal>
    </div>
</template>

<script>
// if login type == manual verification needed else, no verification needed if logged in with an app
export default {
    methods: {
        closeVerifyAccount() {},
    },
};
</script>

<style lang="scss"></style>
