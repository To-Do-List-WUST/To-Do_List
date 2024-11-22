const pool = require('../db');

// 获取任务
async function getTasks(userId) {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE userID = ?', [userId]);
    return rows;
}

// 创建任务
async function createTask(userId, title, description, priority, dueDate, status) {
    try {
        const [result] = await pool.query(
            'INSERT INTO tasks (userID, title, description, priority, dueDate, status) VALUES (?, ?, ?, ?, ?, ?)',
            [userId, title, description, priority, dueDate, status]
        );
        return result.insertId;
    } catch (err) {
        console.error('Error executing query:', err.message);
        throw err; // 重新抛出错误，以便在路由处理器中捕获并记录
    }
}

// 更新任务状态
async function updateTask(taskId, status) {
    const [result] = await pool.query(
        'UPDATE tasks SET status = ? WHERE id = ?',
        [status, taskId]
    );
    return result.affectedRows > 0;
}

// 更新任务描述
async function updateTaskDescription(taskId, description) {
    const [result] = await pool.query(
        'UPDATE tasks SET description = ? WHERE id = ?',
        [description, taskId]
    );
    return result.affectedRows > 0;
}

// 删除任务
async function deleteTask(taskId) {
    const [result] = await pool.query(
        'DELETE FROM tasks WHERE id = ?',
        [taskId]
    );
    return result.affectedRows > 0;
}

module.exports = { getTasks, createTask, updateTask, deleteTask, updateTaskDescription };