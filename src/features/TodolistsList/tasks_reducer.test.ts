import {v1} from "uuid";
import {
    addTaskAC,
    removeTaskAC, setTasksAC,
    tasksReducer,
    TasksStateType, updateTaskAC
} from "./tasks_reducer";
import {
    addTodolistAC,
    removeTodolistAC, setTodolistsAC,
} from "./todoList_reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";

let todolistID_1 = v1();
let todolistID_2 = v1();

let todoTaskID_1 = v1();
let todoTaskID_2 = v1();


let startState: TasksStateType;
beforeEach(() => {
    startState = {
        [todolistID_1]: [
            {
                id: todoTaskID_1,
                title: "HTML&CSS",
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: todolistID_1,
                order: 0,
            },
            {
                id: todoTaskID_2,
                title: "JS",
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: todolistID_1,
                order: 0,
            },
        ],
        [todolistID_2]: [
            {
                id: todoTaskID_1,
                title: "Bear",
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: todolistID_2,
                order: 0,
            },
            {
                id: todoTaskID_2,
                title: "Milk",
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: todolistID_2,
                order: 0,
            },
        ]
    };
})

test('remove task', () => {

    const endState = tasksReducer(startState, removeTaskAC(todoTaskID_2, todolistID_2));

    expect(endState[todolistID_1].length).toBe(2);
    expect(endState[todolistID_2].length).toBe(1);
    //проверка что удалили элемент с id todoTaskID_2
    expect(endState[todolistID_2].every(t => t.id !== todoTaskID_2)).toBeTruthy();
})

test('add task', () => {
    const action = addTaskAC({
        id: 'id eee',
        title: "React",
        status: 0,
        addedDate: '',
        deadline: '',
        description: '',
        priority: 0,
        startDate: '',
        todoListId: todolistID_1,
        order: 0,
    })
    // const endState = tasksReducer(startState, addTaskAC('React', todolistID_1));
    const endState = tasksReducer(startState, action);

    expect(endState[todolistID_1].length).toBe(3);
    expect(endState[todolistID_1][0].title).toBe('React');
    expect(endState[todolistID_1][0].id).toBeDefined();
    expect(endState[todolistID_2].length).toBe(2);

})

test('change status of task', () => {

    const endState = tasksReducer(startState, updateTaskAC({status: TaskStatuses.InProgress},todolistID_1,todoTaskID_2));

    expect(endState[todolistID_1][1].status).toBe(TaskStatuses.InProgress)
    expect(endState[todolistID_2][1].status).toBe(TaskStatuses.Completed)

})
test('change title of task', () => {

    const endState = tasksReducer(startState, updateTaskAC({title: 'Potato'},todolistID_2,todoTaskID_1));

    expect(endState[todolistID_2][0].title).toBe('Potato');
    expect(endState[todolistID_1][0].title).toBe("HTML&CSS");

})


test('new property with new array when should be added when new todolist is made', () => {

    const endState = tasksReducer(startState, addTodolistAC({
        id: '12345',
        title: "What to buy!",
        addedDate: '',
        order: 0
    }));

    const keys = Object.keys((endState)); //получили массив ключей
    const newKey = keys.find(k => k !== todolistID_1 && k !== todolistID_2); //находим новый ключ
    if (!newKey) {
        throw Error('new key should be added')
    }
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([]);

})
test('property with todolist should be deleted', () => {

    const endState = tasksReducer(startState, removeTodolistAC(todolistID_2));

    const keys = Object.keys((endState)); //получили массив ключей

    expect(keys.length).toBe(1)
    expect(endState[todolistID_2]).not.toBeDefined();

})

test('empty array should be added when we set todolists', () => {

    const action = setTodolistsAC([
        {
            id: todolistID_1,
            title: "What to learn!",
            addedDate: '',
            order: 0
        },
        {
            id: todolistID_2,
            title: "What to buy!",
            addedDate: '',
            order: 0
        }
    ]);

    const endState = tasksReducer({}, action);

    const keys = Object.keys((endState)); //получили массив ключей
    expect(keys.length).toBe(2);
    expect(endState[todolistID_1]).toEqual([]);
    expect(endState[todolistID_2]).toEqual([]);

})
test('tasks should be added for todolists', () => {

    const action = setTasksAC([
        {
            id: todoTaskID_1,
            title: "HTML&CSS",
            status: TaskStatuses.New,
            addedDate: '',
            deadline: '',
            description: '',
            priority: TaskPriorities.Low,
            startDate: '',
            todoListId: todolistID_1,
            order: 0,
        },
        {
            id: todoTaskID_2,
            title: "JS",
            status: TaskStatuses.Completed,
            addedDate: '',
            deadline: '',
            description: '',
            priority: TaskPriorities.Low,
            startDate: '',
            todoListId: todolistID_1,
            order: 0,
        },
    ], todolistID_2);

    const endState = tasksReducer({
        [todolistID_1]: [],
        [todolistID_2]: []
    }, action);

    expect(endState[todolistID_1].length).toBe(0);
    expect(endState[todolistID_2].length).toBe(2);
})