var express = require('express');
let router = express.Router();
let connection = require('../mysqlConnection');
let bitcore = require('bitcore-lib'); 
let explorers = require('bitcore-explorers');

router.get('/', function(req, res, next) {
  if (req.session.user_id ) {
    let userId = req.session.user_id;
    let query = 'SELECT private_key FROM users WHERE user_id = ?';
   
    connection.query(query,userId, function(err, rows) {
      let privatekey = rows[0].private_key;
      let privateKey = new bitcore.PrivateKey(privatekey);
      let address = privateKey.toAddress();
      let addressStr = address.toString();
      let insight = new explorers.Insight();
      
      //残高処理
      let total = 0;
      let txid = [];
      insight.getUnspentUtxos(address, function(err, utxos){
        if(err){
          console.log("error");
        }else{
          let balance = utxos.map(function(v){
            return{
              btc: (v.satoshis * 1e-8).toFixed(8),
              txid: v.txId,
            }
          })
          
          for(let i=0;i < balance.length;i++){
            total += parseFloat(balance[i].btc);
            txid.push(balance[i].txid);
          }
        }
        
        //画面表示
        res.render('index', {
          title: 'Web Wallet',
          title2: addressStr,
          title3: total,
          title4: txid,
        });
      });
    });
  }else{
    res.redirect('/login');
  }
});

module.exports = router;

 