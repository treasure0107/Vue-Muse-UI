<template>
    <div class="container">
      <path-nav></path-nav>
      <div class='main'>
        <p>蚂蚁大宝卡{{taocan}}套餐</p>
        <div class="amount">
          <ul>
            <li v-for="item in amount" v-if="item.type == taocan" 
            :key="item.id" @click='handleClick(item.price,item.id)'
            :class="{on:onClass==item.id}">{{item.price}}</li>
          </ul>
        </div>
        <mu-flex align-items="center">
          <mu-radio v-model="selection" class="selectStyle" value="recharge" label="优先充值金额"></mu-radio>
          <mu-radio v-model="selection" class="selectStyle" value="withdraw" label="优先提现金额"></mu-radio>
        </mu-flex>
        
        <form action="">
          <table>
            <tr>
              <td>报单金额:</td>
              <td><input type="text" disabled v-model="p1"></td>  
            </tr>
            <tr>
              <td>需充值金额:</td>
              <td><input type="text" disabled v-model="p2"></td>  
            </tr>
            <tr>
              <td>需提现金额:</td>
              <td><input type="text" disabled v-model="p3"></td>  
            </tr>
            <tr>
              <td>需通证数量:</td>
              <td><input type="text" disabled v-model="p4"></td>  
            </tr>
            <tr>
              <td>释放天数:</td>
              <td><input type="text" disabled v-model="p5"></td>  
            </tr>
            <tr>
              <td>倍数:</td>
              <td><input type="text" disabled v-model="p6"></td>  
            </tr>
            <tr>
              <td>交易密码:</td>
              <td><input type="password"  v-model="upwd"></td>  
            </tr>
            <tr>
              <td>自动复投:</td>
              <td>
                <mu-switch v-model="autoSwitch"></mu-switch>
                <mu-tooltip placement="top" 
                  content="温馨提示：1、开启自动复投请保证资金和通证充足.
                  2、资金或者通证不足时，自动复投将自动关闭.
                  3、自动复投时需使用双倍的通证"> 
                  <span class="questionMark">?</span>
                </mu-tooltip>
              </td>  
            </tr>
          </table>
          <p>
            <mu-button type="submit" color="primary" @click.prevent="orderSubmit()">报单</mu-button>
          </p>
        </form>  
        
      </div>
      <footer-bar></footer-bar>
    </div>
