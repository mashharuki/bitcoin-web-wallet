var fs = require('fs');
const bitcore = require('bitcore-lib');
const explorers = require('bitcore-explorers');

const network = 'testnet';
const privatekey = fs.readFileSync( "address", "UTF-8").split( '\n' )[0];
const privateKey = new bitcore.PrivateKey(privatekey);
const sendAddress = 'mq8aTnusvudJBr2A4iNmCpQkWS8SQuALGD';
const changeAddress = fs.readFileSync( "address", "UTF-8").split( '\n' )[1];
const sendAmout = Math.floor(parseFloat("0.0001") * 100000000);
const fee = parseFloat(1000);
const insight = new explorers.Insight(network);
const Transaction = bitcore.Transaction;

insight.getUnspentUtxos(changeAddress, (err, utxos) => {
  if (err) {
    console.log('Bitcoin network connection error');
  } else {
    const transaction = new Transaction().fee(fee).from(utxos).to(sendAddress, sendAmout).change(changeAddress).sign(privateKey);
    insight.broadcast(transaction, (err, returnedTxId) => {
      	if (err) {
        	console.log(err);
     	} else {
        	console.log(returnedTxId);
      	}
    });
  }
});
