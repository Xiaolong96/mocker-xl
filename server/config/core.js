module.exports = {
  // mongo 配置
  mongoose: {
    // 本地

    // url: 'mongodb://127.0.0.1/mocker'

    // docker 容器
    url: `mongodb://superuser:secret@${process.env.docker_db}/mocker?authSource=admin`
    // url: `mongodb://user:123456@${process.env.docker_db}/mocker?authSource=admin`
  },
  // 监听路径和端口配置
  host: 'http://localhost',
  port: '1988'
};
