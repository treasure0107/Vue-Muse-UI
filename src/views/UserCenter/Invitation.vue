<template>
  <div class="container">
    <Path-nav :titleName="titleName"></Path-nav>
    <div class="main">
      <!--<h3>邀请码</h3>-->
      <div>
        <span class="pic">
        <!--邀请二维码-->
        <canvas id="codePic" ref="codePic"></canvas>
      </span>
      </div>
      <div class="share-b">分享二维码</div>
      <div>
        <span>邀请码：</span><span>{{invite}}</span>
     <!--   <mu-button round class="copy-button tag-read1" :data-clipboard-text="invite" @click="copy(1)" type='text'>复制
      </mu-button>-->
      </div>
      <div class="link-address">
        <span class="tit">链接地址：</span><input type="text" disabled v-model="inviteUrl">
        <mu-button round class="copy-button tag-read1" :data-clipboard-text="inviteUrl" @click="copy(1)" type='text'>复制
        </mu-button>
      </div>
    </div>

    <!-- <div class="share-b">
     <share :config="shareConfig">分享二维码</share>
   </div>-->
  </div>
</template>
<script type="text/babel">
  import {baseUrl} from "@/config/env";
  import PathNav from "@/components/PathNav";
  import QRCode from 'qrcode';
  import until from "@/scripts/until";
  import Clipboard from 'clipboard';
  //  import wxShare from "@/scripts/wxshare";
  export default {
    data(){
      return {
        titleName: '邀请码',
        invite: '',
        url: 'http://vipapi.1903.love/#/login?invite=',
        inviteUrl:'',
        shareConfig: {
          url: "https://www.sina.com.cn/",
          source: "",
          title: "",
          description: "",
          image: "",  //          'wechat',  'qzone', 'qq', 'weibo', 'douban',
          sites: ['wechat'], // 启用的站点
          disabled: [], // 禁用的站点
          wechatQrcodeTitle: "微信扫一扫：分享",
          wechatQrcodeHelper: "<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>"
        },
      }
    },
    mounted(){
      this.invite = this.$route.query.invite;
      this.inviteUrl=this.url+this.invite;
      this.getQRCode();
    },
    methods: {
      copy(n){
        let clipboard;
        if (n == 1) {
          clipboard = new Clipboard('.tag-read1');
        }
        if (n == 2) {
          clipboard = new Clipboard('.tag-read2');
        }
        clipboard.on('success', (e) => {
          this.$toast.success("复制成功！");
          clipboard.destroy();
        });
        clipboard.on('error', (e) => {
          // 不支持复制
          console.log('该浏览器不支持自动复制');
          // 释放内存
          clipboard.destroy();
        })
      },
      getQRCode(){
        let msg = this.$refs.codePic;
        QRCode.toCanvas(msg, 'https://www.sina.com.cn/', function (error) {
          console.log(error)
        });
        this.$refs.codePic.style.width = '4rem';
        this.$refs.codePic.style.height = '4rem';
      },
    },
    components: {
      PathNav
    }
  }

</script>

<style lang="scss" scoped>
  @import "./../../styles/mixin";

  .main {
    text-align: center;
    font-size: px2rem(26px);
    padding-top: px2rem(30px);
    h3 {
      font-size: px2rem(34px);
      width: 100%;
      padding-bottom: px2rem(30px);
    }
    .pic {
      display: inline-block;
      width: px2rem(300px);
      height: px2rem(300px);
      background-color: #ccc;
      #codePic {
        width: px2rem(300px);
        height: px2rem(300px);
      }
    }
    .share-b {
      font-size: px2rem(28px);
      margin: px2rem(40px) 0;
    }
    .link-address {
      width: 100%;
      margin-top:px2rem(30px);
      span {
        font-size: px2rem(28px);
      }
      input {
        width: px2rem(400px);
        height: px2rem(50px);
        padding-left: px2rem(6px);
        font-size: px2rem(20px);
      }
      .copy-button {
        margin: px2rem(6px);
      }
    }
  }
</style>
