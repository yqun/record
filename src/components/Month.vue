<template>
  <div>
    <!-- 头部 -->
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button flat slot="left" @click="prevMonth()">上一年</mu-button>
      <div style="text-align: center;">{{chooseYear}}年</div>
      <mu-button flat slot="right" @click="nextMonth()">下一年</mu-button>
    </mu-appbar>
    <!-- 内容 -->
    <mu-container style="padding: 8px 10px;">
      <mu-expansion-panel :expand="panel === month.date" 
                          v-for="(month,index) of yearData.children" :key="index"
                          @change="toggle(month.date)">
        <div slot="header" style="width: 100%;">
          <span>{{month.date}}月</span><span style="float: right;">总计：{{month.moneySum}}元</span>
        </div>
        <!-- <div slot="action">Panel 1</div> -->
        <div slot="default">
          <mu-list>
            <mu-list-item :ripple="false" 
                          v-for="(days,index) of month.children" 
                          :key="index">
              <mu-list-item-title>{{days.date}}日</mu-list-item-title>
              <mu-list-item-action>{{days.moneySum}}元</mu-list-item-action>
            </mu-list-item>
          </mu-list>
        </div>
        <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. -->
      </mu-expansion-panel>
    </mu-container>
  </div>
</template>

<script>
export default {
  name: 'month',
  data () {
    const date = new Date()
    const chooseYear = date.getFullYear();
    const jsonData = JSON.parse(window.localStorage.getItem('recordData')) || [];
    const yearData = jsonData.filter(year => year.date == chooseYear)[0] || {}
    // console.log(yearData)
    return {
      jsonData,
      chooseYear,
      yearData,
      date, // 当前日期
      panel: ''
    }
  },
  methods: {
    toggle (panel) {
      // console.log(panel)
      this.panel = panel === this.panel ? '' : panel;
    },
    prevMonth() { // 点击上一年
      // console.log(this.chooseMonth)
      this.judgeMonth('prev')
      this.getDataByDate();
    },
    nextMonth() { // 点击下一年
      // console.log(this.chooseMonth)
      this.judgeMonth('next')
      this.getDataByDate();
    },
    getDataByDate() {
      this.yearData = this.jsonData.filter(year => year.date == this.chooseYear)[0] || {};
      // console.log(this.yearData)
    },
    judgeMonth(handle) { // 判断当前月份
      if (handle == 'prev') {
        this.chooseYear--
      } 
      else if (handle == 'next') {
        this.chooseYear++
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
