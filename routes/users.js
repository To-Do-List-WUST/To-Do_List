const express = require('express');
const bcrypt = require('bcrypt'); // 加密密码
const { createUser, isUsernameTaken, findUserByUsername } = require('../models/UserModel'); // 更新目录

const router =express.Router();

// 用户注册路由
router.post('/register', async (req, res) => {
    console.log('Register endpoint hit');
    console.log('Request body:', req.body);
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
// 用户登录路由
router.post('/login', async (req, res) => {
    console.log('Request body:', req.body);
    const { username, password } = req.body;

    try {
        // 检查用户是否存在
        const user = await findUserByUsername(username);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // 检查密码是否匹配
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        res.status(200).json({ message: 'Login successful', username: user.username });
    } catch (err) {
        console.error('Error during login:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports = router;