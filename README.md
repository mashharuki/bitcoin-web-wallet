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
