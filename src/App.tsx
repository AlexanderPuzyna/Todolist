import React from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}


function App() {

    const todolistTitle_1: string = "What to learn";
    const todolistTitle_2: string = "What to buy";
    const tasks_1: Array<TaskType> = [
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ]

    const tasks_2: Array<TaskType> = [
        {id: 4, title: "Milk", isDone: true},
        {id: 5, title: "Bread", isDone: false},
        {id: 6, title: "Bananas", isDone: true},
    ]

    return (
        <div className="App">
            <TodoList tasks={tasks_1} title={todolistTitle_1}/>
            <TodoList tasks={tasks_2} title={todolistTitle_2}/>

        </div>
    );
}

export default App;
