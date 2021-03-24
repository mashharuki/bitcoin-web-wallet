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

## Caution

このウォレットアプリケーションは、プロトタイプです。
セキュリティ上の問題も残るため、本番で利用するためには、監査やチェックが必要です。
