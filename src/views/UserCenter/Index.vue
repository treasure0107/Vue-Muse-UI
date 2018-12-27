<template>
  <div class="container">
    <div class="header">
      <div class="photo">
        <div class="photo-pic">
          <span class="photo-img" @click="uploadImg">
            <img :src="avatar" v-if="avatar">
            <span v-else>头像</span>
          </span>
          <input type="file" name="file" class="uploadInput" ref="updataInput"
                 @change="onFileChange($event)">
        </div>
      </div>
      <div class="user-n">
        <p class="phone-n"><span>手机号码：</span>{{phone}}</p>
        <p><span>UUID：</span>{{uuid}}</p>
      </div>
    </div>
    <div>
      <ul class="list">
        <li @click="$router.push('/Asset')"><span>资产总览</span><span class="arrows-left"></span></li>
        <li @click="$router.push('/Account')"><span>明细</span><span class="arrows-left"></span></li>
        <li @click="Invitation"><span>邀请码</span><span class="arrows-left"></span></li>
        <li @click="$router.push('/Authentication')"><span>实名认证</span><span class="arrows-left"></span></li>
        <li @click="TradersPassword"><span>交易密码设置</span><span class="arrows-left"></span></li>
        <li @click="setBank"><span>银行卡设置</span><span class="arrows-left"></span></li>
      </ul>
      <div class="login-h" v-if="isLogin">
        <router-link to="/Login" class="login">退出登录</router-link>
      </div>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>
<script type="text/babel">
  import {baseUrl} from "@/config/env";
  import FooterBar from "@/components/FooterBar";
  import PathNav from "@/components/PathNav";
  import Toast from 'muse-ui-toast';
  export default {
    data(){
      return {
        isLogin: true,
        uuid: "",
        phone: "",
        avatar: "",
        invite: ""
      }
    },
    mounted(){
      this.getUserInfo();
    },
    methods: {
      uploadImg(form){   //上传图片
        try {
          let url = baseUrl + "/user/saveavatar";
          let config = {
            method: "post",
            url: url + "?r=" + Math.random(),
            data: form
          };
          this.$axios(config).then(result => {
            if (this.$until.responesValidate(result)) {
              this.getUserInfo();
//              this.imgUrl.push(data.Data.FileUrl);
//              this.avatar = data.Data.FileUrl
            }
          });
        } catch (ex) {
          this.$until.consoleLog(ex);
        }
      },
      onFileChange(){   //上传图片方法
        var self = this;
        let fileObj = self.$refs.updataInput.files;
//        console.log(fileObj);
        var isUpdate = true;
        for (var i = 0; i < fileObj.length; i++) {
//          console.log(fileObj[i].type);
          if (fileObj[i].type != 'image/png' && fileObj[i].type != 'image/gif' && fileObj[i].type != 'image/jpeg') {
            isUpdate = false;
            break;
          }
        }
        if (isUpdate) {
          let form = new FormData();
          form.append('file', fileObj[0]);
          this.uploadImg(form);
        } else {
          this.$toast.success("只能上传图片！");
        }

      },
      getUserInfo(){     //获取用户信息
        try {
          let url = baseUrl + "/user/getUserInfo";
          this.$axios({
            method: "post",
            url: url + "?r=" + Math.random(),
          }).then((result) => {
            if (result.data.code == 1) {
              if (this.$until.responesValidate(result)) {
                let res = result.data.data;
//                console.log(res);
                this.uuid = res.uuid;
                this.phone = res.phone;
                this.avatar = res.avatar;
                this.invite = res.invite;
              }
            }
          });
        } catch (ex) {
          this.$until.consoleLog(ex);
        }
      },
      getUserStatus(){     //获取用户个人状态
        try {
          let url = baseUrl + "/user/getUserStatus";
          this.$axios({
            method: "post",
            url: url + "?r=" + Math.random(),
          }).then((result) => {
            if (result.data.code == 1) {
              if (this.$until.responesValidate(result)) {
                let res = result.data.data;
//                console.log(res);
                if (res.is_save_password == 'yes') {
                  if (res.is_auth == 'enable') {
                    this.$router.push('/Bank');
                  } else {
                    Toast.message({
                      message: '请先进行实名认证！',
                      time: 2000,
                      position: "top",
                      color: "#f5594e",
                      textColor: "#fff",
                      close: true
                    });
                  }
                } else {
                  Toast.message({
                    message: '请先进行交易密码！',
                    time: 2000,
                    position: "top",
                    color: "#f5594e",
                    textColor: "#fff",
                    close: true
                  });
                }

              }
            }
          });
        } catch (ex) {
          this.$until.consoleLog(ex);
        }
      },
      setBank(){
        this.getUserStatus();
      },
      TradersPassword(){
        this.$router.push({path: '/TradersPassword', query: {tel: this.phone}});
      },
      Invitation(){
        this.$router.push({path: '/Invitation', query: {invite: this.invite}});
      }
    },
    components: {
      FooterBar,
      PathNav
    }
  }

</script>


<style lang="scss" scoped>
  @import "./../../styles/mixin";

  .container {
    padding-left: 0;
    padding-right: 0;
    .header {
      padding: px2rem(60px) px2rem(30px) px2rem(60px);
      display: flex;
      border-bottom: 1px solid #EEF2F5;
      .photo {
        .photo-pic {
          position: relative;
          width: px2rem(120px);
          height: px2rem(120px);
          .photo-img {
            display: inline-block;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            span {
              display: inline-block;
              width: 100%;
              height: 100%;
              border-radius: 50%;
              text-align: center;
              font-size: px2rem(30px);
              line-height: px2rem(90px);
              background-color: #efefefef;
            }
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .uploadInput {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
            -ms-filter: 'alpha(opacity=0)';
            border-radius: 50%;
          }
        }

      }
      .user-n {
        flex: 4;
        color: #110C01;
        font-size: px2rem(26px);
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        margin-left: px2rem(6px);
        p {
          padding-top: px2rem(10px);
          span {
            display: inline-block;
            width: px2rem(160px);
            text-align: right;
          }
        }
        .phone-n {
          margin-top: px2rem(10px);
        }
      }
    }

    .list {
      li {
        padding: px2rem(40px) px2rem(30px);
        border-bottom: 1px solid #EEF2F5;
        font-size: px2rem(30px);
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: #333;

      }
      .arrows-left {
        float: right;
        display: inline-block;
        width: px2rem(18px);
        height: px2rem(30px);
        background-image: url("../../assets/arrows-left-icon.png");
        background-size: cover;
        background-repeat: no-repeat;
        margin-top: px2rem(10px);
      }
    }

    .login-h {
      text-align: center;
      margin-top: px2rem(60px);
      .login {
        display: inline-block;
        font-size: px2rem(30px);
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        width: px2rem(690px);
        border: 1px solid #E5E5E5;
        height: px2rem(90px);
        line-height: px2rem(90px);
        color: #333;
        /*background-image: linear-gradient(270deg, #ffc66a, #c38215) !important;*/
      }
    }
  }


</style>
