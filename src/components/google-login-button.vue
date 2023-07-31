<template>
    <!--What you need to know about this component-->
    <div class="google-login-btn" id="google-login-btn">
        <p>
            <span class="google-img-wrapper"
                ><img
                    src="../assets/icons8-google-48.png"
                    class="google-btn-img" /></span
            ><span class="google-btn-text"> Continue with Google </span>
        </p>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            name: "google-login",
        };
    },
};
</script>

<style lang="scss">
.google-login-btn {
    width: 200px;
    margin: 0px auto 8px auto;
    border: 1px solid #97bfff;
    border-radius: 10px;
}
.google-login-btn:hover {
    cursor: pointer;
}
.google-btn-img {
    width: 21px;
    padding-left: 2px;
    position: relative;
    top: 1px;
}

.google-btn-text {
    font-weight: 700;
    position: relative;
    top: 3px;
    color: #0f65dc;
}
.google-img-wrapper {
    border-right: 1px solid #b9d4eb;
    height: 27px;
    display: inline-block;
    border-radius: 10px;
    width: 28px;
    padding-left: 2px;
}
</style>
