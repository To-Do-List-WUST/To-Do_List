const express = require('express');
const bcrypt = require('bcrypt'); // 加密密码
const { createUser, isUsernameTaken } = require('../models/UserModel');

const router = express.Router();

// 用户注册路由
router.post('/register', async (req, res) => {
    const { username, password } = req.body; // 提取用户端数据

    try{
        // 检查用户名是否已存在
        if (await isUsernameTaken(username)){
            return res.status(400).json({error: 'Username already exists' });
        }
        // 加强用户密码
        const hashedPassword = await bcrypt.hash(password, 10);
        // 创建新用户
        const userId = await createUser(username, hashedPassword);
        res.status(201).json({ message: 'User created successfully', userId}); // 201 表示成功创建用户
    }catch (err){
        console.error('Error during registration:', err.message);
        res.status(500).json({error: 'Internal server error'});
    }
});
module.exports = router;