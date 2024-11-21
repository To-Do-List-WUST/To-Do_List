// 绑定注册表单提交事件
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        // 发送注册请求到后端
        const response = await fetch('http://47.242.219.237:3000/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();

        if (response.ok) {
            alert('Registration successful! Please log in.');
            window.location.href = '/'; // 注册成功后跳转到登录页面
        } else {
            alert(result.error || 'Registration failed');
        }
    } catch (err) {
        console.error('Error during registration:', err);
        alert('Server error. Please try again later.');
    }
});

// 绑定登录链接事件
document.getElementById('loginLink').addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '/'; // 跳转到登录页面
});