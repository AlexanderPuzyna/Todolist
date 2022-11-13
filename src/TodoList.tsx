import React from 'react';
import {filterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    changeFilter: (value:filterValuesType) => void
}



const TodoList = (props: TodoListPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
                        <button onClick={ () => {props.removeTask(t.id)}}>x</button>
                    </li>)
                }
                {/*<li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>*/}
            </ul>
            <div>
                <button onClick={()=>{ props.changeFilter("all")}}>All</button>
                <button onClick={()=>{ props.changeFilter("active")}}>Active</button>
                <button onClick={()=>{ props.changeFilter("completed")}}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;