// list.js

Page({
  data: {
    selectedV: [],
    selectedM: []
  },
  onLoad: function () {
    this.setData({
      selectedV: wx.getStorageSync('selectedV') || [],
      selectedM: wx.getStorageSync('selectedM') || []
    })
  }
})