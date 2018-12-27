<template>
  <div class="main">
    <p class="title">划转</p>
    <mu-form ref="form" :model="formData" class="mu-demo-form">
      <mu-form-item label="提现金额" prop="amount" :rules="amountRules">
        <mu-text-field v-model="formData.amount" prop="amount"></mu-text-field>
      </mu-form-item>
      <mu-form-item label="收款银行" prop="bank">
        <mu-text-field v-model="formData.bank" prop="bank" disabled></mu-text-field>
      </mu-form-item>
      <mu-form-item label="实际到款金额" prop="trueAmount">
        <mu-text-field v-model="formData.trueAmount" prop="trueAmount" disabled></mu-text-field>
      </mu-form-item>
      <mu-form-item label="交易密码" prop="safePassword" :rules="safePasswordRules">
        <mu-text-field autocomplete="new-password" v-model="formData.safePassword" type="password" prop="safePassword"></mu-text-field>
      </mu-form-item>
      <mu-form-item>
        <div class="subDiv">
          <mu-button class="dailog-btns" round @click="$emit('close')">取消</mu-button>
          <mu-button @click="Submit" v-dbClick class="dailog-btns" style="background: #CDA65B;color:#fff" round>划转
          </mu-button>
        </div>
      </mu-form-item>
    </mu-form>
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
          {validate: (val) => {
            return val.length <= 12
            }, message: '输入最大12位数字'
          },
          {
            validate: (val) => {
              var reg = /^[1-9][0-9]*.?[0-9]*$/
              return reg.test(val)
            }, message: '请输入正确金额'
          },
        ],
        safePasswordRules: [
          {validate: (val) => !!val, message: '请输入资金密码'},
          {
            validate: (val) => {
              var reg = /^[0-9]{6}$/
              return reg.test(val)
            }, message: '密码格式不正确'
          }
        ],
        formData: {
          trueAmount:'',
          bank:'',
          amount: '',
          safePassword:''
        },
        fly:false,
        sureTransferDialog: false,
        phoneCount: '',
        amountCount: ''
      }

    },
    mounted(){
      this.getUserStatus()
    },
    methods: {
      cleanInput(){
        this.formData.amount = ''
        this.formData.safePassword = ''
      },
      Submit(){
        this.withdrawTransfer()
      },
      withdrawTransfer(){
        try {
          let url = baseUrl + "/assets/withdrawUff";
          let config = {
            method: "post",
            url: url + "?r=" + Math.random(),
            data: {amount: this.formData.amount, safe_password: this.formData.safePassword}
          };
          this.$axios(config).then(result => {
            if (until.responesValidate(result)) {
              if (result.data.code == 1) {
                this.$emit('getData')
                this.$refs.form.clear();
                setTimeout(()=>{this.$emit('close')},2000)
                this.$until.tostMsg(result.data.msg || '操作成功！', () => {
                  this.cleanInput()
                  this.$emit('close')
                }, 'green');
              }
            }
          }).catch();
        } catch (ex) {
          until.consoleLog(ex);
        }
      },
      getUserStatus(){
        try {
          let url = baseUrl + "/user/getUserStatus";
          let config = {
            method: "post",
            url: url + "?r=" + Math.random()
          };
          this.$axios(config).then(result => {
            if (until.responesValidate(result)) {
              if (result.data.code == 1) {
                if(this.formData.bank)
                this.formData.bank = result.data.data.bank_name
              }
            }
          }).catch();
        } catch (ex) {
          until.consoleLog(ex);
        }
      }
    },
    components: {}
  }

</script>

<style lang="scss" scoped>
  @import "../../styles/mixin";

  .main {
    background-color: #fff;
    padding: px2rem(10px) px2rem(30px);
    border-radius: px2rem(10px);
    p.title{
        text-align: center;
        line-height:px2rem(120px);
        font-size: px2rem(40px);
        font-weight:bold;
    }
  }
  div.subDiv {
    padding-left: px2rem(60px);
    margin-top: px2rem(30px);
  }
</style>
