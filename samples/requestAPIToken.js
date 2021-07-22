/**
 * bitpayのAPIトークンを取得する処理ファイル
 */

// 必要なモジュールをインポートする。
let request = require('request');

// URLを指定
let resource_url = 'https://bitpay.com/tokens';
// ポストデータを指定
let post_data = {
    "id": "Tf2yXsY49iFyDfxt3b2kf9VPRMwPxxAyCRW",
    "label": "merchantwebsite.com",
    "facade": "merchant"
};
// ヘッダー情報
let headers = {"X-Accept-Version": "2.0.0", "Content-Type": "application/json"};
// リクエスト内容を作成
let options = {
    url: resource_url,
    method: 'POST',
    json: post_data,
    headers: headers
};
// APIトークンを要求する。 
request(options, function (error, response, body) {
    console.log(body);
});