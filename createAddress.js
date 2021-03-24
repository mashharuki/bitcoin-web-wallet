// bitcoin-libライブラリを読み込む 
const bitcore = require('bitcore-lib');
// テストネットを指定する。(本番はメインネット)
const network = 'testnet';
// const network = 'mainnet'

// 秘密鍵生成
const privateKey = new bitcore.PrivateKey(network);
// 秘密鍵からアドレスを生成
const address = privateKey.toAddress();
// コンソール上に出力する。
console.log(privateKey.toString());
console.log(address.toString());
