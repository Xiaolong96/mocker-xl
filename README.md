# mocker-xl

一款用于提高前端开发效率的可视化工具

![首页](https://images.cnblogs.com/cnblogs_com/xiongxiaolong/1648076/o_2002151241170E5F61EC-3CB7-4E6C-8C0A-27F91DA1A0AC.jpg)

## 功能点

- [x] Mock 数据，支持 `mockjs` 语法
- [x] 支持代理，可携带 `cookie`
- [x] 支持延时返回
- [ ] 支持多状态，失败或成功
- [ ] 校验参数

## 环境要求

需先安装 `mogodb` 和 `node` 环境或者安装 `docker`

## 使用

拉取项目

```js
git clone https://github.com/Xiaolong96/mocker-xl.git
cd mocker-xl
```

### 方法一

Mac 安装 docker 客户端后，自带 docker-cpmpose

直接在项目根目录下运行

`docker-compose up -d` 或者 `npm run compose`

编排完成后，访问 http://localhost:1988 即可

### 方法二

安装 `mogodb` 和 `node` 环境

在 server -> config -> core.js 文件里修改 mongo 配置

最后在项目根目录下运行以下命令，即可

```js
npm install
npm run start
```

## 技术栈与第三方库

- typescript

Client

- React
- Ant Design, Mock.js, etc...
- Less

Server

- Koa
- MongoDB
- Mongoose
