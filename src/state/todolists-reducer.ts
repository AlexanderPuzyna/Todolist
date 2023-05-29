import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type ChangeFilterACType = ReturnType<typeof changeTodolistFilterAC>
export type ActionsType = RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleACType | ChangeFilterACType

export let todolistID1 = v1();
export let todolistID2 = v1();

const initialState:TodolistType[] = [
    {id: todolistID1, title: "What to learn", filter: 'active'},
    {id: todolistID2, title: "What to buy", filter: 'completed'}
]

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType):TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {

            return state.filter(el => el.id !== action.payload.todolistId)
        }
        case "ADD-TODOLIST": {
            let newTodolistId = action.payload.todolistId;
            let newTodolist: TodolistType = {id: newTodolistId, title: action.payload.newTodolistTitle, filter: "all"}
            return [newTodolist,...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.payload.todolistId2 ? {
                ...el,
                title: action.payload.newTodolistTitle
            } : el)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(el=>el.id ===action.payload.todolistId2? {...el,filter: action.payload.filter} : el)
        }

        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
             todolistId
        }
    } as const
}
export const addTodolistAC = (newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {newTodolistTitle, todolistId: v1()}
    } as const
}
export const changeTodolistTitleAC = (todolistId2: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistId2,
            newTodolistTitle
        }
    } as const
}
export const changeTodolistFilterAC = (filter: FilterValuesType, todolistId: string) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistId2: todolistId,
            filter: filter
        }

    } as const
}