import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";

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

type TasksStateType = {
    [key: string]: Array<TaskType>
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
    let [tasks, setTasks] = useState<TasksStateType>({
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

    function changeTodolistTitle(id: string, newTitle: string) {
       const todolist = todolists.find(tl => tl.id === id);
       if (todolist){
           todolist.title = newTitle
           setTodolists([...todolists]);
       }

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

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {

        let todolistTasks = tasks[todolistId];
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.title = newTitle;
            setTasks({...tasks})
        }
    }

    function addTodolist(title: string){
        let newTodolistId = v1();
        let newTodolist: TodolistType = {id:newTodolistId, title: title, filter: "all"}
        setTodolists([newTodolist, ...todolists]);
        setTasks({...tasks,[newTodolistId]:[]})

    }



    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>

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
                    changeTaskTite={changeTaskTitle}
                    filter={tl.filter}
                    removeTodoloist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}

                />
            })}
        </div>
    );
}

export default App;
