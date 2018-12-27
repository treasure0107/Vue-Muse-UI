<template>
  <div class="container">
    <Path-nav :titleName="titleName"></Path-nav>
    <div class="main">
      <!--<h3>交易密码设置</h3>-->
      <div class="item">
        <label>输入交易密码：</label><input type="password" placeholder="请输入" v-model="safe_password">
      </div>
      <div class="item">
        <label>二次确认密码：</label><input type="password" placeholder="请输入" v-model="re_safe_password">
      </div>
      <div class="item">
        <label>点击验证：</label>
        <div id="sc"></div>
      </div>
      <div class="item item-msg">
        <label>短信验证码：</label><input type="text" placeholder="请输入" v-model="mobile_code">
        <span class="msg-btn" v-dbClick @click.stop="sendMsgCode();" v-if="!sendMsgDisabled">发送验证码</span>
        <span class="msg-btn btn2"
              v-if="sendMsgDisabled">
            {{time + 's'}}
          </span>
      </div>
      <div class="btn">
        <mu-button color="primary" @click="submit">设置</mu-button>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import {baseUrl} from "@/config/env";
  import PathNav from "@/components/PathNav";
  import until from "@/scripts/until";
  import Toast from 'muse-ui-toast';
  export default {
    data(){
      return {
        titleName: '交易密码设置',
        sendMsgDisabled: false,
        time: 60,
        safe_password: '',
        re_safe_password: '',
        mobile_code: '',
        token: '',
        sessionId: '',
        sig: '',
        phone: ''
      }

    },
    mounted(){
      this.phone = this.$route.query.tel;
      this.verify();
    },
    methods: {
      verify(){
        var self = this;
        var ic = new smartCaptcha({
          renderTo: '#sc',
          width: '100%',
          secvrf_layout: true,
          height: 42,
          default_txt: '点击按钮开始智能验证',
          success_txt: '验证成功',
          fail_txt: '验证失败，请在此点击按钮刷新',
          scaning_txt: '智能检测中',
          success: function (data) {
//            console.log(NVC_Opt.token)
//            console.log(data.sessionId);
//            console.log(data.sig);
            self.token = NVC_Opt.token;
            self.sessionId = data.sessionId;
            self.sig = data.sig;
          },
        });
        ic.init();
      },
      getUserInfo(){     //获取用户信息
        try {
          let url = baseUrl + "/user/getUserInfo";
          this.$axios({
            method: "get",
            url: url + "?r=" + Math.random(),
          }).then((result) => {
            if (result.data.code == 1) {
              if (this.$until.responesValidate(result)) {
                console.log(result);
//                let UserInfo = result.data.data;
                let UserInfo = result.data;


              }
            }
          });
        } catch (ex) {
          this.$until.consoleLog(ex);
        }
      },
      /*发送短信验证码*/
      sendMsgCode(){
        try {
          if (!this.safe_password) {
            this.$until.tostMsg("交易密码不能为空！");
            return false;
          }
          if (!this.re_safe_password) {
            this.$until.tostMsg("二次确认密码不能为空！");
            return false;
          }
          if (!this.token) {
            this.$until.tostMsg("请先点击按钮智能认证！");
            return false;
          }
          let data = {
            scene: "send_safe_password_captcha",
            sig: this.sig,
            token: this.token,
            session_id: this.sessionId,
            mobile: this.phone
          };
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
                  this.time = 60;
                }
              });
            }
          });
        } catch (ex) {
          this.$until.consoleLog(ex);
        }
      },
      intervalTimer(){   //倒计时
        this.sendMsgDisabled = true;
        let interval = window.setInterval(() => {
          if ((this.time--) <= 1) {
            this.time = 60;
            this.sendMsgDisabled = false;
            window.clearInterval(interval);
          }
        }, 1000);
      },
      submit(){   //设置安全密码
        try {
          let url = baseUrl + "/user/setSafePwd";
          let config = {
            method: "post",
            url: url + "?r=" + Math.random(),
            data: {
              safe_password: this.safe_password,
              re_safe_password: this.re_safe_password,
              mobile_code: this.mobile_code
            }
          };
          this.$axios(config).then(result => {
            if (this.$until.responesValidate(result)) {
              Toast.message({
                message: '交易密码设置成功！',
                time: 1000,
                position: "top",
                color: "#61b865",
                textColor: "#fff",
                close: true
              });
              setTimeout(() => {
                this.$router.push('/UserCenter');
              }, 1000);
            }
          });
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

  /deep/ .mu-button-wrapper {
    width: px2rem(300px);
  }

  .main {
    color: #110C01;
    padding-top: px2rem(30px);
    h3 {
      font-size: px2rem(30px);
      width: 100%;
      text-align: center;
      padding-bottom: px2rem(30px);
    }
    .item {
      margin-top: px2rem(30px);
      padding-bottom:px2rem(30px);
      label {
        display: inline-block;
        font-size: px2rem(23px);
        margin-right: px2rem(30px);
        width: px2rem(200px);
        text-align: right;
      }
      input {
        width: px2rem(400px);
        height: px2rem(66px);
        padding-left: px2rem(10px);
        border: 1px solid #EEEEEE;
        border-radius: px2rem(3px);
      }
    }
    .item-msg {
      position: relative;
      .msg-btn {
        position: absolute;
        left: px2rem(449px);
        height: px2rem(66px);
        line-height: px2rem(66px);
        text-align: center;
        padding: 0 px2rem(30px);
        background-color: #cda65b;
        font-size: px2rem(24px);
        color: #ffffff;
        z-index: 9;
      }
    }
    .btn {
      width: 100%;
      text-align: center;
      padding-top: px2rem(100px);
      /deep/ .mu-button-wrapper {
        width: px2rem(600px);
        border: 1px solid #EEEEEE;
      }
      /deep/ .mu-button {
        height: px2rem(90px);
        font-size: px2rem(30px);
      }
    }
    #sc {
      display: inline-block;
      width: px2rem(400px);
      margin: 0;
      vertical-align: middle;
    }
    /deep/ #sc .sm-btn-wrapper #SM_BTN_1 .sm-txt {
      color: #999 !important;
    }
  }
</style>
