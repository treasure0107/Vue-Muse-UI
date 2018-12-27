<template>
  <div class="login-container">
    <img src="../../assets/logo-icon.png" alt="" class="img1">
    <h1 class="title" slot="title">登录FUU</h1>
    <mu-form ref="form" :model="ruleForm" class="mu-demo-form">
      <mu-form-item prop="account">
        <mu-text-field v-model="ruleForm.account" prop="username" placeholder="请输入手机号码"></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="account">
        <div id="sc">
        </div>
      </mu-form-item>
      <!--<mu-form-item prop="ImgCode">
        <mu-text-field v-model="ruleForm.ImgCode" prop="username" placeholder="图形验证码">
          <img :src="ImgCode" alt="" class="image-code" @click.stop="changeImgCode();"/>
        </mu-text-field>
      </mu-form-item>-->
      <mu-form-item prop="mobile_code">
        <mu-text-field v-model="ruleForm.mobile_code" prop="username" placeholder="短信验证码">
          <span class="msg-btn" v-dbClick @click.stop="sendMsgCode();" v-if="!sendMsgDisabled">发送验证码</span>
          <span class="msg-btn btn2"
                v-if="sendMsgDisabled">
            {{time + 's'}}
          </span>
        </mu-text-field>
      </mu-form-item>
      <!--<mu-form-item prop="password">-->
      <!--<mu-text-field type="password" v-model="ruleForm.password" prop="password" placeholder="密码"></mu-text-field>-->
      <!--</mu-form-item>-->
      <!--<mu-form-item prop="isAgree">-->
      <!--<mu-checkbox label="记住账号" v-model="ruleForm.checked" @change="remberAcount"></mu-checkbox>-->
      <!--<a href="/#/FindPwd" class="forget-pwd">忘记密码</a>-->
      <!--</mu-form-item>-->
      <mu-form-item>
        <mu-button v-dbClick @click.stop="submitForm" class="login-btn">登录</mu-button>
      </mu-form-item>
      <!--<mu-form-item>-->
      <!--<h3 class="ljzc-title">-->
      <!--<router-link to="/Register">立即注册</router-link>-->
      <!--</h3>-->
      <!--</mu-form-item>-->
    </mu-form>
  </div>
</template>
<script type="text/babel">
  import "@/styles/register.scss";
  import {baseUrl,imgBaseUrl} from "@/config/env";
  import PathNav from "@/components/PathNav";
  export default {
    data(){
      return {
        ruleForm: {
          account: '',
          password: '',
          mobile_code: "",
          ImgCode: "",
          checked: false,
          imgCodeKey: "",
        },
        ImgCode: '',
        sendMsgDisabled: false,
        time: 60,
        token:'',
        sessionId: '',
        sig: '',
      }

    },
    mounted(){
      if (this.$route.query.tel) {
        this.ruleForm.account = this.$route.query.tel;
      }
      else if (localStorage.getItem("Account")) {
        this.ruleForm.account = localStorage.getItem("Account");
      }
      this.ruleForm.checked = (localStorage.getItem("remberAcount") == "true") ? true : false;
      var self = this;
      window.onload = function(){
        var ic = new smartCaptcha({
          renderTo: '#sc',
          width: '100%',
          secvrf_layout:true,
          height: 42,
          default_txt: '点击按钮开始智能验证',
          success_txt: '验证成功',
          fail_txt: '验证失败，请在此点击按钮刷新',
          scaning_txt: '智能检测中',
          success: function(data) {
            console.log(NVC_Opt.token)
            console.log(data.sessionId);
            console.log(data.sig);
            self.token = NVC_Opt.token;
            self.sessionId = data.sessionId;
            self.sig = data.sig;
          },
        });
        ic.init();
      }
    },
    methods: {
      /*发送短信验证码*/
      sendMsgCode(){
        try {
          if (this.ruleForm.account.length == 0) {
            this.$until.tostMsg("手机号不能为空！");
            return false;
          }
          if (!this.$until.isMobile(this.ruleForm.account)) {
            this.$until.tostMsg("输入的手机格式有误！");
            return false;
          }
          if (!this.token) {
            this.$until.tostMsg("请先点击按钮智能认证！");
            return false;
          }
          let data = {
            scene: "send_mobile_captcha",
            mobile: this.ruleForm.account,
            sig: this.sig,
            token: this.token,
            session_id: this.sessionId,
          }
          this.$until.getMsgCode(data, (res) => {
            if (res.data.code == 1) {
              if (this.$until.responesValidate(res)) {
                this.intervalTimer();
                this.$toast.success(res.data.msg || "发送成功！");
                return false;
              }
            } else {
              this.$until.tostMsg(res.data.msg || "操作失败！", (result) => {
                if (result == true) {
                  this.changeImgCode();
                  this.time = 60;
                }
              });
            }
          });
        } catch (ex) {
          this.$until.consoleLog(ex);
        }
      },
      /*倒计时*/
      intervalTimer(){
        this.sendMsgDisabled = true;
        let interval = window.setInterval(() => {
          if ((this.time--) <= 1) {
            this.time = 60;
            this.sendMsgDisabled = false;
            window.clearInterval(interval);
          }
        }, 1000);
      },
      remberAcount(){
        if (window.localStorage) {
          localStorage.setItem("remberAcount", this.ruleForm.checked);
          localStorage.setItem("Account", this.ruleForm.account);
        }
      },
      //表单数据验证
      formValidate(){
        if (this.ruleForm.account.length == 0) {
          // this.$until.tostMsg("手机号码不能为空！");
          this.$until.tostMsg("手机号码不能为空！");
          return false;
        }
        if (!this.$until.isMobile(this.ruleForm.account)) {
          this.$until.tostMsg("输入的手机格式有误！");
          return false;
        }
        if (!this.token) {
          this.$until.tostMsg("请先点击按钮智能认证！");
          return false;
        }
        if (this.ruleForm.mobile_code.length == 0) {
          this.$until.tostMsg("短信验证码不能为空！");
          return false;
        }
        return true;
      },
      /*登录*/
      submitForm(){
        try {
          localStorage.removeItem("Token");
          if (this.formValidate()) {
            let url = baseUrl + "/user/Login";
            let formData = {
              account: this.ruleForm.account, //账户
              code: this.ruleForm.mobile_code,//短信验证码
              scene: "send_mobile_captcha",
              sig: this.sig,
              token: this.token,
              session_id: this.sessionId,
//              invite_code: this.invite_code
              invite_code: 'PDWBZI'
            }
            this.$axios({
              method: "get",
              url: url + "?r=" + Math.random(),
              params: formData
            }).then((result) => {
              if (result.data.code == 1) {
                if (this.$until.responesValidate(result)) {
                  this.$toast.success(result.data.msg || "登录成功！");
//                  localStorage.setItem("barIndex", 1);
                  window.setTimeout(() => {
//                    window.location.href = "/";
                    this.$router.push('/')
                  }, 2000);
                }
              } else {
                this.$until.tostMsg(result.data.msg || '登录失败！');
              }
            });
          }
        } catch (ex) {
          this.$until.consoleLog(ex);
        }
      },

    },
    components: {
      PathNav
    }
  }

