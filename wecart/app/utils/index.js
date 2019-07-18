export const ajax = ({url,method,data,cb})=>{
    wx.showLoading({
        title:"请求中..."
      })
      // 发送请求
      wx.request({
        url: url,//'http://47.93.13.72:1902/react-lyra/sendCode', //仅为示例，并非真实的接口地址
        method:method,//"POST",
        data: data,//{
        //   mobile:this.data.loginData.mobile
        // },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
        //   console.log(res.data)
          cb(res);
          wx.hideLoading();
          wx.showToast({
            title:res.data.msg
          })
        }
      })
}