const express = require('express');
const { getTasks, createTask } = require('../models/TaskModel');
const router = express.Router();

// 获取所有任务
router.get('/', async (req, res) => {
    console.log('GET /tasks route hit'); // 确认请求到达了后端
    try {
        const tasks = await getTasks();
        res.json(tasks);
    } catch (err) {
        console.error('Error fetching tasks:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 创建新任务
router.post('/', async (req, res) => {
    const { userID, title, description, priority, dueDate } = req.body;
    const status = 'todocontainer'; // 默认状态为 'todocontainer'
    try {
        const taskId = await createTask(userID, title, description, priority, dueDate, status);
        res.status(201).json({ message: 'Task created', taskId });
    } catch (err) {
        console.error('Error creating task:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;