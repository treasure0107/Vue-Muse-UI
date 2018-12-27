<template>
  <div class="textScroll" @mousemove="pauseAn" @mouseout="startAn" >
    <div class="scroll" :style="{marginLeft: '-' + marginLeft + 'px' }">
        <span @click="itemClick(item,$event)" v-for="(item,index) in datas" :key="index" class="content">
            <span class="title">
            【公告：{{item.title}}】
            </span>
            <!--<span class="text">{{item.content}}</span>-->
        </span>
    </div>
  </div>
</template>
<script type="text/babel">
  import {baseUrl} from "@/config/env";
  export default {
    name:'textScroll',
    data(){
      return {
        datas: [],
        marginLeft: 0,
        prevLeft: 0,
        an: '',
        place: '',
      }
    },
    props:{
      data: {
        type: Array,
      },
      time: {
        type: Number,
        default: 100,
      },
      placement: {
        type: String,
        default: 'bottom'
      }
    },
    created(){
      this.getArticleList();
      switch( this.placement ){ /** 此功能可自己扩展，展示方式，此代码中未完成扩展 **/
        case 'top': this.place = 'top';break;
        case 'bottom': this.place = 'bottom';break;
        default : this.place = 'bottom';break;
      }
    },
    mounted(){
      this.getArticleList();
      this.$nextTick (function(){
        this.startAn();
      })

    },
    beforeDestroy(){
      this.stopAn();
    },
    watch:{

    },
    methods:{
      getArticleList(){
        try {
          let url = baseUrl + "/index/getArticleList";
          let config = {
            method: "POST",
            url: url + "?r=" + Math.random(),
          };
          this.$axios(config).then(res => {
            if (this.$until.responesValidate(res)) {
              this.datas = res.data.data.data
            }
          });
        } catch (ex) {
          until.consoleLog(ex);
        }
      },
      startAn: function(){ // 开始
        let _this = this;
        let width = document.querySelector('.scroll').offsetWidth;
        this.an = setInterval( function() {
          if (_this.marginLeft > width) {
            _this.marginLeft = 0;
          }
          _this.marginLeft += 2;
        } , _this.time);
      },
      stopAn: function(){ // 停止
        this.prevLeft = this.marginLeft;
        this.marginLeft = 0;
        clearInterval(this.an);
        this.$emit('on-stop-An');
      },
      pauseAn: function(){ // 暂停动画
        clearInterval(this.an);
      },
      itemClick: function( item, e ) {
        this.$emit('on-item-click',item );
        this.$router.push('/Notice?id=' + item.id)
      }

    }

  }
</script>

<style lang="scss" scoped>
  .scroll{
    height: 32px;
    line-height: 28px;
    padding: 4px 0;
    white-space: nowrap;
    .content{
      width: 100%;
      word-wrap: normal;
      margin-right: 140px;
    }
    .title{
      color: #ad6f0c;
      font-weight: bold;
    }
    .text {
      color: #805518;
    }
  }
  .textScroll{
    background-color: #f7f7f7;
    width: 100%;
  }
</style>
