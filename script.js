document.addEventListener('DOMContentLoaded',function(){
    // 用addEventListener，设置<button>ID, 避免在HTML中用Onclck属性
    document.getElementById('addTaskButton').addEventListener('click', addTask);
    // 用回车键增加任务
    document.getElementById('taskInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});

// 创建任务的html属性，模块化开发
function createTaskElement(taskText,prioritySelect) {
    const listItem = document.createElement('li');
    listItem.textContent = taskText;
    // 根据不同优先级设置不同背景颜色
    switch(prioritySelect){
        case 'high':
            listItem.style.backgroundColor = '#ffcccc'; //红色背景，最高优先级
            break;
        case 'medium':
            listItem.style.backgroundColor = '#fff4cc'; //黄色背景，中优先级
            break;
        case 'low':
            listItem.style.backgroundColor = '#ccffcc'; //绿色背景，低优先级
            break;
    }
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

    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.onclick = function () {
        listItem.parentElement.removeChild(listItem);
    };

    listItem.appendChild(completeButton);
    listItem.appendChild(deleteButton);

    return listItem;
}
// 将新创建的任务添加到列表
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    const prioritySelect = document.getElementById('prioritySelect').value;
    const errormessage = document.getElementById('errormessage');
    if (taskText === "") {
        // alert("Task cannot be empty. Please enter a task.")
        errormessage.textContent = "Task cannot be empty. Please enter a task.";
        return;
    }

    errormessage.textContent="";
    const taskList = document.getElementById('todoList');
    const newTask = createTaskElement(taskText,prioritySelect);
    taskList.appendChild(newTask);

    taskInput.value = "";// 清除输入框内容
}
