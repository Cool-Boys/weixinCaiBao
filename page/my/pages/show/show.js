Page({
  data: {
    shopdata: [{
      id: 1,
      name: '饭包',
      imageurl: '../../../../image/fb.jpg',
      text: '  饭包是一种农家饭，大多数东北人都喜欢吃。做法也是大同小异。先把洗净的大白菜叶平铺开来，抹上酱，然后把撕碎的葱、香菜和土豆块或者土豆酱撒在上面，如果口重还可以再加点酱，最后把米饭最好是二米饭（小米和大米）铺在上面，包起来就可以吃了。有些人喜欢用熟酱，还喜欢在里面加一些别的蔬菜，如黄瓜丝儿等，各人有各人的喜好。吃在嘴里，清清爽爽，未加工的蔬菜的味道、大酱的醇香和米饭香混合在一起，让人齿夹生津，甚至在吃完之后，闻一闻手指间留下的味道，都让人回味无穷。'

    },
    {
      id: 2,
      name: '冷面',
      imageurl: '../../../../image/lm.jpg',
      text: '  冷面是朝鲜族世代相传的特色食品，被看作是上等的佳肴之一，荞麦是冷面的重要组成成分。冷面口感清凉爽滑、筋道，因其甜、酸、辛、辣、香五味俱全而成为人们喜爱的美食。近年来，冷面已开始出口，且出口量逐年递增。由于它营养丰富，而且具有药用价值，因此越来越受到外商的关注。正宗的冷面是现压制的湿面条，面条色淡黄，外面冷而内里温，柔软而有韧性。冷面面团主要是由小麦粉、荞麦粉等组成。原料的品质直接影响着冷面的品质。'

    }
    ],
    curNav: 1,
    curIndex: 0
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
  bindSubmit: function () {
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
  }

})