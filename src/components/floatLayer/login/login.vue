<template> 
  <div class="login-container">
    <div class="login-close"><img src="@/assets/icons/close.png" alt="" @click="closeLayer"></div>
    <div class="login-title">
      <span>欢迎回来！</span>
    </div>
    <div class="login-cutline"></div>
    <div class="login-account">
      <label for=""><span>手机号</span></label>
      <input id="login-account" type="text">
    </div>
    <div class="login-password">
      <label for=""><span>密码</span></label>
      <input id="login-password" type="password">
    </div>
    <button class="login-button" id="login-button">登陆</button>
  </div>
</template>

<script>
export default {
  methods: {
    closeLayer(event) {
      this.$store.state.showLogin = false;
    }
  }
}
</script>

<style lang="scss" scoped>
%clear-float::after {
  content: "";
  display: block;
  clear: both;
}
$themeColor: #ed775a;

.login-container {

  width: 5.66rem;
  height: 5.5rem;
  background-color: #fff;
  border-radius: 36px;
  overflow: hidden;

  .login-close {
    width: 100%;
    height: 0.44rem;
    img {
      cursor: pointer;
      display: block;
      width: 0.44rem;
      height: 0.44rem;
      float: right;
      margin-right: 0.2rem;
      margin-top: 0.1rem
    }
  }

  .login-title {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 0.8rem;
    font-family: 'HYZhuZiMuTouRen';
    font-size: 0.6rem;
    color: $themeColor;

    span {
      display: block;
      margin-left: 0.3rem;
    }
  }

  .login-cutline {
    width: 5.06rem;
    margin: 0.15rem auto 0.25rem auto;
    height: 1.5px;
    background-color: #f1f1f1;
  }

  .login-account, .login-password {
    font-family: 'SourceHanSansCN-Regular';
    margin-top: 0.2rem;
    width: 100%;

    label {
      display: block;
      width: 2rem;
      margin-left: 0.2rem;
      margin-top: 0.15rem;

      span {
        font-size: 0.24rem;
        color: #373f53;
      }
    }

    input {
      width: 4rem;
      height: 0.55rem;
      margin: 0 auto;
      border-radius: 24px;
      text-indent: 0.2rem;
      border: 2px solid #f1f1f1;
      transition: all .5s ease;
      font-size: 0.24rem;
    }

    input:focus {
      border: 2px solid #F7947B;
    }

  }

  .login-password {
    label {
      margin-left: 0.1rem; 
    }
  }

  .login-button {
    font-family: 'SourceHanSansCN-Regular';
    display: block;
    font-size: 0.28rem;
    color: #fff;
    background-color: $themeColor;
    width: 2.1rem;
    height: 0.72rem;
    border-radius: 0.36rem;
    margin: 0.4rem auto;
    transition: all .5s ease;
  }
  .login-button:hover {
    opacity: 0.5;
  }
}
</style>
