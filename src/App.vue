<template>
  <div id="app">
    <router-view/>
    <div class="footer">
        <mu-container  style="width:100%;">
          <mu-bottom-nav :value.sync="bottomNav">
            <mu-bottom-nav-item value="month" title="月"   icon="restore" replace to="/month">
            </mu-bottom-nav-item>
            <mu-bottom-nav-item value="days"  title="日"   icon="favorite" replace to="/days">
            </mu-bottom-nav-item>
            <mu-bottom-nav-item value="add"   title="添加" icon="location_on" replace to="/add">
            </mu-bottom-nav-item>
          </mu-bottom-nav>
        </mu-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    // const jsonData = [
    //     {
    //         date: '2019', 
    //         moneySum: 0,
    //         children: [
    //             {
    //                 date: 12, 
    //                 moneySum: 0,
    //                 children: [
    //                     {date: 25, moneySum: 0, children: []}
    //                 ]
    //             }
    //         ]
    //     }
    // ]
    const bottomNav = this.$route.name
    return {
        bottomNav,
    }
  }
}
</script>

<style type="text/css" scoped>
.footer {
    width: 100%;
    background-color: #fff;
    position: fixed;
    bottom: 0;
}
</style>
<style>
html, body {
    width: 100%;
    height: 100%;
    /*background-color: skyblue;*/
    -o-user-select: none;
    -moz-user-select: none; /*火狐 firefox*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10+*/
    -khtml-user-select :none; /*早期的浏览器*/
    user-select: none;
}
#app {
    width: 100%;
    height: 100%;
    padding-bottom: 60px;
    box-sizing: border-box;
    position: relative;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
}
</style>
