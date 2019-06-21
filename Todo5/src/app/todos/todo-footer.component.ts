import {
  Component, OnInit, Output, EventEmitter, Input
} from '@angular/core';

@Component({
  selector: 'app-todo-footer',
  template: `
    <div class="footer">
      <div class="complete-all">
        <input
          class="custom-checkbox"
          type="checkbox"
          id="ck-complete-all"
          (change)="completeAll.emit($event.target.checked)"
        />
        <label for="ck-complete-all">Mark all as complete</label>
      </div>
      <div class="clear-completed">
        <button class="btn" (click)="removeCompleted.emit()">
          Clear completed (<span class="completed-todos">{{ completedNums }}</span
          >)
        </button>
        <strong class="active-todos">{{ uncompletedNums }}</strong> items left
      </div>
    </div>
  `,
  styles: [
  `
      /* todo-item이 호버 상태이면 삭제 버튼을 활성화 */
      .todo-item:hover > .remove-todo {
        display: block;
      }

      .footer {
        display: flex;
        justify-content: space-between;
        margin: 20px 0;
      }

      .complete-all,
      .clear-completed {
        position: relative;
        flex-basis: 50%;
      }

      .clear-completed {
        text-align: right;
        padding-right: 15px;
      }

      .btn {
        padding: 1px 5px;
        font-size: 0.8em;
        line-height: 1.5;
        border-radius: 3px;
        outline: none;
        color: #333;
        background-color: #fff;
        border-color: #ccc;
        cursor: pointer;
      }

      .btn:hover {
        color: #333;
        background-color: #e6e6e6;
        border-color: #adadad;
      }
    `
  ]
  })
export class TodoFooterComponent {
  @Input() completedNums: number;

  @Input() uncompletedNums: number;

  @Output() completeAll = new EventEmitter();

  @Output() removeCompleted = new EventEmitter();
}
