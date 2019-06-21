import {
  Component, Input, Output, EventEmitter
} from '@angular/core';
import { Todo } from './todo.interface';
import { NavItem } from './nav-item.type';

@Component({
  selector: 'app-todo-list',
  template: `
    <ul class="todos" *ngIf="todos; else loading">
      <li *ngFor="let todo of todos | filter: navState" id="todo.id" class="todo-item">
        <input
          class="custom-checkbox"
          type="checkbox"
          id="ck-{{ todo.id }}"
          [checked]="todo.completed"
          (change)="toggle.emit(todo.id)"
        />
        <label for="ck-{{ todo.id }}">{{ todo.content }}</label>
        <i class="remove-todo far fa-times-circle" (click)="remove.emit(todo.id)"></i>
      </li>
    </ul>

    <ng-template #loading>
      <div class="spinner">
        <div></div>
      </div>
    </ng-template>
  `,
  styles: [
  `
      .todos {
        margin-top: 20px;
      }

      /* .todo-item */
      .todo-item {
        position: relative;
        /* display: block; */
        height: 50px;
        padding: 10px 15px;
        margin-bottom: -1px;
        background-color: #fff;
        border: 1px solid #ddd;
        border-color: #e7ecee;
        list-style: none;
      }

      .todo-item:first-child {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }

      .todo-item:last-child {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }

      /*
    .custom-checkbox
    custom-checkbox 바로 뒤에 위치한 label의 before와 after를 사용해
    custom-checkbox의 외부 박스와 내부 박스를 생성한다.

    <input class="custom-checkbox" type="checkbox" id="myId">
    <label for="myId">Content</label>
  */

      .custom-checkbox {
        display: none;
      }

      .custom-checkbox + label {
        position: absolute;
        /* 부모 위치를 기준으로 */
        top: 50%;
        left: 15px;
        transform: translate3d(0, -50%, 0);
        display: inline-block;
        width: 90%;
        line-height: 2em;
        padding-left: 35px;
        cursor: pointer;
        user-select: none;
      }

      .custom-checkbox + label:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate3d(0, -50%, 0);
        width: 20px;
        height: 20px;
        background-color: #fff;
        border: 1px solid #cfdadd;
      }

      .custom-checkbox:checked + label:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 6px;
        transform: translate3d(0, -50%, 0);
        width: 10px;
        height: 10px;
        background-color: #23b7e5;
      }

      /* .remove-todo button */
      .remove-todo {
        display: none;
        position: absolute;
        top: 50%;
        right: 10px;
        cursor: pointer;
        transform: translate3d(0, -50%, 0);
      }

      /* todo-item이 호버 상태이면 삭제 버튼을 활성화 */
      .todo-item:hover > .remove-todo {
        display: block;
      }

      /* spinner */
      .spinner {
        display: inline-block;
        position: absolute;
        width: 64px;
        height: 64px;
        top: 50%;
        left: 50%;
        z-index: 10;
        transform: translate(-50%, -75%);
      }

      .spinner:after {
        content: ' ';
        display: block;
        border-radius: 50%;
        width: 0;
        height: 0;
        margin: 6px;
        box-sizing: border-box;
        border: 26px solid #23b7e5;
        border-color: #23b7e5 transparent #23b7e5 transparent;
        animation: spinner 1.2s infinite;
      }

      @keyframes spinner {
        0% {
          transform: rotate(0);
          animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
        }

        50% {
          transform: rotate(900deg);
          animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        }

        100% {
          transform: rotate(1800deg);
        }
      }
    `
  ]
  })
export class TodoListComponent {
  @Input() todos: Todo[];

  @Input() navState: NavItem;

  @Output() toggle = new EventEmitter();

  @Output() remove = new EventEmitter();
}
