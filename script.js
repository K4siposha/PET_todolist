"use strict";

let tasks = [];

function add() {
    const taskText = document.getElementById('taskInput').value;
    if (taskText.trim() === '') return;

    let taskId;
    if (crypto.randomUUID) {
        taskId = crypto.randomUUID();
    } else {
        taskId = Date.now().toString();
    }

    const taskElement = document.createElement('li');
    taskElement.id = taskId;

    const text = document.createElement('span');
    text.dataset.taskId = taskId;
    text.textContent = taskText;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = 'Delete';
    deleteButton.dataset.taskId = taskId;

    const editButton = document.createElement("button");
    editButton.textContent = 'Edit';
    editButton.dataset.taskId = taskId;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.textContent = 'Check';
    checkbox.dataset.taskId = taskId;

    const filterButton = document.createElement("button");
    filterButton.textContent = 'Filter';
    filterButton.dataset.taskId = taskId;

    taskElement.appendChild(checkbox);
    taskElement.appendChild(text);
    taskElement.appendChild(editButton);
    taskElement.appendChild(deleteButton);

    document.getElementById('taskList').appendChild(taskElement);
    document.getElementById('taskInput').value = '';

    tasks.push({
        id: taskId,
        name: taskText,
        completed: checkbox.checked
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

    setupEventListeners(deleteButton, text, taskElement, editButton, checkbox, tasks);
}

function setupEventListeners(deleteButton, text, taskElement, editButton, checkbox, tasks) {
    deleteButton.addEventListener('click', function() {
        const taskIdToDelete = this.dataset.taskId;
        const taskToDelete = document.getElementById(taskIdToDelete);
        if (taskToDelete) {
            taskToDelete.remove();

            if (Array.isArray(tasks)) {
                const index = tasks.findIndex(task => task.id === taskIdToDelete);
                if (index !== -1) {
                    tasks.splice(index, 1);
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                }
            }
        }
    });
    editButton.addEventListener('click', function() {
        const taskElement = this.parentNode;
        let text = taskElement.querySelector('span');
        let newText = prompt('Название', text.textContent);

        text.textContent = newText;

        const index = tasks.findIndex(task => task.id === taskElement.id);
        tasks[index].name = newText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });
    checkbox.addEventListener('change', function () {
        const taskElement = this.parentNode;
        let text = taskElement.querySelector('span');
        if (checkbox.checked) {
            text.style.textDecoration = 'line-through';
            text.style.color = 'green';
        } else {
            text.style.textDecoration = 'none';
            text.style.color = 'black';
        }
    });
}

document.addEventListener('DOMContentLoaded', function (){
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        tasks.forEach(function (task) {
            createTaskElement (task);
        });
    }
});

function createTaskElement (task) {
    const taskElement = document.createElement('li');
    taskElement.id = task.id;

    const text = document.createElement('span');
    text.dataset.id = task.id;
    text.textContent = task.name;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = 'Delete';
    deleteButton.dataset.id = task.id;

    const editButton = document.createElement("button");
    editButton.textContent = 'Edit';
    editButton.dataset.id = task.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.dataset.id = task.id;

    const filterButton = document.createElement("button");
    filterButton.textContent = 'Filter';
    filterButton.dataset.id = task.id;

    taskElement.appendChild(checkbox);
    taskElement.appendChild(text);
    taskElement.appendChild(editButton);
    taskElement.appendChild(deleteButton);

    document.getElementById('taskList').appendChild(taskElement);

    setupEventListeners(deleteButton, text, taskElement, editButton, checkbox, tasks);
}

document.getElementById('addTaskBtn').addEventListener('click', add);