const express = require('express');
const { getUserTasks, createTask, updateTask, deleteTask, updateTaskDescription } = require('../models/TaskModel');
const router = express.Router();

// 获取所有任务
router.get('/', async (req, res) => {
    console.log('GET /tasks route hit'); // 确认请求到达了后端
    const { userID } = req.query;

    // 检查 userID 是否存在
    if (!userID) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    try {
        const tasks = await getUserTasks(userID);
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
        const taskId = await createTask(userID, title, description || '', priority, dueDate || null, status);
        res.status(201).json({ message: 'Task created', taskId });
    } catch (err) {
        console.error('Error creating task:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 更新任务状态
router.put('/status', async (req, res) => {
    const { taskId, status } = req.body;

    try {
        const updated = await updateTask(taskId, status);
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

// 更新任务描述
router.put('/description', async (req, res) => {
    const { taskId, description } = req.body;

    try {
        const updated = await updateTaskDescription(taskId, description);
        if (updated) {
            res.status(200).json({ message: 'Task description updated' });
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (err) {
        console.error('Error updating task description:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 删除任务
router.delete('/', async (req, res) => {
    const { taskId } = req.body;

    try {
        const deleted = await deleteTask(taskId);
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
