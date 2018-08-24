# util
常用的工具函数

### 内容
  + noop 无操作函数
  + whatType 获取数据类型
  + isSupport 特性支持、浏览器嗅探
  + getEl 获取元素
  + getEls 获取元素集合
  + addEvent 绑定事件
  + removeEvent 解绑事件
  + dispatchEvent 触发事件
  + getEvent 获取事件对象
  + addClass 增加样式class
  + removeClass 删除样式class
  + toggleClass 切换样式class
  + getOffset 获取元素页面位置
  + getClientRect 获取元素位置、大小信息

### 在项目中安装
```bash
npm install jo-util --save
# 或
yarn add jo-util
```

### 使用
```js
import util from 'jo-util';

util.addEvent('#el', 'click', (event) => {
  console.log('我被点击了');
});
```
