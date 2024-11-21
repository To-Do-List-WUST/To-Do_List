document.addEventListener('DOMContentLoaded', () => {
    // 初始化事件
    document.getElementById('addTaskButton').addEventListener('click', addTask);
    document.getElementById('taskInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    // 关闭描述弹窗
    document.getElementById('closeDescriptionButton').onclick = () => {
        document.getElementById('descriptionModal').classList.add('hidden');
    };

    // 加载现有任务
    loadTasks();
});

// 状态映射函数
function mapStatusToFrontend(status) {
    if (status === 'todocontainer') return 'todo';
    if (status === 'doingcontainer') return 'doing';
    if (status === 'donecontainer') return 'done';
    return status; // 默认返回自身
}

function mapStatusToBackend(status) {
    if (status === 'todo') return 'todocontainer';
    if (status === 'doing') return 'doingcontainer';
    if (status === 'done') return 'donecontainer';
    return status; // 默认返回自身
}

// 从后端加载任务
async function loadTasks() {
    try {
        const response = await fetch('/tasks');
        if (response.ok) {
            const tasks = await response.json();
            renderTasks(tasks);
        } else {
            console.error('Failed to load tasks');
        }
    } catch (err) {
        console.error('Error loading tasks:', err);
    }
}

// 渲染任务到界面
function renderTasks(tasks) {
    const todoList = document.getElementById('todoList');
    const doingList = document.getElementById('doingList');
    const doneList = document.getElementById('doneList');

    // 清空现有任务
    todoList.innerHTML = '';
    doingList.innerHTML = '';
    doneList.innerHTML = '';

    tasks.forEach((task) => {
        const frontendStatus = mapStatusToFrontend(task.status); // 映射状态
        const listItem = createTaskElement(task.title, task.priority, task.dueDate, frontendStatus);
        if (frontendStatus === 'todo') {
            todoList.appendChild(listItem);
        } else if (frontendStatus === 'doing') {
            doingList.appendChild(listItem);
        } else if (frontendStatus === 'done') {
            doneList.appendChild(listItem);
        }
    });
}

// 创建任务元素
function createTaskElement(taskText, priority, dueDate, status) {
    const listItem = document.createElement('li');
    const taskTitle = document.createElement('p');
    taskTitle.textContent = taskText;
    listItem.appendChild(taskTitle);

    // 添加描述链接
    let descriptionText = 'No description added.';
    const descriptionLink = document.createElement('a');
    descriptionLink.textContent = 'View Description';
    descriptionLink.href = '#';
    descriptionLink.onclick = () => showDescription(descriptionText);
    listItem.appendChild(descriptionLink);

    // 设置优先级样式
    listItem.classList.add(priority);

    // 添加倒计时
    const countdown = document.createElement('p');
    updateCountdown(countdown, dueDate);
    listItem.appendChild(countdown);
    setInterval(() => updateCountdown(countdown, dueDate), 1000);

    // 添加操作按钮
    const buttonDiv = document.createElement('div');
    buttonDiv.className = 'task-buttons';

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit Description';
    editButton.onclick = () => {
        const newDescription = prompt('Enter a new description:', descriptionText);
        if (newDescription) descriptionText = newDescription;
    };
    buttonDiv.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.onclick = () => listItem.remove();
    buttonDiv.appendChild(deleteButton);

    // 添加状态切换按钮
    const statusButton = document.createElement('button');
    statusButton.textContent = `Move to ${getNextStatus(status)}`;
    statusButton.onclick = async () => {
        const newFrontendStatus = getNextStatus(status);
        const newBackendStatus = mapStatusToBackend(newFrontendStatus); // 映射回后端状态
        try {
            const response = await fetch(`/tasks/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: taskText, status: newBackendStatus }),
            });
            if (response.ok) {
                loadTasks(); // 重新加载任务列表
            } else {
                console.error('Failed to update status');
            }
        } catch (err) {
            console.error('Error updating status:', err);
        }
    };
    buttonDiv.appendChild(statusButton);

    listItem.appendChild(buttonDiv);
    return listItem;
}

// 获取下一个状态
function getNextStatus(currentStatus) {
    if (currentStatus === 'todo') return 'doing';
    if (currentStatus === 'doing') return 'done';
    return 'todo'; // 从 'done' 回到 'todo'
}

// 添加新任务
async function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;
    const userId = localStorage.getItem('userId');

    if (!taskText) {
        document.getElementById('errormessage').textContent = 'Task cannot be empty.';
        return;
    }
    document.getElementById('errormessage').textContent = '';

    try {
        const response = await fetch('/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userID: userId, // 传递userID，数据库
                title: taskText,
                priority: prioritySelect.value,
                dueDate,
                status: 'todo', // 默认为后端的状态
            }),
        });
        if (response.ok) {
            taskInput.value = '';
            loadTasks(); // 重新加载任务
        } else {
            const error = await response.json();
            console.error('Failed to create task',error.error);
        }
    } catch (err) {
        console.error('Error creating task:', err.message);
    }
}

// 更新倒计时
function updateCountdown(element, dueDate) {
    const remainingTime = new Date(dueDate) - new Date();
    if (remainingTime > 0) {
        const hours = Math.floor(remainingTime / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
        element.textContent = `Time remaining: ${hours}h ${minutes}m ${seconds}s`;
    } else {
        element.textContent = "Time's up!";
    }
}

// 显示描述弹窗
function showDescription(description) {
    const modal = document.getElementById('descriptionModal');
    document.getElementById('taskDescriptionContent').textContent = description;
    modal.classList.remove('hidden');
}

