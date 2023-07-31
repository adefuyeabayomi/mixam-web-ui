<template>
    <!--What you need to know about this component-->
    <div class="fb-login-btn" id="fb-login-btn">
        <p class="fb-btn-text">
            <i class="fab fa-facebook"></i> Continue with Facebook
        </p>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            name: "facebook-login",
        };
    },
};
</script>

<style lang="scss">
.fb-login-btn {
    width: 200px;
    margin: 5px auto 5px auto;
    border-radius: 10px;
    padding: 4px;
    background-color: #026dc1;
}
.fb-login-btn i {
    position: relative;
    top: 0px;
    padding-left: 2px;
    color: white;
}
.fb-btn-text {
    font-weight: 700;
    color: white;
}
</style>
