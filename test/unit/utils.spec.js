'use strict';
var utils = require('../../js/utils');

describe('utils.js api', function () {

    it('must implement noop', function() {
        assert.isFunction(utils.noop);
    });

    it('must implement createIframe', function() {
        var url = 'http://hello.com/';
        assert.isFunction(utils.createIframe, 'must be a function');
        assert.instanceOf(utils.createIframe(document.createElement('div'), url), HTMLElement, 'must return a HTMLElement');
        assert.equal(utils.createIframe(document.createElement('div'), url).src, url, 'must return a HTMLElement with the src used in the arguments');

        let parentElement = document.createElement('div');
        assert.equal(utils.createIframe(parentElement, url).parentElement, parentElement, 'must return a HTMLElement that is a child of the element used in the arguments');
    });

    describe('simpleTemplate', function () {
        it('must implement', function() {
            assert.isFunction(utils.simpleTemplate, 'must be a function');
        });

        it('must handle similar variables', function () {
            var template = 'hello {{hello}}, {{hello1}}';
            assert(utils.simpleTemplate(template, {hello1: 'hola', hello1: 'ola'}), 'hello, hola, ola');
        });

        it('must handle repeated variables', function () {
            var template = 'hello {{hello}}, {{hello}} {{hello1}}';
            assert(utils.simpleTemplate(template, {hello1: 'hola', hello1: 'ola'}), 'hello, hola, hola, ola');
        });
    });

    describe('setIframeContent', function () {
        var frame, el;

        beforeEach(function () {
            el = document.createElement('div');
            frame = document.createElement('iframe');
            document.body.appendChild(el);
            document.body.appendChild(frame);
        });

        afterEach(function () {
            document.body.removeChild(el);
            document.body.removeChild(frame);
        });

        it('must implement setIframeContent', function () {
            assert(utils.setIframeContent, 'must be a function');
        });

        it('must return if was able or not to set the content', function () {
            var content = "<b>it's alive!!!</b>";
            assert(!utils.setIframeContent(document.createElement('div'), content), 'must return false when the element is not in dom');
            assert(!utils.setIframeContent(document.createElement('iframe'), content), 'must return false when the element is not in dom');
            assert(!utils.setIframeContent(el, content), 'must return false when the element is not an iframe');
            assert(utils.setIframeContent(frame, content), 'must return true');
            assert.match(frame.contentWindow.document.body.innerHTML, new RegExp(content), 'iframe content must match');
        });
    });

    it('must implement constant', function () {
        assert.isFunction(utils.constant, 'must be a function');
        assert.isFunction(utils.constant('hello'), 'must return a function')
    });

    it('must implement unique', function () {
        assert.isFunction(utils.unique, 'must be a function');
        assert.isFunction(utils.unique('hello'), 'must return a function');
        assert.match(utils.unique('hello')(), /hello_/, 'must return a string with prefix');
        assert.match(utils.unique('hello')(), /hello_/, 'must return a string with prefix');
    });

    describe('extend', function () {

        it('must implement', function () {
            assert.isFunction(utils.extend, 'must be a function');
        });

        it('must add new properties and it\'s value', function () {
            var obj1 = {test: 'test', cool: 'cool'};
            var obj2 = {};
            utils.extend(obj2, obj1);

            assert.deepEqual(obj2, obj1, 'should change the object to extend');
            assert.deepEqual(utils.extend({}, obj1), obj1, 'should return the object that was extend');
        });

        it('must override properties values if exist in the original', function () {
            var obj1 = {test: 'test', cool: 'cool'};
            var obj2 = {test: 'test1'};

            assert.deepEqual(utils.extend(obj2, obj1), obj1);
        });

        it('must only do shallow extend', function () {
            var obj1 = {test: ['hello', 'hello1'], test1: {someobject: 'value'}};
            var obj2 = {};

            utils.extend(obj2, obj1);
            assert.deepEqual(obj2, obj1);

            assert.equal(obj2.test, obj1.test);
            assert.equal(obj2.test1, obj1.test1);
        });

    });

});

