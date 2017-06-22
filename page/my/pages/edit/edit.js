const host = require('./../../../../config').host
Page({
  data: {
    goodId: 0,
    flag:'S',
    remain:0,
    reasion:'',
    name:''
  },
  onLoad: function (options){
  var id=options.id;
  var name = options.name;
  console.log('id'+id+' name'+name);
  this.setData({
    goodId: id,
    name: name
  });

  },
  bindKeyInput: function (e) {
    this.setData({
      remain: e.detail.value
    });
  },
  bindResionKeyInput:function(e){
    this.setData({
      reasion: e.detail.value
    });
  },
  switch1Change:  function(e){
    let flag = e.detail.value?'S':'N';
    console.log('switch1 发生 change 事件，携带值为', flag)
    this.setData({
      flag: flag
    })
  },
  btnSubmit:function(e){
    var that = this
    var param = { id: this.data.goodId, flag: this.data.flag, remain: this.data.remain, reason: this.data.reasion}

    wx.request({
      url: host + '/tgoods/UpdateForApp',
      method: 'GET',
      data: param,
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
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

    });
    
  }
});