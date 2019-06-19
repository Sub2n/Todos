interface Todo {
  id: number,
  content: string,
  completed: boolean
}

class TodoList {
  private todos: Todo[] = [];
  private $inputTodo: HTMLInputElement = document.querySelector('.input-todo');
  private $todos: HTMLUListElement = document.querySelector('.todos');
  private $completeAll: HTMLInputElement = document.querySelector('#ck-complete-all');
  private $clearCompleted: HTMLDivElement = document.querySelector('.clear-completed');
  private $completedTodos: HTMLSpanElement = document.querySelector('.completed-todos');
  private $activeTodos: HTMLElement = document.querySelector('.active-todos');
  private $nav: HTMLUListElement = document.querySelector('.nav');
  private $spinner: HTMLDivElement = document.querySelector('.spinner');
  private state: string = 'all';

  constructor() {
    this.$inputTodo.addEventListener('keyup', this.addEvent);
  
    this.$todos.addEventListener('change', this.completeEvent);
  
    this.$todos.addEventListener('click', this.removeEvent);
  
    this.$completeAll.addEventListener('click', this.completeAllEvent);
  
    this.$clearCompleted.addEventListener('click', this.clearCompletedTodos);
    
    this.$nav.addEventListener('click', this.navEvent);

  }

  render(resTodo?: Todo[]) {
    if (resTodo) this.todos = resTodo;

    const filterdTodos = this.todos.filter(({ completed }) => {
      if (this.state === 'all') return true;
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
    this.$completedTodos.textContent = '' + this.todos.filter(({ completed }) => completed).length;
    this.$activeTodos.textContent = '' + this.todos.filter(({ completed }) => !completed).length;
    this.$spinner.classList.remove('show');
  }

  getResponse = (url: string, payload?: object) => {
    this.$spinner.classList.add('show');
    return (fetch(url, payload)
      .then(res => res.json()));
  }

  getTodos = () => {
    this.getResponse('/todos')
      .then(this.render)
      .catch(console.error);
  }

  generateId = () => {
    return this.todos.length ? Math.max(...this.todos.map(todo => todo.id)) + 1 : 1;
  }

  addTodo = (content: string) => {
    this.getResponse('/todos', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ id: this.generateId(), content, completed: false })
    }).then(this.render)
      .catch(console.error);
  }

  completeTodo = (id: number) => {
    const completed = this.todos.find(todo => todo.id === +id);

    this.getResponse(`/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed })
    }).then(this.render)
      .catch(console.error);
  }

  removeTodo = (id: number) => {
    this.getResponse(`/todos/${id}`, {
      method: 'DELETE'
    }).then(this.render)
      .catch(console.error);
  }

  completeAllTodos = (checked: boolean) => {
    this.getResponse('/todos', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: checked })
    }).then(this.render)
      .catch(console.error);
  }

  clearCompletedTodos = () => {
    this.getResponse('/todos/completed', {
      method: 'DELETE'
    }).then(this.render)
      .catch(console.error);
  }

  addEvent = (e: KeyboardEvent) => {
    const content: string = this.$inputTodo.value.trim();
    if (content === '' || e.keyCode !== 13) return;
    this.addTodo(content);
    this.$inputTodo.value = '';
  }

  completeEvent = (e: Event) => {
    const target: HTMLElement = <HTMLElement>e.target;
    this.completeTodo(+target.parentElement.id);
  };

  removeEvent = (e: MouseEvent) => {
    const target: HTMLSpanElement = <HTMLSpanElement>e.target;
    if (!target.classList.contains('remove-todo')) return;
    this.removeTodo(+target.parentElement.id);
  }

  completeAllEvent = (e: MouseEvent) => {
    const target: HTMLInputElement = <HTMLInputElement>e.target;
    this.completeAllTodos(target.checked);
  }

  navEvent = (e: MouseEvent) => {
    const target: HTMLLIElement = <HTMLLIElement>e.target;
    if (!(target.id === 'active') && !(target.id === 'completed') && !(target.id === 'all')) return;
    [...this.$nav.children].forEach(navItem => navItem.classList.remove('active'));
    target.classList.add('active');
    this.state = target.id;
    this.render();
  }
}

window.onload = function() {
  const todoList = new TodoList();
  todoList.getTodos();
}