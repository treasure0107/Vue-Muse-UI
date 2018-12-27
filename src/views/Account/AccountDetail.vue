<template>
  <div class="">
    <mu-container>
      <path-nav>
      </path-nav>
      <h1 class="title" slot="title" >{{title}}</h1>
    </mu-container>
    <mu-container ref="container">
      <mu-load-more :refreshing="refreshing" :loading="loading" @load="loadMore" :loading-text="loadingTxt"
                    :loaded-all="loadingAll">
        <mu-data-table :columns="columns" :sort.sync="sort" :data="tableData" width="100%">
          <template slot-scope="scope">
            <td>{{convertTime(scope.row.addtime)}}</td>
            <td>{{scope.row.amount}}</td>
            <td>{{scope.row.type}}</td>
          </template>
        </mu-data-table>
        <div class="isnone" v-show="isNone">
          没有更多数据了！
        </div>
      </mu-load-more>
    </mu-container>
  </div>
</template>
<script type="text/babel">
  import {baseUrl} from "@/config/env";
  import PathNav from "@/components/PathNav";
  export default {
    data(){
      return {
        columns: [
          {title: "日期", align: "left", width: "120px"},
          {title: "数量", align: "left", width: "100px",},
          {title: "类型", align: "left", width: "80px",}
        ],
        loadingTxt: "加载中...",
        loading: false,
        sort: {
          name: '',
          order: 'asc'
        },
        tableData: [],
        page: 1,
        limit: 10,
        count: 0,
        nun: 0,
        ufecount: 0,
        refreshing: false,
        loadingAll: false,
        isNone: false,
        urll: '',
        title: ''
      }
    },
    mounted(){
      var type = this.$route.query.type;
      if (type==1) {
        this.urll = '/transfer/rechargeToWithdraw'
        this.title = '充值明细'
      } else if (type==2) {
        this.urll = '/transfer/rechargeToWithdraw'
        this.title = '充值转提现明细'
      } else if (type==3) {
        this.urll = '/assets/withdrawalList'
        this.title = '提现明细'
      } else if (type==4) {
        this.urll = '/transfer/withdrawalTransferList'
        this.title = '提现划转明细'
      } else if (type==5) {
        this.urll = '/transfer/cardList'
        this.title = '通证划转明细'
      } else if (type==6) {
        this.urll = '/transfer/rewardList'
        this.title = '奖金余额转提现明细'
      } else if (type==7) {
        this.urll = '/transfer/releaseList'
        this.title = '释放金额转提现明细'
      }
      this.getData();
    },
    methods: {
      loadMore () {
        if (this.count >= this.limit && this.count >= this.tableData.length) {
          setTimeout(() => {
            this.limit = this.limit + 5;
            this.getData();
          }, 2000);
        }
      },
      convertTime(time){
        return this.$until.formatDate(new Date(time * 1000));
      },
      getData(){
        try {
          let config = {
            method: "post",
            url: baseUrl + this.urll + "?r=" + Math.random(),
            data: {
              page: this.page,
              limit: this.limit
            }
          };
          this.$axios(config).then(result => {
            if (this.$until.responesValidate(result)) {
              let res = result.data.data;
              this.tableData = res.data;
              this.count = res.total;
              this.ufecount = res.ufecount;
              if (res.data.length == res.total && res.data.length > 10) {
                this.loadingAll = true;
                this.isNone = true;
              }
            }
          });
        } catch (ex) {
          this.$until.consoleLog(ex);
        }
      }
    },
    components: {
      PathNav
    }
  }

</script>

<style lang="scss" scoped>
  @import "./../../styles/mixin";

  .title {
    margin: 0;
  }
  /deep/ .mu-infinite-scroll-text {
    margin-left: px2rem(16px);
    font-size: $a_size;
  }

  .dataTable {
    width: 100%;
    text-align: center;
    font-size: $a_size;
    tr.firstTr {
      background: #efdab6;
    }
    tr {
      height: px2rem(54px);
      line-height: px2rem(54px);
      td {
        padding: px2rem(20px) px2rem(8px);
      }
    }
  }

  .demo-loadmore-wrap {
    width: 100%;
    height: px2rem(1105px);
    display: flex;
    flex-direction: column;
    .mu-appbar {
      width: 100%;
    }
  }

  .demo-loadmore-content {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  /deep/ .mu-item {
    padding: 0
  }

  p.ufe-count {
    text-align: center;
    padding: px2rem(15px) 0 px2rem(60px) 0;
    @include sc(px2rem(40px), #484848);
    span {
      @include sc(px2rem(40px), red);
    }
  }

  /deep/ .mu-table {
    tr {
      td, th {
        /*      padding-left: px2rem(15px);
      padding-right: px2rem(15px);*/
        text-align: center;
        font-size: $a_size;
      }
      th {
        background-color: #f5f5f5;
        padding: px2rem(30px) px2rem(5px);
        border-bottom: solid 1px #f5f5f5;
        height: px2rem(56px);
        font-weight: 500;
      }
      td{
        padding: px2rem(30px) px2rem(5px);
        border-bottom: solid 1px #f5f5f5;
      }
    }
  }
</style>
