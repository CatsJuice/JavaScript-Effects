<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import './assets/ttf/font.css';
body,html {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
* {
  box-sizing: border-box;
}
.el-notification {
  z-index: 9999999 !important;
}
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.zIndex9999 {
  z-index: 9999;
}
</style>
