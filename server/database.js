const mysql = require('mysql');  // mysql 모듈 로드
const conn = {  // mysql 접속 설정
  host: 'database-1.c5ixiajbaiq1.ap-northeast-2.rds.amazonaws.com',
  port: 37331,
  username: 'mirim',
  password: 'qZEP1V7oXuKhAA3AcDAP',
  database: 'mirim',
};

var connection = mysql.createConnection(conn); // DB 커넥션 생성
connection.connect(function(err){
    if(err){
      console.error('error connecting'+err.stack);
      return;
    }
    console.log("connect");
    connection.end();
  })
 
