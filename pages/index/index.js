// pages/index/index.js
Page({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    msg: "xc",
    userInfo: {},
    isShow: true
  },
  handleClick (){
    wx.redirectTo({
      url: '/pages/list/list',
    })
  },
  onLoad: function(options) {
    console.log("onLoad")
    this.getUserInfo()
  },
  getUserInfo(){
    wx.getSetting({
      success: (data) => {
        console.log(data)
        if(data.authSetting['scope.userInfo']){
          this.setData({
            isShow : false
          })
        }else{
          this.setData({
            isShow: true
          })
        }
      }
    })
    wx.getUserInfo({
      success: (data) => {
        console.log(data)
        this.setData({
          userInfo: data.userInfo
        })
      },
      fail: () => {
        console.log("获取用户信息失败")
      }
    })    
  },
  handleGetUserInfo(data){
    if(data.detail.rawData){
      this.getUserInfo()
    }
  },
  onShow: () => {
    console.log("onShow")
  },
  onReady: () => {
    console.log("onReady")
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
