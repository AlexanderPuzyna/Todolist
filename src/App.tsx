import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type filterValuesType = "all"|"active"|"completed";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


function App() {

    const todolistTitle_1: string = "What to learn";
    const todolistTitle_2: string = "What to buy";

    // let tasks_1: Array<TaskType> = [
    //     {id: 1, title: "HTML & CSS", isDone: true},
    //     {id: 2, title: "JS", isDone: true},
    //     {id: 3, title: "React", isDone: false},
    //     {id: 4, title: "graphQL", isDone: false},
    //     {id: 5, title: "rest Api", isDone: false},
    // ]

    let [tasks, setTasks] = useState([
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},

        ])

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);
    }

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);

    }

    let [filter, setFilter] = useState<filterValuesType>("all");

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t=> t.isDone === false)
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t=> t.isDone === true)
    }

    function changeFilter(value: filterValuesType) {
        setFilter(value);
    }

    return (
        <div className="App">
            <TodoList
                tasks={tasksForTodolist}
                title={todolistTitle_1}
                removeTask={removeTask}
                addTask={addTask}
                changeFilter={changeFilter}
            />

            {/*<TodoList tasks={tasks_2} title={todolistTitle_2}/>*/}

        </div>
    );
}

export default App;
