const host = require('./../../../../config').host
Page({
  data: {
    navLeftItems: [],
    navRightItems: [],
    curNav: 1,
    orderdata: [
    ],
    curIndex: 0,
    showLoading: true
  },
  onLoad: function () {
    // 加载的使用进行网络访问，把需要的数据设置到data数据对象  
    var url = host + '/TOrders/GetDataForApp?userId=' + getApp().globalData.userId
    
    var that = this
    wx.request({
      url: url,
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          showLoading: false
        })
        if (res.statusCode != 200) {
          wx.showModal({
            title: '温馨提示',
            content: '数据查询失败！',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                return;
              }
            }
          })
        }
        else {
          let shopdata = JSON.parse(res.data.resultdata);
          for (var i = 0; i < shopdata.length; i++) {
            console.log(shopdata[i].shopinfo);
            console.log(JSON.parse(shopdata[i].shopinfo));
            shopdata[i].shopinfo = JSON.parse(shopdata[i].shopinfo);
          }
          that.setData({
            orderdata: shopdata
          })
        }
      }
      ,
      fail: function (res) {
        that.setData({
          showLoading: false
        })
      }
    })
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    var that = this
    var url = host + '/TOrders/GetDataForApp?userId=' + getApp().globalData.userId
    
    wx.request({
      url: url,
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          showLoading: false
        })
        if (res.statusCode != 200) {
          wx.showModal({
            title: '温馨提示',
            content: '数据查询失败！',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                return;
              }
            }
          })
        }
        else {
          let shopdata = JSON.parse(res.data.resultdata);
          for (var i = 0; i < shopdata.length; i++) {
            console.log(shopdata[i].shopinfo);
            console.log(JSON.parse(shopdata[i].shopinfo));
            shopdata[i].shopinfo = JSON.parse(shopdata[i].shopinfo);
          }
          that.setData({
            orderdata: shopdata
          })
        }
      }
      ,
      fail: function (res) {
        that.setData({
          showLoading: false
        })
      }
    })
  },
  //事件处理函数  
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
  },
  onPullDownRefresh: function () {
    var that = this
    that.setData({
      orderdata: null
    })
    that.setData({
      showLoading: true
    })
    var url = host + '/TOrders/GetDataForApp?userId=' + getApp().globalData.userId
  
    wx.request({
      url: url,
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          showLoading: false
        })
        if (res.statusCode != 200) {
          wx.showModal({
            title: '温馨提示',
            content: '数据查询失败！',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                return;
              }
            }
          })
        }
        else {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 1000
          })
          let shopdata = JSON.parse(res.data.resultdata);
          for (var i = 0; i < shopdata.length; i++) {
            console.log(shopdata[i].shopinfo);
            console.log(JSON.parse(shopdata[i].shopinfo));
            shopdata[i].shopinfo = JSON.parse(shopdata[i].shopinfo);
          }
          that.setData({
            orderdata: shopdata
          })
        }
        wx.stopPullDownRefresh();
      }
      ,
      fail: function (res) {
        wx.showModal({
          title: '温馨提示',
          content: '数据查询失败！',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              return;
            }
          }
        })
        that.setData({
          showLoading: false
        })
        wx.stopPullDownRefresh();
      }
    })

  },
  onReachBottom: function () {
    // Do something when page reach bottom.

  }
})  