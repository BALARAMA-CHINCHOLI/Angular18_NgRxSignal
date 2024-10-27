import { Todo } from "../model/todo.model";
//Wrong: import { signalStore } from 'signal-store';


//Guide: (https://ngrx.io/guide/signals/signal-store)
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { TodoService } from "../services/todo.service";
import { computed, inject } from "@angular/core";
import { state } from "@angular/animations";

//We can export this filter outside the other components also.
export type TodosFilter = "all" | "pending" | "completed"

type TodoState = {
    todos: Todo[];
    loading: boolean;
    filter: TodosFilter;
};

const initialState: TodoState = {
    todos: [],
    loading: false,
    filter: "all"
};


export const TodosStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),

    //Add behavior
    withMethods(
        (store, todoService = inject(TodoService)) => ({

            async loadAll() {
                patchState(store, { loading: true });

                //calling backend and we need get the resolution of data so we have to use 'await'
                const todos = await todoService.getTodos();

                patchState(store, { todos, loading: false })
            },

            //This is signiture 'title: string'
            async addTodo(title: string) {

                const todo = await todoService.addTodo({ title, completed: false });

                patchState(store, (state) => ({
                    todos: [...state.todos, todo]
                }))
            },

            async deleteTodo(id: string) {
                await todoService.deleteTodo(id);
                patchState(store, (state) => ({
                    todos: state.todos.filter(todo => todo.id !== id)
                }))

            },

            async updateTodo(id: string, completed: boolean) {
                await todoService.updateTodo(id, completed);

                patchState(store, (state) => ({
                    todos: state.todos.map(todo =>
                        todo.id == id ? { ...todo, completed } : todo)
                }))
            },

        updateFilter(filter: TodosFilter)
        {
           patchState(store, {filter});
        }
        })
    ),

    withComputed((state) => ({
        filterTodos: computed(()=>{
            const todos = state.todos();

            switch(state.filter()){
                case "all":
                case "pending":
                    return todos.filter(todo => !todo.completed)
                case "completed":
                return todos.filter(todo => todo.completed)
            }
        })
    }))


);
