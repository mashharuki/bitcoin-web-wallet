bitcoinWebWallet
====


## Overview

bitcore-libライブラリを利用したシンプルなビットコインウォレットアプリケーションです。


## 必要な設定と実行コマンド

$git clone https://github.com/mashharuki/bitcoin-web-wallet.git

$cd bitcoinWebWallet

$docker-compose up -d

$npm install bitcore-lib

$npm install bitcore-explorers

$node createAddress.js

Access localhost:80


## dockerとdocker composeのバージョン状況

・docker version: 18.09.0

・docker compose version: 1.6.2

## サーバー

nodeを利用しています。

## 注意事項

このウォレットアプリケーションは、プロトタイプです。
セキュリティ上の問題も残るため、本番で利用するためには、監査やチェックが必要です。

## 登録したユーザー情報(パスワードや秘密鍵含む)を閲覧するためのコマンド

1. DBコンテナに入る  
  docker exec -it bulletin_board  bash  
  
2. mysqlへ接続する(パスワードは、"mysql")  
  mysql -u root -p  
  
3. データベース一覧を取得する  
   show databases;
   
4. usersテーブルを選択する  
   use users;
   
5. テーブルの中身を確認する  
   select * from users;

## 実際に作成した秘密鍵とアドレス情報(開発専用！)

   秘密鍵：b7c3a6731b94caf1ee05bc7fbecc825ab13ba93dab31cdb012fb6bd65996204f  
   アドレス：mqH6a8Ykc4iPJwp8jR7mnskWbG9i8rwk2D  

## テストネット用ビットコイン取得方法
   
   次URLにアクセスしてアドレスを入力する。  
   https://coinfaucet.eu/en/btc-testnet/  

### APIドキュメントについて
    下記URLを参照する。  
    https://www.blockcypher.com/quickstart/

### RESTful API1のリソース
    https://api.blockcypher.com/v1/btc/main  
    https://api.blockcypher.com/v1/btc/test3  

### 下記コマンドが叩けるかチェックする。
    curl https://api.blockcypher.com/v1/btc/main/addrs/1rundZJCMJhUiWQNFS5uT3BvisBuLxkAp?limit=2  
    curl https://api.blockcypher.com/v1/btc/main/txsa40c283de4c26b027a5734ff89ce78ade1220fc313befa107ec6c245c24bdec0  
    curl https://api.blockcypher.com/v1/btc/main/blocks/319957  

