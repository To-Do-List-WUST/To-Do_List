document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    if (response.ok) {
        alert('Login successful!');
        window.location.href = '/tasks.html'; // 登录后跳转
    } else {
        alert(result.error);
    }
});