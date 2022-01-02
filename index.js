const fs = require('fs');

// usage
// node index.js -i '~/Sites/nkk/nkk-admin/src/styles/variables.less' -o '~/Sites/nkk/nkk-admin/src/styles/variables-css2.less' -t ':root' -h "@import '/src/styles/variables.less';"

let argvIn = undefined;
let argvOut = undefined;
let argvTag = ':root';
let argvHeader = '';

process.argv.forEach((v, i, arr) => {
  if (i < 2) return;

  // 找到命令名称，那下一个一定是值
  if (v === '-i' && arr[i + 1]) argvIn = arr[i + 1];
  if (v === '-o' && arr[i + 1]) argvOut = arr[i + 1];
  if (v === '-t' && arr[i + 1]) argvTag = arr[i + 1];
  if (v === '-h' && arr[i + 1]) argvHeader = arr[i + 1];
});

if (!argvIn || !argvOut || !argvTag) {
  console.log('⚠️ Missing Argv!');
  return;
}

// Avoid too long formatting
const vars = fs.readFileSync(argvIn, 'utf-8').replace(/,\n/g, ',');

const matchs = vars.match(/^@.*/gm);

// eslint-disable-next-line array-callback-return,consistent-return
const allVars = matchs.map((m) => {
  const mv = m.match(/^@(.*?):.*;/m);
  // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
  if (mv && mv[1]) return mv[1];
});

const HEADER = `${argvHeader || "@import '/src/styles/variables.less';"}

${argvTag || ':root'} {
`;

const FOOTER = `}
`;

let CONTENT = '';

allVars.forEach((v) => {
  // --screen-md: @screen-md;
  if (!v) return;

  CONTENT += `  --${v}: @${v};\n`;
});

fs.writeFileSync(argvOut, `${HEADER}${CONTENT}${FOOTER}`);
