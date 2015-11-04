"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _instanceof(left, right) { if (right != null && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

/**
 * define tuple
 *
 * (a,(b,c)) == ((a,b),c) === (a,b,c)
 */

var Tuple = function Tuple() {
    this._list = [];
};

Tuple.prototype = {
    constructor: Tuple,
    // (a, b) + (c, d) = (a, b, c, d)
    append: function append() {
        for (var _len = arguments.length, y = Array(_len), _key = 0; _key < _len; _key++) {
            y[_key] = arguments[_key];
        }

        for (var i = 0; i < y.length; i++) {
            var item = wrapTuple(y[i]);
            this.setList(this.getList().concat(item.getList()));
        }
    },
    prepend: function prepend() {
        for (var _len2 = arguments.length, y = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            y[_key2] = arguments[_key2];
        }

        for (var i = y.length - 1; i >= 0; i--) {
            var item = wrapTuple(y[i]);
            this.setList(item.getList().concat(this.getList()));
        }
    },
    getList: function getList() {
        return this._list;
    },
    setList: function setList(list) {
        if (!isArray(list)) {
            throw new TypeError("Expect array.");
        }
        this._list = list;
    }
};

var isArray = function isArray(v) {
    return v && (typeof v === "undefined" ? "undefined" : _typeof(v)) === "object" && typeof v.length === "number";
};

var wrapTuple = function wrapTuple(v) {
    if (_instanceof(v, Tuple)) return v;
    var tuple = new Tuple();
    tuple.setList([v]);
    return tuple;
};

/**
 * ((x, y) , z) => [x, y, z]
 */
Tuple.unpack = function () {
    var list = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

    var params = [];
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        if (_instanceof(item, Tuple)) {
            params = params.concat(item.getList());
        } else {
            params.push(item);
        }
    }
    return params;
};

Tuple.wrapTuple = wrapTuple;

Tuple.getList = function (v) {
    if (_instanceof(v, Tuple)) return v.getList();
    return [v];
};

exports.default = Tuple;