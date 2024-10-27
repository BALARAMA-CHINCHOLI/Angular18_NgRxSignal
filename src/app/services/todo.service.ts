import { Injectable } from "@angular/core";
import { TODOS } from "../model/mock-data";
import { Todo } from "../model/todo.model";

// @Injectable({
//     providedIn: "root"
// })

@Injectable({ providedIn: 'root' })

export class TodoService {

    //async returns promise
    async getTodos() {
        await sleep(1000)
        return TODOS;
    }


    async addTodo(todo: Partial<Todo>) {

        //simulating backend call
        await sleep(1000);
        return {


            //using spread operator
            id: Math.random().toString(36).substr(2, 9), ...todo
        } as Todo;
    }


    async deleteTodo(id: string) {
        await sleep(5000);
    }

    async updateTodo(id: string, completed: boolean){
     await sleep(500);
    }

}

//ms: miliseconds
function sleep(ms: number) {
    return new Promise(resolve =>
        setTimeout(resolve, ms));
}