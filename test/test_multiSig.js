/**
 * マルチシグウォレットの機能をテストするためのコード
 */

// 必要なモジュールをインポートする。
var expect = require('chai').expect;
var crypto = require('crypto');
var bitcore = require('bitcore-lib');
var explorers = require('bitcore-explorers');
var insight = new explorers.Insight('testnet');

/**
 * トランザクションをブロードキャストする関数
 * @param {} tx
 * @param {*} done 
 */
function broadcast(tx, done){
    // ブロードキャスト
    insight.broadcast(tx, function(err, id) {
        if (err) {
            console.log("insight broadcast err",err);
            process.exit(1);
        }
        done(id);
    });
 }
 
 /**
  * 指定したアドレスのUTXOを取得する関数
  * @param {*} address 
  * @param {*} done 
  */
function getUTXO(address, done) {
    // UTXOを取得する。
    insight.getUnspentUtxos(address, function(err, utxos) {
        if (err) {
            console.log("insight utxo err",err);
            process.exit(1);
        }
        // utxos.forEach(function(utxo){console.log(utxo.toJSON());});
        done(utxos[0]);
    });
 }
 
// testnet用の秘密鍵を取得する
var privateKey = bitcore.PrivateKey({
   "bn":"8c026a359a13f707a3497ef58da45b628958ff98b5f33322cf29ede12fcfd56f",
   "compressed":true,
   "network":"testnet"
});
// アドレス取得
var address = privateKey.toAddress();

/**
 * テストコード
 */
describe('challenge', function(){

    // アドレスをチエックするテスト
    it('should have an address', function(){
        expect(address.toString()).to.be.equal('myvsPNW9SgpmcGhBrYYowc5Q2cVHKqmuBP');
    });

    // マルチシグを利用したトランザクションをブロードキャストするテスト
    it('should perform a testnet multisig transaction and refund', function(done){
        // UTXOを取得する。
        getUTXO(address, function(utxo){
           // console.log('UTXO:',utxo);
   
           // test sending a small bit to a p2sh multisig
           // 秘密鍵2つ
           var privateKey1 = new bitcore.PrivateKey('612b3ca3f368cf2658c2e1777d2fa28e6bcde8ea19312cbf69e09e7333e13994', 'testnet');
           var privateKey2 = new bitcore.PrivateKey('d65788b9947b41625ffff946bc145187c6b85d1686e60becdf34567f17478730', 'testnet');
           // 公開鍵2つ
           var publicKey1 = privateKey1.publicKey;
           var publicKey2 = privateKey2.publicKey;
           // スクリプト生成(Redeem Script)
           // スクリプトSigは、 <Sig1><Sig2> Redeem Scriptという形になる。
           var P2SHScript = new bitcore.Script.buildMultisigOut([publicKey1, publicKey2], 1);
           // スクリプトを出力(Redeem Script)
           console.log('Redeem Script：', P2SHScript.toString());
           // P2SHFundを生成(Locking Script)
           var P2SHFund = P2SHScript.toScriptHashOut();
           // P2SHFundを出力(Locking Script)
           console.log('Locking Script：', P2SHFund.toString());
           // スクリプト全体を出力
           console.log('スクリプト全体：', P2SHFund.toString() + ' ' + P2SHScript.toString());
           // トランザクション生成&署名
          var tx = new bitcore.Transaction()
            .from(utxo)
            .to(P2SHFund.toAddress(), 9000)
            .change(address)
            .sign(privateKey);

            console.log("tx",tx);
            // ブロードキャストする。
            broadcast(tx, function(id){
                console.log("funded to",id);
     　　　　　   // 2つ目のトランザクション生成&署名
                var tx2 = new bitcore.Transaction()
                    .from({txId:id, outputIndex:0, inputIndex:0, satoshis:9000, script:P2SHFund.toString()}, [publicKey1, publicKey2], 1)
                    .to(address, 8000)
                    .sign(privateKey2);

                console.log("tx2",tx2.serialize());
                // ブロードキャストする。
                broadcast(tx2, function(id2){
                    console.log("funded back to",id2);
                    expect(id2).to.be.a("string");
                    done()
                });
            });
        });
    })
 })
