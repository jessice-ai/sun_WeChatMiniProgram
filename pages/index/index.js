// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
      inputShowed: false,
      inputVal: ""
  },
  onLoad() {
      this.setData({
          search: this.search.bind(this)
      })
  },
  search: function (value) {
      return new Promise((resolve, reject) => {
        //console.log(value) //搜索内容
        wx.reLaunch({
            url: '/pages/list/list?search='+value //跳转到应用内的某个页面,可传递参数
        })
          
        //   setTimeout(() => {
        //       resolve([{text: '搜索结果', value: 1}, {text: '搜索结果2', value: 2}])
        //   }, 200)
      })
  },
  selectResult: function (e) {
      console.log('select result', e.detail)
  },
});
