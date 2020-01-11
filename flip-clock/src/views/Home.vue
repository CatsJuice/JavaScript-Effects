<template>
  <div class="home">
    <!-- 背景 -->
    <div class="bg">
      <swiper
        style="width:100%;height:100%;"
        :options="swiperOption"
        ref="mySwiper"
        @someSwiperEvent="callback"
      >
        <!-- slides -->
        <swiper-slide
          v-for="img in imgs"
          :key="img.galary_id"
          :style="`
          background-color: #AEB6BF;
          background-image: url('${$server_root}/images/bgs/${img.pic_name}');
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
        `"
        ></swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination" slot="pagination" v-show="showAll"></div>
        <!-- <div class="swiper-button-prev" slot="button-prev"></div> -->
        <!-- <div class="swiper-button-next" slot="button-next"></div> -->
        <!-- <div class="swiper-scrollbar" slot="scrollbar"></div> -->
      </swiper>
    </div>

    <!-- 设置面板 -->
    <input id="switch-btn-ckbox" type="checkbox" v-model="showSettingPanel" v-show="showAll" />
    <div class="switch-btn" v-show="showAll">
      <div>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <transition enter-active-class="blurIn" leave-active-class="blurOut">
      <div class="mask" v-if="showSettingPanel"></div>
    </transition>

    <div class="setting-panel">
      <setting-panel />
    </div>

    <!-- 时钟容器 -->
    <div class="clock-container" @dblclick="toggleAllTools">
      <flip-clock :options="options" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { FlipClock } from "@mvpleung/flipclock";
import SettingPanel from "./SettingPanel";

import clockMixin from "./mixins/clock";
import bgMixin from "./mixins/bg";
import configMixin from "./mixins/config";

export default {
  name: "home",
  components: {
    FlipClock,
    SettingPanel
  },
  data() {
    return {
      options: {
        clockFace: "TwentyFourHourClock"
      },
      showAll: true
    };
  },
  mixins: [clockMixin, bgMixin, configMixin],
  methods: {
    toggleAllTools() {
      this.showAll = !this.showAll
      if (!this.showAll) {
        this.showSettingPanel = false
      }
    }
  }
};
</script>

<style lang="scss">
@import "~@/assets/style/animation.scss";

.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background-color: #566573;

  .clock-container {
    transform: scale(1);
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 999;
    transform: translate(-50%, -50%);
    .flip-clock-wrapper ul li a div div.inn {
      background-color: #353535;
    }
    .flip-clock-divider .flip-clock-label {
      color: #f00 !important;
      display: none;
    }

    ul.flip {
      // width: 60px;
      // height: 90px;
      font-family: "MYFONT";
      font-weight: normal;
    }
    ul.flip li a {
      perspective: 150px; /* ！！！！！！！！ */
    }
  }

  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    backdrop-filter: blur(12px);
    background-color: rgba(255, 255, 255, 0.3);
    z-index: 2222;
    transition: all 0.3s ease-in-out;
  }

  // 设置面板
  .switch-btn,
  #switch-btn-ckbox {
    position: fixed;
    right: 20px;
    top: 20px;
    width: 44px;
    height: 44px;
    border: none;
  }
  .switch-btn {
    z-index: 3333;
    background-color: transparent;
    transition: all 0.3s ease-in-out;
    & > div {
      width: 100%;
      height: 100%;
      position: relative;
      transition: all 0.3s ease-in-out;
    }
    span {
      display: inline-block;
      width: 30px;
      height: 2px;
      position: absolute;
      left: 7px;
      background-color: #fff;
      transition: all 0.3s ease-in-out;
      &:nth-child(1) {
        top: 12px;
      }
      &:nth-child(2) {
        top: 21px;
      }
      &:nth-child(3) {
        top: 30px;
      }
    }
  }
  #switch-btn-ckbox {
    z-index: 3334;
    cursor: pointer;
    opacity: 0;
    &:hover {
      & ~ .switch-btn {
        background-color: #e6e6e6;
        span {
          background-color: #272727;
        }
      }
    }
    &:checked ~ .switch-btn {
      & > div {
        transform: rotate(180deg);
      }
      span {
        background-color: #272727;
      }
      span {
        &:nth-child(1) {
          transform: rotate(-45deg);
          left: 5px;
          width: 15px;
          top: 15.5px;
        }
        &:nth-child(3) {
          transform: rotate(45deg);
          left: 5px;
          width: 15px;
          top: 26.5px;
        }
      }
    }
    &:checked ~ .setting-panel {
      right: 0;
    }
    // &:checked ~ .mask {
    //   display: block;
    //   backdrop-filter: blur(10px);
    //   background-color: rgba(255,255,255,.5);
    //   opacity: 1;
    // }
  }

  .setting-panel {
    width: 350px;
    margin-top: 10px;
    margin-right: 10px;
    height: calc(100% - 20px);
    // height: 100%;
    background-color: #fff;
    border-radius: 5px;
    position: fixed;
    z-index: 3332;
    top: 0;
    transition: all 0.3s ease-in-out;
    right: -400px;
    box-shadow: -5px 0px 10px rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }
}
</style>
