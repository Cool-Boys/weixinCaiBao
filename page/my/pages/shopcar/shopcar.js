const host = require('./../../../../config').host
var util = require('./../../../../util/util.js')
Page({
  onReady: function () {

  },
  onShow: function () {
    var selData;
    var shopdata, tempData = [];
    //缓存中的美食
    shopdata = wx.getStorageSync('shopdata');
    console.log(shopdata);
    //选中的美食
    selData = wx.getStorageSync('selData');
    console.log(selData);
    var dd = "", tt = "",itemList=[];
    var footHeight = 650;

    if (selData.length > 0) {
      for (var i = 0; i < selData.length; i++) {
        var model = shopdata[selData[i].index];
        var id = model.id;
        var temp = { id: model.id, name: model.name, memo: '', saucetype: '', image: model.image, price: model.price };
      
        tempData.splice(tempData.length + 1, 0, temp);
      }

      let flavorData = this.data.flavorData;
      for (var i = 0; i < flavorData.length; i++) {
        if (flavorData[i].id == id) {
          dd = flavorData[i].fdata;
          tt = flavorData[i].sdata;
        }
        if (dd.length > 3) {
          footHeight = 650
        }
        else {
          footHeight = 450
        }
      }
    }

    for (var i = 0; i < shopdata.length; i++){
      var model = shopdata[i];
      itemList.splice(itemList.length + 1, 0, model.name);
    }
    
    this.setData({
      selData: selData,
      refData: shopdata,
      shopdata: tempData,
      saucetype: tt,
      flavortype: dd,
      footHeight: footHeight,
      itemList: itemList
    })
  },
  onReady: function () {
    this.animation = wx.createAnimation()
  },
  data: {
    refData: [],
    shopdata: [
      // { id: 4, name: '饭包', memo: '', saucetype: '', image: '../../../../image/fb.jpg', price: 6 }
    ],
    flavortype: [
      { name: '葱', flavortype: '1', ischeck: false },
      { name: '青椒', flavortype: '2', ischeck: false },
      { name: '香菜', flavortype: '3', ischeck: false },
      { name: '土豆丝', flavortype: '4', ischeck: false },
      { name: '黄瓜丝', flavortype: '5', ischeck: false }
    ],
    flavorData: [{
      id: 5,
      fdata: [
        { name: '葱', flavortype: '1', ischeck: false },
        { name: '青椒', flavortype: '2', ischeck: false },
        { name: '香菜', flavortype: '3', ischeck: false },
        { name: '土豆丝', flavortype: '4', ischeck: false },
        { name: '黄瓜丝', flavortype: '5', ischeck: false }
      ],
      sdata: [
        { name: '鸡蛋酱', ischeck: false }, { name: '豆瓣酱', ischeck: false }, { name: '辣酱', ischeck: false }
      ]
    },
    {
      id: 4,
      fdata: [
        { name: '香菜', flavortype: '6', ischeck: false },
        { name: '柿子', flavortype: '7', ischeck: false },
        { name: '黄瓜丝', flavortype: '8', ischeck: false }
      ],
      sdata: []
    }],
    saucetype: [
      { name: '鸡蛋酱', ischeck: false }, { name: '豆瓣酱', ischeck: false }, { name: '辣酱', ischeck: false }
    ],
    selData: [],
    itemList:[],
    curNav: 1,
    curIndex: 0,
    time: '12:01',
    message: '',
    footHeight: 650,
    shopHeight:180,
    toView: 'row0',
    showLoading: true
  },
  switchMemoInput: function (e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    console.log('id' + id + '  index:' + index);
    let flavorData = this.data.flavorData;
    var dd = "", tt = "";
    var footHeight = 650;
    var shopHeight = 180;
    for (var i = 0; i < flavorData.length; i++) {
      if (flavorData[i].id == id) {
        dd = flavorData[i].fdata;
        tt = flavorData[i].sdata;
      }
      if (dd.length > 3) {
        footHeight = 650
        shopHeight=180
      }
      else {
        footHeight = 450
        shopHeight=280
      }
    }
    // this.animation.translate(0, 350).step()
    // this.setData({ animation: this.animation.export(), footHeight:200 })
    if (this.data.curIndex != index) {
      // var tt = [
      //   { name: '鸡蛋酱', ischeck: false }, { name: '豆瓣酱', ischeck: false }, { name: '辣酱', ischeck: false }]
      // var dd = [
      //   { name: '葱', flavortype: '1', ischeck: false },
      //   { name: '青椒', flavortype: '2', ischeck: false },
      //   { name: '香菜', flavortype: '3', ischeck: false },
      //   { name: '土豆丝', flavortype: '4', ischeck: false },
      //   { name: '黄瓜丝', flavortype: '5', ischeck: false }
      // ]
      // // 把点击到的某一项，设为当前index  
      // this.setData({
      //   saucetype: tt,
      //   flavortype: dd
      // })
    }
    this.setData({
      curIndex: index,
      saucetype: tt,
      flavortype: dd,
      footHeight: footHeight,
      shopHeight: shopHeight
    })
var that=this;
    setTimeout(function(){
      console.log('length值为：', that.data.shopdata.length - 1)
      that.setData({
        toView: 'row' + (that.data.shopdata.length - 1)})
    },50);
  },

  radioChange: function (e) {
    let text = e.detail.value;
    let index = e.target.dataset.index;
    let seltext = e.target.dataset.text;
    // console.log("时间为：" + util.formatTime2(new Date));
    //获取备注信息
    let str = this.data.shopdata[this.data.curIndex].memo;
    let strArr = str.split(" ");
    var isNew = true;
    for (var i = 0; i < strArr.length; i++) {
      if (strArr[i].indexOf(seltext) > -1) {
        strArr[i] = text;
        isNew = false;
      }

    }
    if (isNew) {
      str += ' ' + text;
    }
    else {
      str = strArr.toString().replace(/,/g, " ");
    }
    console.log('radio发生change事件，携带value值为：', text, index, seltext);
    this.data.shopdata[this.data.curIndex].memo = str;

    this.setData(
      { shopdata: this.data.shopdata }
    )
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    let text = e.detail.value;
    this.data.shopdata[this.data.curIndex].saucetype = ' ' + text.toString().replace(/,/g, "+");

    this.setData(
      { shopdata: this.data.shopdata }
    )
  },
  deletedata: function (e) {
    let index = e.target.dataset.index;
    console.log('deletedata事件，携带value值为：', index)
    this.data.shopdata.splice(index, 1);
    this.setData(
      { shopdata: this.data.shopdata }
    )
  },
  copydata: function (e) {
    let index = e.target.dataset.index;
    var temp = this.data.shopdata[index];

    for (var i = index - 1; i >= 0; i--) {
      var temp2 = this.data.shopdata[i];
      if (temp2.memo != "" || temp2.saucetype != "") {
        this.data.shopdata[index].memo = temp2.memo;
        this.data.shopdata[index].saucetype = temp2.saucetype;
      }
      break;
    }

    this.setData(
      { shopdata: this.data.shopdata, curIndex: index }
    )
  },


  adddata: function (e) {
    let index = this.data.curIndex;
    let length = this.data.shopdata.length;
    console.log('length值为：', length)
    this.data.shopdata.splice(length + 1, 0,
      { id: 5, name: '饭包', memo: '', saucetype: '', image: '../../../../image/fb.jpg', price: 6 });
    this.setData(
      { shopdata: this.data.shopdata }
    )
    this.setData({
      toView: 'row' + (this.data.shopdata.length - 1)
    })
  },
  bindKeyInput: function (e) {
    let text = e.detail.value;
    this.data.shopdata[this.data.curIndex].memo = text;

  },
  bindblurInput: function (e) {
    this.setData(
      { shopdata: this.data.shopdata }
    )
  },
  bindTimeChange: function (e) {

    //     let aa = util.convertTime(this.data.time,'21:01');
    //     if (aa){
    //       wx.showModal({
    //         title: '温馨提示',
    //         content: '预定日期超了！！！',
    //         showCancel: false,
    //         success: function (res) {
    //           if (res.confirm) {
    //             return;
    //           }
    //         }
    //       })

    // }

    this.setData({
      time: e.detail.value
    })
  },
  bindMessageInput: function (e) {
    let text = e.detail.value;
    this.data.message = text;
    console.log('message值为：', text)
    this.setData(
      { message: this.data.message }
    )
  },
  bindSubmit: function () {

    if (this.data.shopdata.length <= 0) {
      wx.showModal({
        title: '温馨提示',
        content: '至少选择一个美食！！！',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            return;
          }
        }
      })
      return;
    }
    console.log('商品共计：' + this.data.shopdata.length + '个');
    let str = '';
    let amount = 0;
    for (var i = 0; i < this.data.shopdata.length; i++) {
      str += this.data.shopdata[i].name + "  配料：" + this.data.shopdata[i].memo + "  口味：" + this.data.shopdata[i].saucetype;
      amount += this.data.shopdata[i].price;
    }

    console.log('商品综述:' + str + " 金额共计：" + amount);

    console.log('预定时间：' + this.data.time);
    console.log('备注：' + this.data.message);
    var goData = { shopData: this.data.shopdata, time: this.data.time, memo: this.data.message, amount: amount };

    var model = {};
    model.info = JSON.stringify(this.data.shopdata);
    model.message = this.data.message;
    model.user_Id = getApp().globalData.userId;
    model.time = this.data.time;
    model.amount = amount;
    // this.setData(
    //   { showLoading: true }
    // )
    var url = host + '/TOrders/SaveDataForApp?data=' + JSON.stringify(model);
    wx.request({
      url: host + '/TOrders/SaveDataForApp',
      data: { data: JSON.stringify(model) },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        // this.setData(
        //   { showLoading: false }
        // )
        if (res.statusCode == "200") {
          wx.clearStorage('selData');
          wx.navigateTo({
            url: '/page/my/pages/orderInfo/orderInfo?shop_info=' + res.data.resultdata + '&callState=' + res.data.state
          })
        }
        else {
          wx.showModal({
            title: '温馨提示',
            content: '服务器出问题了,不能提交sorry！',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                return;
              }
            }
          })
        }
      },
      fail: function (res) {
        this.setData(
          { showLoading: false }
        )
        wx.showModal({
          title: '温馨提示',
          content: '服务器出问题了,不能提交sorry！',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              return;
            }
          }
        })
      }



    });



  },
  onLoad: function () {


    this.setData(
      {
        showLoading: false,
        time: util.formatTime2(new Date)
      }
    )
  },
  actionSheetTap: function () {
    var that=this;
    wx.showActionSheet({
      itemList: this.data.itemList,
      success: function (e) {
        console.log(e.tapIndex)
        var model = that.data.refData[e.tapIndex];
        var temp = { id: model.id, name: model.name, memo: '', saucetype: '', image: model.image, price: model.price };
        let length = that.data.shopdata.length;
        that.data.shopdata.splice(length + 1, 0, temp);
        that.setData(
          { shopdata: that.data.shopdata }
        )
        that.setData({
          toView: 'row' + (that.data.shopdata.length - 1)
        })
      }
    })
  }


});


