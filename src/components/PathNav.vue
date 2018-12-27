<template>
  <div class="path-nav">
      <span class="return" @click="back(adress)">
        <i class="iconfont">&#xe65f;</i>
      </span>
      <span class="tit">{{titleName}}</span>
    <!--<slot name="title"> </slot>-->
  </div>
</template>
<script type="text/babel">
  export default {
    props: ['adress', 'titleName'],
    data(){
      return {}

    },
    mounted(){

    },
    methods: {
      back(adress){
        if (adress) {
          this.$router.push(adress)
        }
        else
          this.$router.back();
      }
    },
    components: {}
  }

</script>

<style lang="scss" scoped>
  @import "../styles/mixin";
  .path-nav {
    position: relative;
    width: 100%;
    text-align: center;
    padding: px2rem(20px) 0;
    height: px2rem(100px);
    .return {
      display: inline-block;
      vertical-align: middle;
      cursor: pointer;
      position: absolute;
      left: px2rem(10px);
      top: 0;
      i {
        margin-left: px2rem(-5px);
        font-size: px2rem(60px);
        font-weight: 500;
        color: #808c99;
      }
    }

    .tit{
      display: inline-block;
      font-size: px2rem(34px);
      font-weight: 500;
      margin-top:px2rem(6px);
    }
  }
</style>
