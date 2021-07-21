# dockerイメージを選択 
FROM node:10.7.0
# bitcoinWalletディレクトリをルートディレクトリ上にコピーする。
ADD bitcoinWallet /bitcoinWallet
# 作業ディレクトリを指定する。
WORKDIR /bitcoinWallet
# npmをインストールする。
RUN npm install
# 不要なモジュールを削除する。
RUN rm -r node_modules/bitcore-explorers/node_modules
# node プロジェクト実行
CMD npm start 
