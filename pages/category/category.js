// pages/category/category.js
const order = ['demo1', 'demo2', 'demo3']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sun_Data:[], //一级分类数组
    sun_Son_Data:[], //二级分类数组
    height:0,
    width:0,
    catid:0,
    checkedId:6
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      height: wx.getSystemInfoSync().windowHeight, //获取屏幕高度
      width: wx.getSystemInfoSync().windowWidth //获取屏幕宽度
    })
    //远程获取数据 - 左侧数据
    this.catid = 0
    this.checkedId = 6
    this.getData()
    this.catid = 6
    //远程数据获取 - 右侧数据
    this.getSonData()
  },
 //POST请求,获取一级分类
 getData(){
  //使用父级的this
  var that = this
  wx.request({
    url: 'https://www.shsun.xyz/tbcouponseconday/getcategory', //接口地址
    //POST body内容
    data: {
      'catid': this.catid,
      'uid':24
    },
    
    method:'POST', //GET,POST
    header: {
      'content-type': 'application/json', // 默认值
    },
    success (res) {
      //console.log(res.data["data"])
      //1、注意这里的that不能使用this，否则会提示找不到
      //2、onLoad 调用 - 数据更新,无法实时渲染页面
      that.setData({
        sun_Data:res.data["data"]
      })
      //console.log(that.data.sun_Data) 
    }
  })
},

//POST请求,获取二级分类
getSonData(){
  //使用父级的this
  var that = this
  //console.log(this.catid);
  wx.request({
    url: 'https://www.shsun.xyz/tbcouponseconday/secla', //接口地址
    //POST body内容
    data: {
      'catid': this.catid,
      'uid':24
    },
    
    method:'POST', //GET,POST
    header: {
      'content-type': 'application/json', // 默认值
    },
    success (res) {
      //console.log(res.data["data"])
      //1、注意这里的that不能使用this，否则会提示找不到
      //2、onLoad 调用 - 数据更新,无法实时渲染页面
      that.setData({
        sun_Son_Data:res.data["data"]?res.data["data"]:[]
      })
      //console.log(that.data.sun_Son_Data) 
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
  sunclick(event){
    var param =  event.currentTarget.dataset.id //传过来的值
    //console.log(param)
    this.catid = param;
    this.setData({
      checkedId : param
    })
    this.getSonData()
   },
})