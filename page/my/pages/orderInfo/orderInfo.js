new Page({
  data: {
    shopinfo: [],
    shopamount: 0,
    time: '2',
    memo: '1'
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    console.log(options.shop_info);
    var tt = JSON.parse(options.shop_info);
    console.log(tt.shopData);

    let shopdata = tt.shopData;
    let str = '';
    let amount = 0;
    for (var i = 0; i < shopdata.length; i++) {
      amount += shopdata[i].price;
    }


    this.setData({
      shopinfo: shopdata,
      shopamount: amount,
      time: tt.time,
      memo: tt.memo
    });
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })

  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示

  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },
  bindUrl: function () {

    wx.switchTab({
      url: '/page/my/pages/myInfo/myInfo'
    })
  },
  bindReturn:function(){
    wx.switchTab({
      url: '/page/my/pages/shopcar/shopcar'
    })
  },
  callLongmei:function(e){
    let phoneno = e.target.dataset.no
    wx.makePhoneCall({
      phoneNumber: phoneno //仅为示例，并非真实的电话号码
    })
  }
})