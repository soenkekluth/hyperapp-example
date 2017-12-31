(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const { h, app } = require('hyperapp');
/** @jsx h */

// const style = require('./style.css');

const window = global ? global.window : window || {};

const db = window.localStorage || {
  getItem: name => null,
  setItem: (name, value) => null
};
const savedValue = parseInt(db.getItem('hypercounter'));

const ACTIONS = {
  UP: 'up',
  DOWN: 'down',
  NONE: '-'
};

const state = {
  count: savedValue || 0,
  action: ACTIONS.NONE,
  saved: savedValue || null
};

const actions = {
  down: () => state => {
    resetAction();
    return { count: state.count - 1, action: ACTIONS.DOWN };
  },
  up: () => state => {
    resetAction();
    return { count: state.count + 1, action: ACTIONS.UP };
  },
  save: () => state => {
    db.setItem('hypercounter', state.count);
    return { saved: state.count };
  },
  clear: () => state => {
    db.clear();
    return { count: 0, saved: null };
  },
  action: value => state => {
    return { action: value };
  }
};

let timeout;
const resetAction = (delay = 1000) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    counter.action(ACTIONS.NONE);
  }, delay);
};

const Button = ({ label, action, disabled = false }) => h(
  'button',
  { onclick: action, disabled: disabled },
  label
);

const SimpleButton = (label, action) => h(
  'button',
  { onclick: action },
  label
);

const Article = (_ref) => {
  let { title = 'counting', text } = _ref,
      props = _objectWithoutProperties(_ref, ['title', 'text']);

  return h(
    'article',
    _extends({ 'class': `count_${text}` }, props),
    h(
      'h2',
      null,
      title
    ),
    h(
      'p',
      null,
      text
    )
  );
};

const View = (state, actions) => h(
  'main',
  null,
  h(
    'h1',
    null,
    'hyperapp counter'
  ),
  h(
    'output',
    null,
    state.count
  ),
  Button({ label: '-', action: actions.down, disabled: state.count <= 0 }),
  SimpleButton('+', actions.up),
  Article({
    text: state.action,
    'data-atributes': 'work',
    style: { color: 'inherit' }
  }),
  h(
    'button',
    { onclick: actions.save },
    'save'
  ),
  h(
    'button',
    { onclick: actions.clear },
    'clear'
  ),
  h(
    'footer',
    null,
    state.saved !== null && h(
      'p',
      null,
      'saved: ',
      state.saved
    ),
    ' '
  )
);

const counter = app(state, actions, View, document.body);
window.counter = counter;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"hyperapp":2}],2:[function(require,module,exports){
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd||n(e.hyperapp={})}(this,function(e){"use strict";e.h=function(e,n){for(var r,o=[],t=[],i=arguments.length;i-- >2;)t.push(arguments[i]);for(;t.length;)if(Array.isArray(r=t.pop()))for(i=r.length;i--;)t.push(r[i]);else null==r||!0===r||!1===r||o.push(r);return"string"==typeof e?{name:e,props:n||{},children:o}:e(n||{},o)},e.app=function(e,n,r,o){function t(e,n){return e&&{name:e.nodeName.toLowerCase(),props:{},children:n.call(e.childNodes,function(e){return 3===e.nodeType?e.nodeValue:t(e,n)})}}function i(t){for(y=!y,t=r(e,n),o&&!y&&(N=v(o,N,w,w=t));t=g.pop();)t()}function l(){y||(y=!y,setTimeout(i))}function u(e,n){var r={};for(var o in e)r[o]=e[o];for(var o in n)r[o]=n[o];return r}function f(e,n,r,o){return e.length?(o[e[0]]=1<e.length?f(e.slice(1),n,r[e[0]],{}):n,u(r,o)):n}function c(e,n){for(var r=0;r<e.length;r++)n=n[e[r]];return n}function p(n,r,o){for(var t in o)"function"==typeof o[t]?function(t,i){o[t]=function(t){return r=c(n,e),"function"==typeof(t=i(t))&&(t=t(r,o)),t&&t!==r&&!t.then&&l(e=f(n,u(r,t),e,{})),t}}(t,o[t]):p(n.concat(t),r[t]=r[t]||{},o[t]=u(o[t]))}function s(e){return e&&e.props?e.props.key:null}function a(e,n,r,o){if("key"===n);else if("style"===n)for(var t in u(o,r))e[n][t]=null==r||null==r[t]?"":r[t];else{try{e[n]=null==r?"":r}catch(e){}"function"!=typeof r&&(null==r||!1===r?e.removeAttribute(n):e.setAttribute(n,r))}}function d(e,n){var r="string"==typeof e||"number"==typeof e?document.createTextNode(e):(n=n||"svg"===e.name)?document.createElementNS("http://www.w3.org/2000/svg",e.name):document.createElement(e.name);if(e.props){e.props.oncreate&&g.push(function(){e.props.oncreate(r)});for(var o=0;o<e.children.length;o++)r.appendChild(d(e.children[o],n));for(var t in e.props)a(r,t,e.props[t])}return r}function h(e,n,r){if(r=n.props){for(var o=0;o<n.children.length;o++)h(e.childNodes[o],n.children[o]);r.ondestroy&&r.ondestroy(e)}return e}function m(e,n,r,o){function t(){e.removeChild(h(n,r))}r.props&&(o=r.props.onremove)?o(n,t):t()}function v(e,n,r,o,t,i){if(o===r);else if(null==r)n=e.insertBefore(d(o,t),n);else if(o.name&&o.name===r.name){!function(e,n,r){for(var o in u(n,r))r[o]!==("value"===o||"checked"===o?e[o]:n[o])&&a(e,o,r[o],n[o]);r.onupdate&&g.push(function(){r.onupdate(e,n)})}(n,r.props,o.props);for(var l=[],f={},c={},p=0;p<r.children.length;p++)l[p]=n.childNodes[p],null!=(w=s(y=r.children[p]))&&(f[w]=[l[p],y]);p=0;for(var h=0;h<o.children.length;){var y=r.children[p],N=o.children[h],w=s(y),b=s(N);if(c[w])p++;else if(null==b)null==w&&(v(n,l[p],y,N,t),h++),p++;else{var k=f[b]||[];w===b?(v(n,k[0],k[1],N,t),p++):k[0]?v(n,n.insertBefore(k[0],l[p]),k[1],N,t):v(n,l[p],null,N,t),h++,c[b]=N}}for(;p<r.children.length;)null==s(y=r.children[p])&&m(n,l[p],y),p++;for(var p in f)c[f[p][1].props.key]||m(n,f[p][0],f[p][1])}else o.name===r.name?n.nodeValue=o:(n=e.insertBefore(d(o,t),i=n),m(e,i,r));return n}var y,g=[],N=o&&o.children[0],w=t(N,[].map);return l(p([],e=u(e),n=u(n))),n}});

},{}]},{},[1]);
