/**This is author coded data-Wrong */

// export interface Todo {
//     id: number; // Ensure this is set to 'number'
//     title: string;
//     completed: boolean;
//   }
  

// todo.data.ts [This is chatGPT data]: (https://chatgpt.com/c/670e891f-e684-8000-8f42-087b1eeaf7c9)
import { Todo } from './todo.model';

export const TODOS: Todo[] = [
  { id: "1", title: 'Learn Angular', completed: true},
  { id: "2", title: 'Learn React', completed: false },
  { id: "3", title: 'Learn Java', completed: false },
  {id: "4", title: 'C# Language', completed: false},
  {id: "5", title: 'SQL server', completed: false}
];
