/* eslint-disable max-len */
/* eslint-disable func-names */
(function () {
  const $inputTodo = document.querySelector('.input-todo');
  const $todos = document.querySelector('.todos');
  const $completedAll = document.querySelector('#ck-complete-all');
  const $clearCompleted = document.querySelector('.clear-completed');
  const $completedTodos = document.querySelector('.completed-todos');
  const $activeTodos = document.querySelector('.active-todos');
  let todos = [];

  function render() {
    let html = '';
    let completedTodo = 0;
    todos.forEach(({ id, content, completed }) => {
      html += `<li id="${id}" class="todo-item">
      <input class="custom-checkbox" type="checkbox" id="ck-${id}" ${completed ? 'checked' : ''}>
      <label for="ck-${id}">${content}</label>
      <i class="remove-todo far fa-times-circle"></i>
      </li>`;

      if (completed) completedTodo += 1;
    });

    $todos.innerHTML = html;

    $completedTodos.textContent = completedTodo;
    $activeTodos.textContent = todos.length - completedTodo;
  }

  function generateId() {
    return todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
  }

  $inputTodo.addEventListener('keyup', (e) => {
    const content = $inputTodo.value.trim();
    if (content === '' || e.keyCode !== 13) return;
    todos = [{ id: generateId(), content, completed: false }, ...todos];
    $inputTodo.value = '';
    render();
  });

  $todos.addEventListener('change', (e) => {
    todos = todos.map(todo => (todo.id === +e.target.parentNode.id ? (Object.assign({}, todo, { completed: !todo.completed })) : todo));
    render();
  });

  $todos.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-todo')) {
      todos = todos.filter(todo => todo.id !== +e.target.parentNode.id);
      render();
    }
  });

  $completedAll.addEventListener('click', (e) => {
    todos = todos.map(todo => Object.assign({}, todo, { completed: e.target.checked }));
    render();
  });

  $clearCompleted.addEventListener('click', () => {
    todos = todos.filter(todo => !todo.completed);
    render();
  });
}());
