<template>
  <div>
    <!-- 头部 -->
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button flat slot="left" @click="prevMonth()">上个月</mu-button>
      <div style="text-align: center;">{{chooseYear}}年{{chooseMonth}}月</div>
      <mu-button flat slot="right" @click="nextMonth()">下个月</mu-button>
    </mu-appbar>
    <!-- 内容 -->
    <mu-container style="padding: 8px 10px;">
      <mu-expansion-panel :expand="panel === days.date" 
                          v-for="(days,index) of monthData.children" :key="index"
                          @change="toggle(days.date)">
        <div slot="header" style="width: 100%;">
          <span>{{days.date}}日</span><span style="float: right;">总计：{{days.moneySum}}元</span>
        </div>
        <!-- <div slot="action">Panel 1</div> -->
        <div slot="default">
          <mu-list>
            <mu-list-item :ripple="false" 
                          v-for="(option,index) of days.children" 
                          :key="index"
                          @touchstart.native="touchstart(days.date, option)"
                          @touchend.native="touchend()">
              <mu-list-item-title>{{option.name}}</mu-list-item-title>
              <mu-list-item-action>{{option.moneySum}}元</mu-list-item-action>
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
  name: 'days',
  data () {
    const date = new Date()
    const chooseYear = date.getFullYear();
    const chooseMonth = date.getMonth() + 1;
    const jsonData = JSON.parse(window.localStorage.getItem('recordData')) || [];
    const yearData = jsonData.filter(year => year.date == chooseYear)
    const monthData = yearData.length?
    yearData[0].children.filter(month => month.date == chooseMonth)[0]||{} : {};
    // console.log(monthData)
    return {
      jsonData,
      chooseYear,
      chooseMonth,
      monthData,
      date, // 当前日期
      panel: '',
      timer: null,
      delDays: '', // 要删除的选项日期
    }
  },
  methods: {
    toggle (panel) {
      // console.log(panel)
      this.panel = panel === this.panel ? '' : panel;
    },
    prevMonth() { // 点击上一个月
      // console.log(this.chooseMonth)
      this.judgeMonth('prev')
      this.getDataByDate();
    },
    nextMonth() { // 点击下一个月
      // console.log(this.chooseMonth)
      this.judgeMonth('next')
      this.getDataByDate();
    },
    getDataByDate() {
      const yearData = this.jsonData.filter(year => year.date == this.chooseYear)
      this.monthData = yearData.length?yearData[0].children.filter(month => month.date == this.chooseMonth)[0] || {} : {};
      // console.log(this.monthData)
    },
    judgeMonth(handle) { // 判断当前月份
      if (handle == 'prev') {
        if(this.chooseMonth != 1) return this.chooseMonth--
        this.chooseYear--
        this.chooseMonth = 12
      } 
      else if (handle == 'next') {
        if(this.chooseMonth != 12) return this.chooseMonth++
        this.chooseYear++
        this.chooseMonth = 1
      }
    },
    touchstart(delDays, option) {
      
      this.timer = setTimeout(() => {
        this.$confirm('确定要删除吗？', '提示', { type: 'warning' })
        .then(({ result }) => {
          if (!result) return false;
          this.delDays = delDays
          this.deleteData(option)
        });
      }, 400)
    },
    touchend() {
      clearTimeout(this.timer)
    },
    deleteData(delOption) {
      console.log(delOption)
      this.jsonData.forEach(year => {
        if (year.date == this.chooseYear) {
          year.children.forEach(month => {
            if (month.date == this.chooseMonth) {
              month.children.forEach(days => {
                if (days.date == this.delDays)
                console.log(this.chooseYear, this.chooseMonth, this.delDays, delOption)
                days.children.forEach((option,index) => {
                  if (option.name == delOption.name) {
                    days.children.splice(index, 1)
                  }
                })
              })
            }
          })
        }
      })// end this.jsonData
      window.localStorage.setItem('recordData', JSON.stringify(this.jsonData))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
