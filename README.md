# gulp-html-bemlinter

[![NPM version][npm-image]][npm-url] [![Build status][test-image]][test-url]

Gulp plugin for linting a bem html

## Usage

First, install `gulp-html-bemlinter` as a development dependency:

```bash
npm install --save-dev gulp-html-bemlinter
```

Then, add it to your `gulpfile.js`:

## Simple example

```js
import gulp from "gulp" 
import bemlinter from "gulp-html-bemlinter"

function lintBemMarkup () {
	return gulp.src("pages/**/*.html")
		.pipe(bemlinter())
}
```

## An example of outputting results to a console

### Success

![success-result-example](https://lh3.googleusercontent.com/CI__G-pJAk9uyxFKABAVeePzTYCmBOgDkRGwgnE1xqd0dZNjraxTy0BKpDJ4iI4vLUCsugXCnWTWFqKtXT_irGa-ZGlSdX_yMyRzvwx7Fb4IWPeRvBamuOq-LuLjvA8ZVLNsHvE45Q=w1157-h32-no)

### Error

![error-result-example](https://lh3.googleusercontent.com/aw2V-r8uRt25GeR3NqefAVqhomPef7z-j7zv5-vTeUphd4Rhfwo60J05qvMRMO5faHGVJOeGuWRFLOim0krO-dx2amtn7kHSXUMrdsxBIdyh9QZ0UPJ75XbKsxrz5ROckhl2dh3oAw=w1227-h375-no)

[test-url]: https://github.com/firefoxic/gulp-html-bemlinter/actions
[test-image]: https://github.com/firefoxic/gulp-html-bemlinter/actions/workflows/test.yml/badge.svg?branch=main

[npm-url]: https://npmjs.org/package/gulp-html-bemlinter
[npm-image]: https://badge.fury.io/js/gulp-html-bemlinter.svg
