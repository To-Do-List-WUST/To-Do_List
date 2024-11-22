const express = require('express');
const { getTasks, createTask, updateTask, deleteTask } = require('../models/TaskModel');
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

router.post('/', async (req, res) => {
    const { userID, title, description, priority, dueDate } = req.body;
    const status = 'todocontainer'; // 默认状态为 'todocontainer'

    try {
        const taskId = await createTask(userID, title, description || '', priority, dueDate || null, status);
        res.status(201).json({ message: 'Task created', taskId });
    } catch (err) {
        console.error('Error creating task:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// 更新任务状态
router.put('/status', async (req, res) => {
    const { title, status } = req.body;

    try {
        const updated = await updateTask(title, status);
        if (updated) {
            res.status(200).json({ message: 'Task status updated' });
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (err) {
        console.error('Error updating task status:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// 删除任务
router.delete('/', async (req, res) => {
    const { title } = req.body;

    try {
        const deleted = await deleteTask(title);
        if (deleted) {
            res.status(200).json({ message: 'Task deleted' });
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (err) {
        console.error('Error deleting task:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports = router;