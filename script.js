function addTask(){
    const taskInput=document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if(taskText !== ""){
        const taskList = document.getElementById('taskList');

        // Create list attribute
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

    const completeButton = document.createElement('button');
    completeButton.textContent="Complete";
    completeButton.onclick=function(){
        listItem.classList.toggle('complete');
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.className="delete-button";
    deleteButton.onclick=function(){
        taskList.removeChild(listItem);
    };

    listItem.appendChild(completeButton);
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);

    taskInput.value="";
    }
}