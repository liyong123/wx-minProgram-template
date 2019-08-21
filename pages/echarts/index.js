// pages/echarts/index.js
import * as echarts from "../../ec-canvas/echarts.js";
import geoJson from "./echartsNanJingDatas.js";
var app = getApp();
var chart = null;
//南京市地图echarts配置
var series = [{
  type: 'map',
  mapType: 'nanjing',
  name: "南京云集",
  left: 10,
  right: 0,
  top: 0,
  bottom: 0,
  silent: true,
  label: {
    show: true,
    color: '#fff',
    fontSize: 12,
  },
  itemStyle: {
    borderWidth: 1,
    borderColor: '#fff',
    areaColor: '#E1E1EB',
  },
  emphasis: {
    label: {
      color: '#fff'
    },
    itemStyle: {
      // areaColor: '#3D43E8',
        areaColor: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
        offset: 0,
        color: '#79C1FF'
      }, {
        offset: 1,
        color: '#3D43E8'
      }]),
      borderWidth: 0
    }
  },
  animation: false,
  data: [{
    name: "市直属",
    value: "320101"
  },
  {
    name: "玄武区",
    value: "320102",
    label: {
      show: true,
      fontSize: 10
    }
  },
  {
    name: "秦淮区",
    value: "320104",
    label: {
      show: true,
      fontSize: 10
    }

  },
  {
    name: "建邺区",
    value: "320105",
    label: {
      show: true,
      fontSize: 10
    }
  },
  {
    name: "鼓楼区",
    value: "320106",
    label: {
      show: true,
      fontSize: 10
    }
  },
  {
    name: "浦口区",
    value: "320111"
  },
  {
    name: "栖霞区",
    value: "320113"
  },
  {
    name: "雨花台区",
    value: "320114",
    label: {
      show: true,
      fontSize: 10
    }
  },
  {
    name: "江宁区",
    value: "320115"
  },
  {
    name: "六合区",
    value: "320116"
  },
  {
    name: "溧水区",
    value: "320117"
  },
  {
    name: "高淳区",
    value: "320118"
  }
  ]
}];
//南京市地图初始化
function initChart(canvas, width, height) {
 
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  echarts.registerMap('nanjing', geoJson);
  const option = {
    series: series
  };
  chart.setOption(option);
  return chart;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    yearBoardShow: false,
    currentYear: '',
    yearGrps: [],
    currentTab: 0,
    mainContentHight: (wx.getSystemInfoSync().windowHeight - 275 * (wx.getSystemInfoSync().windowWidth / 750)) + "px",
    boardShow: false,
    alreadyDeal: "--",
    totalBuild: "--",
    buildIn: "--",
    alreadyPass: "--",
    mapContentTop: ((wx.getSystemInfoSync().windowHeight - 275 * (wx.getSystemInfoSync().windowWidth / 750) - 100 * (wx.getSystemInfoSync().windowWidth / 750) - 180 * (wx.getSystemInfoSync().windowWidth / 750)) / 2) + (180 * (wx.getSystemInfoSync().windowWidth / 750)) + "px",
    ec: {
      onInit: initChart
    },
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.setData({
      cityTabDatas: [{
        title: "全市总投入"
      },
      {
        title: "全市总建设"
      },
      {
        title: "供应商概览"
      }
      ],
      yearGrps: [
        { year: "2019" }
      ]
    });
    
    var date = new Date();
    var currentYear = date.getFullYear();
    var yearGrpsCopy = that.data.yearGrps.slice();
    that.setData({
      currentYear: currentYear
    });

    for (var i = 0; i < parseInt(that.data.currentYear - 2018); i++) {
      yearGrpsCopy.push({ year: (2019 + i + 1).toString() })
    }
    that.setData({
      yearGrps: yearGrpsCopy
    })

    if (that.data.currentTab == 0) {
      that.getCityLeaderIndexTotalMoneyDatas(that);
      //that.getDityLeaderIndexAreaDatas(that);
    } else if (that.data.currentTab == 1) {
      that.getCityLeaderIndexTotalBuildDatas(that);
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //选择年份
  chooseYearEvent: function (e) {
    var that = this;
    var yearBoardShow = that.data.yearBoardShow;
    yearBoardShow = !yearBoardShow;
    that.setData({
      yearBoardShow: yearBoardShow
    })
  },
  //年份切换
  clickYearEvent: function (e) {
    var that = this;
    that.setData({
      currentYear: e.currentTarget.dataset.yearindex
    })
    // if (that.data.currentTab == 0 || that.data.currentTab == 1) {
    //   that.setData({
    //     boardDatas: [],
    //     totalMoney: "--",
    //     totalBuild: "--",
    //     purchaseIn: "--",

    //     buildIn: "--",
    //     alreadyDeal: "--",
    //     alreadyPass: "--",

    //     purchaseNum: "--",
    //     dealMoney: "--",
    //     proportion: "--",
    //     boardShow: false,
    //   });

    //   // 根据currentTab 值，访问相应的接口
    //   if (that.data.currentTab == 0) {
    //     that.getCityLeaderIndexTotalMoneyDatas(that);
    //     that.getDityLeaderIndexAreaDatas(that);
    //   } else if (that.data.currentTab == 1) {
    //     that.getCityLeaderIndexTotalBuildDatas(that);
    //   } else {
    //     that.setData({
    //       boardDatas: []
    //     })
    //   }
    // } else if (that.data.currentTab == 2) {
    //   that.fetchOverviewData();
    // }
  },
  //“全市总投入”...tab切换
  tabChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.currentTarget.dataset.citytab,
      //currentArea: -1,
      //boardShow: false,
    })
    //tab切换恢复地图
    //this.resetMap();
    if (that.data.currentTab == 0 || that.data.currentTab == 1) {
      that.setData({
        //boardDatas: [],
        totalMoney: "--",
        totalBuild: "--",
        purchaseIn: "--",

        buildIn: "--",
        alreadyDeal: "--",
        alreadyPass: "--",

        purchaseNum: "--",
        dealMoney: "--",
        proportion: "--",
      });

      // 根据currentTab 值，访问相应的接口
      if (that.data.currentTab == "0") {
        that.getCityLeaderIndexTotalMoneyDatas(that);
        //that.getDityLeaderIndexAreaDatas(that);
      } else if (that.data.currentTab == "1") {
        that.getCityLeaderIndexTotalBuildDatas(that);
      } else {
        // that.setData({
        //   boardDatas: []
        // })
      }
    } else if (that.data.currentTab == 2) {
      //that.fetchOverviewData();
    }
  },
  //currentTab==0时，获取全市总投入接口
  getCityLeaderIndexTotalMoneyDatas: function (that) {
    let moneyParams = {
      flagYear: that.data.currentYear
    }
    wx.stopPullDownRefresh();
    that.setData({
      totalMoney: 1000,
      purchaseIn: 2000,
      alreadyDeal: 3000
    })
    
  },
  //currentTab==1时，获取总建设接口
  getCityLeaderIndexTotalBuildDatas: function (that) {
    that.setData({
      totalBuild:"100",
      buildIn: "80",
      alreadyPass: "20"
    });
  },

  //点击屏幕其他位置，面板消失
  hideMapBoardModal: function (e) {
    var that = this;
    that.setData({
      boardShow: false
    })
    //this.resetMap()
  },
  hideMapBoardModal2: function (e) {
    console.log("e2:", e)
  },
})