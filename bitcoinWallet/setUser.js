/**
 * ユーザー情報を登録するためのJsファイル
 */
let connection = require('./mysqlConnection');

// 処理を定義する。
module.exports = function(req, res, next) {
  // ユーザーID
  let userId = req.session.user_id;
  //Confirm that user_id set for session
  if (userId) {
    let query = 'SELECT user_id, user_name FROM users WHERE user_id = ?';
    // SQL文実行
    connection.query(query,userId, function(err, rows) {
      if(!err){
        res.locals.user = rows.length? rows[0]: false;
      }else{
        console.log(err);
      }
    });
  }
  next();
};