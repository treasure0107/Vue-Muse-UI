<template>
  <div class="main">
    <div class="packet-Icon" ref="packetFly" v-show="fly"></div>
    <mu-form v-show="!fly" ref="form" :model="formData" class="mu-demo-form">
      <div class="form-tit">划转</div>
      <mu-form-item label="对方手机号码" prop="phone" :rules="phoneRules">
        <mu-text-field v-model="formData.phone" prop="phone"></mu-text-field>
      </mu-form-item>
      <mu-form-item label="数量" prop="amount" :rules="amountRules">
        <mu-text-field v-model="formData.amount" prop="amount"></mu-text-field>
      </mu-form-item>
      <!-- <mu-form-item label="资金密码"  prop="safePwd" :rules="safePwdRules">
          <mu-text-field type="password" v-model="formData.safePwd" prop="safePwd"></mu-text-field>
      </mu-form-item> -->
      <mu-form-item>
        <div class="subDiv">
          <mu-button class="dailog-btns" round @click="$emit('close')">取消</mu-button>
          <mu-button @click="Submit" v-dbClick class="dailog-btns" style="background: #CDA65B;color:#fff" round>划转
          </mu-button>
        </div>
      </mu-form-item>
    </mu-form>
    <mu-dialog v-show="!fly" title="确认划转" width="90%" max-width="90%" :overlay-close='false' transition="scale"
               :open.sync="sureTransferDialog">
      <div class="transfer-f"><span>对方手机号码：</span><span>{{phoneCount}}</span></div>
      <div class="transfer-f"><span>数量：</span><span>{{amountCount}}</span></div>
      <div class="subDiv subDiv-t">
        <mu-button class="dailog-btns" round @click="sureTransferDialog=false;">取消</mu-button>
        <mu-button @click="formSubmit" v-dbClick class="dailog-btns" style="background: #CDA65B;color:#fff" round>确定
        </mu-button>
      </div>
    </mu-dialog>
  </div>
</template>
<script type="text/babel">
  import until from "@/scripts/until";
  import {baseUrl} from "@/config/env";
  export default {
    props: ['amount'],
    data(){
      return {
        amountRules: [
          {
            validate: (val) => {
              var reg = /^[1-9][0-9]*$/
              return reg.test(val)
            }, message: '输入金额必须正整数'
          },
          {validate: (val) => val >= 3 ? true : false, message: '划转最小数量是3个'},
        ],
        phoneRules: [
          {validate: (val) => !!val, message: '请输入手机号码'},
          {
            validate: (val) => {
              var reg = /^1[0-9]{10}$/
              return reg.test(val)
            }, message: '请输入正确的手机号码'
          }
        ],
        /*  safePwdRules: [
         { validate: (val) => !!val, message: '请输入资金密码'},
         ], */
        formData: {
          phone: '',
          amount: ''
        },
        fly:false,
        sureTransferDialog: false,
        phoneCount: '',
        amountCount: ''
      }

    },
    mounted(){

    },
    methods: {
      cleanInput(){
        this.formData.amount = ''
        this.formData.phone = ''
      },
      Submit(){
        this.$refs.form.validate().then((result) => {
          this.phoneCount = this.formData.phone;
          this.amountCount = this.formData.amount;
          if (result) {
            this.sureTransferDialog = true;
          }

        });
      },
      formSubmit(){
        this.addTransferUp()
        /* this.$refs.form.validate().then((result) => {
          if (result) {
            this.addTransferUp()
          }
          this.$refs.form.clear();
        }); */
      },
      addTransferUp(){//通证划转
        try {
          let url = baseUrl + "/transfer/addTransferUp";
          let config = {
            method: "post",
            url: url + "?r=" + Math.random(),
            data: {mobile: this.formData.phone, qty: this.formData.amount}
          };
          this.$axios(config).then(result => {
            this.transferSubmitDisable = false
            if (until.responesValidate(result)) {
              if (result.data.code == 1) {
                this.$emit('getData')
                this.$refs.form.clear();
                this.fly = true
                setTimeout(()=>{this.$emit('close')},2000)
               /*  this.$until.tostMsg(result.data.msg || '操作成功！', () => {
                  this.cleanInput()
                  this.$emit('close')
                }, 'green'); */
              }
            }
          }).catch();
        } catch (ex) {
          until.consoleLog(ex);
        }
      },

    },
    components: {}
  }

</script>

<style lang="scss" scoped>
  @import "./../styles/mixin";

  .main {
    background-color: #fff;
    padding: px2rem(60px) px2rem(30px);
    border-radius: px2rem(10px);
  }

  div.subDiv {
    padding-left: px2rem(60px);
    margin-top: px2rem(30px);
  }

  .subDiv-t {
    padding-bottom: px2rem(30px);
  }

  .form-tit {
    font-size: px2rem(36px);
    font-family: PingFang-SC-Medium;
    font-weight: 600;
    color: #110c01;
    padding-bottom: px2rem(36px);
  }

  .transfer-f {
    font-size: px2rem(26px);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    text-align: center;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: #110c01;
    padding: px2rem(20px) 0;
    span:first-child {
      font-weight: 600;
      display: inline-block;
      width: px2rem(190px);
      text-align: right;
      margin-right: px2rem(10px);
    }
  }

  .packet-Icon {
    position: fixed;
    z-index: 999;
    left: 20%;
    bottom: 30%;
    width: px2rem(400px);
    height: px2rem(600px);
    /* background-color: red; */
    animation: animationFly 1s ease 1.4s 1;
    background: url("../assets/hongbaoFly.png") center center no-repeat;

    background-size: cover;
  }

  @keyframes animationFly {
    0% {
      left: 30%;
      bottom: 30%;
    }
    100% {
      left: 100%;
      bottom: 100%;
      transform:scale(0.1);
    }
  }


  @-moz-keyframes animationFly /* Firefox */
  {
    0% {
      left: 30%;
      bottom: 30%;
    }
    100% {
      left: 100%;
      bottom: 100%;
      transform:scale(0.1);
    }
  }

  @-webkit-keyframes animationFly /* Safari 和 Chrome */
  {
    0% {
      left: 30%;
      bottom: 30%;
    }
    100% {
      left: 100%;
      bottom: 100%;
      transform:scale(0.1);
    }
  }

  @-o-keyframes mymove /* Opera */
  {
    from {top:0px;}
    to {top:200px;}
  }
</style>
