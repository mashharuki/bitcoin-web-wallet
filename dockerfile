# dockerイメージを選択 
FROM node:10.7.0
# bitcoinWalletディレクトリをルートディレクトリ上にコピーする。
ADD bitcoinWallet /bitcoinWallet
# 作業ディレクトリを指定する。
WORKDIR /bitcoinWallet
# npmをインストールする。
RUN npm install
# インストールしたモジュールを実行する。　
RUN rm -r node_modules/bitcore-explorers/node_modules
# ポート番号を指定する。
EXPOSE 8082
# node プロジェクト実行
CMD npm start 
