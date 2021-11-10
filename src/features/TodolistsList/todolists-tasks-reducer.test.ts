import {tasksReducer} from "./tasks_reducer";
import {addTodolistAC, todoListReducer} from "./todoList_reducer";


test('it should be equals', () => {
    const startTodolistsState:any  = [];
    const startTasksState:any = {};


    let todolist = {
        id: 'new todolist',
        title: "What to sell",
        addedDate: '',
        order: 0
    };


    const action = addTodolistAC(todolist);

    const endTodolistsState = todoListReducer(startTodolistsState, action);
    const endTasksState = tasksReducer(startTasksState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;


    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodolists).toBe(action.todolist.id);

})