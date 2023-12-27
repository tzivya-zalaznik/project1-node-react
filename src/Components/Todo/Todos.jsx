import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useGet from '../../Hooks/useGet'
import { insert } from '../../Store/todoSlice'
import TodoCard from './TodoCard'
import * as React from 'react';
import Button from '@mui/material/Button';
import { green } from '@mui/material/colors';
import AddTaskIcon from '@mui/icons-material/AddTask';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useHttp from '../../Hooks/useHttp'

const Todos = ({find}) => {

    const url = 'todos'
    const [open, setOpen] = React.useState(false);
    const [require, setRequire] = React.useState(true);
    let titleRef = React.useRef("")
    let tagsRef = React.useRef([])

    const dispatch = useDispatch()
    const { data, loading, refetch } = useGet(url)
    useEffect(() => { if (data?.length) { dispatch(insert({ arr: data })) } }, [data])
    const todoArr = useSelector((myStore) => myStore.todoSlice.todoArr)
    
    const { add } = useHttp()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        const newTitle = titleRef.current.value.length ? titleRef.current.value : ""
        const newTags = tagsRef.current.value.length ? tagsRef.current.value.split(",") : []
        add('todos', { title: newTitle, tags: newTags }, refetch)
    };

    return (
        <>
            <br />
            <Button color="success" variant="contained" onClick={handleClickOpen} startIcon={<AddTaskIcon />} sx={{ height: "37px", margin: "5px", backgroundColor: green[600], opacity: "60%" }}>
                Add Todo
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Todo</DialogTitle>
                <DialogContent>
                    <TextField
                        required="true"
                        inputRef={titleRef}
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="string"
                        fullWidth
                        variant="standard"
                        onChange={event => {event.target.value?setRequire(false):setRequire(true)}}
                    />
                    <TextField
                        inputRef={tagsRef}
                        autoFocus
                        margin="dense"
                        id="tags"
                        label="Tags"
                        type="string"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={require}>Save</Button>
                </DialogActions>
            </Dialog>

            {todoArr.length?todoArr.map(todo => todo.title.toLowerCase().includes(find.toLowerCase())&&<div className='card'><TodoCard todo={todo} refetch={refetch}/></div>):<h1><br/>There is no todo</h1>}
           
        </>
    )
}

export default Todos