(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var copyJs = copyJs || function copyJs(text, callback) {
    var fakeEle = document.createElement("textarea");

    // Place in top-left corner of screen regardless of scroll position.
    fakeEle.style.position = 'fixed';
    fakeEle.style.top = 0;
    fakeEle.style.left = 0;

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    fakeEle.style.width = '1px';
    fakeEle.style.height = '1px';

    // We don't need padding, reducing the size if it does flash render.
    fakeEle.style.padding = 0;

    // Clean up any borders.
    fakeEle.style.border = 'none';
    fakeEle.style.outline = 'none';
    fakeEle.style.boxShadow = 'none';

    // Avoid flash of white box if rendered for any reason.
    fakeEle.style.background = 'transparent';

    // Text to copy
    fakeEle.value = text;

    document.body.appendChild(fakeEle);

    fakeEle.select();

    var error = null;
    try {
        var successful = document.execCommand('copy');
        error = successful ? false : true;
    } catch (err) {
        console.warn('Unable to copy.');
        error = true;
    }

    // Clean up
    document.body.removeChild(fakeEle);

    if (callback) callback(error);
    return !!error;
}

// export
if (window) window.copy = copyJs;
module.exports = copyJs;
},{}]},{},[1]);
