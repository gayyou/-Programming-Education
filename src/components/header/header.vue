<template>
  <div class="header">
    <!-- 下面是头部第一行的操作 -->
    <div class="header-top">
      <div class="web-icon">
        <span>编程教育平台</span>
      </div>
      <div class="mode-choice">
        <span :class="$store.state.isCode ? 'mode-active' : 'mode-normal'">编码</span>
        <span :class="$store.state.isCode ? 'mode-normal' : 'mode-active'">推荐</span>
      </div>
    </div>
    <!-- 下面是头部第二行的内容 -->
    <div class="header-bottom">
      <div>
        <div class="icons-container">
          <div class="use-help">
            <img src="../../assets/icons/help.png" alt="">
          </div>
          <div class="cut-line">
            <img src="../../assets/icons/cut_line.png" alt="">
          </div>
          <div class="operate-change">
            <img src="../../assets/icons/revoke.png" alt="">
          </div>
          <div class="operate-change">
            <img class="restore-icon" src="../../assets/icons/restore.png" alt="">
          </div>
          <div class="cut-line">
            <img src="../../assets/icons/cut_line.png" alt="">
          </div>
          <div class="share-button">
            <img src="../../assets/icons/share.png" alt="">
          </div>
          <div class="update-button">
            <img src="../../assets/icons/save.png" alt="">
          </div>
        </div>
        <div class="user-operate-container">
          <span class="user-name">Weybn</span>
          <div class="user-icon">
            <img src="../../assets/1.jpg" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
%clearFloat::after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
}

%flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

$topColor: #fff;
$bgColor: #ED775A;

.header {
  font-family: 'HYZhuZiMuTouRen';
  @extend %clearFloat;
  
  width: 100%;

  .header-top {
    @extend %flex-center;

    position: relative;
    width: 100%;
    height: 0.7rem;
    background-color: $topColor;

    .web-icon {
      position: absolute;
      width: 2.5rem;
      height: 0.8rem;
      left: 0.1rem;
      top: 50%;
      transform: translateY(-50%);

      span {
        display: block;
        line-height: 0.8rem;
        font-size: 0.36rem;
        color: $bgColor;
        letter-spacing: 0.04rem;
      }
    }

    .mode-choice {
      .mode-active {
        background-color: $bgColor;
        color: #fff;
      }

      .mode-normal {
        background-color: $topColor;
        color: #9E9898;
      }

      span {
        cursor: pointer;
        display: block;
        float: left;
        margin-left: 1.2rem;
        width: 1.2rem;
        height: 0.48rem;
        line-height: 0.48rem;
        border-radius: 24px;
        color: #fff;
        margin-left: 0.5rem;
        text-align: center;
        font-size: 0.30rem;
        transition: all 0.75s ease;
      }
      span:hover {
        background-color: $bgColor;
        color: #fff;
      }
    }
  }

  .header-bottom {
    width: 100%;
    height: 0.52rem;
    background-color: $bgColor;

    div {
      float: right;

      .icons-container {
        float: left;
        margin-right: 0.3rem;

        div {
          @extend %flex-center;

          float: left;
          width: 0.4rem;
          height: 0.52rem;
          margin: 0 10px;
          
          img {
            cursor: pointer;
            width: 0.32rem;
            height: 0.32rem;
          }
          .restore-icon {
            margin-top: -0.04rem;
          }
        }

        .cut-line {
          img {
            cursor: none;
            width: 0.02rem;
            height: 0.18rem;
          }
        }
      }

      .user-operate-container {
        @extend %flex-center;
        
        float: left;
        width: 1.8rem;
        height: 0.52rem;
        margin-right: 0.1rem;

        .user-name {
          padding: 0 0.15rem;
          color: #fff;
          font-size: 0.2rem;
        }

        .user-icon {
          cursor: pointer;
          position: relative;
          width: 0.4rem;
          height: 0.4rem;
          border-radius: 50%;
          margin: 0 0.02rem;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
