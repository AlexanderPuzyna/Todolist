import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import {TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {AddBox} from "@mui/icons-material";


type addItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: addItemFormPropsType) => {

    let [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title);
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addItem()
        }
    }

    return (
        <div>
            <TextField
                variant="outlined"
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                label='Title'
                helperText={error}
            />
            {/*<Button style={{maxWidth: '20px', maxHeight: '20px', minWidth: '20px', minHeight: '30px'}}*/}
            {/*        variant='contained' onClick={addItem}>+</Button>*/}
            <IconButton
                color='primary'
                onClick={addItem}>
                <AddBox/>
            </IconButton>
        </div>
    );
};

export default AddItemForm;