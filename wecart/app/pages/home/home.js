// pages/home/home.js
import {ajax} from "../../utils/index";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    word:"fuck",
    flag:!!0,
    count:1902,
    imgUrl:"https://zuozhaoxi.com/base/img/3.jpg",
    url:"https://www.baidu.com",
    msg:9527,
    list:["a","b","c"],
    num:[1,2,3,4,5,6,7,8,9],
    isLogin:false,
    like:{
      liker:"luke",
      count:999      
    },
    itemList: ['拍照', '从手机相册中选则'],
    loginData:{
      isLogin:false,
      mobile:"",
      code:""
    }
  },

  getMobile(e){
    this.setData({
      "loginData.mobile":e.detail.value
    })
  },

  getCode(e){
    console.log(e);
    this.setData({
      "loginData.code":e.detail.value
    })
  },

  sendCode(){
    wx.showLoading({
      title:"请求中..."
    })
    // 发送请求
    wx.request({
      url: 'http://47.93.13.72:1902/react-lyra/sendCode', //仅为示例，并非真实的接口地址
      method:"POST",
      data: {
        mobile:this.data.loginData.mobile
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
        wx.hideLoading();
        wx.showToast({
          title:res.data.msg
        })
      }
    })
  },

  autoLogin(){
    console.log(111)
    ajax({
      url:'http://47.93.13.72:1902/react-lyra/checkCode',
      method:"POST",
      data:{
        mobile:this.data.loginData.mobile,
        code:this.data.loginData.code
      },
      cb:(res)=>{
        console.log(res);
        if(!!res.data.type){
          wx.setStorageSync("isLogin",!!res.data.type)
        }else{
          wx.setStorageSync("isLogin",!!res.data.type)
        }

        this.setData({
          "loginData.isLogin":true
        })
      }
    })
  },

  changeFlag(e){
    console.log(e);
    this.setData({
      flag:!this.data.flag
    })
  },

  countAdd(){
    this.data.msg++;
    this.setData({
      msg:this.data.msg
    })
  },

  tapMe(e){
    console.log(e)
  },
  getVal(e){
    console.log(e);
    console.log(e.detail.value)
  },

  openModal(){
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      showCancel:true,
      cancelText:"取消",
      cancelColor:"#000000",
      confirmText:"确定",
      confirmColor:"#576B95",
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 500
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  openPhoto(){
    wx.showActionSheet({
      itemList: this.data.itemList,
      success (res) {
        console.log(res.tapIndex)
      },
      fail (res) {
        console.log(res.errMsg)
      }
    })
  },

  loginCancel(){
    this.setData({
      "loginData.isLogin":true
    })
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      "loginData.isLogin":!!wx.getStorageSync("isLogin")
    })
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
    return {
      title:"每日一笑",
      url:"pages/home/home"
    }
  }
})