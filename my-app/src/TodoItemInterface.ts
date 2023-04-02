/*
    NOTES:
    I added this interface to represent the data structure returned from the API.
    However, I am not entirely sure what the data is supposed to look like.
    I am not sure if there is both a "todo_item" and a "description" or if there is only one.
*/

interface TodoItem {
    todo_id: number;
    todo_item: string;
    description: string;
    done: boolean;
}

export default TodoItem;
