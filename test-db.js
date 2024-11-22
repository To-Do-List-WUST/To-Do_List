// 初始化用户表和任务表
const mysql = require('mysql2/promise'); // 导入mysql2的API，提供与数据库交互的功能如async和await

async function initializeDatabase(){
    try{
        const connection = await mysql.createConnection({
            host: '47.242.219.237',
            user: 'chovy',
            password: 'Ffy050428.',
            database: 'authApp',
        });
        console.log('Connected to Database successfully!');

        // 创建用户表
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username varchar(255) NOT NULL UNIQUE,
                password varchar(255) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Table "users" is ready.');
        // 创建任务表
        await connection.query(`
            CREATE TABLE IF NOT EXISTS tasks (
                id INT AUTO_INCREMENT PRIMARY KEY,
                userID INT NOT NULL,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                priority ENUM('low','medium','high') DEFAULT 'low',
                status ENUM('todocontainer','doingcontainer','donecontainer') DEFAULT 'todocontainer',
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                dueDate DATETIME,
                FOREIGN KEY (userID) REFERENCES users(id) ON DELETE CASCADE
            )
        `);
        console.log('Table "tasks" is ready.');

        connection.end();
    }catch(err){
        console.error('Failed to connect Database: ', err.message);
    }
}

initializeDatabase();