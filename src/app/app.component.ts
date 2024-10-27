import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosStore } from './store/todo.store';
import { JsonPipe } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
//import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe,TodoListComponent, MatProgressSpinnerModule, MatListModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'ngrx-signal-store';
  
  images ='https://angular.io/assets/images/logos/angular/angular.png';


  store = inject(TodosStore);

  ngOnInit(){
    
    //this.store.todos();
    this.loadTodos()
      .then(()=> console.log("Todos Loaded"));
  }

  async loadTodos(){
    await this.store.loadAll();
  }
}
