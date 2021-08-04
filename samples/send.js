/**
 * 送金処理を記載したJsファイル
 */

// fsライブラリをインスタンス化
var fs = require('fs');
// bitcoreライブラリをインスタンス化する。
const bitcore = require('bitcore-lib');
const explorers = require('bitcore-explorers');
// ネットワークを指定する。 (本番はメインネットを使用する。)
const network = 'testnet';
// const network = 'mainnet';
// addressファイルから秘密鍵要素を取得する。
//var prePrivateKey = fs.readFileSync("address", "UTF-8").split( '\n' )[0];
// BASE58に変換する。
//var codedString = Base58.encode(new Buffer(prePrivateKey));
// 秘密鍵取得
const privateKey = new bitcore.PrivateKey('b7c3a6731b94caf1ee05bc7fbecc825ab13ba93dab31cdb012fb6bd65996204f');
// 送信先アドレスを設定する。
const sendAddress = 'mq8aTnusvudJBr2A4iNmCpQkWS8SQuALGD';
// 送信元アドレスをaddressファイルから取得する。(お釣り送金先アドレス)
const changeAddress = 'mqH6a8Ykc4iPJwp8jR7mnskWbG9i8rwk2D';
// 送金額を設定する。
const sendAmout = Math.floor(parseFloat("0.000001") * 100000000);
// 送金手数料を設定する。
const fee = parseFloat(1000);
// insightを利用する。
const insight = new explorers.Insight(network);
const Transaction = bitcore.Transaction;
// 残高(UTXO)を調べる。
insight.getUnspentUtxos(changeAddress, (err, utxos) => {
  if (err) {
    console.log('ビットコイン接続エラー');
    console.log(err.toJSON());
  } else {
    // utxoを出力する。
    // console.log(utxos);
    // スクリプトを生成する。
    var script = new bitcore.Script('mqH6a8Ykc4iPJwp8jR7mnskWbG9i8rwk2D').toHex();
    console.log('スプリクト：', script);
    // utxoからトランザクションハッシュ値、アウトプットトランザクション数、アドレス、スクリプト、金額情報を取得する。
    var utxo = {
      "txId" : utxos[0].txid,
      "outputIndex" : utxos[0].vout,
      "address" : sendAddress.toString(),
      "script" :  "",
      "satoshis" : utxos[0].value
    };
    console.log(utxo);
    // トランザクションを作成
    // 手数料・残高・送信先アドレス・送金額・送信元アドレス・秘密鍵を使って作成する。
    const transaction = new Transaction().fee(fee).from(utxo).to(sendAddress, sendAmout).change(changeAddress).sign(privateKey);
    // JSON形式でトランザクションを出力する。
    console.log("トランザクションデータ：");
    console.log(transaction.toJSON());
    // トランザクションをブロックチェーン上にブロードキャストする。
    insight.broadcast(transaction, (err, returnedTxId) => {
      	if (err) {
          // エラーを出力する。
        	console.log(err);
     	} else {
          // トランザクションIDをコンソール上に出力する。 
        	console.log(returnedTxId);
      	}
    });
  }
});
