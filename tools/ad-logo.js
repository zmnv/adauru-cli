const CS = require('../zmnv/zmnv-colorizer');
const PACKAGE = require('../package.json');

module.exports = `
  ${CS('     ▄▀', 95)}              
  ${CS('█▀▀▀█▀█', 95)}              
  ${CS(' ▀▄░▄▀ ', 95)}              
  ${CS('   █   ', 95)}   ${CS('Adauru Core / Cli', 96)}
  ${CS(' ▄▄█▄▄ ', 95)}   ${CS(PACKAGE.version, 90)}     
`;
