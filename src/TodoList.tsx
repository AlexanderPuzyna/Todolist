import React, {ChangeEvent, KeyboardEvent, useState} from 'react'

import {filterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value:filterValuesType) => void
    addTask: (title: string) => void
}



const TodoList = (props: TodoListPropsType) => {

    let [title, setTitle] = useState('')

    const addTask = () => {
        props.addTask(title);
        setTitle('')
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
        setTitle(event.currentTarget.value) }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key==='Enter') {
            addTask()
        }
    }
    const onAllClickHandler = ()=>{ props.changeFilter("all")}
    const onActiveClickHandler = ()=>{ props.changeFilter("active")}
    const onCompleteClickHandler = ()=>{ props.changeFilter("completed")}



    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler }
                       onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map(t => {
                    const onClickHandler = () => {props.removeTask(t.id)}

                    return (
                        <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompleteClickHandler}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;