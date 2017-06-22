const openIdUrl = require('./config').openIdUrl
const common=require('./page/common/common.js')
App({
  onLaunch: function () {
    console.log('App Launch')

    wx.getSetting({
      success(res) {
        if (!res['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              console.log('同意获取用户信息');
              common.login();
            }
          })
        }
      }
    })
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    hasLogin: false,
    isAdmin: 'F',
    openid: null,
    userId:null
  },
  // lazy loading openid
  getUserOpenId: function(callback) {
    var self = this

    if (self.globalData.openid) {
      callback(null, self.globalData.openid)
    } else {
      wx.login({
        success: function(data) {
          wx.request({
            url: openIdUrl,
            data: {
              code: data.code
            },
            success: function(res) {
              console.log('拉取openid成功', res)
              self.globalData.openid = res.data.openid
              callback(null, self.globalData.openid)
            },
            fail: function(res) {
              console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
              callback(res)
            }
          })
        },
        fail: function(err) {
          console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
          callback(err)
        }
      })
    }
  }
})

function login() {
  console.log('logining..........');
  //调用登录接口
  wx.login({
    success: function (e) {
      console.log('wxlogin successd........');
      var code = e.code;
      if (code) {
        wx.getUserInfo({
          success: function (res) {
            console.log('wxgetUserInfo successd........');
            var encryptedData = encodeURIComponent(res.encryptedData);
            console.log(code);
            console.log("encryptedData:" + encryptedData);
            console.log("res.iv:" + res.iv);

            thirdLogin(code, res.rawData);//调用服务器api
          }
        })
      }
      else {
        console.log('获取用户登录态失败！' + res.errMsg)
      }
    }
  });


}

function thirdLogin(code, userInfo) {
  var url = host + "/Tusers/Onlogin";
  var params = new Object();
  params.code = code;
  var temp = JSON.parse(userInfo)
  temp.avatarUrl = "";

  console.log('userInfo ' + JSON.stringify(temp));
  params.userInfo = JSON.stringify(temp);
  wx.request({
    url: url,
    method: 'GET',
    data: params,
    header: {
      'Accept': 'application/json'
    },
    success: function (data) {
      console.log('my  login successd........');
      console.log(data);
      if (data.data.message != "ok") {
        getApp().globalData.hasLogin = false;
      }
      else {
        getApp().globalData.userId = data.data.resultdata;
        getApp().globalData.hasLogin = true;
      }

    },
    fail: function (res) {
      wx.showModal({
        title: '温馨提示',
        content: '服务器出问题了,sorry！',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            return;
          }
        }
      })
    }

  });

}
