Page({
  data: {
    shopdata: [
      { id: 1, name: '饭包', memo: '', saucetype: '', imageUrl: '../../../../image/fb.jpg', price: 6 }
    ],
    flavortype: [
      { name: '葱', flavortype: '1', ischeck: false },
      { name: '青椒', flavortype: '2', ischeck: false },
      { name: '香菜', flavortype: '3', ischeck: false },
      { name: '土豆丝', flavortype: '4', ischeck: false },
      { name: '黄瓜丝', flavortype: '5', ischeck: false }
    ],
    saucetype: [
      { name: '鸡蛋酱', ischeck: false }, { name: '豆瓣酱', ischeck: false }, { name: '辣酱', ischeck: false }
    ],
    curNav: 1,
    curIndex: 0,
    time: '12:01',
    message: ''
  },
  switchMemoInput: function (e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    console.log('id' + id + '  index:' + index);
    if (this.data.curNav != id) {
      var tt = [
        { name: '鸡蛋酱', ischeck: false }, { name: '豆瓣酱', ischeck: false }, { name: '辣酱', ischeck: false }]
      var dd = [
        { name: '葱', flavortype: '1', ischeck: false },
        { name: '青椒', flavortype: '2', ischeck: false },
        { name: '香菜', flavortype: '3', ischeck: false },
        { name: '土豆丝', flavortype: '4', ischeck: false },
        { name: '黄瓜丝', flavortype: '5', ischeck: false }
      ]
      // 把点击到的某一项，设为当前index  
      // 把点击到的某一项，设为当前index  
      this.setData({
        saucetype: tt,
        flavortype: dd
      })
    }
    this.setData({
      curNav: id,
      curIndex: index
    })
  },

  radioChange: function (e) {
    let text = e.detail.value;
    let index = e.target.dataset.index;
    let seltext = e.target.dataset.text;
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
      { shopdata: this.data.shopdata }
    )
  },


  adddata: function (e) {
    let index = this.data.curIndex;
    let length = this.data.shopdata.length;
    console.log('length值为：', length)
    this.data.shopdata.splice(length + 1, 0,
      { id: '', name: '饭包', memo: '', saucetype: '', imageUrl: '../../../../image/fb.jpg', price: 6 });
    this.setData(
      { shopdata: this.data.shopdata }
    )
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
    var goData = { shopData: this.data.shopdata, time: this.data.time, memo: this.data.message };


    wx.navigateTo({
      url: '/page/my/pages/orderInfo/orderInfo?shop_info=' + JSON.stringify(goData)
    })

  }
});