/* eslint-disable max-len */
class TodoList {
  constructor(todoList = []) {
    this.todos = todoList;
    this.$inputTodo = document.querySelector('.input-todo');
    this.$todoList = document.querySelector('.todos');
    this.$completedAll = document.querySelector('#ck-complete-all');
    this.$clearCompleted = document.querySelector('.clear-completed');

    this.$completedTodos = document.querySelector('.completed-todos');
    this.$activeTodos = document.querySelector('.active-todos');

    this.$inputTodo.onkeyup = this.addTodo;
    this.$todoList.onchange = this.completeTodo;
    this.$todoList.onclick = this.removeTodo;
    this.$completedAll.onclick = this.completeAllTodo;
    this.$clearCompleted.onclick = this.clearCompletedTodo;
  }

  render = () => {
    let html = '';
    let completedTodo = 0;
    this.todos.forEach(({ id, content, completed }) => {
      html += `<li id="${id}" class="todo-item">
      <input class="custom-checkbox" type="checkbox" id="ck-${id}" ${completed ? 'checked' : ''}>
      <label for="ck-${id}">${content}</label>
      <i class="remove-todo far fa-times-circle"></i>
      </li>`;

      if (completed) completedTodo += 1;
    });

    this.$todoList.innerHTML = html;

    this.$completedTodos.textContent = completedTodo;
    this.$activeTodos.textContent = this.todos.length - completedTodo;
  }

  generateId = () => {
    return this.todos.length ? Math.max(...this.todos.map(todo => todo.id)) + 1 : 1;
  }

  addTodo = e => {
    const content = this.$inputTodo.value.trim();
    if (content === '' || e.keyCode !== 13) return;
    this.todos = [{ id: this.generateId(), content, completed: false }, ...this.todos];
    this.$inputTodo.value = '';
    this.render();
  }

  completeTodo = e => {
    this.todos = this.todos.map(todo => (todo.id === +e.target.parentNode.id ? (Object.assign({}, todo, { completed: !todo.completed })) : todo));
    this.render();
  }

  removeTodo = e => {
    if (e.target.classList.contains('remove-todo')) {
      this.todos = this.todos.filter(todo => todo.id !== +e.target.parentNode.id);
      this.render();
    }
  }

  completeAllTodo = e => {
    this.todos = this.todos.map(todo => Object.assign({}, todo, { completed: e.target.checked }));
    this.render();
  }

  clearCompletedTodo = e => {
    this.todos = this.todos.filter(todo => !todo.completed);
    this.render();
  }
}

const todoList = new TodoList();
todoList.render();

const todoList1 = new TodoList([{ id: 1, content: 1234, completed: false }]);
todoList1.render();
