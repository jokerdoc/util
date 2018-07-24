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
    y += el.offset;
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
