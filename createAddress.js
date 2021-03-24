const bitcore = require('bitcore-lib');
const network = 'testnet';

const privateKey = new bitcore.PrivateKey(network);
const address = privateKey.toAddress();

console.log(privateKey.toString());
console.log(address.toString());
