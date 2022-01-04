const fs = require('fs');

// usage
// node index.js -i '~/Sites/nkk/nkk-admin/src/styles/variables.less' -o '~/Sites/nkk/nkk-admin/src/styles/variables-css2.less' -t ':root' -h "@import '/src/styles/variables.less';"

const lessVarToCssVar = (opts) => {
  let inputPath = undefined;
  let outputPath = undefined;
  let scopeTag = ':root';
  let header = '';

  // 没有传参进来，认为是 node cil 执行，读取 argv
  if (opts) {
    console.log('\n⚡️ less-var-to-css-var via JS\n');

    if (opts.inputPath) inputPath = opts.inputPath;
    if (opts.outputPath) outputPath = opts.outputPath;
    if (opts.scopeTag) scopeTag = opts.scopeTag;
    if (opts.header) header = opts.header;
  } else {
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
  const allVars = matchs.map((m) => {
    const mv = m.match(/^@(.*?):.*;/m);
    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    if (mv && mv[1]) return mv[1];
  });

  const HEADER = `${header}

${scopeTag} {
`;

  const FOOTER = `}
`;

  let CONTENT = '';

  allVars.forEach((v) => {
    // --screen-md: @screen-md;
    if (!v) return;

    CONTENT += `  --${v}: @${v};\n`;
  });

  fs.writeFileSync(outputPath, `${HEADER}${CONTENT}${FOOTER}`);

  console.log('   -', opts.outputPath, '\n');
};

//
//
//
//

module.exports = lessVarToCssVar;
