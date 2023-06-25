import React, {useCallback} from 'react'
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {Task} from "./Task";


type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTite: (id: string, newTitle: string,todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodoloist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void


}

const TodoList = React.memo((props: TodoListPropsType) => {
    console.log('Todolist called')

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [ props.addTask, props.id]);
    const removeTodolist = () => {props.removeTodoloist(props.id)};
    const changeTodolistTitle = useCallback( (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)},[props.id, props.changeTodolistTitle])

    const onAllClickHandler = useCallback( () => props.changeFilter("all", props.id),[props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback( () => props.changeFilter("active", props.id),[props.changeFilter, props.id]);
    const onCompleteClickHandler = useCallback( () => props.changeFilter("completed", props.id),[props.changeFilter, props.id]);

let tasksForTodolist = props.tasks;

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false)
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasksForTodolist.map(t => <Task changeTaskStatus={props.changeTaskStatus}
                                                 changeTaskTite={props.changeTaskTite}
                                                 removeTask={props.removeTask}
                                                 task={t}
                                                 todolistId={props.id}
                                                 key={t.id}
                />)}

            </ul>
            <div>
                <Button variant={props.filter === 'all' ? 'outlined' :"contained"} color="success" onClick={onAllClickHandler} >All</Button>
                <Button variant={props.filter === 'active' ? 'outlined' :"contained"} color="error" onClick={onActiveClickHandler}>Active</Button>
                <Button variant={props.filter === 'completed' ? 'outlined' :"contained"} color="secondary" onClick={onCompleteClickHandler}>Completed</Button>
            </div>
        </div>
    );
})


export default TodoList;

