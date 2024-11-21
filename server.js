const express = require('express');
const bodyParser = require('body-parser'); // 导入中间件 body-parser
const path = require('path'); // 引入 Path 路径处理模块
const userRoutes = require('./routes/users'); // 导入用户路由
const taskRoutes = require('./routes/tasks'); // 导入任务路由
const cors = require('cors') // 添加CORS支持
const PORT = 3000;
const app = express(); // 创建 Express 实例
app.use(express.json());
app.use(cors())
// 静态文件服务
app.use(express.static(path.join(__dirname, 'public')));
// 使用中间件解析 JSON 和 URL 编码数据
app.use(bodyParser.json()); // 解析 JSON 格式的数据
app.use(bodyParser.urlencoded({ extended: true })); // 解析 URL 编码的数据

// 配置用户相关路由， 所有/users路径都交给users.js来处理
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server running at http://47.242.219.237:${PORT}`);
});