# less-var-to-css-var

<!--
[![Build Status][build-img]][build-url]
-->
[![NPM version][npm-img]][npm-url]
[![License: MIT][mit-img]][mit-url]

🚧 WIP（持续优化中……）


## Installation

```sh
yarn add less-var-to-css-var
```


## Usage

```bash
less-var-to-css-var -i '~/Sites/nkk/nkk-admin/src/styles/variables.less' -o '~/Sites/nkk/nkk-admin/src/styles/variables-css2.less' -t ':root' -h "@import '/src/styles/variables.less';"
```

Input .less

```less
// variables.less (input)
@import '~antd/lib/style/themes/default.less';

@THEME--DARK: ~'theme-dark';
@font-size-base: 14px;
```

Output .less

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
