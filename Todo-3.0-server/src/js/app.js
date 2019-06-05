/* eslint-disable max-len */
/* eslint-disable func-names */
(function () {
  const $inputTodo = document.querySelector('.input-todo');
  const $todos = document.querySelector('.todos');
  const $completeAll = document.querySelector('#ck-complete-all');
  const $clearCompleted = document.querySelector('.clear-completed');
  const $completedTodos = document.querySelector('.completed-todos');
  const $activeTodos = document.querySelector('.active-todos');
  const $nav = document.querySelector('.nav');
  const $spinner = document.querySelector('.spinner');

  let menuFlag = 'all';
  let todos = [];

  function render(resTodo) {
    if (resTodo) todos = resTodo;
    let html = '';

    function generateHTML(todoList) {
      let newHtml = '';
      todoList.forEach(({ id, content, completed }) => {
        newHtml += `<li id="${id}" class="todo-item">
        <input class="custom-checkbox" type="checkbox" id="ck-${id}" ${completed ? 'checked' : ''}>
        <label for="ck-${id}">${content}</label>
        <i class="remove-todo far fa-times-circle"></i>
        </li>`;
      });
      return newHtml;
    }

    if (menuFlag === 'all') {
      html = generateHTML(todos);
    } else {
      html = generateHTML(todos.filter(({ completed }) => (menuFlag === 'active' ? !completed : completed)));
    }

    $todos.innerHTML = html;
    $completedTodos.textContent = todos.filter(({ completed }) => completed).length;
    $activeTodos.textContent = todos.filter(({ completed }) => !completed).length;
    $spinner.classList.remove('show');
  }

  function getResponse(url, payload) {
    $spinner.classList.add('show');
    return (fetch(url, payload)
      .then(res => res.json()));
  }

  function getTodos() {
    getResponse('/todos')
      .then(render)
      .catch(console.log);
  }

  function generateId() {
    return todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
  }

  function addTodo(content) {
    getResponse('/todos', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ id: generateId(), content, completed: false })
    }).then(render)
      .catch(console.log);
  }

  function completeTodo(targetID) {
    const completed = todos.find(todo => todo.id === +targetID);

    getResponse(`/todos/${targetID}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed })
    }).then(render)
      .catch(console.log);
  }

  function removeTodo(targetID) {
    getResponse(`/todos/${targetID}`, {
      method: 'DELETE'
    }).then(render)
      .catch(console.log);
  }

  function completeAllTodos(complete) {
    getResponse('/todos', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: complete.checked })
    }).then(render)
      .catch(console.log);
  }

  function clearCompletedTodos() {
    getResponse('/todos/completed', {
      method: 'DELETE'
    }).then(render)
      .catch(console.log);
  }

  window.onload = getTodos;

  $inputTodo.addEventListener('keyup', e => {
    const content = $inputTodo.value.trim();
    if (content === '' || e.keyCode !== 13) return;
    addTodo(content);
    $inputTodo.value = '';
  });

  $todos.addEventListener('change', e => {
    completeTodo(e.target.parentNode.id);
  });

  $todos.addEventListener('click', e => {
    if (!e.target.classList.contains('remove-todo')) return;
    removeTodo(e.target.parentNode.id);
  });

  $completeAll.addEventListener('click', e => {
    completeAllTodos(e.target);
  });

  $clearCompleted.addEventListener('click', clearCompletedTodos);

  $nav.addEventListener('click', e => {
    if (!(e.target.id === 'active') && !(e.target.id === 'completed') && !(e.target.id === 'all')) return;
    [...$nav.children].forEach(navItem => navItem.classList.remove('active'));
    e.target.classList.add('active');
    menuFlag = e.target.id;
    render();
  });
}());
