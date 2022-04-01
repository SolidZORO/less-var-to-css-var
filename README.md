# less-var-to-css-var

Convert Less Var To CSS Var

[![version][npm-img]][npm-url]
[![license][mit-img]][mit-url]
[![size][size-img]][size-url]
[![download][download-img]][download-url]

## Installation

```sh
yarn add less-var-to-css-var
```


## Usage


### for Node Cil

```bash
less-var-to-css-var -i '~/styles/variables.less' -o '~/styles/variables-css2.less' -t ':root' -h "@import '/src/styles/variables.less';"
```

### for Js


```js
const lessVarToCssVar = require('less-var-to-css-var');

lessVarToCssVar({
  inputPath: '~/styles/variables.less',
  outputPath: '~/styles/variables-css.less',
  scopeTag: ':root',
  header: "@import '/src/styles/variables.less';",
  //
  // supported since v1.3.0
  jsOutputPath: `${CUR_DIR}/variables.js`,
  jsVar: 'PAGE_COLOR',
  jsheader: "import React, { useEffect } from 'react';",
  //
  // supported since v1.3.0
  useRealValue: true, // Use real CSS values instead of the --a: @a; mapping
  useRealValueFilterLessVar: '____IS_A_LESS_VAR____', // Replace the string of the less variable
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

MIT © [Jason Feng][author-url]

<!-- badges -->

[author-url]: https://github.com/SolidZORO


[mit-img]: https://img.shields.io/npm/l/less-var-to-css-var.svg?style=flat&colorA=000000&colorB=000000

[mit-url]: ./LICENSE


[npm-img]: https://img.shields.io/npm/v/less-var-to-css-var?style=flat&colorA=000000&colorB=000000

[npm-url]: https://www.npmjs.com/package/less-var-to-css-var


[size-img]: https://img.shields.io/bundlephobia/minzip/less-var-to-css-var?label=bundle&style=flat&colorA=000000&colorB=000000

[size-url]: https://www.npmjs.com/package/less-var-to-css-var


[download-img]: https://img.shields.io/npm/dt/less-var-to-css-var.svg?style=flat&colorA=000000&colorB=000000

[download-url]: https://www.npmjs.com/package/less-var-to-css-var


[build-img]: https://github.com/SolidZORO/less-var-to-css-var/workflows/badge.svg

[build-url]: https://github.com/SolidZORO/less-var-to-css-var/actions
