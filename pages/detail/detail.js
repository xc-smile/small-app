// pages/detail/detail.js
const datas = require('../../datas/list-data.js');
let appData = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailContent: {},
    index: null,
    isCollected: false,
    isMusicPlay: false
  },
  handleMusicPlay(){
    let isMusicPlay = !this.data.isMusicPlay
    this.setData({
      isMusicPlay
    })
    if(isMusicPlay){
      let {dataUrl, title} = this.data.detailContent.music
      wx.playBackgroundAudio({
        dataUrl,
        title
      })
    }else{
      wx.pauseBackgroundAudio()
    }
  },
  handleShare() {
    wx.showActionSheet({
      itemList: ['A', 'B', 'C']
    })
  },


  handleCollection() {
    let isCollected = !this.data.isCollected
    this.setData({
      isCollected,
    });
    let title = isCollected ? "收藏成功" : "取消收藏"
    wx.showToast({
      title,
      icon: "success"
    });
    let { index } = this.data
    wx.getStorage({
      key: 'isCollected',
      success: function(datas) {
        console.log(datas)
        let obj =datas.data
        obj[index] = isCollected
        wx.setStorage({
          key: "isCollected",
          data: obj
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let index = options.index
    this.setData({
      detailContent: datas.list_data[index],
      index
    })
    let data = wx.getStorageSync('isCollected')
    console.log(data)
    if(!data){
      wx.setStorage({
        key: 'isCollected',
        data: {},
      })
    }
    if(data[index]){
        this.setData({
          isCollected: true
        })
    }

    wx.onBackgroundAudioPlay(() => {
      this.setData({
        isMusicPlay: true
      })
      appData.data.isPlay = true
      appData.data.pageIndex = index
    })
    if (appData.data.isPlay && appData.data.pageIndex === index){
      this.setData({
        isMusicPlay: true
      })
    }
    wx.onBackgroundAudioPause(() => {
      this.setData({
        isMusicPlay: false
      })
      appData.data.isPlay = false
      appData.data.pageIndex = index
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

  }
})