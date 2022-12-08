import React, {ChangeEvent, KeyboardEvent, useState} from 'react'

import {filterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value:filterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string)=>void
    filter: filterValuesType
    removeTodoloist: (todolistId: string) => void


}



const TodoList = (props: TodoListPropsType) => {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string|null>(null)

    const addTask = () => {
        if(title.trim()!==''){
            props.addTask(title.trim(), props.id);
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
        setTitle(event.currentTarget.value) }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if(event.key==='Enter') {
            addTask()
        }
    }
    const onAllClickHandler = ()=> props.changeFilter("all", props.id);
    const onActiveClickHandler = ()=> props.changeFilter("active", props.id);
    const onCompleteClickHandler = ()=> props.changeFilter("completed", props.id);
    const removeTodolist = () => props.removeTodoloist(props.id);



    return (
        <div>
            <h3>{props.title} <button onClick={removeTodolist}>Delete</button></h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error? 'error':''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(t => {
                    const onClickHandler = () => {props.removeTask(t.id, props.id)}
                    const onChangeHandler =(e: ChangeEvent<HTMLInputElement>) =>{
                        props.changeTaskStatus(t.id, e.currentTarget.checked,props.id);
                    }


                    return (
                        <li key={t.id} className={t.isDone? 'is-done': ''}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter==='all'?'active-filter':''}  onClick={onAllClickHandler}>All</button>
                <button className={props.filter==='active'?'active-filter':''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter==='completed'?'active-filter':''} onClick={onCompleteClickHandler}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;