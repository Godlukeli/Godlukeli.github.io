// pages/mine/mine.js
let timer = null;
function getRandomColor () {
  let rgb = []
  for (let i = 0 ; i < 3; ++i){
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    current: 0,
    imgUrls: [
      "../../images/sp1.jpg",
      "../../images/sp2.jpg",
      "../../images/sp3.jpg"
    ],
    poster: "../../images/audio-poster.jpg",
    name: "hit and run",
    author: "Lolo",
    src: "http://47.93.13.72/base/audio/lolo-hitAndRun.MP3",
    vSrc: "http://47.93.13.72/base/video/lolo-hitAndRun.mp4",
    danmuList: [
      {
        text: "第 1s 出现的弹幕",
        color: "#ff0000",
        time: 1
      },
      {
        text: "第 3s 出现的弹幕",
        color: "#ff00ff",
        time: 3
      }
    ],
    inputValue:"",
    toggle:true
  },

  audioPlay() {
    console.log(this.audioCtx);
    this.audioCtx.play();
  },

  audioPause() {
    this.audioCtx.pause();
  },

  bindInput(e){
    console.log(e);
    this.setData({
      inputValue:e.detail.value
    })
  },
  bindButtonTap(){
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front','back'],
      success: function(res) {
        that.setData({
          vSrc: res.tempFilePath
        })
      }
    })
  },

  bindSendDanmu(e){
    console.log(e);
    this.videoContext.sendDanmu({
      text: this.data.inputValue,
      color: getRandomColor()
    })
    this.setData({
      inputValue:""
    })
  },

  showWarning(){
    // 当不使用 wifi时就发出警告
    this.videoContext.pause();
    wx.showModal({
      title: '警告',
      content: '您正在使用流量播放',
      showCancel:true,
      cancelText:"取消",
      cancelColor:"#000000",
      confirmText:"有钱任性",
      confirmColor:"#576B95",
      success: (res)=> {
        if (res.confirm) {
          console.log('用户点击确定');
          wx.showToast({
            title: '流量播放中',
            icon: 'success',
            duration: 1000
          })
          wx.setStorageSync("netType",true);
          setTimeout(()=>{
            this.videoContext.play();
            this.setData({
              toggle:true
            })
          },100)
          
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  videoplay(){
    if(!wx.getStorageSync("netType")){
      this.showWarning();
    }
  },

  videoupdate(){
    if(!wx.getStorageSync("netType")&&this.data.toggle){
      this.showWarning();
      this.setData({
        toggle:!this.data.toggle
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    timer = setInterval(() => {
      if (this.data.current < 100) {
        this.setData({
          current: ++this.data.current
        });
      } else {
        clearInterval(timer);
        this.setData({
          show: !this.data.show,
          current: 0
        });
        wx.showToast({
          title: "加载成功"
        });
      }
    }, 50);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext("myAudio");
    this.videoContext = wx.createVideoContext('myVideo');

    wx.getNetworkType({
      success (res) {
        const networkType = res.networkType;
        console.log(networkType);
        wx.setStorageSync("netType",!!(networkType=="wifi"));
      }
    })

    wx.onNetworkStatusChange(function (res) {
      console.log(res.isConnected)
      console.log(res.networkType)
      const networkType = res.networkType;
      wx.setStorageSync("netType",!!(networkType=="wifi"))
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
