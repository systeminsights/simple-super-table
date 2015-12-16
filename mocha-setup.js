const jsdom = require('jsdom');

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
global.navigator = global.window.navigator;

global.$ = require('jquery');
global.jQuery = require('jquery');

const chaiAsPromised = require('chai-as-promised');
global.chai = require('chai');
global.chai.use(chaiAsPromised);
global.should = chai.should();
global.expect = chai.expect;
global.sinon = require('sinon');

const sinonChai = require('sinon-chai');
global.chai.use(sinonChai);