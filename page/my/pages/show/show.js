const host = require('./../../../../config').host
var common = require('../../../common/common.js')
Page({
  data: {
    shopdata: [],
    curNav: 1,
    isAdmin: null,
    curIndex: 0
  },
  onLoad: function () {  
    this.setData({
      isAdmin: getApp().globalData.isAdmin
    })
    var that = this
      wx.request({
        url: host+'/tgoods/GetDataForApp',
        method: 'GET',
        data: {},
        header: {
          'Accept': 'application/json'
        },
        success: function (res) {
          console.log(res)
          that.setData({
            curNav: res.data.length > 0? res.data[0].id :0,
            shopdata: res.data           
          })
        }
       
     });
  },
  onShow:function(){

    var that = this
    wx.request({
      url: host + '/tgoods/GetDataForApp',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          shopdata: res.data
        })
      }

    });
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
  bindSubmit: function () {
    wx.switchTab({
      url: '/page/my/pages/shopcar/shopcar',
      success: function (res) {
        // success
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  bindEdit:function(e){
    let model = this.data.shopdata[this.data.curIndex];
    wx.navigateTo({
      url: '/page/my/pages/edit/edit?id=' + model.id + '&name=' + model.name
    })
  }

})

