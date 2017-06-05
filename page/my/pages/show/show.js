const host = require('./../../../../config').host
var common = require('../../../common/common.js')
Page({
  data: {
    shopdata: [],
    curNav: 1,
    curIndex: 0
  },
  onLoad: function () {  
    common.login();
   
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
  }

})

