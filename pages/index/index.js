//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // motto: 'Hello World',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    dataListM: [],
    titleM: '',
    dataListV: [],
    titleV: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
    wx.request({
      url: 'https://www.easy-mock.com/mock/5d36f92436db4945c40fc475/cook/list',
      data: {
        type: 'meat'
      },
      success: res => {
        console.log(res.data)
        this.setData({
          titleM: '大鱼大肉',
          dataListM: res.data.data
        })
      }
    })
    wx.request({
      url: 'https://www.easy-mock.com/mock/5d36f92436db4945c40fc475/cook/list',
      data: {
        type: 'vegetables'
      },
      success: res => {
        console.log(res.data)
        this.setData({
          titleV: '清淡养生',
          dataListV: res.data.data
        })
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      wx.navigateTo({
        url: '../logs/logs'
      })
    }
  },
  selectMe: function(e) {
    console.log(e.currentTarget.dataset.id)
  }
})
