const path = require('path');
const lessVarToCssVar = require('../src/index');

const CUR_DIR = path.resolve(__dirname);

lessVarToCssVar({
  inputPath: `${CUR_DIR}/variables.less`,
  outputPath: `${CUR_DIR}/variables-css.less`,
  scopeTag: ':root',
  header: "@import './variables.less';",
  //
  jsOutputPath: `${CUR_DIR}/variables.js`,
  jsVar: 'PAGE_COLOR',
  jsheader: "import React, { useEffect } from 'react';",
  //
  useRealValue: true, // Use real CSS values instead of the --a: @a; mapping
  // useRealValueFilterLessVar: '____IS_A_LESS_VAR____', // Replace the string of the less variable
});

lessVarToCssVar({
  inputPath: `${CUR_DIR}/page-variables.less`,
  outputPath: `${CUR_DIR}/page-variables-css.less`,
  scopeTag: ':root',
  // header: "@import './page-variables.less';",
  //
  jsOutputPath: `${CUR_DIR}/page-variables.js`,
  jsVar: 'PAGE_COLOR',
  // jsheader: "import React, { useEffect } from 'react';",
  //
  // useRealValue: true, // Use real CSS values instead of the --a: @a; mapping
  // useRealValueFilterLessVar: '____IS_A_LESS_VAR____', // Replace the string of the less variable
});
