const bitcore = require('bitcore-lib');
const explorers = require('bitcore-explorers');​

const network = 'testnet'
const privatekey = 'e40a718b418de32725e3e89dfeca7a39d49c579448b390f835155cc26a105c20';
const privateKey = new bitcore.PrivateKey(privatekey);
const sendAddress = 'mq8aTnusvudJBr2A4iNmCpQkWS8SQuALGD';
const changeAddress = 'msQXdd2gDGWSYaDF32TEWb3Yji7mbk3VCJ';
const sendAmout = Math.floor(parseFloat("0.0001") * 100000000);
const fee = parseFloat(1000);
const insight = new explorers.Insight(network);
const Transaction = bitcore.Transaction;​

insight.getUnspentUtxos(changeAddress, (err, utxos) => {
  if (err) {
    console.log('Bitcoin network connection error');
  } else {
    const transaction = new Transaction()
      .fee(fee)
      .from(utxos)
      .to(sendAddress, sendAmout)
      .change(changeAddress)
      .sign(privateKey);​
    insight.broadcast(transaction, (err, returnedTxId) => {
      if (err) {
        console.log(err);
      } else {
        console.log(returnedTxId);
      }
    });
  }
});
