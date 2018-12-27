<template>
    <div >
      <Path-nav>
      </Path-nav>
      <div class="con">
        <h3>{{datas.title}}</h3>
        <div v-html="datas.content"></div>
      </div>
    </div>
</template>
<script type="text/babel">
  import {baseUrl} from "@/config/env";
  import PathNav from "@/components/PathNav";
    export default {
        data(){
            return {
              datas: [],
              id: ''
            }
        },
        mounted(){
          this.id = this.$route.query.id;
          this.getArticleContent();

        },
        methods: {
          getArticleContent(){
            try {
              let url = baseUrl + "/index/getArticleContent";
              let config = {
                method: "POST",
                url: url + "?r=" + Math.random(),
                data: {
                  id: this.id
                }
              };
              this.$axios(config).then(res => {
                if (this.$until.responesValidate(res)) {
                  this.datas = res.data.data
                }
              });
            } catch (ex) {
              until.consoleLog(ex);
            }
          },
        },
        components: {
          PathNav
        }
    }

</script>

<style lang="scss" scoped>
  @import "./../../styles/mixin";

  .con {
   padding: 0 px2rem(40px);
    h3 {
      text-align: center;
      font-size: px2rem(30px);
      margin-bottom: px2rem(15px);
    }
  }
</style>
