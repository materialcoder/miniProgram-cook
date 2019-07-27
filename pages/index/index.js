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
    titleV: '',
    selectedM: [],
    selectedV: []
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
    this.getData()
  },
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading()
    // wx.startPullDownRefresh()
    this.getData()
    
  },
  getData: function() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
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
      },
      complete: res => {
        wx.hideLoading()
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
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
    console.log(e.currentTarget.dataset)
    // wx.showModal({
    //   title: '提示',
    //   content: '选好了',
    // })
    let data = e.currentTarget.dataset
    let item = data.item
    let type = data.type
    let index = data.index
    let selectedM = this.data.selectedM
    let selectedV = this.data.selectedV
    let dataListM = this.data.dataListM
    let dataListV = this.data.dataListV
    if (type === 'meat') {
      item.selected = true
      dataListM.splice(index, 1, item)
      selectedM.push(item)
    } else {
      item.selected = true
      dataListV.splice(index, 1, item)
      selectedV.push(item)
    }
    this.setData({
      dataListM: dataListM,
      dataListV: dataListV,
      selectedM: selectedM,
      selectedV: selectedV
    })
    wx.setStorageSync('selectedM', selectedM)
    wx.setStorageSync('selectedV', selectedV)
  },
  cancelMe: function (e) {
    console.log(e.currentTarget.dataset)
    let data = e.currentTarget.dataset
    let item = data.item
    let type = data.type
    let index = data.index
    let selectedM = this.data.selectedM
    let selectedV = this.data.selectedV
    let dataListM = this.data.dataListM
    let dataListV = this.data.dataListV
    let sIndex
    if (type === 'meat') {
      item.selected = false
      dataListM.splice(index, 1, item)
      sIndex = selectedM.findIndex(i => i.id === item.id)
      selectedM.splice(sIndex, 1)
    } else {
      item.selected = false
      dataListV.splice(index, 1, item)
      sIndex = selectedV.findIndex(i => i.id === item.id)
      selectedV.splice(sIndex, 1)
    }
    this.setData({
      dataListM: dataListM,
      dataListV: dataListV,
      selectedM: selectedM,
      selectedV: selectedV
    })
    wx.setStorageSync('selectedM', selectedM)
    wx.setStorageSync('selectedV', selectedV)
  }
})
