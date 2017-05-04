Page({
 data: {
     text:'饭包是一种农家饭，大多数东北人都喜欢吃。做法也是大同小异。先把洗净的大白菜叶平铺开来，抹上酱，然后把撕碎的葱、香菜和土豆块或者土豆酱撒在上面，如果口重还可以再加点酱，最后把米饭最好是二米饭（小米和大米）铺在上面，包起来就可以吃了。有些人喜欢用熟酱，还喜欢在里面加一些别的蔬菜，如黄瓜丝儿等，各人有各人的喜好。吃在嘴里，清清爽爽，未加工的蔬菜的味道、大酱的醇香和米饭香混合在一起，让人齿夹生津，甚至在吃完之后，闻一闻手指间留下的味道，都让人回味无穷。'

 },
bindSubmit:function(){
wx.switchTab({
  url: '/page/my/pages/shopcar/shopcar',
  success: function(res){
    // success
  },
  fail: function(res) {
    // fail
  },
  complete: function(res) {
    // complete
  }
})
}
    
})