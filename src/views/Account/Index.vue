<template>
  <div class="container">
    <Path-nav>
    </Path-nav>
    <h1 class="title" slot="title" >明细</h1>
    <div>
      <ul class="list">
        <li @click="$router.push('/AccountDetail?type=1')"><span>充值明细</span></li>
        <li @click="$router.push('/AccountDetail?type=2')"><span>充值转提现明细</span></li>
        <li @click="$router.push('/AccountDetail?type=3')"><span>提现明细</span></li>
        <li @click="$router.push('/AccountDetail?type=4')"><span>提现划转明细</span></li>
        <li @click="$router.push('/AccountDetail?type=5')"><span>通证划转明细</span></li>
        <li @click="$router.push('/AccountDetail?type=6')"><span>奖金余额转提现明细</span></li>
        <li @click="$router.push('/AccountDetail?type=7')"><span>释放金额转提现明细</span></li>
      </ul>
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
        imgUrl:'',
        uuid: "OJ3283",
        phone: "13480953488",
        avatar: "",
      }

    },
    mounted(){
//      this.getUserInfo();
    },
    methods: {
// 上传图片 /api/common/uploadImg
      uploadImg(form){
        try {
          let url = baseUrl + "/common/uploadImg";
          let config = {
            method: "post",
            url: url + "?r=" + Math.random(),
            file:form
          };
          this.$axios(config).then(result => {
            if (this.$until.responesValidate(result)) {
//              this.imgUrl.push(data.Data.FileUrl);
              this.imgUrl=data.Data.FileUrl
            }
          });
        } catch (ex) {
          this.$until.consoleLog(ex);
        }
      },
      onFileChange(){   //上传图片方法
        var self = this;
        let fileObj = self.$refs.updataInput.files;
        console.log(fileObj);
        var isUpdate = true;
        for (var i = 0; i < fileObj.length; i++) {
          console.log(fileObj[i].type);
          if (fileObj[i].type != 'image/png' && fileObj[i].type != 'image/gif' && fileObj[i].type != 'image/jpeg') {
            isUpdate = false;
            break;
          }
        }
        if (isUpdate) {
          let form = new FormData();
          form.append('file', fileObj[0]);
          console.log(form);
          this.uploadImg(form);
        } else {
          this.$toast.success( "只能上传图片！");
        }

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
    },
    components: {
      FooterBar,
      PathNav
    }
  }

</script>


<style lang="scss" scoped>
  @import "./../../styles/mixin";

  .title {
    position: absolute;
    top:px2rem(10px);
    left: 42%;
  }
  .header {
    padding: px2rem(30px) px2rem(10px) px2rem(60px);
    display: flex;
    border-bottom: 1px solid #999;
    .photo {
      .photo-pic{
        position: relative;
        width: px2rem(90px);
        height: px2rem(90px);
        .photo-img {
          display: inline-block;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          span{
            display: inline-block;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            text-align: center;
            font-size: px2rem(30px);
            line-height:px2rem(90px);
            background-color: #efefefef;
          }
          img{
            width: 100%;
            height: 100%;
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
      font-size: px2rem(20px);
      margin-left:px2rem(30px);
      p {
        padding-top: px2rem(10px);
      }
    }
  }

  .list {
    li {
      padding: 0 px2rem(10px);
      height: px2rem(100px);
      line-height: px2rem(100px);
      border-bottom: 1px solid #999;
      color: #110C01;
      font-size: px2rem(26px);
    }
  }

  .login-h {
    text-align: center;
    margin-top:px2rem(60px);
    .login {
      display: inline-block;
      width: px2rem(690px);
      border: 1px solid #EEF2F5;
      height: px2rem(100px);
      line-height: px2rem(100px);
      /*text-align: center;*/
      color: #110C01;
      background-image: linear-gradient(270deg, #ffc66a, #c38215) !important;
      font-size: 0.45333rem;
      font-family: PingFang-SC-Bold;
      font-weight: bold;

    }
  }

</style>
