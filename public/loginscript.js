document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // 获取表单数据
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        // 发送登录请求到后端
        const response = await fetch('http://47.242.219.237:3000/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            // 如果响应不是 2xx，解析错误消息并抛出
            const error = await response.json();
            throw new Error(error.error || 'Login failed');
        }

        // 登录成功，处理响应数据
        const result = await response.json();
        alert(`Welcome, ${result.username}!`);
        window.location.href = '/tasks.html'; // 跳转到任务页面
    } catch (err) {
        // 捕获和显示错误
        console.error('Error during login:', err.message);
        alert(err.message || 'Server error. Please try again later.');
    }
});
document.getElementById('registerLink').addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '/register.html'; // 跳转到注册页面
});