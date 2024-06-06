document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

document.getElementById('add-task').addEventListener('click', function() {
    const taskText = document.getElementById('new-task').value;
    const priority = document.getElementById('priority').value;

    if (taskText) {
        const task = {
            text: taskText,
            priority: priority,
            completed: false
        };

        addTask(task);
        saveTask(task);

        document.getElementById('new-task').value = '';
    }
});

function addTask(task) {
    const taskList = document.getElementById('tasks');
    const taskItem = document.createElement('li');
    taskItem.textContent = task.text;
    taskItem.classList.add(`priority-${task.priority}`);
    if (task.completed) {
        taskItem.classList.add('completed');
    }

    const editButton = document.createElement('button');
    editButton.textContent = 'EDIT';
    editButton.classList.add('edit');
    editButton.addEventListener('click', function() {
        const newText = prompt('Edit your task', task.text);
        if (newText) {
            task.text = newText;
            taskItem.firstChild.textContent = newText;
            updateTasks();
        }
    });

    const toggleButton = document.createElement('button');
    toggleButton.textContent = task.completed ? 'PENDING' : 'COMPLETE';
    toggleButton.classList.add('toggle');
    toggleButton.addEventListener('click', function() {
        task.completed = !task.completed;
        taskItem.classList.toggle('completed');
        toggleButton.textContent = task.completed ? 'PENDING' : 'COMPLETED';
        updateTasks();
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'DELETE';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', function() {
        taskList.removeChild(taskItem);
        deleteTask(task);
    });

    taskItem.appendChild(editButton);
    taskItem.appendChild(toggleButton);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task));
}

function updateTasks() {
    const tasks = [];
    document.querySelectorAll('#tasks li').forEach(taskItem => {
        const task = {
            text: taskItem.childNodes[0].textContent,
            priority: taskItem.classList.contains('priority-low') ? 'low' :
                       taskItem.classList.contains('priority-medium') ? 'medium' : 'high',
            completed: taskItem.classList.contains('completed')
        };
        tasks.push(task);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t.text !== task.text);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
