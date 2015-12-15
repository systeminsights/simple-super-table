const jsdom = require('jsdom');

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = window.navigator;

global.$ = require('jquery');
global.jQuery = require('jquery');

const chai = require('chai');
global.expect = chai.expect;
global.sinon = require('sinon');
global.expectAndCatch = function(fn, done) {
  try {
    fn();
    done();
  } catch(error) {
    done(error);
  }
};

const sinonChai = require('sinon-chai');
chai.use(sinonChai);
