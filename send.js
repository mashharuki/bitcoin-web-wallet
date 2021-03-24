// fsライブラリをインスタンス化
var fs = require('fs');
// bitcoreライブラリをインスタンス化する。
const bitcore = require('bitcore-lib');
const explorers = require('bitcore-explorers');
// ネットワークを指定する。 (本番はメインネットを使用する。)
const network = 'testnet';
// const network = 'mainnet';
// addressファイルから秘密鍵要素を取得する。
const privatekey = fs.readFileSync( "address", "UTF-8").split( '\n' )[0];
const privateKey = new bitcore.PrivateKey(privatekey);
// 送信先アドレスを設定する。
const sendAddress = 'mq8aTnusvudJBr2A4iNmCpQkWS8SQuALGD';
// 送信元アドレスをaddressファイルから取得する。
const changeAddress = fs.readFileSync( "address", "UTF-8").split( '\n' )[1];
// 送金額を設定する。
const sendAmout = Math.floor(parseFloat("0.0001") * 100000000);
// 送金手数料を設定する。
const fee = parseFloat(1000);
// insightを利用する。
const insight = new explorers.Insight(network);
const Transaction = bitcore.Transaction;
// 残高(UTXO)を調べる。
insight.getUnspentUtxos(changeAddress, (err, utxos) => {
  if (err) {
    console.log('Bitcoin network connection error');
  } else {
    // トランザクションを作成
    // 手数料・残高・送信先アドレス・送金額・送信元アドレス・秘密鍵を使って作成する。
    const transaction = new Transaction().fee(fee).from(utxos).to(sendAddress, sendAmout).change(changeAddress).sign(privateKey);
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