</template>
<script type="text/babel">
  import {baseUrl} from "@/config/env";
  import FooterBar from "@/components/FooterBar";
  import PathNav from "@/components/PathNav";
    export default {
        data(){
            return {
              taocan:null,
              amount:[],
              selection:'recharge',
              p:0,
              upwd:'',
              onClass:null,
              autoSwitch:false,
              recharge:0,
              withdraw:0,
              card:0
            }

        },
        computed:{
          p1:function(){
            return this.p.toFixed(2)
          },
          p2:function(){
            let result 
            let p7 = parseFloat(this.p)
            let half = p7/2
            if(this.selection == 'recharge'){//如果优先充值金额
              result = this.recharge >= p7?p7:this.recharge
            }else{
              result = half
            }
            return result.toFixed(2)
          },
          p3:function(){
            let result 
            let p7 = parseFloat(this.p)
            let half = p7/2
            if(this.selection == 'recharge'){//如果优先充值金额
              result = this.recharge >= p7?0.00:(p7-this.recharge)
            }else{
              result = half
            }
            return result.toFixed(2)
          },
          p4:function(){
            if(this.p==0)
              return 0
            else
              return this.p>=5000?2:1
          },
          p5:function(){
            let result 
            switch (this.taocan) { 
              case 'u':result="250"; 
              break; 
              case 'uu':result="300"; 
              break; 
              case 'uuu':result="350"; 
              break; 
              case 'uuuu':result="400"; 
            }
            return result
          },
          p6:function(){
            let result 
            switch (this.taocan) { 
              case 'u':result="2.5"; 
              break; 
              case 'uu':result="3.0"; 
              break; 
              case 'uuu':result="3.5"; 
              break; 
              case 'uuuu':result="4.0"; 
            }
            return result
          },
        },
        beforeMount(){
          this.taocan = this.$route.query.msg || 'u'
        },
        mounted(){
          this.getList()
          this.getBalance()
        },
        methods: {
          handleClick(count,index){
            count = parseFloat(count)
            if(this.selection == 'withdraw' && this.withdraw <= (count/2) )
                this.$toast.error('可提现余额不足！'); 
            else if(this.selection == 'withdraw'  && this.withdraw >= (count/2) && this.selection <=(count/2))
                this.$toast.error('充值余额不足！'); 
            else if(this.selection == 'recharge' && this.selection <=(count/2))
                this.$toast.error('充值余额不足！'); 
            else if(this.selection == 'recharge' && this.selection >=(count/2) && this.withdraw <= (count/2)){
              this.$toast.error('可提现余额不足！'); 
            }else{
              this.p = count
              this.onClass = index
            }
            
          },
          orderSubmit(){
              try {
                let url = baseUrl + "/packeage/addOrder";
                let config = {
                  method: "post",
                  url: url + "?r=" + Math.random(),
                  data:{
                    amount:this.p1,
                    recharge:this.p2,
                    withdraw:this.p3,
                    card:this.p4,
                    safe_password:this.upwd,
                    is_repeat:this.autoSwitch?'yes':'no'
                  }
                };
                this.$axios(config).then(result => {
                  if (this.$until.responesValidate(result)) {
                    if (result.data.code == 1) {
                      this.$router.push("/OrderSuccess?amount="+this.p1)
                    }
                  }
                }).catch();
              } catch (ex) {
                this.$until.consoleLog(ex);
              }
          },
          getList(){
            try {
              let url = baseUrl + "/packeage/getList";
              let config = {
                method: "post",
                url: url + "?r=" + Math.random()
              };
              this.$axios(config).then(result => {
                if (this.$until.responesValidate(result)) {
                  if (result.data.code == 1) {
                    this.amount = result.data.data
                  }
                }
              }).catch();
            } catch (ex) {
              this.$until.consoleLog(ex);
            }
          },
          getBalance(){
            try {
              let url = baseUrl + "/packeage/getBalance";
              let config = {
                method: "post",
                url: url + "?r=" + Math.random()
              };
              this.$axios(config).then(result => {
                if (this.$until.responesValidate(result)) {
                  if (result.data.code == 1) {
                    this.recharge = parseFloat(result.data.data.recharge.available)
                    this.withdraw = parseFloat(result.data.data.withdraw.available)
                    this.card = parseFloat(result.data.data.card.available)
                  }
                }
              }).catch();
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
  .selectStyle{
    margin-left:px2rem(70px);
  }
  .questionMark{
    display: inline-block;
    width:px2rem(40px);
    height: px2rem(40px);
    border-radius: 50%;
    background: rgb(182, 178, 178);
    color:blue;
    text-align: center;
    margin-left: px2rem(30px);
  }
  div.main{
    p{
       text-align: center;
       font-size: px2rem(60px);
    }
    div.amount{
      border:1px solid rgb(155, 153, 153);
      height:px2rem(200px);
      padding: px2rem(10px);
      margin-bottom:px2rem(20px);
      ul{
        li{
          float:left;
          width:20%;
          text-align: center;
          line-height: px2rem(60px);
        }
        .on{
          background: blue;
          color:#fff;
        }
      }
    }
    table{
      margin:px2rem(15px) auto;
      tr{
        td:first-child{
          text-align: right;
        }
        td{
          padding:px2rem(10px);
          input{
            padding-left:px2rem(10px);
            border:1px solid gray;
          }
        }
      }
    } 
  }
</style>
