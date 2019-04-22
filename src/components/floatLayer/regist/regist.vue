<template> 
  <div class="regist-container">
    <div class="regist-close"><img src="@/assets/icons/close.png" alt="" @click="closeLayer"></div>
    <div class="regist-title">
      <span> 加入我们</span>
      <span>创造出你的方案</span>
    </div>
    <div class="regist-cutline"></div>
    <div class="regist-account">
      <label for="regist-account"><span>手机号</span></label>
      <input id="regist-account" type="text">
    </div>
    <div class="regist-password">
      <label for="regist-password"><span>密码</span></label>
      <input id="regist-password" type="password">
    </div>
    <button class="regist-button" id="regist-button">注册</button>
  </div>
</template>

<script>
export default {
  methods: {
    closeLayer(event) {
      this.$store.state.showRegist = false;
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

.regist-container {

  width: 5.66rem;
  height: 6.1rem;
  background-color: #fff;
  border-radius: 36px;
  overflow: hidden;

  .regist-close {
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

  .regist-title {
    @extend %clear-float;
    display: block;
    width: 100%;
    font-family: 'HYZhuZiMuTouRen';
    font-size: 0.6rem;
    color: $themeColor;

    span {
      white-space: pre;
      display: block;
      width: 5rem;
      margin: 0 auto;
      text-align: center;
      // margin-left: 0.3rem;
    }
  }

  .regist-cutline {
    width: 5.06rem;
    margin: 0.15rem auto 0.25rem auto;
    height: 1.5px;
    background-color: #f1f1f1;
  }

  .regist-account, .regist-password {
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

  .regist-password {
    label {
      margin-left: 0.1rem; 
    }
  }

  .regist-button {
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
  .regist-button:hover {
    opacity: 0.5;
  }
}
</style>
