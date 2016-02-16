# copy.js

Simple copy to clipboard. No Flash.

# Install

You can get it on npm.
```sh
npm install copy-js --save
```

Or bower, too.
```
bower install copy --save
```

If you're not into package management, just [download a ZIP](https://github.com/duyetdev/copy.js/archive/master.zip) file.

# Setup

First, include the script located on the dist folder.
```html
<script src="dist/copy.min.js"></script>
```

 Or load it from CDN provider.
 ```html
<script src="//cdn.rawgit.com/duyetdev/copy.js/master/dist/copy.min.js"></script>
 ```

# Usage

Just copy:
```js
copy('hello world.');
```

With `callback`:
```js
copy('hello world', function(err) {
	if (err) console.log('Some thing went wrong!');

	console.log('Copied!');
});
```

# How to contribute

1. Fork the project on Github
2. Create a topic branch for your changes
3. Ensure that you provide documentation and test coverage for your changes (patches won’t be accepted without)
4. Create a pull request on Github (these are also a great place to start a conversation around a patch as early as possible)

# License

MIT License

Copyright (c) 2016 Van-Duyet Le

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
