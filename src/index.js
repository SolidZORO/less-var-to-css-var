#!/usr/bin/env node
const fs = require('fs');

const isExecOnCLI = require.main === module;

// usage
// node index.js -i '~/styles/variables.less' -o '~/styles/variables-css2.less' -t ':root' -h "@import '/src/styles/variables.less';"

const lessVarToCssVar = (opts) => {
  let inputPath = undefined;
  let outputPath = undefined;
  let scopeTag = ':root';
  let header = '';

  let jsOutputPath = undefined;
  let jsVar = 'COLOR';
  let jsheader = '';

  // 没有传参进来，认为是 node cil 执行，读取 argv
  if (!isExecOnCLI && opts) {
    console.log('\n⚡️ less-var-to-css-var via JS\n');

    if (opts.inputPath) inputPath = opts.inputPath;
    if (opts.outputPath) outputPath = opts.outputPath;

    if (opts.scopeTag) scopeTag = opts.scopeTag;
    if (opts.header) header = opts.header;

    if (opts.jsOutputPath) jsOutputPath = opts.jsOutputPath;
    if (opts.jsVar) jsVar = opts.jsVar;
    if (opts.jsheader) jsheader = opts.jsheader;
  }

  if (isExecOnCLI) {
    console.log('\n⚡️ less-var-to-css-var via CIL\n');

    process.argv.forEach((v, i, arr) => {
      if (i < 2) return;

      // 找到命令名称，那下一个一定是值
      if (v === '-i' && arr[i + 1]) inputPath = arr[i + 1];
      if (v === '-o' && arr[i + 1]) outputPath = arr[i + 1];
      if (v === '-t' && arr[i + 1]) scopeTag = arr[i + 1];
      if (v === '-h' && arr[i + 1]) header = arr[i + 1];
    });
  }

  if (!inputPath || !outputPath || !scopeTag) {
    console.log(''.padEnd(32, '-'));
    console.log('\n⚠️  Missing Argv!\n');
    console.log(''.padEnd(32, '-'));
    return;
  }

  // Avoid too long formatting
  const vars = fs.readFileSync(inputPath, 'utf-8').replace(/,\n/g, ',');

  const matchs = vars.match(/^@.*/gm);

  // eslint-disable-next-line array-callback-return,consistent-return
  const allCssVars = matchs.map((m) => {
    const mv = m.match(/^@(.*?)\s?:\s?(.*);/m);
    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    if (mv && mv[1]) {
      return {
        key: mv[1] || '',
        value: mv[2] || '',
      };
    }
  });

  //
  // output CSS
  if (outputPath) {
    // KEEP FORMAT ------------
    const CSS_HEADER = `${header}

${scopeTag} {
`;

    const CSS_FOOTER = `}
`;

    // KEEP FORMAT ------------
    let CSS_CONTENT = '';

    allCssVars.forEach((item) => {
      // --screen-md: @screen-md;
      if (!item?.key) return;

      let val = item.key;

      // Use real CSS values instead of the --a: @a; mapping
      if (opts.useRealValue) {
        val = item.value;
      }

      // Replace the string of the less variable
      if (opts.useRealValue && opts.useRealValueFilterLessVar) {
        val = /[@|~]/.test(item.value)
          ? opts.useRealValueFilterLessVar
          : item.value;
      }

      CSS_CONTENT += `  --${item.key}: ${val};\n`;
    });

    // output CSS
    fs.writeFileSync(outputPath, `${CSS_HEADER}${CSS_CONTENT}${CSS_FOOTER}`);
  }

  //
  // output JS
  if (jsOutputPath) {
    // KEEP FORMAT ------------
    let JS_HEADER = `export const ${jsVar} = {
`;

    // KEEP FORMAT ------------
    if (jsheader) {
      JS_HEADER = `${jsheader}

${JS_HEADER}`;
    }

    const JS_FOOTER = `};
`;

    // KEEP FORMAT ------------
    let JS_CONTENT = '';

    allCssVars.forEach((item) => {
      // --screen-md: @screen-md;
      if (!item?.key) return;

      const val = /[@|~]/.test(item.value)
        ? `${opts.useRealValueFilterLessVar}`
        : item.value;

      JS_CONTENT += `  '--${item.key}': ${
        // If there is a space ` `, use ` ` to enclose it
        val.includes(' ') ? `\`${val}\`` : `\'${val}\'`
      },\n`;
    });

    fs.writeFileSync(jsOutputPath, `${JS_HEADER}${JS_CONTENT}${JS_FOOTER}`);
  }

  console.log('   -', outputPath, '\n');
};

//
//
//
//
if (isExecOnCLI) lessVarToCssVar(); // for CIL
module.exports = lessVarToCssVar;
