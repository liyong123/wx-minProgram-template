//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  
  },
  onLoad: function () {
    this.getUserLocation();
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  getUserLocation: function () {
    var that = this;
    wx.getLocation({
      type: "wgs84",
      success: function (t) {
        var e = t.latitude, a = t.longitude;
        t.speed, t.accuracy;
        console.log(e), console.log(a);
        var n = a + "," + e;
        
      }
    });
  },
 
})
