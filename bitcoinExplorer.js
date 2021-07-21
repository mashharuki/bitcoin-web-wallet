/**
 * ビットコインアドレスを検索するためのJsファイル
 */

// ライブラリを読み込んでインスタンス化
var explorers = require('bitcore-explorers');
// テストネットを選択する。
const network = 'testnet';
// 検索したいアドレス
const address = 'mqH6a8Ykc4iPJwp8jR7mnskWbG9i8rwk2D';
// insightを利用する。
var insight = new explorers.Insight(network);

insight.getUnspentUtxos(address, (err, utxos) => {
  // アドレスが見つからなかった場合
  if (err) {
    console.log(err);
    console.log('UTXO processing error');
    return err;
  } else {
    // 残高の表示設定
    let balance = utxos.map((v) => {
      return {
        // トランザクションハッシュID
        txid: v.txId,
        // 前回の出力の何番目を使用するか
        vout: v.outputIndex,
        // 残高をsatoshi単位で表示する。
        satoshi: v.satoshis,
        // 残高をBTC単位で表示する。
        btc: v.satoshis * 1e-8,
      }
    })
    // コンソールに出力する。
    console.log(JSON.stringify(balance));
  }
});
