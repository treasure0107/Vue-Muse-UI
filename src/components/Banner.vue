<template>
  <div class="banner">
    <mu-carousel class="mu-carousel" :transition="transition" :hide-controls="hideControls"
                 :hideIndicators="hideIndicators">
      <mu-carousel-item v-for="(item,index) in banner" :key="index">
        <img :src="item.image" alt=""/>
      </mu-carousel-item>
    </mu-carousel>
  </div>
</template>
<script type="text/babel">
  import {baseUrl} from "@/config/env";
  export default {
    data(){
      return {
        transition: "fade",
        hideIndicators: true,
        hideControls: true,
        banner: []
      }
    },
    mounted(){
      this.getBannerList();
    },
    methods: {
      getBannerList(){
        try {
          let url = baseUrl + "/index/getBanner";
          let config = {
            method: "get",
            url: url + "?r=" + Math.random(),
          };
          this.$axios(config).then(result => {
            if (this.$until.responesValidate(result)) {
              if (result) {
                this.banner = result.data.data;
              }
            }
          });
        } catch (ex) {
          this.$until.consoleLog(ex)
        }
      }
    },
    components: {}
  }

</script>

<style lang="scss" scoped>
  @import "./../styles/mixin";

  .mu-carousel {
    height: px2rem(300px);
    img {
      height: px2rem(300px);
    }
    /deep/ .mu-carousel-indicator-button {
      width: px2rem(20px);
      height: px2rem(20px);
      margin: 0 px2rem(10px);
    }
  }
</style>
