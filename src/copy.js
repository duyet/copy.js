var copyJs = copyJs || function copyJs(text) {
    var fakeEle = document.createElement("fakeEle");

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

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.warn('Copying text command was ' + msg);
    } catch (err) {
        console.warn('Unable to copy.');
    }

    document.body.removeChild(fakeEle);
}

(function() {
    // Establish the root object, `window` in the browser, or `global` on the server.
    var root = this;

    var isNode = false;

    // Export the Underscore object for **CommonJS**, with backwards-compatibility
    // for the old `require()` API. If we're not in CommonJS, add `copy` to the
    // global object.
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = copyJs;
        root.copy = copyJs;
        isNode = true;
    } else {
        root.copy = copyJs;
    }
})();
