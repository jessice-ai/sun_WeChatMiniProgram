// pages/list/list.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    SearchContent:"",
    sun_Search_Data:[],
    page:1,
    width:0, //屏幕宽度
    height:wx.getSystemInfoSync().windowHeight, //屏幕高度
    hasMore:1, //1显示 2加载中 3没有更多数据了
    download:false, //是否下拉
    active: 0,
    platform:3, //1淘宝 2天猫 3拼多多 4京东 5唯品会
  },
  onChange(event) {
    var that = this
    // wx.showToast({
    //   title: `切换到标签 ${event.detail.name}`,
    //   icon: 'none',
    // });
    // this.data.platform = val+3
    // this.data.page = 1
    var val = event.detail.name
    that.setData({
      platform:val+3,
      page:1,
      download:true 
    })
    this.getSearchData()
  },
  onShareAppMessage() {
    return {
      title: 'tabs',
      path: 'page/weui/example/tabs/tabs'
    }
  },
  //跳转小程序
  sunDumpclick(event){
    var param =  event.currentTarget.dataset.id //传过来的值
    var path = param["page_path"];
    var appId = param["app_id"];
    console.log(path)
    console.log(appId)
    wx.navigateToMiniProgram({
      appId: appId,
      path: path,
      success(res) {
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
    wx.setNavigationBarTitle({
      title: options.search //页面标题为路由参数
    })
    //console.log(options.search)
    // this.width = wx.getSystemInfoSync().windowWidth*0.94*0.3
    this.setData({
      width:wx.getSystemInfoSync().windowWidth*0.94*0.4
    })
    //console.log(this.width)
    this.setData({
      SearchContent:options.search
    })
    this.getSearchData()
  },
  getSearchData(){
    //使用父级的this
    var that = this
    console.log(that.data.page);
    console.log("平台:"+that.data.platform+"分页"+that.data.page+"搜索词:"+that.data.SearchContent)
    wx.request({
      url: 'https://www.shsun.xyz/tb/searchkeyword', //接口地址
      //POST body内容
      data: {
        'uid':24,
        'platform':that.data.platform, //平台 1淘宝 2天猫 3拼多多 
        'page':that.data.page,
        'context':that.data.SearchContent, //搜索内容
      },
      method:'POST', //GET,POST
      header: {
        'content-type': 'application/json', // 默认值
      },
      success (res) {
       // console.log(res.data["data"])
        //1、注意这里的that不能使用this，否则会提示找不到
        //2、onLoad 调用 - 数据更新,无法实时渲染页面
        if(that.data.download){
          console.log("eeeee")
          //下拉
          that.setData({
            sun_Search_Data:res.data["data"]?res.data["data"]:[],
            hasMore:res.data["data"]?1:3,
            download:false
          })
        }else{
          //console.log("adddd")
          that.setData({
            sun_Search_Data:res.data["data"]?that.data.sun_Search_Data.concat(res.data["data"]):[],
            hasMore:res.data["data"]?1:3
          })
        }
        if(that.data.sun_Search_Data.length==0){
          //console.log("sun"+that.data.sun_Search_Data)
          that.setData({
            hasMore:4, //4没有更多数据了
            sun_Search_Data:[]
          })
        }
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
        var that = this;
        that.setData({
          page: 1, //当前页的一些初始数据，视业务需求而定
          hasMore:1, //不显示
          download:true
        })
        //console.log("Jsun:"+that.data.page)
        this.getSearchData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    var pagenum = that.data.page+1 //当前页面加1
    that.setData({
      page:pagenum,
      hasMore:2 //1显示 2加载中 3没有更多数据了
    })
    this.getSearchData()
  },
})