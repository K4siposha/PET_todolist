"use strict";
// обязательно использовать localstorage
// чтобы при перезагрузке страницы сохранялось все
// из функционала добавление, удаление, редактирование задач, возможность помечать выполненные, фильтрация

const list = document.querySelector('#taskList');
const input = document.querySelector('#taskInput');
const btn = document.querySelector('#addTaskBtn');

btn.addEventListener('li', (e) => {
    e.preventDefault();
    const taskText = input.value;
    const taskHTML = `
                      <li id="list">
                        <span id="task-title">${taskText}</span>
                      </li>`;
    list.insertAdjacentElement('beforeend', taskHTML);
});