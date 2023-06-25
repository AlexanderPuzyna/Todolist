import {TaskType} from "./App";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

type TaskPropsType = {
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTite: (id: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    task: TaskType
    todolistId: string
}
export const Task = React.memo( (props: TaskPropsType) => {
    const onClickHandler = () => {
        props.removeTask(props.task.id, props.todolistId)
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistId);
    }

    const onChangeTitleHandler = useCallback( (newValue: string) => {
        props.changeTaskTite(props.task.id, newValue, props.todolistId)
    },[props.task.id, props.changeTaskTite,props.todolistId])

    return (
        <li key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
            <Checkbox
                checked={props.task.isDone}
                color='primary'
                onChange={onChangeStatusHandler}
            />
            <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
            <IconButton onClick={onClickHandler}>
                <DeleteIcon/>
            </IconButton>
        </li>
    )
})