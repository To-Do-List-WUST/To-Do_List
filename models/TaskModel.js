const pool = require('../db');

// 获取任务
async function getTasks(){
    const [rows] = await pool.query('SELECT * FROM tasks');
    return rows;
}

// 创建任务
async function createTask(userId, title, description, priority, dueDate) {
    const [result] = await pool.query(
        'INSERT INTO tasks (userId, title, description, priority, dueDate) VALUES (?,?,?,?,?)',
        [userId, title, description, priority, dueDate]
    );
    return result.insertId;
}

module.exports = {getTasks, createTask};
