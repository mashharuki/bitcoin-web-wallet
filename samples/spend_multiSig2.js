/**
 * マルチシグウォレットからの署名処理コード(別々に署名)
 */

// 必要なモジュールをインポートする。
const bitcore = require('bitcore-lib');

// 秘密鍵を用意する。 
var privateKey1 = new bitcore.PrivateKey('91avARGdfge8E4tZfYLoxeJ5sGBdNJQH4kvjJoQFacbgwmaKkrx');
var privateKey2 = new bitcore.PrivateKey('91avARGdfge8E4tZfYLoxeJ5sGBdNJQH4kvjJoQFacbgww7vXtT');
// 公開鍵をそれぞれ用意する。
var publicKey1 = privateKey1.publicKey;
var publicKey2 = privateKey2.publicKey;
// 公開鍵を配列に格納する。
var publicKeys = [
    publicKey1,
    publicKey2
];
// 署名を要求する数 
var requiredSignatures = 2;
// マルチシグウォレットアドレスを生成(2-of-2)
var address = new bitcore.Address(publicKeys, requiredSignatures);
// スクリプトを生成
var script = new bitcore.Script(address).toHex();
// UTXOを生成
var utxo = {
    "txId" : "153068cdd81b73ec9d8dcce27f2c77ddda12dee3db424bff5cafdbe9f01c1756",
    "outputIndex" : 0,
    "address" : address.toString(),
    "script" : script,
    "satoshis" : 20000
};

// スクリプト出力
console.log('スクリプト：', new bitcore.Script(address).toString());
// 1つ目のトランザクションを生成する。
var transaction = new bitcore.Transaction()
    .from(utxo, publicKeys, 2)
    .to('mtoKs9V381UAhUia3d7Vb9GNak8Qvmcsme', 20000);

// トランザクション出力(署名前)
console.log('トランザクション値(署名前)：', transaction.toString());
// 1つ目の秘密鍵による署名実行
transaction.sign(privateKey1);
// トランザクション出力(署名後)
console.log('トランザクション値(1つ目の秘密鍵署名後)：',transaction.toString());
// 2つ目の秘密鍵による署名実行
transaction.sign(privateKey2);
// トランザクション出力(署名後)
console.log('トランザクション値(2つ目の秘密鍵署名後)：',transaction.toString());
