# watch-file-change-and-run-callback-webpack-plugin

<!--
[![Build Status][build-img]][build-url]
-->
[![NPM version][npm-img]][npm-url]
[![License: MIT][mit-img]][mit-url]

🚧 WIP（持续优化中……）
 


## Installation

```sh
yarn add watch-file-change-and-run-callback-webpack-plugin
```


## Usage

```js
new WatchFileAndRunCallbackWebpackPlugin({
  matchs: [
    {
      filePath: `${SRC_DIR}/styles/1.less`,
      callback: () => console.log('1'),
    },
    {
      filePath: `${SRC_DIR}/styles/2.less`,
      callback: () => console.log('2'),
    },
  ],
})
```


## License

© [MIT][mit-url]

<!-- badges -->

[mit-img]: https://img.shields.io/badge/License-MIT-blue.svg

[mit-url]: ./LICENSE

[npm-img]: https://img.shields.io/npm/v/watch-file-change-and-run-callback-webpack-plugin.svg

[npm-url]: https://www.npmjs.com/package/watch-file-change-and-run-callback-webpack-plugin

[build-img]: https://github.com/SolidZORO/watch-file-change-and-run-callback-webpack-plugin/workflows/badge.svg

[build-url]: https://github.com/SolidZORO/watch-file-change-and-run-callback-webpack-plugin/actions
