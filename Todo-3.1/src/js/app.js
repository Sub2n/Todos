class TodoList {
  constructor() {
    this.todos = [];
    this.$inputTodo = document.querySelector('.input-todo');
    this.$todos = document.querySelector('.todos');
    this.$completeAll = document.querySelector('#ck-complete-all');
    this.$clearCompleted = document.querySelector('.clear-completed');
    this.$completedTodos = document.querySelector('.completed-todos');
    this.$activeTodos = document.querySelector('.active-todos');
    this.$nav = document.querySelector('.nav');
    this.$spinner = document.querySelector('.spinner');
    this.state = 'all';
    this.getResponse = (url, payload) => {
      this.$spinner.classList.add('show');
      return (fetch(url, payload)
        .then(res => res.json()));
    };
    this.getTodos = () => {
      this.getResponse('/todos')
        .then(this.render)
        .catch(console.error);
    };
    this.generateId = () => (this.todos.length ? Math.max(...this.todos.map(todo => todo.id)) + 1 : 1);
    this.addTodo = content => {
      this.getResponse('/todos', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ id: this.generateId(), content, completed: false })
      }).then(this.render)
        .catch(console.error);
    };
    this.completeTodo = id => {
      const completed = this.todos.find(todo => todo.id === +id);
      this.getResponse(`/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed })
      }).then(this.render)
        .catch(console.error);
    };
    this.removeTodo = id => {
      this.getResponse(`/todos/${id}`, {
        method: 'DELETE'
      }).then(this.render)
        .catch(console.error);
    };
    this.completeAllTodos = checked => {
      this.getResponse('/todos', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: checked })
      }).then(this.render)
        .catch(console.error);
    };
    this.clearCompletedTodos = () => {
      this.getResponse('/todos/completed', {
        method: 'DELETE'
      }).then(this.render)
        .catch(console.error);
    };
    this.addEvent = e => {
      const content = this.$inputTodo.value.trim();
      if (content === '' || e.keyCode !== 13) { return; }
      this.addTodo(content);
      this.$inputTodo.value = '';
    };
    this.completeEvent = e => {
      const { target } = e;
      this.completeTodo(+target.parentElement.id);
    };
    this.removeEvent = e => {
      const { target } = e;
      if (!target.classList.contains('remove-todo')) { return; }
      this.removeTodo(+target.parentElement.id);
    };
    this.completeAllEvent = e => {
      const { target } = e;
      this.completeAllTodos(target.checked);
    };
    this.navEvent = e => {
      const { target } = e;
      if (!(target.id === 'active') && !(target.id === 'completed') && !(target.id === 'all')) { return; }
      [...this.$nav.children].forEach(navItem => navItem.classList.remove('active'));
      target.classList.add('active');
      this.state = target.id;
      this.render();
    };
    this.$inputTodo.addEventListener('keyup', this.addEvent);
    this.$todos.addEventListener('change', this.completeEvent);
    this.$todos.addEventListener('click', this.removeEvent);
    this.$completeAll.addEventListener('click', this.completeAllEvent);
    this.$clearCompleted.addEventListener('click', this.clearCompletedTodos);
    this.$nav.addEventListener('click', this.navEvent);
  }

  render(resTodo) {
    if (resTodo) { this.todos = resTodo; }
    const filterdTodos = this.todos.filter(({ completed }) => {
      if (this.state === 'all') { return true; }
      return this.state === 'active' ? !completed : completed;
    });
    let html = '';
    filterdTodos.forEach(({ id, content, completed }) => {
      html += `<li id="${id}" class="todo-item">
        <input class="custom-checkbox" type="checkbox" id="ck-${id}" ${completed ? 'checked' : ''}>
        <label for="ck-${id}">${content}</label>
        <i class="remove-todo far fa-times-circle"></i>
        </li>`;
    });
    this.$todos.innerHTML = html;
    this.$completedTodos.textContent = `${this.todos.filter(({ completed }) => completed).length}`;
    this.$activeTodos.textContent = `${this.todos.filter(({ completed }) => !completed).length}`;
    this.$spinner.classList.remove('show');
  }
}
window.onload = function () {
  const todoList = new TodoList();
  todoList.getTodos();
};
