const lessVarToCssVar = require('./index');

lessVarToCssVar({
  inputPath: '~/Sites/nkk/nkk-admin/src/styles/variables.less',
  outputPath: '~/Sites/nkk/nkk-admin/src/styles/variables-css.less',
  scopeTag: ':root',
  header: "@import '/src/styles/variables.less';",
});
