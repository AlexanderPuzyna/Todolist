import {filterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type ChangeFilterACType = ReturnType<typeof changeFilterAC>
type ActionsType = RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleACType | ChangeFilterACType

export const TodolistsReducer = (state: TodolistType[], action: ActionsType):TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {

            return state.filter(el => el.id !== action.payload.todolistId)
        }
        case "ADD-TODOLIST": {
            let newTodolistId = action.payload.todolistId;
            let newTodolist: TodolistType = {id: newTodolistId, title: action.payload.newTodolistTitle, filter: "all"}
            return [...state, newTodolist]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.payload.todolistId2 ? {
                ...el,
                title: action.payload.newTodolistTitle
            } : el)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(el=>el.id ===action.payload.todolistId2? {...el,filter: action.payload.newFilter} : el)
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
export const changeFilterAC = (todolistId2: string, newFilter: filterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistId2,
            newFilter
        }

    } as const
}