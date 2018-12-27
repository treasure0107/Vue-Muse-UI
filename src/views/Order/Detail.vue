<template>
  <div class="container">
    <path-nav adress="/Order"></path-nav>
    <div class="main">
      <p>已报单金额:&nbsp;&nbsp;<span>{{datas.amount}}</span></p>
      <p>剩余出局总额度:&nbsp;&nbsp;<span>{{datas.surpluses}}</span></p>
      <p>剩余报单额度:&nbsp;&nbsp;<span>{{datas.surplustotal}}</span></p>
      <div class="allLists">
        <div class="lists" v-for="(item,index) in lists" :key="index">
            <ul>
                <li>订单id:&nbsp;&nbsp;<span>{{item.amount}}</span></li>
                <li>日期:&nbsp;&nbsp;<span>{{$until.formatDate(item.create_time)}}</span></li>
                <li>报单金额:&nbsp;&nbsp;<span>{{item.amount}}</span></li>
                <li>出局金额:&nbsp;&nbsp;<span>{{item.total}}</span></li>
                <li>剩余出局金额:&nbsp;&nbsp;<span>{{item.surpluses}}</span></li>
                <li>释放天数:&nbsp;&nbsp;<span>{{item.releas_total_day}}</span></li>
                <li>已释放天数:&nbsp;&nbsp;<span>{{item.releas_day}}</span></li>
                <li>释放金额:&nbsp;&nbsp;<span>{{item.releas_amount}}</span></li>
            </ul>
        </div>  
      </div>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script type="text/babel">
  import {baseUrl} from "@/config/env";   
  import PathNav from "@/components/PathNav";
  import FooterBar from "@/components/FooterBar";
  export default {
    name: 'App',
    data(){
      return {
          datas:{},
          lists:[]
      }
    },
    mounted(){
        this.generalReportAll()
        this.generalReportList()
    },
    methods:{
        generalReportAll(){
            try {
                let url = baseUrl + "/packeage/generalReportAll";
                let config = {
                    method: "post",
                    url: url + "?r=" + Math.random(),
                };
                this.$axios(config).then(result => {
                    if (this.$until.responesValidate(result)) {
                        if (result.data.code == 1) {
                            this.datas = result.data.data
                        }
                    }
                }).catch();
                } catch (ex) {
                    until.consoleLog(ex);
                }
        },
        generalReportList(){
             try {
                let url = baseUrl + "/packeage/generalReportList";
                let config = {
                    method: "post",
                    url: url + "?r=" + Math.random(),
                };
                this.$axios(config).then(result => {
                    if (this.$until.responesValidate(result)) {
                        if (result.data.code == 1) {
                            this.lists = result.data.data.data
                        }
                    }
                }).catch();
                } catch (ex) {
                until.consoleLog(ex);
            }
        }
    },
    components: {
      PathNav,FooterBar
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/mixin";
  div.main{
    p{
      line-height:px2rem(80px)
    }
    div.allLists{
        overflow: scroll;
        div.lists{
        margin-top:px2rem(5px);
            ul{
                height:px2rem(245px);
                padding: px2rem(6px);
                border-top:1px solid gray;
                border-bottom:1px solid gray;
                li{
                    line-height:px2rem(60px);
                    float:left;
                    margin-right:px2rem(30px);
                }
            }
        }
    }    
  }
</style>
