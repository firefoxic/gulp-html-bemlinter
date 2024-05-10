# gulp-html-bemlinter

[![License: MIT][license-image]][license-url]
[![Changelog][changelog-image]][changelog-url]
[![NPM version][npm-image]][npm-url]
[![Test Status][test-image]][test-url]

Gulp plugin for html linting using [BEM methodology](https://en.bem.info/methodology).

<picture>
	<source srcset="https://raw.githubusercontent.com/firefoxic/gulp-html-bemlinter/main/example/dark.webp" width="1180" height="500" media="(prefers-color-scheme: dark)">
	<img src="https://raw.githubusercontent.com/firefoxic/gulp-html-bemlinter/main/example/light.webp" width="1180" height="500" alt="Example of html tree view output to the terminal indicating inconsistencies with the BEM methodology.">
</picture>

## Installation

```shell
pnpm add -D gulp gulp-html-bemlinter
```

## Usage

Add the following to your `gulpfile.js`:

```js
import bemlinter from "gulp-html-bemlinter"
import { src } from "gulp"

export function lintBemMarkup () {
	return src("dist/**/*.html")
		.pipe(bemlinter())
}
```

And then run this task:

```shell
pnpm exec gulp lintBemMarkup
```

[license-url]: https://github.com/firefoxic/gulp-html-bemlinter/blob/main/LICENSE.md
[license-image]: https://img.shields.io/badge/License-MIT-limegreen.svg

[changelog-url]: https://github.com/firefoxic/gulp-html-bemlinter/blob/main/CHANGELOG.md
[changelog-image]: https://img.shields.io/badge/CHANGELOG-md-limegreen

[npm-url]: https://npmjs.com/package/gulp-html-bemlinter
[npm-image]: https://badge.fury.io/js/gulp-html-bemlinter.svg

[test-url]: https://github.com/firefoxic/gulp-html-bemlinter/actions
[test-image]: https://github.com/firefoxic/gulp-html-bemlinter/actions/workflows/test.yml/badge.svg?branch=main
