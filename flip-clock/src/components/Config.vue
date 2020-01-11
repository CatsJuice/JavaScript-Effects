<template>
  <main class="config-root" @scroll="scrollListener">
    <!--  -->
    <div class="label">Public</div>
    <div class="public-bgs bg-con" ref="publicList">
      <div
        @click="updateBg(index)"
        class="bg-item"
        v-for="(bg, index) in publicList"
        :key="bg.galary_id"
        :style="`background-image: url('${$server_root}/images/bgs/${bg.pic_name}')`"
      >
        <div class="config-card"></div>
      </div>
    </div>

    <div class="label">Private</div>
    <div class="private-bgs bg-con" ref="privateList">
      <div
        @click="updateBg(index + publicList.length)"
        class="bg-item"
        v-for="(bg, index) in privateList"
        :key="bg.galary_id"
        :style="`background-image: url('${$server_root}/images/bgs/${bg.pic_name}')`"
      >
        <div class="config-card">
          <div class="delete-btn" @click.stop="deleteBg(bg.galary_id)">
            <i class="el-icon-delete"></i>
          </div>
        </div>
      </div>

      <!-- 上传按钮 -->
      <div :class="['bg-item' ,'upload-img', disableUpload? 'disable' : '']">
        <span>Upload Custom Image</span>
        <i class="icon el-icon-upload2"></i>
        <input
          type="file"
          :disabled="disableUpload ? 'disabled': false"
          @change="uploadImg"
          accept="image/*"
        />
      </div>

      <div class="quit-to-login" @click="loginOut">{{ disableUpload ? 'Sign In' : 'Sign Out' }}</div>

      <div style="width:100%;height: 200px;"></div>
    </div>
  </main>
</template>

<script>
import { debounce } from "lodash";
import uploadMixin from "./mixins/uploadMixin";
export default {
  mixins: [uploadMixin],
  data() {
    return {
      publicList: [],
      privateList: [],
      disableUpload: true
    };
  },
  mounted() {
    this.getGalaryList();
    this.$axios.get(`${this.$server_root}/user/check`).then(response => {
      if (response.data.status !== 0) {
        // 未登录
        this.disableUpload = true;
      } else {
        this.disableUpload = false;
      }
    });
  },
  methods: {
    getGalaryList() {
      this.$axios.get(`${this.$server_root}/galary/getList`).then(res => {
        this.publicList = res.data.data["-1"];
        this.privateList = [];
        const keys = Object.keys(res.data.data).filter(el => el != "-1");
        if (keys.length > 0) {
          this.privateList = res.data.data[keys[0]];
        }
      });
    },

    scrollListener: debounce(function(event) {
      const bgs1 = this.$refs.publicList.children;
      const bgs2 = this.$refs.privateList.children;
      this.handleInAnima(bgs1);
      this.handleInAnima(bgs2);
    }, 0),
    handleInAnima(doms) {
      doms.forEach(dom => {
        const height = dom.getBoundingClientRect().top;
        if (height - 200 < this.windowHeight && height > this.windowHeight) {
          dom.classList.add("animateIn");
        }
      });
    },

    updateBg(value) {
      this.$store.commit("UPDATE", {
        constant: "activePageIndex",
        value
      });
    },

    loginOut() {
      this.$router.replace({ path: "/signin" });
    }
  },
  computed: {
    windowHeight() {
      return document.body.clientHeight;
    }
  },
  watch: {
    publicList: {
      deep: true,
      immediate: true,
      handler(value) {
        this.$store.commit("UPDATE", {
          constant: "publicList",
          value
        });
      }
    },
    privateList: {
      deep: true,
      immediate: true,
      handler(value) {
        this.$store.commit("UPDATE", {
          constant: "privateList",
          value
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.config-root {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow-y: auto;

  .bg-con {
    width: 100%;
    .bg-item {
      width: 100%;
      height: 100px;
      border-radius: 8px;
      margin-bottom: 20px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
      overflow: hidden;
      position: relative;

      font-size: 0.8rem;
      font-weight: bold;
      color: #e3e7e9;
      display: flex;
      align-items: center;
      justify-content: center;

      .config-card {
        width: 100%;
        height: 50px;
        position: absolute;
        bottom: -70px;
        box-shadow: 0px -5px 15px rgba(86, 101, 115, 0.192);
        background-color: #3a4046;
        transition: all 0.3s ease-in-out 0s;

        .delete-btn {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 1.2rem;
          background-color: #cd6155;
          box-shadow: -1px -10px 20px rgba(205, 97, 85, 0.774);
          position: absolute;
          right: 20px;
          top: 100px;
          transition: all 0.3s ease-in-out;

          &:hover {
            width: 50px;
            height: 50px;
            right: 15px;
            top: -25px;
          }
        }
      }

      &:hover {
        height: 120px;
        transition: all 0.4s ease-in-out 0.3s;
        .config-card {
          bottom: 0;
          .delete-btn {
            transition: all 0.4s ease-in-out 0.2s;
            top: -20px;
          }
        }
      }

      &.upload-img {
        background-color: #34495e;
        height: 50px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2) inset;
        position: relative;
        &:hover {
          letter-spacing: 1px;
          transition: all 0.2s ease-in-out 0s;
        }

        .icon {
          font-size: 1.2rem;
          margin-left: 20px;
        }

        input {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0;
          cursor: pointer;
        }
      }
    }
    .bg-item.disable {
      background-color: #aeb6bf;
      input {
        cursor: not-allowed;
      }
    }
    .quit-to-login {
      width: 100%;
      height: 48px;
      font-family: "ubuntu-medium";
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      border: 2px solid #34495e;
      color: #34495e;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      &:hover {
        background-color: #34495e;
        color: #fff;
        box-shadow: 0px 10px 13px rgba(52, 73, 94, 0.288);
      }
    }
  }

  .label {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-bottom: 20px;
    cursor: default;
    border-radius: 5px;
    border: 2px solid #e3e7e9;
    color: #34495e;
    font-family: "ubuntu-medium";
    font-weight: bold;
    &:hover {
      border: 2px solid #34495e;
    }
  }
}

.animateIn {
  animation: animateIn 1s ease 0.1s 1 normal;
}
@keyframes animateIn {
  0% {
    opacity: 0;
    transform: translateY(100px)
      matrix3d(0.9, 0, 0, 0, 0, 0.85, 0, 0.0015, 0, 0, 1, 0, 0, -10, 0, 1.1);
  }
  100% {
    opacity: 1;
    transform: translateY(0)
      matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
}

.config-root::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.config-root::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
.config-root::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.01);
  border-radius: 0;
  background: rgba(0, 0, 0, 0);
}
</style>