// list.js

Page({
  data: {
    selectedV: [],
    selectedM: []
  },
  onShow: function () {
    this.setData({
      selectedV: wx.getStorageSync('selectedV') || [],
      selectedM: wx.getStorageSync('selectedM') || []
    })
  },
  onHide: function () {
  }
})