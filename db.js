// 统一管理数据库连接
const mysql = require('mysql2/promise');

// 配置数据库连接池
const pool = mysql.createPool({
    host: '47.242.219.237',
    user: 'chovy',
    password: 'Ffy050428.',
    database: 'authApp',
    waitForConnections: true,
    connectionLimit: 10, // 建立最多10个连接
    queueLimit: 0, // 等待排队的请求数量，0表示无限制
});

module.exports = pool; // 导出连接池