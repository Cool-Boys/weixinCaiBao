Page({
  data: {
    userInfo: {}
  },
  changeHidden: function () {
    this.setData({
      hidden: !this.data.hidden
    });
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    console.log('onload' + getApp().globalData.userInfo);
    this.setData({
      userInfo: JSON.parse(getApp().globalData.userInfo)
    })
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
    console.log('onReady');
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    console.log('onShow');

  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏
    console.log('onHide');
  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载
    console.log('onUnload');
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
    console.log('onPullDownRefresh');
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
    console.log('onReachBottom');
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: '自定义分享', // 分享标题
      desc: '这是一个分享描述', // 分享描述
      path: 'show' // 分享路径
    }
  },
  onclickShow:function(){
    wx.navigateTo({
      url: '/page/my/pages/myInfo/myInfo' 
    })
  }

})