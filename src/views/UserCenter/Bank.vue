<template>
  <div class="container">
    <Path-nav :titleName="titleName"></Path-nav>
    <div class="con" v-if="!isBank">
      <div>
        <div class="item"><label>开户姓名：</label><input class="trueName" type="text" v-model="trueName" disabled></div>
        <div class="item"><label>开户银行：</label><input type="text" placeholder="请输入" v-model="bank_name"></div>
        <div class="item"><label>开户支行：</label><input type="text" placeholder="请输入" v-model="bank_address"></div>
        <div class="item"><label>银行账号：</label><input type="text" placeholder="请输入" v-model="bank_card"></div>
        <div class="item">
          <label>交易密码：</label><input type="password" maxlength="6" placeholder="请输入" v-model="safe_password">
        </div>
      </div>
      <div class="btn">
        <mu-button color="primary" @click="submit">设置</mu-button>
      </div>
    </div>
    <div class="con" v-else>
      <div class="new">
        <div class="bank">银行名称：<span>{{bankName}}</span></div>
        <div class="bank">银行卡号：<span>{{bankNumber}}</span></div>
      </div>
      <div class="btn">
        <mu-button color="primary" @click="revise">修改</mu-button>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import {baseUrl} from "@/config/env";
  import PathNav from "@/components/PathNav";
  import until from "@/scripts/until";
  import Toast from 'muse-ui-toast';
  export default {
    data(){
      return {
        titleName: '银行卡设置',
        isBank: false,
        bankName: '',
        bankNumber: '',
        bank_name: '',
        bank_card: '',
        bank_address: '',
        safe_password: '',
        trueName: ''
      }

    },
    mounted(){
      this.getUserStatus();
    },
    methods: {
      getUserStatus(){
        try {
          let url = baseUrl + "/user/getUserStatus";
          let config = {
            method: "post",
            url: url + "?r=" + Math.random(),
          };
          this.$axios(config).then(result => {
            if (this.$until.responesValidate(result)) {
              let res = result.data.data;
              console.log(res);
              this.trueName = res.id_name;
              if (res.is_bank == 'yes') {
                this.isBank = true;
              }
              this.bankName = res.bank_name;
              this.bankNumber = res.id_number
            }
          });
        } catch (ex) {
          this.$until.consoleLog(ex);
        }
      },
      setSafeBank(){
        try {
          let url = baseUrl + "/user/setSafeBank";
          let config = {
            method: "post",
            url: url + "?r=" + Math.random(),
            data: {
              bank_name: this.bank_name,
              bank_card: this.bank_card,
              bank_address: this.bank_address,
              safe_password: this.safe_password
            }
          };
          this.$axios(config).then(result => {
            if (this.$until.responesValidate(result)) {
              Toast.message({
                message: '银行卡设置成功！',
                time: 1000,
                position: "top",
                color: "#61b865",
                textColor: "#fff",
                close: true
              });
              this.getUserStatus();
          /*    setTimeout(() => {
                this.$router.push('/UserCenter');
              }, 1000);*/
            }
          });
        } catch (ex) {
          this.$until.consoleLog(ex);
        }
      },
      submit(){
        if (!this.bank_name) {
          Toast.message({
            message: '开户银行名称不能为空！',
            time: 2000,
            position: "top",
            color: "#f5594e",
            textColor: "#fff",
            close: true
          });
          return false;
        }
        if (!this.bank_card) {
          Toast.message({
            message: '银行卡号不能为空！',
            time: 2000,
            position: "top",
            color: "#f5594e",
            textColor: "#fff",
            close: true
          });
          return false;
        }
        let pattern = /^\d{16,19}$/;
        if (!pattern.test(this.bank_card)) {
          Toast.message({
            message: '请输入16-19位銀行卡号！',
            time: 2000,
            position: "top",
            color: "#f5594e",
            textColor: "#fff",
            close: true
          });
          return false;
        }
        if (!this.safe_password) {
          Toast.message({
            message: '交易密码不能为空！',
            time: 2000,
            position: "top",
            color: "#f5594e",
            textColor: "#fff",
            close: true
          });
          return false;
        }
        this.setSafeBank();
      },
      revise(){
        this.isBank = false;
      }
    },
    components: {
      PathNav
    }
  }

</script>


<style lang="scss" scoped>
  @import "./../../styles/mixin";

  /deep/ .mu-button-wrapper {
    width: px2rem(300px);
  }

  .con {
    font-size: px2rem(26px);
    padding-top: px2rem(30px);
    h3 {
      font-size: px2rem(30px);
      width: 100%;
      text-align: center;
      padding-bottom: px2rem(30px);
    }
    .item {
      margin-top: px2rem(30px);
      padding-bottom:px2rem(30px);
      label {
        display: inline-block;
        margin-right: px2rem(30px);
        width:px2rem(160px);
        text-align: right;
      }
      input {
        width: px2rem(460px);
        height: px2rem(66px);
        padding-left: px2rem(10px);
        border: 1px solid #EEEEEE;
        border-radius: px2rem(3px);
      }
    }
    .btn {
      width: 100%;
      text-align: center;
      padding-top: px2rem(100px);
      /deep/ .mu-button-wrapper {
        width: px2rem(600px);
        border: 1px solid #EEEEEE;
      }
      /deep/ .mu-button {
        height: px2rem(90px);
        font-size: px2rem(30px);
      }
    }
    .new {
      margin: px2rem(30px);
      border: 1px solid #999;
      .bank {
        padding: px2rem(30px);
        span {
          font-weight: 600;
        }
      }
    }
  }
</style>
