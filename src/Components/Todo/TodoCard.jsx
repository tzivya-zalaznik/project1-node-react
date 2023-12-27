import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import { green } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useHttp from '../../Hooks/useHttp';


const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function TodoCard(props) {
    const [open, setOpen] = React.useState(false);
    let titleRef = React.useRef(props.todo.title)
    let tagsRef = React.useRef(props.todo.tags)
    const _id = props.todo._id
    const [checked, setChecked] = React.useState(props.todo.completed)
    const { update, deleteObj } = useHttp()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        const newTitle = titleRef.current.value.length ? titleRef.current.value : props.todo.title
        const newTags = tagsRef.current.value.length ? tagsRef.current.value.split(",") : props.todo.tags.split(",")
        update('todos', { _id: _id, title: newTitle, tags: newTags }, props.refetch)
    };

    const delete1 = () => {
        deleteObj(`todos/${_id}`, props.refetch)
    };

    const putCompleted = (event) => {
        setChecked(event.target.checked)
        update('todos', { _id: _id, title: props.todo.title, tags: props.todo.tags, completed: !props.todo.completed }, props.refetch)
    }

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>

                <Typography variant="h5" component="div" sx={{ backgroundColor: 'gray', color: 'white' }}>
                    {props.todo.title}
                </Typography>
                <Typography variant="body2">
                    {props.todo.tags.map(tag => <Typography>{tag}</Typography>)}
                </Typography>
            </CardContent>
            <Button variant="contained" sx={{ height: "37px", margin: "5px", backgroundColor: green[600], opacity: "60%" }}>
                <FormControlLabel control={<Checkbox sx={{ color: 'white', '&.Mui-checked': { color: 'white' } }} onChange={putCompleted} checked={checked} />} label="Complete" />
            </Button>
            <Button onClick={delete1} variant="contained" startIcon={<DeleteIcon />} sx={{ height: "37px", margin: "5px", backgroundColor: green[600], opacity: "60%" }}>
                Delete
            </Button>
            <Button variant="contained" onClick={handleClickOpen} startIcon={<EditNoteSharpIcon />} sx={{ height: "37px", margin: "5px", backgroundColor: green[600], opacity: "60%" }}>
                Update
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Todo</DialogTitle>
                <DialogContent>
                    <TextField
                        defaultValue={props.todo.title}
                        inputRef={titleRef}
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="string"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        defaultValue={props.todo.tags}
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
                    <Button onClick={handleClose}>Save</Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}