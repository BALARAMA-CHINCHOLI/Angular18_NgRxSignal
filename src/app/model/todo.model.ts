/**This is author coded data-Wrong */

// export type Todo = {
//     id: string;
//     title: string;
//     completed: string;
// }



// todo.data.ts [This is chatGPT data] (https://chatgpt.com/c/670e891f-e684-8000-8f42-087b1eeaf7c9)
export interface Todo {
    id: number; // Ensure this is set to 'number'
    title: string;
    completed: boolean;
  }