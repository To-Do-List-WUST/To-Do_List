const express = require('express');
const { getTasks, createTask, updateTask } = require('../models/TaskModel');
const router = express.Router();

// 获取用户任务
router.get('/', async (req, rss) => {
    try{
        const tasks = await getTasks();
        res.json(tasks);
    } catch (err) {
        console.error('Error fetching tasks:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 创建新任务
router.post('/', async (req,res) => {
    const { userID, title, description, priority, dueDate} = req.body;
    try{
        const taskId = await createTask(userID, title, description, priority, dueDate, status);
        res.status(201).json({ message: 'Task created', taskId});
    } catch (err) {
        console.error('Error creating task:', err.message);
        res.status(500).json({error: 'Internal server error'});
    }
});

module.exports = router;