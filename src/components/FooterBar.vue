<template>
  <div class="footer-bar">
    <div class="bar-wrap">
      <div class="item-bar" :class="[{active:'Index'==tabIndex}]">
        <router-link to="/">
          <i class="iconfont">&#xe604;</i>
          <p>首页</p>
        </router-link>
      </div>
      <div class="item-bar" :class="[{active:'Order'==tabIndex}]">
        <router-link to="/Order">
          <i class="iconfont">&#xe66a;</i>
          <p>报单</p>
        </router-link>
      </div>
      <div class="item-bar" :class="[{active:'UserCenter'==tabIndex}]">
        <router-link to="/UserCenter">
          <i class="iconfont">&#xe659;</i>
          <p>我的</p>
        </router-link>
      </div>

    </div>
  </div>
</template>
<script type="text/babel">
  export default {
    data(){
      return {
        tabIndex: "Index",
        isLogin: false
      }
    },
    mounted(){
      this.changeBar();
//      this.$until.getLoginStatus().then((Login) => {
//        if (Login) {
//          this.isLogin = true;
//        } else {
//          this.isLogin = false;
//        }
//      });
    },
    watch: {
      '$route': 'changeBar'
    },
    methods: {
      changeBar () {
        if (this.$route.path === "/") {
          this.tabIndex = "Index";
        }
        if (this.$route.path === "/Order") {
          this.tabIndex = "Order";
        }
        if (this.$route.path === "/UserCenter") {
          this.tabIndex = "UserCenter";
        }
      },
      /*      tabs(_index){
       this.tabIndex = _index;
       if (window.localStorage) {
       localStorage.setItem("barIndex", _index);
       }
       },*/
      jumpTo(url){
        this.$until.getLoginStatus().then((login) => {
          if (login) {
            this.$router.push({path: url});
          } else {
            this.$router.push({path: "/Login"});
          }
        });
      }
    },
    components: {}
  }
</script>
<style lang="scss" scoped>
  @import "../styles/mixin";

  .footer-bar {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99999;
    background-color: #000;
    .bar-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: px2rem(10px) 0;
      .item-bar {
        /*   flex: auto;*/
        flex-grow: 3;
        text-align: center;
        a {
          display: inline-block;
          text-align: center;
          padding: 0 px2rem(5px);
          i {
            color: #5d5544;
            font-size: px2rem(42px);
          }
          p {
            /*  padding-top: 2px;*/
            color: #9e9686;
            font-size: px2rem(20px);
          }
          i, p {
            /* display: inline-block;*/
            width: 100%;
            text-align: center;
          }
        }
      }
      .active {
        a {
          i, p {
            color: #f3c842 !important;
            text-shadow: 0px 5px 10px #b37d10;
          }
        }
      }
    }
  }
</style>
