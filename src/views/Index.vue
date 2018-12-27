<template>
  <div class="main mb-150">
    <index-banner></index-banner>
    <NoticeBar></NoticeBar>
    <div class="container">
      <ul class="img-list">
        <li v-for='(item,index) in ArticleCategory' :key='index' @click="$router.push('/order?msg='+item.msg)">
          <img :src="item.image" alt=""/>
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <footer-bar></footer-bar>
  </div>

</template>
<script type="text/babel">
  import IndexBanner from "@/components/Banner";
  import NoticeBar from "@/components/NoticeBar";
  import FooterBar from "@/components/FooterBar";
  export default {
    data(){
      return {
        ArticleCategory: [{
          image: "https://ufe.oss-cn-shenzhen.aliyuncs.com/upload/other/d89eb0592c8e392b589bd9fb6c416812b114fc8d.png",
          name: "U套餐",
          msg:"u"
        }, {
          image: "https://ufe.oss-cn-shenzhen.aliyuncs.com/upload/other/33e2dbf3130b7562521d67900a6871739e17700b.png",
          name: "U+套餐",
          msg:"uu"
        }, {
          image: "https://ufe.oss-cn-shenzhen.aliyuncs.com/upload/other/a37f35ab9c3dd503984901051d03b7ad1aac5cbf.png",
          name: "UU套餐",
          msg:"uuu"
        }, {
          image: "https://ufe.oss-cn-shenzhen.aliyuncs.com/upload/other/1f1deedc6daf55b3129f0d3e6e6c3d1ad41e13c8.png",
          name: "UU+套餐",
          msg:"uuuu"
        }]
      }
    },
    mounted(){
    },
    beforeCreate(){
      /*     if(!window.name) {
       window.name = "firstEnter";
       window.localStorage.clear();
       const loading = this.$loading();
       setTimeout(() => {
       loading.close();
       }, 30000);
       }*/
    },
    methods: {},
    components: {
      IndexBanner,
      NoticeBar,
      FooterBar
    }
  }
</script>

<style lang="scss" scoped>
  @import "./../styles/mixin";

  .container {
    .index-title {
      padding: px2rem(38px) 0;
      text-align: center;
      color: #110c01;
      font-size: px2rem(30px);
    }
    .img-list {
      width: 100%;
      align-items: center;
      justify-content: center;
      padding: px2rem(50px) px2rem(5px);
      li {
        float: left;
        width: 50%!important;
        text-align: center;
        background-color: #f7f7f7;
        flex-grow: 4;
        width: px2rem(167px);
        span {
          display: block;
          margin: 0 auto;
          width: px2rem(167px);
          text-align: center;
          height: px2rem(40px);
          line-height: px2rem(40px);
          padding-left: px2rem(10px);
          font-size: px2rem(20px);
        }
        img {
          width: px2rem(320px);
          height: px2rem(320px);
        }
      }
    }
    .map-box {
      /*  height: px2rem(343px);*/
      /*    text-align: center;*/
      img {
        width: px2rem(710px);
        /* height: px2rem(319px);*/
      }
    }
    .partner-wrap {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: px2rem(20px);
      li {
        text-align: center;
        flex-grow: 5;
      }
      li, img {
        width: px2rem(135px);
        height: px2rem(66px);
      }
    }
  }
</style>
