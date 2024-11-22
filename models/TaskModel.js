const pool = require('../db');

// 获取任务
async function getTasks(){
    const [rows] = await pool.query('SELECT * FROM tasks');
    return rows;
}

// 创建任务
async function createTask(userId, title, description, priority, dueDate, status) {
    const [result] = await pool.query(
        'INSERT INTO tasks (userID, title, description, priority, dueDate, status) VALUES (?, ?, ?, ?, ?, ?)',
        [userId, title, description, priority, dueDate, status]
    );
    return result.insertId;
}

module.exports = {getTasks, createTask};
