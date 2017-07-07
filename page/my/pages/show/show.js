const host = require('./../../../../config').host
var common = require('../../../common/common.js')
Page({
  data: {
    shopdata: [],
    curNav: 1,
    isAdmin: null,
    curIndex: 0,
    showLoading: true,
    selData: []
  },
  onReady: function () {
    this.animation = wx.createAnimation()
  },
  onLoad: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var times = setInterval(function () {
      if (getApp().globalData.isAdmin) {
        // 在这里停止加载的提示框  
        setTimeout(function () {
          wx.hideLoading()
        }, 500)
            // 这里必须要清除不然就等着循环死吧  

        clearTimeout(times);
        that.setData({
          isAdmin: getApp().globalData.isAdmin,
          showLoading: false
        })
      }

    }, 500);
    wx.request({
      url: host + '/tgoods/GetDataForApp',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res);
        //写入缓存中数据；
        wx.setStorageSync('shopdata', res.data);
        that.setData({
          curNav: res.data.length > 0 ? res.data[0].id : 0,
          shopdata: res.data
        })
      }

    });

  },
  onShow: function () {

    // var that = this
    // wx.request({
    //   url: host + '/tgoods/GetDataForApp',
    //   method: 'GET',
    //   data: {},
    //   header: {
    //     'Accept': 'application/json'
    //   },
    //   success: function (res) {
    //     console.log(res)
    //     that.setData({
    //       shopdata: res.data
    //     })
    //   }

    // });
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
  bindAdd: function () {
    let a = this.data.selData;
    let model = this.data.shopdata[this.data.curIndex];
    a.splice(a.length + 1, 0, { index: this.data.curIndex});

    this.animation.
    translate(-110, 50).rotate(Math.random() * 720 - 360).scale(0.1).step({duration: 300})
    this.setData({ animation: this.animation.export() });


    // this.animation.rotate(0, 0)
    //   .scale(1)
    //   .translate(0, 0)
    //   .step({ duration: 0 })
    // this.setData({ animation: this.animation.export() })

    setTimeout(function () {
     this.animation.rotate(0, 0)
      .scale(1)
      .translate(0, 0)
      .step({ duration: 0 })
    this.setData({ animation: this.animation.export() })
    }.bind(this), 500)
    this.setData({
      selData: a
    })
  
  },
  bindSubmit: function () {


    // getApp().globalData.selData = this.data.selData;
    // console.log(getApp().globalData.selData);
    wx.setStorageSync('selData', this.data.selData);
this.setData({
  selData: []
});

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
  bindEdit: function (e) {
    let model = this.data.shopdata[this.data.curIndex];
    wx.navigateTo({
      url: '/page/my/pages/edit/edit?id=' + model.id + '&name=' + model.name
    })
  }

})

