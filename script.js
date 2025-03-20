"use strict";
// обязательно использовать localstorage
// чтобы при перезагрузке страницы сохранялось все
// из функционала добавление, удаление, редактирование задач, возможность помечать выполненные, фильтрация

function add() {
    const taskText = document.getElementById('taskInput').value;
    if (taskText.trim() === '') return;

    let taskId = Date.now().toString();

    const taskElement = document.createElement('li');
    taskElement.id = taskId;

    const text = document.createElement('span');
    text.dataset.taskId = taskId;
    text.textContent = taskText;

    taskElement.appendChild(text);

    document.getElementById('taskList').appendChild(taskElement);
    document.getElementById('taskInput').value = '';

}

document.getElementById('addTaskBtn').addEventListener('click', add);