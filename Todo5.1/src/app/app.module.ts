import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TodoContainerComponent } from './todos/todo-container.component';
import { TodoFormComponent } from './todos/todo-form.component';
import { TodoNavComponent } from './todos/todo-nav.component';
import { TodoListComponent } from './todos/todo-list.component';
import { TodoFooterComponent } from './todos/todo-footer.component';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
  AppComponent,
  TodoContainerComponent,
  TodoFormComponent,
  TodoNavComponent,
  TodoListComponent,
  TodoFooterComponent,
  FilterPipe
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
  })
export class AppModule {}
