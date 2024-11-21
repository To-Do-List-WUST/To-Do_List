const pool = require('../db');

// 创建新用户
async function createUser(username, hashedPassword) {
    const [result] = await pool.query(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, hashedPassword]
    );
    return result.insertId; // 返回新用户 ID
}
// 检查用户名是否存在
async function isUsernameTaken(username) {
    const [rows] = await pool.query(
        'SELECT id FROM users WHERE username = ?',
        [username]
    );
    return rows.length > 0;
}

module.exports = { createUser, isUsernameTaken};