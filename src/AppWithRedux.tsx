import React, {Reducer, useReducer, useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    ActionsType, addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type filterValuesType = "all" | "active" | "completed";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistType = {
    id: string
    title: string
    filter: filterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(id, todolistId));
    }

    function addTask(title: string, todolistId: string) {
        dispatch(addTaskAC(title, todolistId));
    }

    function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(id, isDone, todolistId));
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatch(changeTaskTitleAC(id, newTitle, todolistId));
    }

    let removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId));
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        const action = changeTodolistTitleAC(id,newTitle);
        dispatch(action);
    }

    let [filter, setFilter] = useState<filterValuesType>("all");

    function changeFilter(value: filterValuesType, todolistId: string) {
        dispatch(changeTodolistFilterAC(value, todolistId));
    }

    function addTodolist(title: string) {
        dispatch(addTodolistAC(title));
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((tl) => {

                        let allTodolistTasks = tasks[tl.id]
                        let tasksForTodolist = allTodolistTasks;

                        if (tl.filter === "active") {
                            tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false)
                        }
                        if (tl.filter === "completed") {
                            tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true)
                        }

                        return <Grid item key={tl.id}>
                            <Paper style={{padding: '10px'}}>
                                <TodoList
                                    key={tl.id}
                                    id={tl.id}
                                    tasks={tasksForTodolist}
                                    title={tl.title}
                                    removeTask={removeTask}
                                    addTask={addTask}
                                    changeFilter={changeFilter}
                                    changeTaskStatus={changeTaskStatus}
                                    changeTaskTite={changeTaskTitle}
                                    filter={tl.filter}
                                    removeTodoloist={removeTodolist}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>

            </Container>
        </div>
    );
}

export default AppWithRedux;
