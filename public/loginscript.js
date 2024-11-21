document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://47.242.219.237:3000/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();
        if (response.ok) {
            alert('Login successful!');
            localStorage.setItem('token', result.token); // 保存登录凭据
            window.location.href = '/tasks.html'; // 跳转到任务页面
        } else {
            alert(result.error || 'Login failed');
        }
    } catch (err) {
        console.error('Error during login:', err);
        alert('Server error. Please try again later.');
    }
});