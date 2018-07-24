/**
 * 工具函数
 */

export const noop = () => {}

var d = document.createElement('div');
export const isSupport = (prop) => {
  if (['getBoundingClientRect'].indexOf(prop) > -1) {
    return !!d[ prop ];
  }
}

// 获取数据类型
const toString = Object.prototype.toString;
export const whatType = (obj) => {
  return toString.call(obj).match(/\w+/g)[1];
}

/**
 * @param {Element} el 元素
 * @param {String} type 事件类型
 * @param {Function} fn 事件函数
 * @return {Function} 返回事件解绑
 */
export const addEvent = (el, type, fn = noop) => {
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
  el.removeEventListener(type, fn);
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
