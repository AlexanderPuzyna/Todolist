import React, {ChangeEvent} from 'react'
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {Checkbox} from "@mui/material";


type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTite: (id: string, newTitle: string,todolistId: string) => void
    filter: FilterValuesType
    removeTodoloist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void


}


const TodoList = (props: TodoListPropsType) => {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    // let [title, setTitle] = useState('')
    // let [error, setError] = useState<string|null>(null)
    //
    // const addTask = () => {
    //     if(title.trim()!==''){
    //         props.addTask(title.trim(), props.id);
    //         setTitle('')
    //     } else {
    //         setError('Title is required')
    //     }
    // }
    // const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
    //     setTitle(event.currentTarget.value) }
    // const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null)
    //     if(event.key==='Enter') {
    //         addTask()
    //     }
    // }
    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompleteClickHandler = () => props.changeFilter("completed", props.id);
    const removeTodolist = () => props.removeTodoloist(props.id);
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle);}


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
                {props.tasks.map(t => {
                    const onClickHandler = () => {
                        props.removeTask(t.id, props.id)
                    }
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                    }

                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTite(t.id, newValue, props.id)
                    }

                    return (
                        <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <Checkbox
                                checked={t.isDone}
                                color='primary'
                                onChange={onChangeStatusHandler}
                            />
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                            <IconButton onClick={onClickHandler}>
                              <DeleteIcon/>
                            </IconButton>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button variant={props.filter === 'all' ? 'outlined' :"contained"} color="success" onClick={onAllClickHandler} >All</Button>
                <Button variant={props.filter === 'active' ? 'outlined' :"contained"} color="error" onClick={onActiveClickHandler}>Active</Button>
                <Button variant={props.filter === 'completed' ? 'outlined' :"contained"} color="secondary" onClick={onCompleteClickHandler}>Completed</Button>

                {/*<Button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}*/}
                {/*color='inherit'*/}
                {/*>All*/}
                {/*</Button>*/}
                {/*<Button className={props.filter === 'active' ? 'active-filter' : ''}*/}
                {/*        onClick={onActiveClickHandler}*/}
                {/*color='primary'*/}
                {/*>Active*/}
                {/*</Button>*/}
                {/*<Button className={props.filter === 'completed' ? 'active-filter' : ''}*/}
                {/*        onClick={onCompleteClickHandler}*/}
                {/*color='secondary'*/}
                {/*>Completed*/}
                {/*</Button>*/}
            </div>
        </div>
    );
};

export default TodoList;

