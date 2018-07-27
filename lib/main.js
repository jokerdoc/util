import * as util from './util';

console.info('util', util)

var el = util.getEl('#div1');
util.addEvent(el, 'click', () => {
  // console.log('我被点击了')

  util.toggleClass(el, 'active');
})
