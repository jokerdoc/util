/**
 * 工具函数
 */
import _ from 'lodash';

export const noop = () => {}

var d = document.createElement('div');
export const isSupport = (prop) => {
  if (['getBoundingClientRect'].indexOf(prop) > -1) {
    return !!d[ prop ];
  }

  if (['Event'].indexOf(prop) > -1) {
    return !!window[ prop ];
  }

  return false;
}

// 获取数据类型
const toString = Object.prototype.toString;
export const whatType = (obj) => {
  return toString.call(obj).match(/\w+/g)[1];
}

// 获取元素
export const getEl = (selector) => {
  if (_.isString(selector)) {
    return document.querySelector(selector);
  }
  else {
    return selector;
  }
}

// 获取元素集合
export const getEls = (selector) => {
  if (_.isString(selector)) {
    return document.querySelectorAll(selector);
  }
  else {
    return selector;
  }
}

/**
 * @param {Element} el 元素
 * @param {String} type 事件类型
 * @param {Function} fn 事件函数
 * @return {Function} 返回事件解绑
 */
export const addEvent = (el, type, fn = noop) => {
  el = getEl(el);
  el.addEventListener(type, fn, false);

  return () => {
    removeEvent(el, type, fn);
  }
}

/**
 * @param {Element} el 元素
 * @param {String} type 事件类型
 * @param {Function} fn 事件函数
 */
export const removeEvent = (el, type, fn = noop) => {
  el = getEl(el);
  el.removeEventListener(type, fn);
}

// 触发事件
export const dispatchEvent = (type, obj = document) => {
  let e;
  if (isSupport('Event')) {
    e = new Event(type);
  }
  else {
    e = obj.document.createEvent('UIEvents');
    e.initUIEvent(type, true, false, obj, 0);
  }
  obj.dispatchEvent(e);
}

// 获取事件，非严格模式使用
export const getEvent = () => {
  if (window.event) {
    return window.event;
  }

  let f = arguments.callee.caller;

  do {
    var e = f.arguments[0];
    if (e && (e.constructor === Event || e.constructor === MouseEvent || e.constructor === KeyboardEvent)) {
　　　　return e;
    }
  } while (f = f.caller)
}

// 添加样式class
export const addClass = (el, name) => {
  if (!hasClass(el, name)) {
    el.classList.add(name);
  }
}

// 删除样式class
export const removeClass = (el, name) => {
  if (hasClass(el, name)) {
    el.classList.remove(name);
  }
}

// 切换样式class
export const toggleClass = (el, name) => {
  if (!hasClass(el, name)) {
    addClass(el, name);
  }
  else {
    removeClass(el, name);
  }
}

export const hasClass = (el, name) => {
  return (' ' + el.className + ' ').indexOf(' ' + name + ' ') > -1;
}

// 获取元素页面位置
export const getOffset = (el) => {
  let x = 0;
  let y = 0;

  while (el) {
    x += el.offsetLeft;
    y += el.offsetTop;
    el = el.offsetParent;
  }

  return {
    x, y
  }
}

// 获取元素位置、大小信息
export const getClientRect = (el) => {
  if (isSupport('getBoundingClientRect')) {
    return el.getBoundingClientRect();
  }
  else {
    let offset = getOffset(el);
    return {
      width: el.offsetWidth,
      height: el.offsetHeight,
      ...offset
    }
  }
}

// 碰撞检测 点[x1, y1] => 区域[x2, y2, w2, h2]
export const testColl = ([x1, y1], [x2, y2, w2, h2]) => {
  return x1 > x2 && x1 < x2 + w2 && y1 > y2 && y1 < y2 + h2;
}

// 碰撞检测 物体[x1, y1, w1, h1] => 区域[x2, y2, w2, h2]
export const testColl2 = ([x1, y1, w1, h1], [x2, y2, w2, h2]) => {
  // 四个边界点落在区域
  return testColl([x1, y1], [x2, y2, w2, h2]) ||
         testColl([x1 + w1, y1], [x2, y2, w2, h2]) ||
         testColl([x1, y1 + h1], [x2, y2, w2, h2]) ||
         testColl([x1 + w1, y1 + h1], [x2, y2, w2, h2]);
}
