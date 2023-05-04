# voip-uni

## 说明
在`uniapp`和小程序平台，通过`webview`的方式实现音视频功能，已部分支持单人、多人音视频通话

## 测试
1. `npm run serve`运行本项目
2. `uni-chat` 需要使用`dev-voip`分支
3. 修改`VoipPage.vue`里面的`voipBaseWebUrl`，这个地址一定要是`https`地址，否则不能进行音视频通话
4. 目前默认使用的是会议版音视频 SDK

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
