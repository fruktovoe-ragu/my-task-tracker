const fs = require('fs');
const path = require('path');

const npmrcContent = `//npm.pkg.github.com/:_authToken=${process.env.NPM_TOKEN}\n@fruktovoe-ragu:registry=https://npm.pkg.github.com`;
console.log(333333333333)

fs.writeFileSync(path.resolve(__dirname, '.npmrc'), npmrcContent);
