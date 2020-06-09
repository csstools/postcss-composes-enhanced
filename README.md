# PostCSS Composes Enhanced [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS" width="90" height="90" align="right">][postcss]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

[PostCSS Composes Enhanced] lets you enhance the composes behavior in CSS Modules.

```pcss
.example {
  @composes no-margin from '@company/layout';
}

/* becomes */

.example {
  composes: no-margin from '../../node_modules/@company/layout/index.module.css';
}
```

## Usage

Add [PostCSS Composes Enhanced] to your project:

```bash
npm install postcss-composes-enhanced --save-dev
```

Use **PostCSS Composes Enhanced** to process your CSS:

```js
const composesEnhanced = require('postcss-composes-enhanced')

composesEnhanced.process(YOUR_CSS /*, processOptions, pluginOptions */)
```

Or use it as a [PostCSS] plugin:

```js
const postcss = require('postcss')
const composesEnhanced = require('postcss-composes-enhanced')

postcss([composesEnhanced(/* pluginOptions */)]).process(YOUR_CSS /*, processOptions */)
```

**PostCSS Composes Enhanced** runs in all Node environments, with special instructions for:

| [Node](INSTALL.md#node) | [PostCSS CLI](INSTALL.md#postcss-cli) | [Webpack](INSTALL.md#webpack) | [Create React App](INSTALL.md#create-react-app) | [Gulp](INSTALL.md#gulp) | [Grunt](INSTALL.md#grunt) |
| ----------------------- | ------------------------------------- | ----------------------------- | ----------------------------------------------- | ----------------------- | ------------------------- |


## Options

### resolveImports

The `resolveImports` option determines whether imports within `composes` declarations should be resolved.

### transformAtRules

The `transformAtRules` option determines whether `@composes` at-rules should be transformed into declarations.

## Additional Options

Additional options will be passed through into [`css-import-resolve`](https://github.com/csstools/css-import-resolve#options).

[cli-img]: https://img.shields.io/travis/csstools/postcss-composes-enhanced/master.svg
[cli-url]: https://travis-ci.org/csstools/postcss-composes-enhanced
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[npm-img]: https://img.shields.io/npm/v/postcss-composes-enhanced.svg
[npm-url]: https://www.npmjs.com/package/postcss-composes-enhanced
[postcss]: https://github.com/postcss/postcss
[postcss composes enhanced]: https://github.com/csstools/postcss-composes-enhanced
