<template>
  <div class="login">
    <form action>
      <div class="input-items">
        <div class="input-item">
          <label for="username">Username:</label>
          <input name="username" v-model="username" placeholder="Input Username Here" />
        </div>

        <div class="input-item">
          <label for="password">Password:</label>
          <input
            name="password"
            v-model="password"
            type="password"
            placeholder="Input Password Here"
          />
        </div>

        <div class="input-item">
          <el-button
            id="signBtn"
            @click="login"
            :class="loginDisable? 'disable' : ''"
            :disabled="loginDisable"
          >Sign</el-button>
        </div>

        <span id="devider">or</span>

        <div class="input-item">
          <button id="enterBtn" @click="goIndex">Start Without Login</button>
        </div>

        <section class="error-tip">{{ error }}</section>
      </div>
    </form>

    <div class="login-bottom"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: undefined,
      password: undefined,
      error: ""
    };
  },
  methods: {
    login() {
      const params = {
        username: this.username,
        password: this.password
      };
      this.$axios({
        method: "get",
        url: `${this.$server_root}/user/signin`,
        params
      }).then(response => {
        if (response.data.status !== 0) {
          this.error = response.data.msg;
        } else {
          this.goIndex();
          this.$notify({
            title: "登录成功",
            message: "成功登录，可在面板中切换壁纸和上传",
            type: "success",
            position: "top-left",
            customClass: "zIndex9999"
          });
        }
      }).catch( err => {
          console.log(err)
      });
    },

    goIndex() {
      this.$router.push({ path: "/index" });
    }
  },
  computed: {
    loginDisable() {
      return (
        !this.username ||
        !this.password ||
        this.username.length === 0 ||
        this.password.length === 0
      );
    }
  },
  watch: {
    username() {
      this.error = "";
    },
    password() {
      this.error = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

* {
  transition: all 0.3s ease-in-out;
}

.input-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  font-family: "ubuntu-medium";
  margin-bottom: 20px;
  color: #333;
  label {
    width: 100%;
    margin: 10px 0 10px 0;
    font-size: 1rem;
    font-weight: bold;
    font-family: "ubuntu-medium";
    position: relative;
    padding-left: 18px;
    color: #5d6d7e;

    &::after {
      content: "";
      position: absolute;
      width: 10px;
      height: 100%;
      left: 0;
      top: 0;
      background-color: #5d6d7e;
      border-radius: 3px;
    }
  }

  input {
    width: 100%;
    height: 40px;
    border: 2px solid #5d6d7e;
    padding: 10px;
    font-family: "ubuntu-medium";
    font-size: 1.2rem;

    &:focus {
      outline: none;
      box-shadow: 0px 2px 14px rgba(90, 115, 141, 0.5);
    }
  }

  button {
    width: 100%;
    height: 40px;
    color: #5d6d7e;
    border: 2px solid #5d6d7e;
    background-color: transparent;
    font-family: "ubuntu-medium";
    font-size: 1.3rem;
    cursor: pointer;
    position: relative;
    display: block;

    span {
      display: block;
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      transition: all 0s ease 0s;
    }

    &:hover {
      background-color: #5d6d7e;
      color: #fff;
      letter-spacing: 1px;
    }
    &:active,
    &:focus {
      outline: none;
    }
  }
  button#signBtn {
    margin-top: 40px;
    line-height: 1px;
    border-radius: 0;
    &:hover {
      border: 2px solid #5d6d7e;
    }
  }
  button#enterBtn {
    font-size: 1rem;
  }
}

section.error-tip {
  color: #cd6155;
  text-align: right;
  font-weight: bold;
  font-size: 0.6rem;
}

#devider {
  display: block;
  height: 39px;
  width: 100%;
  text-align: center;
  font-family: "ubuntu-medium";
  color: #86909b;
  font-size: 1.1rem;
}

.login-bottom {
  width: 100%;
  height: 160px;
  transform: translateY(-50px);
  flex-shrink: 0;
}
</style>