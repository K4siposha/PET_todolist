"use strict";
// обязательно использовать localstorage
// из функционала добавление, удаление, редактирование задач, возможность помечать выполненные, фильтрация
// пометка выполненной задачи через checkbox - сделать текст зачеркнутым и поменять цвет на зелёный

function add() {
    const taskText = document.getElementById('taskInput').value;
    if (taskText.trim() === '') return;

    let taskId = Date.now().toString();

    const taskElement = document.createElement('li');
    taskElement.id = taskId;

    let text = document.createElement('span');
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

    taskElement.appendChild(checkbox);
    taskElement.appendChild(text);
    taskElement.appendChild(editButton);
    taskElement.appendChild(deleteButton);

    document.getElementById('taskList').appendChild(taskElement);
    document.getElementById('taskInput').value = '';

    setupEventListeners(deleteButton, text, taskElement, editButton, checkbox);
}

function setupEventListeners(deleteButton, text, taskElement, editButton, checkbox) {
    deleteButton.addEventListener('click', function() {
        const taskIdToDelete = this.dataset.taskId;
        const taskToDelete = document.getElementById(taskIdToDelete);
        if (taskToDelete) {
            taskToDelete.remove();
        }
    });
    editButton.addEventListener('click', function() {
        const taskElement = this.parentNode;
        let text = taskElement.querySelector('span');
        let newText = prompt('Название', text.textContent);

        if (newText !== null) {
            text.textContent = newText;
        }
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

document.getElementById('addTaskBtn').addEventListener('click', add);