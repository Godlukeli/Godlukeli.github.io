# 微信小程序项目

## 小程序代码构成
1. .json 后缀的 JSON 配置文件
2. .wxml 后缀的 WXML 模板文件
3. .wxss 后缀的 WXSS 样式文件
4. .js 后缀的 JS 脚本逻辑文件

### 目录结构

一个小程序主体部分由三个文件组成，必须放在项目的根目录，如下：

文件	必需	作用
app.js	是	小程序逻辑
app.json	是	小程序公共配置
app.wxss	否	小程序公共样式表

一个小程序页面由四个文件组成，分别是：

文件类型	必需	作用
js	是	页面逻辑
wxml	是	页面结构
json	否	页面配置
wxss	否	页面样式表

### JSON 配置

>小程序配置 app.json     全局公共配置   
>工具配置 project.config.json       
>页面配置 page.json     

### JSON 语法

这里说一下小程序里JSON配置的一些注意事项。

__JSON文件都是被包裹在一个大括号中 {}，通过key-value的方式来表达数据。JSON的Key必须包裹在一个双引号中，在实践中，编写 JSON 的时候，忘了给 Key 值加双引号或者是把双引号写成单引号是常见错误。__

__JSON的值只能是以下几种数据格式，其他任何格式都会触发报错，例如 JavaScript 中的 undefined。__

1. 数字，包含浮点数和整数
2. 字符串，需要包裹在双引号中
3. Bool值，true 或者 false
4. 数组，需要包裹在方括号中 []
5. 对象，需要包裹在大括号中 {}
6. Null

__还需要注意的是 JSON 文件中无法使用注释，试图添加注释将会引发报错。__

### WXML 模板
在小程序中也有同样的角色，其中 WXML 充当的就是类似 HTML 的角色,和 HTML 非常相似，WXML 由标签、属性等等构成。但是也有很多不一样的地方，我们来一一阐述一下：

1. 标签名字有点不一样 view 类似为 div 标签
2. 多了一些 wx:if 这样的属性以及  这样的表达式

WXML 是这么写 :
```html
<text>{{msg}}</text>
```

### WXSS 样式

WXSS 具有 CSS 大部分的特性，小程序在 WXSS 也做了一些扩充和修改

1. 新增了尺寸单位。在写 CSS 样式时，开发者需要考虑到手机设备的屏幕会有不同的宽度和设备像素比，采用一些技巧来换算一些像素单位。WXSS 在底层支持新的尺寸单位 rpx ，开发者可以免去换算的烦恼，只要交给小程序底层来换算即可，由于换算采用的浮点数运算，所以运算结果会和预期结果有一点点偏差。

2. 提供了全局的样式和局部样式。和前边 app.json, page.json 的概念相同，你可以写一个 app.wxss 作为全局样式，会作用于当前小程序的所有页面，局部页面样式 page.wxss 仅对当前页面生效。

3. 此外 WXSS 仅支持部分 CSS 选择器

### JS 逻辑交互

一个服务仅仅只有界面展示是不够的，还需要和用户做交互：响应用户的点击、获取用户的位置等等。在小程序里边，我们就通过编写 JS 脚本文件来处理用户的操作。

```html
<view>{{ msg }}</view>
<button bindtap="clickMe">点击我</button>
```

点击 button 按钮的时候，我们希望把界面上 msg 显示成 "Hello World"，于是我们在 button 上声明一个属性: bindtap ，在 JS 文件里边声明了 clickMe 方法来响应这次点击操作：

```javascript
Page({
  clickMe: function() {
    this.setData({ msg: "Hello World" })
  }
})
```

## 小程序页面生命周期及其期间回调函数(钩子函数)

app.js中
1. onLaunch 小程序启动时
2. onShow 小程序显示时
3. onHide 小程序隐藏时
4. onError 小程序错误时
5. onPageNotFound 页面不存在监听函数

pages文件夹中的页面的js
1. onLoad 监听页面加载
2. onReady 监听页面初次渲染完成
3. onShow 监听页面显示
4. onHide 监听页面隐藏
5. onUnload 监听页面卸载
6. ...等等

## 小程序遵循common.js规范 模块化

## 移动端适配   等比缩放  


## rem    100px 

## 媒体查询  @media  查询屏幕的大小 宽度和高度  


## 100% 布局  bootstrap 栅格系统  


## 弹性盒子布局  display:flex 

## px     rem(指的当前根节点HTML的字体大小font-size);   

## vw    1vw = 屏幕宽度的 1/100                 1 vh   = 1vw = 屏幕高度的 1/100 

## 假如 设计稿 屏幕宽度  750px  图片 ==>  200px  

## 假定当前 设计稿的 rem  = 100px;      width:2rem 

## 计算出 当前设备的 宽度 

## 100vw      document.documentElement.clientWidth 

##  设计稿width:设备width = 100px:x     x=>>  100*设备宽度 / 设计稿width  当前设备的rem   


## x  =  100*100vw/750  = 100vw/7.5

## x  =  100*100vw / 640 = 100vw/6.4


## x =   75*100vw / 750 = 10vw ;



## 微信小程序  新的 单位  rpx  等比缩放
## dpi  像素密度  
## px = 1px 像素  绝对
## pt = ?   物理像素   相对   当前设备可以识别的最小的硬件单位 (像素单位) 分辨率越高 物理像素越小 

## rpx 只跟 750px 的设计稿有关  在750设计稿   
## iphone6 基准 375px = 750pt   1rpx = 0.5px 