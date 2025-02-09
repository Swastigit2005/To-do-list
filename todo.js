document.getElementById('add-task-btn').addEventListener('click', function() {
    const taskInput = document.getElementById('new-task');
    const priorityInput = document.getElementById('priority-level');
    const taskText = taskInput.value.trim();
    let priorityLevel = priorityInput.value;
    if (taskText !== '') {
        if (priorityLevel === '' || priorityLevel < 1 || priorityLevel > 3) {
            priorityLevel = 1; // Default priority
        }
        addTask(taskText, priorityLevel);
        taskInput.value = '';
        priorityInput.value = '';
    }
});

document.getElementById('clear-tasks-btn').addEventListener('click', function() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
});

function addTask(taskText, priorityLevel) {
    const taskList = document.getElementById('task-list');
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;
    taskItem.dataset.priority = priorityLevel;
    taskItem.dataset.timestamp = Date.now();

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        taskList.removeChild(taskItem);
    });

    taskItem.addEventListener('click', function() {
        taskItem.classList.toggle('completed');
    });

    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);
    sortTasks();
}

function sortTasks() {
    const taskList = document.getElementById('task-list');
    const tasks = Array.from(taskList.children);
    tasks.sort((a, b) => {
        if (a.dataset.priority === b.dataset.priority) {
            return b.dataset.timestamp - a.dataset.timestamp;
        }
        return a.dataset.priority - b.dataset.priority;
    });
    tasks.forEach(task => taskList.appendChild(task));
}

// Optional: Toggle night mode
document.body.addEventListener('dblclick', function() {
    document.body.classList.toggle('night-mode');
    document.querySelector('.container').classList.toggle('night-mode');
});
