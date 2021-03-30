// pages/category/category.js
const order = ['demo1', 'demo2', 'demo3']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sun_Data:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //远程获取数据
    this.getData()
  },
 //POST请求
 getData(){
  //使用父级的this
  var that = this
  wx.request({
    url: 'https://www.shsun.xyz/tbcouponseconday/getcategory', //接口地址
    //POST body内容
    data: {
      'catid': '1',
      'uid':24
    },
    
    method:'POST', //GET,POST
    header: {
      'content-type': 'application/json', // 默认值
    },
    success (res) {
      console.log(res.data["data"])
      //1、注意这里的that不能使用this，否则会提示找不到
      //2、onLoad 调用 - 数据更新,无法实时渲染页面
      that.setData({
        sun_Data:res.data["data"]
      })
      //console.log(that.data.sun_Data) 
    }
  })
  
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  upper(e) {
    console.log(e)
  },

  lower(e) {
    console.log(e)
  },

  scroll(e) {
    console.log(e)
  },

  scrollToTop() {
    this.setAction({
      scrollTop: 0
    })
  },
  tap() {
    for (let i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1],
          scrollTop: (i + 1) * 200
        })
        break
      }
    }
  },

  tapMove() {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  }
})