import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import { green } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
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

export default function PostCard(props) {
    const [open, setOpen] = React.useState(false);
    let titleRef = React.useRef(props.post.title)
    let bodyRef = React.useRef(props.post.body)
    const _id = props.post._id
    
    const { update, deleteObj } = useHttp()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        const newTitle = titleRef.current.value.length ? titleRef.current.value : props.post.title
        const newbody = bodyRef.current.value.length ? bodyRef.current.value : props.post.body
        update('posts', { _id: _id, title: newTitle, body: newbody }, props.refetch)
        setOpen(false);
    };

    const delete1 = () => {
        deleteObj(`posts/${_id}`, props.refetch)
    };

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>

                <Typography variant="h5" component="div" sx={{ backgroundColor: 'gray', color: 'white' }}>
                    {props.post.title}
                </Typography>
                <Typography variant="body2">
                    {props.post.body}
                </Typography>
            </CardContent>
            <Button onClick={delete1} variant="contained" startIcon={<DeleteIcon />} sx={{ height: "37px", margin: "5px", backgroundColor: green[600], opacity: "60%" }}>
                Delete
            </Button>
            <Button variant="contained" onClick={handleClickOpen} startIcon={<EditNoteSharpIcon />} sx={{ height: "37px", margin: "5px", backgroundColor: green[600], opacity: "60%" }}>
                Update
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Post</DialogTitle>
                <DialogContent>
                    <TextField
                        defaultValue={props.post.title}
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
                        defaultValue={props.post.body}
                        inputRef={bodyRef}
                        autoFocus
                        margin="dense"
                        id="body"
                        label="Body"
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