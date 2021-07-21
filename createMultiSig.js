/**
 * マルチシグ対応アドレス生成Jsファイル
 */

// 必要なモジュールを読み込む
const bitcore = require('bitcore-lib');

// 公開鍵3つ
 var publicKeys = [
    '026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01',
    '02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9',
    '03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9'
];

// 署名を要求する数 
var requiredSignatures = 2;
// アドレス生成
var address = new bitcore.Address(publicKeys, requiredSignatures);
// アドレスを出力する。
console.log(address.toString());
// 詳細
console.log(address);