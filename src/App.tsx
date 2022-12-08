import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

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


function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();


    let [todolists, setTodolists] = useState<Array<TodolistType>>(
        [
            {id: todolistID1, title: "What to learn", filter: 'active'},
            {id: todolistID2, title: "What to buy", filter: 'completed'}
        ]
    )
    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "bread", isDone: true},
            {id: v1(), title: "milk", isDone: true},
        ]
    })

    function removeTask(id: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(t => t.id != id);
        setTasks({...tasks});
    }

    let removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId);
        setTodolists([...filteredTodolist]);
        delete tasks[todolistId];
        setTasks({...tasks})
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};

        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = [task, ...todolistTasks];
        setTasks({...tasks});

    }

    let [filter, setFilter] = useState<filterValuesType>("all");


    function changeFilter(value: filterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {

        let todolistTasks = tasks[todolistId];
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks})
        }
    }

    return (
        <div className="App">

            {todolists.map((tl) => {

                let allTodolistTasks = tasks[tl.id]
                let tasksForTodolist = allTodolistTasks;

                if (tl.filter === "active") {
                    tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false)
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true)
                }

                return <TodoList
                    key={tl.id}
                    id={tl.id}
                    tasks={tasksForTodolist}
                    title={tl.title}
                    removeTask={removeTask}
                    addTask={addTask}
                    changeFilter={changeFilter}
                    changeTaskStatus={changeTaskStatus}
                    filter={tl.filter}
                    removeTodoloist={removeTodolist}
                />
            })}


        </div>
    );
}

export default App;
