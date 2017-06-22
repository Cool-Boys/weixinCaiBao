const host = require('./../../../../config').host
Page({
  data: {
    navLeftItems: [],
    navRightItems: [],
    curNav: 1,
    orderdata: [
    ],
    isAdmin: null,
    curIndex: 0,
    showLoading: true
  },
  onLoad: function () {
    // 加载的使用进行网络访问，把需要的数据设置到data数据对象  
    var that = this
    that.setData({
      isAdmin: getApp().globalData.isAdmin
    })
    console.log("isAdmin:" + that.data.isAdmin);
    queryData(that);
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    var that = this
    // setInterval(function () {
    //   queryData(that);
    // }, 4000);
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
    // that.setData({
    //   showLoading: true
    // })
    var url = host + '/TOrders/GetDataForApp?userId=' + getApp().globalData.userId+'&isAll=T'
    wx.showNavigationBarLoading();
    wx.request({
      url: url,
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res)
        // that.setData({
        //   showLoading: false
        // })
        wx.hideNavigationBarLoading()
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
            //console.log(shopdata[i].shopinfo);
          //  console.log(JSON.parse(shopdata[i].shopinfo));
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
        // that.setData({
        //   showLoading: false
        // })
        wx.stopPullDownRefresh();
      }
    })

  },
  onReachBottom: function () {
    // Do something when page reach bottom.

  },
  btnSubmit: function () {
    let shopdata = this.data.orderdata;

    let ids = [];    
    for (var i = 0; i < shopdata.length; i++) {
      if (shopdata[i].flag.trim()=='D')  
      ids[i]=shopdata[i].id;
    }
    if (ids.length <= 0) {
      wx.showModal({
        title: '温馨提示',
        content: '没有需要提交数据！',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            return;
          }
        }
      })
      return;
    }
    var that = this;
    that.setData({
      showLoading: true
    })
    var url = host + '/TOrders/AllEnabledOrder?ids=' + ids
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
            content: '数据操作失败！',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                return;
              }
            }
          })
        }
        else {
          wx.showModal({
            title: '温馨提示',
            content: '数据操作成功！',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                return;
              }
            }
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
  btnQuery:function(){
    var that = this;
    that.setData({
      orderdata: null
    })
    queryData(that);
  }
})


function queryData(e) {
  var url = host + '/TOrders/GetDataForApp?userId=' + getApp().globalData.userId +'&isAll=T'
  wx.showNavigationBarLoading();
  wx.request({
    url: url,
    method: 'GET',
    data: {},
    header: {
      'Accept': 'application/json'
    },
    success: function (res) {
      // console.log(res)
      e.setData({
        showLoading: false
      })
      wx.hideNavigationBarLoading()
      
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

          shopdata[i].shopinfo = JSON.parse(shopdata[i].shopinfo);
        }
        e.setData({
          orderdata: shopdata
        })
      }
    }
    ,
    fail: function (res) {
      e.setData({
        showLoading: false
      })
    }
  })

}


