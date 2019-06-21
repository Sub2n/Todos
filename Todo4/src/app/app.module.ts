import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { TodosService } from './todos.service';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [AppComponent, TodosComponent, FilterPipe],
  imports: [BrowserModule],
  providers: [TodosService],
  bootstrap: [AppComponent]
  })
export class AppModule {}
