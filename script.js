document.addEventListener('DOMContentLoaded',function(){
    // 用addEventListener，设置<button>ID, 避免在HTML中用Onclick属性
    document.getElementById('addTaskButton').addEventListener('click', addTask);
    // 用回车键增加任务
    document.getElementById('taskInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});

// 创建任务的html属性，模块化开发
function createTaskElement(taskText,prioritySelect,dueDate) {
    const listItem = document.createElement('li');
    // 添加任务标题
    const taskTitle = document.createElement('p');
    taskTitle.textContent = taskText;
    listItem.appendChild(taskTitle);
    // 描述内容
    let descriptionText = "No description added."
    const descriptionLink = document.createElement('a');
    descriptionLink.textContent = "View Description";
    descriptionLink.href = "#";
    descriptionLink.onclick = function(){
        showDescription(descriptionText);
    };
    listItem.appendChild(descriptionLink);
    // 根据不同优先级设置不同背景颜色
    switch(prioritySelect){
        case 'high':
            listItem.classList.add('high'); //红色背景，最高优先级
            break;
        case 'medium':
            listItem.classList.add('medium'); //黄色背景，中优先级
            break;
        case 'low':
            listItem.classList.add('low'); //绿色背景，低优先级
            break;
    }
    // 倒计时区域
    const countdown = document.createElement('p');
    countdown.className = 'task-countdown';
    updateCountdown(countdown,dueDate);
    listItem.appendChild(countdown);
    // 定时更新倒计时
    const interval = setInterval(() => {
        updateCountdown(countdown,dueDate);
        if (new Date(dueDate) - new Date() <= 0){
            clearInterval(interval);
            countdown.textContent = 'Time\'s up!';
        }
    }, 1000)
    // 按钮
    const buttonDiv = document.createElement('div');
    buttonDiv.className = 'task-buttons';
    // 编辑描述按钮
    const editButton = document.createElement('button');
    editButton.textContent = "Edit Description";
    editButton.onclick = function(){
        const newDescription = prompt("Enter a new description:", descriptionText);
        if(newDescription !== null){
            descriptionText = newDescription;
        }
    }
    buttonDiv.appendChild(editButton);
    // 移动按钮
    const completeButton = document.createElement('button');
    completeButton.textContent = "Move to Doing";
    completeButton.onclick = function () {
        document.getElementById('doingList').appendChild(listItem);
        completeButton.textContent="Move to Done";
        completeButton.onclick = function(){
            document.getElementById('doneList').appendChild(listItem);
            completeButton.remove();
        };
    };
    buttonDiv.appendChild(completeButton);
    // 删除按钮
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.onclick = function () {
        listItem.parentElement.removeChild(listItem);
    };
    buttonDiv.appendChild(deleteButton);

    listItem.appendChild(buttonDiv);

    return listItem;
}
// 更新倒计时
function updateCountdown(element, dueDate){
    const timeRemaining = new Date(dueDate) -new Date(); // 剩余时间
    if (timeRemaining > 0){
        const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        element.textContent = `Time remaining: ${hours}h ${minutes}m ${seconds}s`;
    } else {
        element.textContent = 'Time\'s up!';
    }
}
// 显示描述的界面
function showDescription(description){
    const modal = document.getElementById('descriptionModal');
    const descriptionContent = document.getElementById('taskDescriptionContent');
    descriptionContent.textContent = description;
    modal.classList.remove('hidden');
}
// 关闭描述界面
document.getElementById('closeDescriptionButton').onclick = function(){
    const modal = document.getElementById('descriptionModal');
    modal.classList.add('hidden');
};
// 将新创建的任务添加到列表
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const taskText = taskInput.value.trim();
    const prioritySelect = document.getElementById('prioritySelect').value;
    const errormessage = document.getElementById('errormessage');
    const dueDate = dueDateInput.value; // 获取截止时间
    if (taskText === "") {
        // alert("Task cannot be empty. Please enter a task.")
        errormessage.textContent = "Task cannot be empty. Please enter a task.";
        return;
    }

    errormessage.textContent="";
    const taskList = document.getElementById('todoList');
    const newTask = createTaskElement(taskText,prioritySelect,dueDate);
    taskList.appendChild(newTask);

    taskInput.value = "";// 清除输入框内容
}
