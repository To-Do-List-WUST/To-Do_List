const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users'); // 导入用户路由
const PORT = 3000;

const app = express();
const port = 3000;

// 使用中间件解析 JSON 和 URL 编码数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 配置用户相关路由
app.use('/users', userRoutes);

// 启动服务器
app.listen(PORT, () => {
    console.log('Server is running at http://47.242.219.237:3000')
})