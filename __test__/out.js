const path = require('path');
const lessVarToCssVar = require('../src/index');

const CUR_DIR = path.resolve(__dirname);

lessVarToCssVar({
  inputPath: `${CUR_DIR}/variables.less`,
  outputPath: `${CUR_DIR}/variables-css.less`,
  scopeTag: ':root',
  header: "@import './variables.less';",
  //
  scopeTagDark: '.comp-wrapper--alwaysDarkMode,\n' +
    ':global(.@{THEME--DARK}) .comp-wrapper',
  removeAllRootDarkVars: true,
  removeAllDarkDarkSuffix: true,
  //
  jsOutputPath: `${CUR_DIR}/variables.js`,
  jsVar: 'CSS_VARS',
  jsheader: "import React, { useEffect } from 'react';",
  //
  useRealValue: true, // Use real CSS values instead of the --a: @a; mapping
  useRealValueFilterLessVar: '____IS_A_LESS_VAR____', // Replace the string of the less variable
});

lessVarToCssVar({
  inputPath: `${CUR_DIR}/page-variables.less`,
  outputPath: `${CUR_DIR}/page-variables-css.less`,
  scopeTag: ':root',
  // header: "@import './page-variables.less';",
  //
  jsOutputPath: `${CUR_DIR}/page-variables.js`,
  jsVar: 'PAGE_CSS_VARS',
  // jsheader: "import React, { useEffect } from 'react';",
  //
  useRealValue: true, // Use real CSS values instead of the --a: @a; mapping
  useRealValueFilterLessVar: '____IS_A_LESS_VAR____', // Replace the string of the less variable
});

lessVarToCssVar({
  inputPath: `${CUR_DIR}/kv-variables.less`,
  outputPath: `${CUR_DIR}/kv-variables-css.less`,
  scopeTag: ':root',
  // header: "@import './kv-variables.less';",
  //
  jsOutputPath: `${CUR_DIR}/kv-variables.js`,
  jsVar: 'KV_CSS_VARS',
  // jsheader: "import React, { useEffect } from 'react';",
  //
  // Use Key Value Output JS,
  //
  // e.g.
  // '--page-reading-bg-color': {
  //   key: '--page-reading-bg-color',
  //   value: '#3b5961',
  // },
  jsValueObjectKv: true,
  //
  useRealValue: true, // Use real CSS values instead of the --a: @a; mapping
  useRealValueFilterLessVar: '____IS_A_LESS_VAR____', // Replace the string of the less variable
});
