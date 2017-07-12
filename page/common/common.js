const host = require('./../../config').host
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
            getApp().globalData.userInfo = res.rawData;
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
  console.log('userInfo1 ' + getApp().globalData.userInfo);
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
    
    
      console.log(data);
      if (data.data.message != "ok") {
        getApp().globalData.hasLogin = false;
      }
      else {
        var arr = data.data.resultdata.split('-');
        getApp().globalData.userId = arr[0];
        getApp().globalData.isAdmin = arr[1];
        console.log('my  login successd........' + getApp().globalData.userId);        
        console.log('my  login successd........' + getApp().globalData.isAdmin );
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
module.exports.login = login