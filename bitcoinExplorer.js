const explorers = require('bitcore-explorers');

const network = 'testnet'
const address = 'n2mPdAuoiKK8Tg2PKXeaohq5y6keA1BGdD';
const insight = new explorers.Insight(network);

insight.getUnspentUtxos(address, (err, utxos) => {
  if (err) {
    console.log('UTXO processing error')
  } else {
    let balance = utxos.map((v) => {
      return {
        txid: v.txId,
        vout: v.outputIndex,
        satoshi: v.satoshis,
        btc: v.satoshis * 1e-8,
      }
    })
    console.log(JSON.stringify(balance));
  }
});
