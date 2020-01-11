<template>
  <div style="height:100%;">
    <header>{{ header }}</header>
    <div class="bg-con"></div>
    <main style="height:100%;">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      header: ""
    };
  },
  mounted() {
    this.checkLoginStatus();
  },
  methods: {
    checkLoginStatus() {
      this.$axios.get(`${this.$server_root}/user/check`).then(response => {
        if (response.data.status !== 0) {
          // 未登录
          if (this.$route.name !== "signin") {
            this.$router.push({ path: "/signin" });
          }
          this.$notify({
            title: "未登录",
            message: "在右侧登录来切换壁纸",
            type: 'warning',
            position: "top-left",
          });
        } else {
          if (this.$route.name !== "config") {
            this.$router.push({ path: "/index" });
          }
        }
      });
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        if (val.name === "config") this.header = "Configuration";
        else if (val.name === "signin") this.header = "Sign IN";
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  width: calc(100% - 50px);
  height: 44px;
  line-height: 44px;
  margin: 13px 0;
  padding-left: 15px;
  font-family: "ubuntu-medium";

  font-weight: bold;
  font-size: 1.4rem;
  color: #34495e;
  border-left: 10px solid #34495e;
}
.bg-con {
  width: 100%;
  height: 70px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff;
  // background-color: rgb(245, 245, 245);
  z-index: -1;
}
</style>