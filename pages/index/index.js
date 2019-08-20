//index.js
//获取应用实例，家长首页
import { pages } from '../../utils/tabbarContent.js'
const app = getApp()

Page({
  data: {
    pagesMenu: [],
    bannerData:[
      { linkUrl: '', imgUrl: 'http://shop.yibeiyv.com/uploads/201906261709586a2674396.jpeg'},
      { linkUrl: '', imgUrl: 'http://shop.yibeiyv.com/uploads/20190626171107c57633002.jpeg' }
      
    ],
    msgList: [
      { orderName: 'NJJF-201905206609', id: 1002211},
      { orderName: '线下评标-新版测试02-gc', id: 1002212 }, 
      { orderName: '线下评标版本修改01-gc', id: 1002213 }
    ]    
    

  },
  onLoad: function () {
    const userRole = wx.getStorageSync("userRole") || '0';//获取用户角色，决定显示哪个tabbar
    this.setData({
      pagesMenu: pages[userRole * 1]
    })
  },
  onShow: function(){
   
  },

 
 
})
