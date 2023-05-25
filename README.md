# voip-uni

## 说明
在`uniapp`和小程序平台，通过`webview`的方式实现音视频功能，已部分支持单人、多人音视频通话

## 测试
1. `npm run serve`运行本项目
2. `wx-chat`切换到`dev-voip`分支
3. 修改 `wx-chat` 项目 `voip.js` 里面的 `url` 为 第1步运行得到的`url`，不能用`localhost`那个
4. 小程序开发者工具，配置不校验合法域名
5. 真机预览`wx-chat`，可以是手机真机或电脑真机预览
6. 目前默认使用的是会议版音视频 SDK

## 常见问题
1. 提示无法打开网页？

   点击右上角三个点，然后打开开发调试开关
2. `npm run serve`时，手机端不能打开网页

    可以用电脑端调试

**WIP**

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
