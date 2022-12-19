import React, {ChangeEvent} from 'react'

import {filterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: filterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTite: (id: string, newTitle: string,todolistId: string) => void
    filter: filterValuesType
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
                <button onClick={removeTodolist}>Delete</button>
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
                            <input type="checkbox" onChange={onChangeStatusHandler} checked={t.isDone}/>
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompleteClickHandler}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;

