# less-var-to-css-var

<!--
[![Build Status][build-img]][build-url]
-->
[![NPM version][npm-img]][npm-url]
[![License: MIT][mit-img]][mit-url]


## Installation

```sh
yarn add less-var-to-css-var
```


## Usage


### for Node Cil

```bash
less-var-to-css-var -i '~/Sites/nkk/nkk-admin/src/styles/variables.less' -o '~/Sites/nkk/nkk-admin/src/styles/variables-css2.less' -t ':root' -h "@import '/src/styles/variables.less';"
```

### for Js


```js
const lessVarToCssVar = require('./index');

lessVarToCssVar({
  inputPath: '~/Sites/nkk/nkk-admin/src/styles/variables.less',
  outputPath: '~/Sites/nkk/nkk-admin/src/styles/variables-css.less',
  scopeTag: ':root',
  header: "@import '/src/styles/variables.less';",
});

```

## Result

Input

```less
// variables.less (input)
@import '~antd/lib/style/themes/default.less';

@THEME--DARK: ~'theme-dark';
@font-size-base: 14px;
```

Output

```less
// variables-css.less (output)
@import '/src/styles/variables.less';

:root {
  --THEME--DARK: @THEME--DARK;
  --font-size-base: @font-size-base;
}
```


## License

© [MIT][mit-url]

<!-- badges -->

[mit-img]: https://img.shields.io/badge/License-MIT-blue.svg

[mit-url]: ./LICENSE

[npm-img]: https://img.shields.io/npm/v/less-var-to-css-var.svg

[npm-url]: https://www.npmjs.com/package/less-var-to-css-var

[build-img]: https://github.com/SolidZORO/less-var-to-css-var/workflows/badge.svg

[build-url]: https://github.com/SolidZORO/less-var-to-css-var/actions
