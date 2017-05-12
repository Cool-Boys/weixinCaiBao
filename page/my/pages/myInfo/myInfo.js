Page({
  data: {
    navLeftItems: [],
    navRightItems: [],
    curNav: 1,
    orderdata: [{
      orderNo:'20170506-00001',
      orderState: '已接单',
      shopinfo: [
        { id: 1, name: '饭包', memo: '多放葱 多放香菜 多放黄瓜丝 多放土豆丝', saucetype: '辣酱+豆瓣酱+鸡蛋酱', imageUrl: '../../../../image/fb.jpg', price: 6 }
      ],
      shopamount: 6,
      time: '12:01',
      message: ''
    },
      {
        orderNo: '20170506-00002',
        orderState: '已接单',
        shopinfo: [
          { id: 1, name: '饭包', memo: '多放葱 多放香菜 多放黄瓜丝 多放土豆丝', saucetype: '辣酱+豆瓣酱+鸡蛋酱', imageUrl: '../../../../image/fb.jpg', price: 6 }
        ],
        shopamount: 6,
        time: '12:01',
        message: ''
      }
    ],
    curIndex: 0
  },
  onLoad: function () {
    // 加载的使用进行网络访问，把需要的数据设置到data数据对象  
    var that = this
    wx.request({
      url: 'http://huanqiuxiaozhen.com/wemall/goodstype/typebrandList',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          navLeftItems: res.data,
          navRightItems: res.data
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
  onPullDownRefresh:function(){
    let data = {
      orderNo: '20170506-0000+',
      orderState: '已接单',
      shopinfo: [
        { id: 1, name: '饭包', memo: '多放葱 多放香菜 多放黄瓜丝 多放土豆丝', saucetype: '辣酱+豆瓣酱+鸡蛋酱', imageUrl: '../../../../image/fb.jpg', price: 6 }
      ],
      shopamount: 6,
      time: '12:01',
      message: ''
    };
    let length = this.data.orderdata.length;
    this.data.orderdata.splice(length, 0, data);
    this.setData({
      orderdata: this.data.orderdata
    });
    wx.showToast({
      title: '刷新成功',
      icon: 'success',
      duration: 1000
    })
    
  },
  onReachBottom: function () {
    // Do something when page reach bottom.
   
  }
})  