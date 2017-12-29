import assert from 'assert';

const { JSDOM } = require('jsdom');
const { h, app } = require('hyperapp');

const jsdomConfig = { pretendToBeVisual: true };

const window = new JSDOM('', jsdomConfig).window;
global.window = window;
const document = global.document = window.document;

const counter = require('./index').default;
// console.log(counter);

counter.up();
counter.up();
counter.up();
counter.up();
counter.up();
const result = counter.up();
// console.log(assert, result, assert.ok(result.count, 6));
module.exports = (result.count === 6);
