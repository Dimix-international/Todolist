import {v1} from "uuid";
import {
    addTodolistAC, changeFilterOfTodolistAC,
    changeTitleOfTodolistAC, changeTodolistEntityStatusAC, FilterValuesType,
    removeTodolistAC, setTodolistsAC, TodolistDomainType,
    todoListReducer
} from "./todoList_reducer";

let startState: Array<TodolistDomainType>;
let todolistID_1 = v1();
let todolistID_2 = v1();

beforeEach(() => {
    startState = [
        {
            id: todolistID_1,
            title: "What to learn!",
            filter: "all",
            addedDate: '',
            entityStatus:'idle',
            order: 0
        },
        {
            id: todolistID_2,
            title: "What to buy!",
            filter: "all",
            addedDate: '',
            entityStatus:'idle',
            order: 0
        }
    ]
})
test('correct todolist should be removed', () => {

    // const endState = todoListReducer(startState, {type: 'REMOVE-TODOLIST', id: todolistID_1})
    //вызовем функцию AC которая вернет нам объект action
    const endState = todoListReducer(startState, removeTodolistAC(todolistID_1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistID_2);
})

test('add new todolist', () => {
    const endState = todoListReducer(startState, addTodolistAC({
        id: todolistID_2,
        title: "What to sell",
        addedDate: '',
        order: 0
    }));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe('What to sell');
    expect(endState[0].filter).toBe('all');
})
test('correct todolist should change title', () => {
    const newTitle = "I don't want to learn";

    /*const action = {
        type: 'CHANGE-TITLE-TODOLIST' as const,
        id: todolistID_1,
        title: newTitle
    }*/
    /*const endState = todoListReducer(startState,action);*/
    const endState = todoListReducer(startState, changeTitleOfTodolistAC(todolistID_1, newTitle));

    expect(endState[0].title).toBe('I don\'t want to learn');
    expect(endState[1].title).toBe('What to buy!');
})
test('correct filter of todolist should be changed filter', () => {
    const newFilter: FilterValuesType = "completed";

    /*const action: ChangeFilterOfTodolistType = {
        type: 'CHANGE-FILTER-TODOLIST',
        id: todolistID_2,
        filter: newFilter
    }
    const endState = todoListReducer(startState,action);*/
    const endState = todoListReducer(startState, changeFilterOfTodolistAC(todolistID_2, newFilter));

    expect(endState[1].filter).toBe('completed');
    expect(endState[0].filter).toBe('all');
})


test('todolists should be set in state', () => {

    const endState = todoListReducer([], setTodolistsAC(startState));

    expect(endState[1].filter).toBe('all');
    expect(endState.length).toBe(2);
})

test('correct entity status of todolist should be changed filter', () => {

    const endState = todoListReducer(startState, changeTodolistEntityStatusAC(todolistID_2, 'succeeded'));

    expect(endState[1].entityStatus).toBe('succeeded');
    expect(endState[0].entityStatus).toBe('idle');
})