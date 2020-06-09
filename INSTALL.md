# Installing PostCSS Composes Enhanced

[PostCSS Composes Enhanced] runs in all Node environments, with special instructions for:

| [Node](#node) | [PostCSS CLI](#postcss-cli) | [Webpack](#webpack) | [Create React App](#create-react-app) | [Gulp](#gulp) | [Grunt](#grunt) |
| --- | --- | --- | --- | --- | --- |

## Node

Add [PostCSS Composes Enhanced] to your project:

```bash
npm install postcss-composes-enhanced --save-dev
```

Use **PostCSS Composes Enhanced** to process your CSS:

```js
const composesEnhanced = require('postcss-composes-enhanced');

composesEnhanced.process(YOUR_CSS /*, processOptions, pluginOptions */);
```

Or use it as a [PostCSS] plugin:

```js
const postcss = require('postcss');
const composesEnhanced = require('postcss-composes-enhanced');

postcss([
  composesEnhanced(/* pluginOptions */)
]).process(YOUR_CSS /*, processOptions */);
```

## PostCSS CLI

Add [PostCSS CLI] to your project:

```bash
npm install postcss-cli --save-dev
```

Use **PostCSS Composes Enhanced** in your `postcss.config.js` configuration file:

```js
const composesEnhanced = require('postcss-composes-enhanced');

module.exports = {
  plugins: [
    composesEnhanced(/* pluginOptions */)
  ]
}
```

## Webpack

Add [PostCSS Loader] to your project:

```bash
npm install postcss-loader --save-dev
```

Use **PostCSS Composes Enhanced** in your Webpack configuration:

```js
const composesEnhanced = require('postcss-composes-enhanced');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader', options: {
            ident: 'postcss',
            plugins: () => [
              composesEnhanced(/* pluginOptions */)
            ]
          } }
        ]
      }
    ]
  }
}
```

## Create React App

Add [React App Rewired] and [React App Rewire PostCSS] to your project:

```bash
npm install react-app-rewired react-app-rewire-postcss --save-dev
```

Use **React App Rewire PostCSS** and **PostCSS Composes Enhanced** in your
`config-overrides.js` file:

```js
const reactAppRewirePostcss = require('react-app-rewire-postcss');
const composesEnhanced = require('postcss-composes-enhanced');

module.exports = config => reactAppRewirePostcss(config, {
  plugins: () => [
    composesEnhanced(/* pluginOptions */)
  ]
});
```

## Gulp

Add [Gulp PostCSS] to your project:

```bash
npm install gulp-postcss --save-dev
```

Use **PostCSS Composes Enhanced** in your Gulpfile:

```js
const postcss = require('gulp-postcss');
const composesEnhanced = require('postcss-composes-enhanced');

gulp.task('css', () => gulp.src('./src/*.css').pipe(
  postcss([
    composesEnhanced(/* pluginOptions */)
  ])
).pipe(
  gulp.dest('.')
));
```

## Grunt

Add [Grunt PostCSS] to your project:

```bash
npm install grunt-postcss --save-dev
```

Use **PostCSS Composes Enhanced** in your Gruntfile:

```js
const composesEnhanced = require('postcss-composes-enhanced');

grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
  postcss: {
    options: {
      use: [
       composesEnhanced(/* pluginOptions */)
      ]
    },
    dist: {
      src: '*.css'
    }
  }
});
```

[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss
[PostCSS CLI]: https://github.com/postcss/postcss-cli
[PostCSS Loader]: https://github.com/postcss/postcss-loader
[PostCSS Composes Enhanced]: https://github.com/csstools/postcss-composes-enhanced
[React App Rewire PostCSS]: https://github.com/csstools/react-app-rewire-postcss
[React App Rewired]: https://github.com/timarney/react-app-rewired
