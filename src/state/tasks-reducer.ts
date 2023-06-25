import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import todoList from "../TodoList";
import {AddTodolistACType, RemoveTodolistACType, todolistID1, todolistID2} from "./todolists-reducer";

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
type ActionsType = RemoveTaskACType | AddTaskACType | ChangeTaskStatusActionType | changeTaskTitleActionType | AddTodolistACType | RemoveTodolistACType

const initialState:TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = state[action.payload.todolistId1]
            const filteredTasks = tasks.filter(t => t.id != action.payload.id)
            stateCopy[action.payload.todolistId1] = filteredTasks
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.payload.todolistId];
            const newTask = {id: v1(), title: action.payload.title, isDone: false};
            const newTasks = [newTask, ...tasks]
            stateCopy[action.payload.todolistId] = newTasks
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.payload.todolistId];
            state[action.payload.todolistId] = todolistTasks
                .map(t => t.id === action.payload.taskId
                    ? {...t, isDone: action.payload.isDone}
                    : t
                )
            return ({...state});

        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.payload.todolistId]
            state[action.payload.todolistId] = todolistTasks
                .map(t => t.id === action.payload.id
                    ? {...t, title: action.payload.title}
                    : t
                )
            return ({...state});
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state};
            stateCopy[action.payload.todolistId] = [];
            return stateCopy;
        }
        case 'REMOVE-TODOLIST': {

            const stateCopy = {...state}
            delete stateCopy[action.payload.todolistId]
            return stateCopy;
        }
        default:
            return state
    }
}


export const removeTaskAC = (id: string, todolistId1: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            id,
            todolistId1
        }
    } as const
}

export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title,
            todolistId
        }
    } as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            taskId,
            isDone,
            todolistId
        }
    } as const
}


export const changeTaskTitleAC = (id: string, title: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            id,
            title,
            todolistId
        }
    } as const
}