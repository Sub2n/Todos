class TodoList {
  private $inputTodo: HTMLInputElement = document.querySelector('.input-todo');
  private $todos: HTMLUListElement = document.querySelector('.todos');
  private $completeAll: HTMLInputElement = document.querySelector('#ck-complete-all');
  private $clearCompleted: HTMLDivElement = document.querySelector('.clear-completed');
  private $completedTodos = document.querySelector('.completed-todos');
  private $activeTodos = document.querySelector('.active-todos');
  private $nav = document.querySelector('.nav');
  private $spinner = document.querySelector('.spinner');

  private menuFlag = 'all';
  private todos = [];
  
}