</script>

<style lang="scss" scoped>
  @import "./../../styles/mixin";
  .login-container {
    background: url("../../assets/bg.png") center 100% no-repeat;
    height: 100%;
    padding: 0 px2rem(63px);
    .img1 {
      width:px2rem(114px);
      height:px2rem(112px);
      margin-top: px2rem(140px);
    }
    .image-code{
      height:px2rem(66px);
      top:px2rem(-10px)
    }
    .msg-btn{
      top:px2rem(8px);
      background: none;
      font-size: px2rem(26px);
      font-family:PingFang-SC-Medium;
      font-weight:500;
      right: px2rem(0px);
      padding: px2rem(4px) px2rem(20px);
    }
    .btn2 {
      color: #666;
      right: px2rem(35px);
    }
    .title {
      font-size:px2rem(32px);
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(251,251,251,1);
      margin: 0;
      margin-top: px2rem(43px)
    }
    /deep/ .mu-form-item {
      .mu-form-item-label {
      }
      .mu-form-item-content {
        .mu-input {
          .mu-text-field-input, .mu-select-input {
            color: #fbfbfb!important;
          }
          .mu-input-line {
            background: #484848;
          }
          mu-input-focus-line {
            color:#fff!important;
            height: 1px!important;
          }
          .mu-input__focus {
            color:#fff!important;
          }
        }
      }
    }
    .mu-raised-button {
      .mu-button-wrapper {
        padding: 0 px2rem(6px);
        font-size: px2rem(34px);
      }
    }
    /deep/ .login-btn{
      background-image: url("../../assets/login-icon.png");
    }
  }
  .mu-text-field-input {
    color: #fff!important;
  }
  .mu-text-field mu-input-content {
    input {
      color:red
    }
  }
  /deep/ .mu-input__focus {
    color:#fff!important;
  }
  /deep/ .mu-input-focus-line {
    color:#fff!important;
    height: 1px!important;
  }
  .mu-demo-form {
    margin-top: px2rem(160px);
  }
  /deep/ .mu-button-wrapper {
    background-image: linear-gradient(270deg,#ffc66a,#c38215)!important;
    font-size: px2rem(34px);
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(0,0,0,1);
  }
  /deep/ .mu-form-item-content {
    button {
      border-radius: 0!important;
      margin: 0;
    }
  }
  #sc {
    margin: 0;
    width: 100%;
  }
  /deep/ #sc .sm-btn-wrapper #SM_BTN_1 .sm-txt {
    color: #fbfbfb !important;
  }
</style>
