// ライブラリを読み込んでインスタンス化
const explorers = require('bitcore-explorers');
// テストネットを選択する。
const network = 'testnet'
// 検索したいアドレス
const address = 'n2mPdAuoiKK8Tg2PKXeaohq5y6keA1BGdD';
// insightを利用する。
const insight = new explorers.Insight(network);

insight.getUnspentUtxos(address, (err, utxos) => {
  // アドレスが見つからなかった場合
  if (err) {
    console.log('UTXO processing error')
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
