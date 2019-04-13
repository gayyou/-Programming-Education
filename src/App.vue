<template>
  <div id="app">
    <head-nav></head-nav>
    <div class="main">
      <left-list class="left-list"></left-list>
      <svg-canvas class="svg-canvas"></svg-canvas>
    </div>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <drag></drag> -->
    <!-- <tests></tests> -->
  </div>
</template>

<script>
import drag from './components/dragComponent/dragComponent.vue'
import tests from './components/svgCanvas/svgCanvas.vue'
import headNav from './components/header/header.vue'
import leftList from './components/list/list.vue'
import svgCanvas from './components/svgCanvas/svgCanvas.vue'

export default {
  name: 'app',
  components: {
    drag,
    tests,
    'head-nav': headNav,
    'left-list': leftList,
    'svg-canvas': drag
  }
}
</script>

<style <style lang="scss">
@font-face {
  font-family: 'SourceHanSansCN-Regular';
  src: url('assets/fonts/SourceHanSansCN-Regular.ttf') format('truetype');
}
@font-face {
  font-family: 'HYZhuZiMuTouRen';
  src: url('assets/fonts/HYZhuZiMuTouRenW-2.ttf') format('truetype');
}
/*
初始化css
*/
body,ol,ul,h1,h2,h3,h4,h5,h6,p,th,td,dl,dd,form,fieldset,legend,textarea,select,button{margin:0; padding:0;} 
body {
    font-size: 15px;
    font-family: 'Microsoft YaHei';   
    font-weight: 500;
    color: #000000;
}
a {
    text-decoration:none;
    resize: none;
    outline: none;
} 
em {
    font-style:normal;
} 
li{
    list-style:none;
} 
img{
    border:0; vertical-align:middle;
} 
table{
    border-collapse:collapse;
    border-spacing:0;
} 
p {
    word-wrap:break-word;
}
input {
    outline: none;
    resize: none;
    border: none 0;
}
button {
    border: none;
    outline: none;
    cursor:pointer;             
}

%absolute-center {
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}

%flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

%clearFloat::after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
}

#app {
  font-family: 'SourceHanSansCN-Regular';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 754px;

  .main {
    display: flex;
    flex: 1;
    overflow: hidden;

    .left-list {
      width: 1.52rem;
      height: 100%;
    }

    .svg-canvas {
      flex: 1;
      height: 100%;
    }
  }
}
g {
  cursor: pointer;
}
</style>
