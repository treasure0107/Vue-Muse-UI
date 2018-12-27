<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script type="text/babel">
  export default {
    name: 'App',
    data(){
      return {}
    },
    beforeCreate(){
   /*   if(!window.name) {*/
     /*   window.name = "firstEnter";
        window.localStorage.clear();
        const loading = this.$loading();
        setTimeout(() => {
          loading.close();
        }, 633000);*/
   /*   }*/
    },
    components: {
    }
  }
</script>

<style lang="scss" scoped>
  @import "styles/mixin";
  #app {
    position: relative;
    /*padding-bottom: px2rem(150px);*/
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
  }
</style>
