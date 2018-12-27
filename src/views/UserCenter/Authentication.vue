<template>
  <div class="container">
    <Path-nav :titleName="titleName"></Path-nav>
    <div class="main">
      <!--<h3>实名认证</h3>-->
      <div class="item"><label>真实姓名：</label><input type="text" placeholder="请输入" v-model="authName"></div>
      <div class="item"><label>身份证号：</label><input type="text" placeholder="请输入" v-model="authNumber"></div>
      <div class="btn">
        <mu-button color="primary" @click="Submit">认证</mu-button>
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
        titleName:'实名认证',
        authName: '',
        authNumber: ''
      }

    },
    mounted(){

    },
    methods: {
      Submit(){
        if (!this.authName) {
//          this.$toast.error("身份证号不能为空！");
          Toast.message({
            message: '真实姓名不能为空！',
            time: 2000,
            position: "top",
            color: "#f5594e",
            textColor: "#fff",
            close: true
          });
          return
        }
        if (!this.authNumber) {
//          this.$toast.error("身份证号不能为空！");
          Toast.message({
            message: '身份证号不能为空！',
            time: 2000,
            position: "top",
            color: "#f5594e",
            textColor: "#fff",
            close: true
          });
          return
        }
        if (this.$until.isCardID(this.authNumber)) {
          this.setAuthentication();
        } else {
          Toast.message({
            message: '输入正确的身份证号！',
            time: 2000,
            position: "top",
            color: "#f5594e",
            textColor: "#fff",
            close: true
          });
        }
      },
      setAuthentication(){
        try {
          let url = baseUrl + "/user/setauthentication";
          let config = {
            method: "post",
            url: url + "?r=" + Math.random(),
            data: {auth_name: this.authName, auth_number: this.authNumber}
          };
          this.$axios(config).then(result => {
            if (this.$until.responesValidate(result)) {
              this.$toast.success("认证成功！");
              this.$router.push('/UserCenter');
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
    padding-top:px2rem(30px);
    h3 {
      font-size: px2rem(30px);
      width: 100%;
      text-align: center;
      padding-bottom: px2rem(30px);
    }
    .item {
      margin: px2rem(30px) 0;
      label {
        display: inline-block;
        margin-right: px2rem(30px);
        width:px2rem(160px);
        text-align: right;
      }
      input {
        width: px2rem(460px);
        height: px2rem(66px);
        padding-left: px2rem(10px);
        border: 1px solid #EEEEEE;
        border-radius: px2rem(3px);
      }
    }
    .btn {
      width: 100%;
      text-align: center;
      padding-top: px2rem(100px);
      /deep/ .mu-button-wrapper{
        width: px2rem(600px);
        border: 1px solid #EEEEEE;
      }
      /deep/ .mu-button{
        height: px2rem(90px);
        font-size:px2rem(30px);
      }
    }
  }
</style>
