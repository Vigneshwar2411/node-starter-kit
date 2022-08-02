/* eslint-disable */

require('babel-core/register')({
  ignore: /node_modules\/(?!foundation\-sites)/
});

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const appRoute = require('app/config').appRoute;

const mockConfig = {
	cdnUrl:'http://localhost:4444',
	logFlushWaitTime:30000,
	appBaseURL:'http://localhost:8888',
	apolloCurrentBaseURL:'http://localhost:3001',
	env:'test',
	appRoute: appRoute
};

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost:8888'
});
const { window } = dom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}

window.__CONFIG__ = Buffer.from(JSON.stringify(mockConfig)).toString('BASE64');
/* istanbul ignore next */
window.scroll = () => {};

global.window = window;
global.window.Date = {};
global.document = window.document;
global.HTMLElement = window.HTMLElement;
global.navigator = {
  userAgent: 'node.js',
};
global.FormData = window.FormData;

/* istanbul ignore next */
global.requestAnimationFrame = (callback) => setTimeout(callback, 0);

copyProps(window, global);
