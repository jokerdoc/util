# util
常用的工具函数

### 内容
  + noop 无操作函数
  + whatType 获取数据类型
  + isSupport 特性支持、浏览器嗅探
  + addEvent 绑定事件
  + removeEvent 解绑事件
  + getOffset 获取元素页面位置
  + getClientRect 获取元素位置、大小信息

### 在项目中安装
```bash
npm install lemon-util --save
# 或
yarn add lemon-util
```

### 使用
```js
import util from 'lemon-util';

util.addEvent('#el', 'click', (event) => {
  console.log('我被点击了');
});
```
