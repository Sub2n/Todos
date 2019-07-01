import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-form',
  template: `
    <input
      class="input-todo"
      placeholder="What needs to be done?"
      autofocus
      [(ngModel)]="content"
      (keyup.enter)="addEvent($event.target)"
    />
  `,
  styles: [
  `
      /* .input-todo  */
      .input-todo {
        display: block;
        width: 100%;
        height: 45px;
        padding: 10px 16px;
        font-size: 18px;
        line-height: 1.3333333;
        color: #555;
        border: 1px solid #ccc;
        border-color: #e7ecee;
        border-radius: 6px;
        outline: none;
        transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
      }

      .input-todo:focus {
        border-color: #23b7e5;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
      }

      .input-todo::-webkit-input-placeholder {
        color: #999;
      }
    `
  ]
  })
export class TodoFormComponent {
  @Output() add = new EventEmitter();

  public content: string;

  addEvent() {
    if (this.content.trim() !== '') this.add.emit(this.content.trim());
    this.content = '';
  }
}
