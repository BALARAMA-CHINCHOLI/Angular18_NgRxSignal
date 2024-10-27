import { Component, effect, inject, OnInit, viewChild } from '@angular/core';
import {MatFormFieldModule, MatLabel, MatSuffix} from '@angular/material/form-field';
//import {MatIcon} from '!angular/material/icon'
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input'
//import {matSuffix} from '@angular/suffix';

import {MatButtonToggleChange, MatButtonToggleGroup, MatButtonToggleModule} from '@angular/material/button-toggle';
//import {MatSelectModule} from '@angular/material/select';
import { TodosFilter, TodosStore } from '../store/todo.store';

import {MatListModule} from '@angular/material/list'
import { TodoService } from '../services/todo.service';
import { CommonModule } from '@angular/common';

//import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSuffix, MatLabel, 
    MatButtonToggleModule, MatListModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit{

  //inject function
  store = inject(TodosStore);

  //filter = viewChild.required(MatButtonToggleGroup);

  filter = viewChild.required(MatButtonToggleChange);

  constructor(private todoService: TodoService){

    effect(()=>{
      const filter = this.filter();

      
     //To access the signal latest value call the filter with paranthese 'filter()'. 
    //Now accessing the store and filter parameter
    filter.value = this.store.filter();
    })
 
  }

  ngOnInit(){
    this.loadTodos();
    console.log(this.loadTodos);
  }

  async loadTodos() {
    try {
      const todos = await this.todoService.getTodos();
      console.log('Fetched Todos:', todos);
      // You can dispatch actions or update the store with the fetched todos here
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }


  async onAddTodo(title: string)
  {
     await this.store.addTodo(title);


  }

  async onDeleteTodo(id: string, event: MouseEvent){
    
    //If I click on accidentaly on the line 'learn angular' list, it should not be get activate the checkbox
    event.stopPropagation() 
    
    //this is "deleteTodo(id)" returning promise so we have to use 'async' i.e "async onDeleteTodo()".
    await this.store.deleteTodo(id);
  }


  async onTodoToggled(id: string, completed: boolean){

     //with 'await' need to use 'async' otherwise through an error: 'await' expressions are only allowed within 
     //async functions and at the top levels of modules.
     await this.store.updateTodo(id, completed);
  }


  onFilterTodos(event: MatButtonToggleChange){
    const filter = event.value as TodosFilter;

    this.store.updateFilter(filter);
  }

}
