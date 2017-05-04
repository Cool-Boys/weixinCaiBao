Page({
  data: {
    shopinfo: '1',
    time: '2',
    memo: '1',
    message: '列表渲染',
    array: [1, 2, 3, 4, 5],
    message1: '条件渲染',
    view: 'MINA',

    reurnData: '没有数据',
    staffA: { firstName: 'Hulk', lastName: 'Hu' },
    staffB: { firstName: 'Shang', lastName: 'You' },
    staffC: { firstName: 'Gideon', lastName: 'Lin' },
    objectArray: [
      { id: 5, unique: 'unique_5' },
      { id: 4, unique: 'unique_4' },
      { id: 3, unique: 'unique_3' },
      { id: 2, unique: 'unique_2' },
      { id: 1, unique: 'unique_1' },
      { id: 0, unique: 'unique_0' },
    ],
    numberArray: [1, 2, 3, 4],
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    hidden: false,
    nocancel: false



  },
  changeHidden: function () {
    this.setData({
      hidden: !this.data.hidden
    });
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    console.log('onload');
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
      path: 'myInfo' // 分享路径
    }
  },
  switch: function (e) {
    const length = this.data.objectArray.length
    for (let i = 0; i < length; ++i) {
      const x = Math.floor(Math.random() * length)
      const y = Math.floor(Math.random() * length)
      const temp = this.data.objectArray[x]
      this.data.objectArray[x] = this.data.objectArray[y]
      this.data.objectArray[y] = temp
    }
    this.setData({
      objectArray: this.data.objectArray
    })
  },
  addToFront: function (e) {
    const length = this.data.objectArray.length
    this.data.objectArray.push({ id: length, unique: 'unique_' + length })
    this.setData({
      objectArray: this.data.objectArray
    })
    console.log("添加事件" + length);
  },
  addNumberToFront: function (e) {
    this.data.numberArray = [this.data.numberArray.length + 1].concat(this.data.numberArray)
    this.setData({
      numberArray: this.data.numberArray
    })
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  getData: function (e) {

    var that = this
    wx.request({
      url: 'http://localhost:14245/FLWebService.asmx/HelloWorld',
      method: 'POST',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          reurnData: res.data.d

        })
      }
    })

  },
  cancel: function () {
    this.setData({
      hidden: true
    });
  },
  confirm: function () {
    this.setData({
      nocancel: !this.data.nocancel
    });
    console.log("clicked confirm");
  }
  , open: function () {
    console.log("延时调用");
  },
  close: function () {
    this.setData({
      hidden: true
    });
    console.log("关闭弹框");
  },
  bindUrl:function(){

    wx.switchTab({
  url: '/page/my/pages/myInfo/myInfo'
})
  }

})