<template>
  <div class="container">
    <Path-nav></Path-nav>
    <div class="main">
      <h3>账户总览</h3>
      <div class="total-asset">总资产：<span>100000</span></div>
      <div class="con">
        <ul>
          <li class="item">
            <div class="t-t">
              <div>充值余额：{{Overview[1]}}</div>
              <mu-button small color="primary">充值</mu-button>
              <mu-button small color="primary"  @click="rechargeTrasDialog=true">划转</mu-button>
            </div>
            <div class="t-t">
              <div>提现余额：{{Overview[2]}}</div>
              <mu-button small color="primary" @click="widthdrawDialog=true">提现</mu-button>
              <mu-button small color="primary" @click="widthdrawTransDialog=true">划转</mu-button>
            </div>
          </li>
          <li class="item">
            <div class="t-t">
              <div>通证：{{Overview[3]}}</div>
              <mu-button small color="primary"  @click="cardTransDialog=true">划转</mu-button>
            </div>
            <div class="t-t">
              <div>奖金余额：{{Overview[4]}}</div>
              <mu-button small color="primary">划转</mu-button>
            </div>
          </li>
          <li class="item">
            <div class="t-t">
              <div>团队奖：{{Overview[5]}}</div>
            </div>
            <div class="t-t">
              <div>管理奖：{{Overview[6]}}</div>
            </div>
          </li>
          <li class="item">
            <div class="t-t">
              <div>释放金额：{{Overview[7]}}</div>
              <mu-button small color="primary">划转</mu-button>
            </div>
            <div class="t-t">
              <div>复利本金：{{Overview[8]}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 充值划转 -->
    <mu-dialog width="90%" max-width="90%" :overlay-close='false' transition="scale"
               :open.sync="rechargeTrasDialog">
      <RechargeTrasComponent @close="rechargeTrasDialog = false" @getData='getOverview()'></RechargeTrasComponent>
    </mu-dialog>

    <mu-dialog width="90%" max-width="90%" :overlay-close='false' transition="scale"
               :open.sync="widthdrawDialog">
      <WidthdrawComponent @close="widthdrawDialog = false" @getData='getOverview()'></WidthdrawComponent>
    </mu-dialog>

    <mu-dialog width="90%" max-width="90%" :overlay-close='false' transition="scale"
               :open.sync="widthdrawTransDialog">
      <WidthdrawTransComponent @close="widthdrawTransDialog = false" @getData='getOverview()'></WidthdrawTransComponent>
    </mu-dialog>
    <!-- 通证划转 -->
    <mu-dialog width="90%" max-width="90%" :overlay-close='false' transition="scale"
               :open.sync="cardTransDialog">
      <CardTransComponent @close="cardTransDialog = false" @getData='getOverview()'></CardTransComponent>
    </mu-dialog>
  </div>
</template>
<script type="text/babel">
  import {baseUrl} from "@/config/env";
  import PathNav from "@/components/PathNav";
  import WidthdrawComponent from "./Withdraw"
  import RechargeTrasComponent from "./RechargeTras"
  import WidthdrawTransComponent from "./WidthdrawTrans"
  import CardTransComponent from "./CardTrans"
  export default {
    data(){
      return {
        Overview:[],
        rechargeTrasDialog:false,
        widthdrawDialog:false,
        widthdrawTransDialog:false,
        cardTransDialog:false
      }

    },
    mounted(){
      this.getOverview()
    },
    methods: {
      getOverview(){
        try {
          let url = baseUrl + "/user/getOverview";
          let config = {
            method: "post",
            url: url + "?r=" + Math.random(),
          };
          this.$axios(config).then(result => {
            if (this.$until.responesValidate(result)) {
              if (result.data.code == 1) {
               let arr = result.data.data.overview
               let newOverview = [0,0,0,0,0,0,0,0]
               for(let i of arr){
                 if(i.assets_id == 1)
                  newOverview[1] = i.available
                 if(i.assets_id == 2)
                  newOverview[2] = i.available
                 if(i.assets_id == 9)
                  newOverview[3] = i.available
                 if(i.assets_id == 7){
                  newOverview[5] = i.frozen
                  newOverview[4] +=i.available
                 }
                 if(i.assets_id == 8){
                  newOverview[6] = i.frozen
                  newOverview[4] +=i.available
                 }
                 if(i.assets_id == 6)
                  newOverview[7] = i.available
                 if(i.assets_id == 5)
                  newOverview[8] = i.available
               }
               this.Overview = newOverview
              }
            }
          }).catch();
        } catch (ex) {
          this.$until.consoleLog(ex);
        }
      }
    },
    components: {
      PathNav,
      RechargeTrasComponent,
      WidthdrawComponent,
      WidthdrawTransComponent,
      CardTransComponent
    }
  }

</script>


<style lang="scss" scoped>
  @import "./../../styles/mixin";
  /deep/ .mu-raised-button{
    min-width:px2rem(140px);
    height: px2rem(60px);;
  }
  .main {
    h3 {
      font-size: px2rem(30px);
      width: 100%;
      text-align: center;
      padding-bottom: px2rem(30px);
    }
    .total-asset {
      font-size: px2rem(30px);
      padding: px2rem(30px) px2rem(100px) px2rem(60px);
      border-bottom: 1px solid #999;
      span {
        font-weight: 600;
      }

    }
    .con {
      font-size: px2rem(26px);
      .item {
        padding: px2rem(30px) 0;
        border-bottom: 1px solid #999;
        display: flex;
        .t-t{
          flex: 1;
        }
      }
    }
  }
</style>
