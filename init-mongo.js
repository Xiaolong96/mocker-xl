// https://stackoverflow.com/questions/42912755/how-to-create-a-db-for-mongodb-container-on-start-up
// 在 mocker 数据库上创建访问角色。
// 这里 db 是 MONGO_INITDB_DATABASE 指定的数据库

// 先鉴权
db.auth('superuser', 'secret');

db.getSiblingDB('mocker').createUser({
  user: 'user',
  pwd: '123456',
  roles: [
    {
      role: 'readWrite',
      db: 'mocker'
    }
  ]
});
