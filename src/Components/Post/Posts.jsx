import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useGet from '../../Hooks/useGet'
import { insert } from '../../Store/postSlice'
import PostCard from './PostCard'
import * as React from 'react';
import Button from '@mui/material/Button';
import { green } from '@mui/material/colors';
import PostAddIcon from '@mui/icons-material/PostAdd';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useHttp from '../../Hooks/useHttp'


const Posts = ({ find }) => {

    const url = 'posts'

    const [open, setOpen] = React.useState(false);
    const [require, setRequire] = React.useState(true);

    let titleRef = React.useRef("")
    let bodyRef = React.useRef("")

    const postArr = useSelector((myStore) => myStore.postSlice.postArr)
    const dispatch = useDispatch()
    const { add } = useHttp()
    const { data, loading, refetch } = useGet(url)
    useEffect(() => { if (data?.length) { dispatch(insert({ arr: data })) } }, [data])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        const newTitle = titleRef.current.value.length ? titleRef.current.value : ""
        const newbody = bodyRef.current.value.length ? bodyRef.current.value : ""
        add('posts', { title: newTitle, body: newbody }, refetch)
        setOpen(false);
        setRequire(true)
    };

    return (
        <>
            <br />
            <Button color="success" variant="contained" onClick={handleClickOpen} startIcon={<PostAddIcon />} sx={{ height: "37px", margin: "5px", backgroundColor: green[600], opacity: "60%" }}>
                Add Post
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Post</DialogTitle>
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
                    <Button onClick={handleClose} disabled={require}>Save</Button>
                </DialogActions>
            </Dialog>

            {postArr.length ? postArr.map(post => post.title.toLowerCase().includes(find.toLowerCase()) && <div className='card'><PostCard post={post} refetch={refetch} /></div>) : <h1><br />There is no post</h1>}
        </>
    )
}

export default Posts