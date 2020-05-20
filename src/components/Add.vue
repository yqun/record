<template>
    <div class="addInfo">
        <mu-container>
          <mu-form :model="form" 
                   class="mu-demo-form" 
                   ref="form"
                   label-position="right" 
                   label-width="50">

            <mu-form-item prop="options" label="选项" :rules="optionsRules">
              <mu-auto-complete :data="typeOptions" v-model="form.options" @blur="isblur()">
              </mu-auto-complete>
            </mu-form-item>

            <mu-form-item prop="money" label="金额" :rules="moneyRules">
              <mu-auto-complete v-model="form.money" @blur="isblur()">
              </mu-auto-complete>
            </mu-form-item>

          </mu-form>
          <!-- 按钮 -->
          <mu-flex justify-content="around" align-items="center">
            <mu-button round color="info" @click.native="submitForm()">添加</mu-button>
            <mu-button round color="red" 
                       @click.native="clear()"
                       @touchstart.native="touchstart()"
                       @touchend.native="touchend()">
                       取消
            </mu-button>
          </mu-flex>

        </mu-container>
    </div>
</template>
<script>
export default {
  name: 'add',    
  data() {
    const jsonData = JSON.parse(window.localStorage.getItem('recordData')) || []
    // console.log(window.localStorage.getItem('recordData'))
    const typeOptions = JSON.parse(window.localStorage.getItem('typeOptions')) || []
    return {
        jsonData, // 当前的所有数据
        typeOptions,
        form: {
            options: '',
            money: '',
        }, // 表单数据
        optionsRules: [
            { validate: (val) => !!val, message: '必须填写选项'},
        ],
        moneyRules: [
            { validate: (val) => !!val, message: '必须填写金额'},
        ],
        timer: null,
    }
  },
  methods: {
    isblur() {
        // console.log('失去焦点')
        window.scrollTo(0, 0)
    },
    submitForm() { // 提交数据，表单验证
        this.$refs.form.validate().then((result) => {
            if (!result) return false;
            this.judgeData()
            this.$toast.message('添加成功');
            setTimeout(() => {
                this.clear();
            },100)
        });
    },
    clear() {
        this.$refs.form.clear();
        this.form = {
            options: '',
            money: '',
        };
    },
    touchstart() {
        this.timer = setTimeout(() => {
        this.$confirm('确定要重置所有数据吗？', '提示', { type: 'warning' })
        .then(({ result }) => {
          if (!result) return false;
          window.localStorage.removeItem('recordData');
        });
      }, 3000)
    },
    touchend() { clearTimeout(this.timer) },
    getdate() { // 获取当前时间
        const date = new Date();
        const y = date.getFullYear();
        const m = date.getMonth() + 1;
        const d = date.getDate();
        return { y, m, d }
    },
    createData(date) { // 判断当前日期存不存在，不存在创建
        return {
            date: date,
            children:[],
            moneySum: 0
        }
    },
    judgeData() { // 添加数据
        const {y, m, d} = this.getdate(); // 获取当前时间
        // const { y, m, d } = { y: 2020, m: 1, d: 25 }; // 获取当前时间

        let yearObj = null, monthObj = null, daysObj = null, itemObj = null;
        const yearDate = this.jsonData.filter(year => year.date == y)
        if (yearDate.length <= 0) {
            yearObj = this.createData(y)
            this.jsonData.unshift(yearObj);
        } else { yearObj = yearDate[0] }
        const monthDate = yearObj.children.filter(month => month.date == m)
        if (monthDate.length <= 0) {
            monthObj = this.createData(m)
            yearObj.children.unshift(monthObj);
        } else { monthObj = monthDate[0] }
        const daysDate = monthObj.children.filter(days => days.date == d)
        if (daysDate.length <= 0) {
            daysObj = this.createData(d)
            monthObj.children.unshift(daysObj);
        } else { daysObj = daysDate[0] }
        const itemData = daysObj.children.filter(item => item.name == this.form.options)
        if (itemData.length <= 0) {
            itemObj = {name: this.form.options, moneySum: 0}
            daysObj.children.unshift(itemObj);
        } else { itemObj = itemData[0] }
        this.jsonData.forEach(year => {
            if (year.date == y) {
                year.children.forEach(month => {
                    if (month.date == m) {
                        month.children.forEach(days => {
                            if (days.date == d) {
                                days.children.forEach(item => {
                                    if (item.name == this.form.options) {
                                        item.moneySum+=(this.form.money*1)
                                        days.moneySum+=(this.form.money*1)
                                        month.moneySum+=(this.form.money*1)
                                        year.moneySum+=(this.form.money*1)
                                    }
                                })
                            }
                        })
                    }
                })
            }
        }) // end this.JsonData
        if (this.typeOptions.filter(option => option == this.form.options).length<=0) {
            this.typeOptions.push(this.form.options)
            window.localStorage.setItem('typeOptions', JSON.stringify(this.typeOptions))
        }
        window.localStorage.setItem('recordData', JSON.stringify(this.jsonData))
    }
  },
}
</script>
<style scoped>
.addInfo {
    padding: 20px 10px;
    padding-top: 200px;
    /*position: absolute;
    top: 20%;
    bottom: 0;
    left: 0;
    right: 0;*/
}
</style>