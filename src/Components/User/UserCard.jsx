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

export default function UserCard(props) {
    const [open, setOpen] = React.useState(false);
    let nameRef = React.useRef(props.user.name)
    let usernameRef = React.useRef(props.user.username)
    let emailRef = React.useRef(props.user.email)
    let addressRef = React.useRef(props.user.address)
    let phoneRef = React.useRef(props.user.phone)
    const _id = props.user._id 
    const { update, deleteObj } = useHttp()

    const handleClickOpen = () => {
        setOpen(true);
    };
   
    const handleClose = () => {
        setOpen(false);
        const newname = nameRef.current.value.length ? nameRef.current.value : props.user.name
        const newusername = usernameRef.current.value.length ? usernameRef.current.value : props.user.usernameRef
        const newemail = emailRef.current.value.length ? emailRef.current.value : props.user.emailRef
        const newaddress = addressRef.current.value.length ? addressRef.current.value : props.user.addressRef
        const newphone = phoneRef.current.value.length ? phoneRef.current.value : props.user.phoneRef
        update('users', { _id: _id, name: newname, username: newusername, email: newemail, address: newaddress, phone: newphone }, props.refetch)
        setOpen(false);
    };

    const delete1 = () => {
        deleteObj(`users/${_id}`, props.refetch)
    };

    return (
        <Card sx={{ minWidth: 275 }}>

            <CardContent>

                <Typography variant="h5" component="div" sx={{ backgroundColor: 'gray', color: 'white' }}>
                    {props.user.name}
                </Typography>
                <Typography variant="body2">
                    username:{props.user.username}<br />
                    email:{props.user.email}<br />
                    address:{props.user.address}<br />
                    phone:{props.user.phone}<br />
                </Typography>
            </CardContent>
            <Button onClick={delete1} variant="contained" startIcon={<DeleteIcon />} sx={{ height: "37px", margin: "5px", backgroundColor: green[600], opacity: "60%" }}>
                Delete
            </Button>
            <Button variant="contained" onClick={handleClickOpen} startIcon={<EditNoteSharpIcon />} sx={{ height: "37px", margin: "5px", backgroundColor: green[600], opacity: "60%" }}>
                Update
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update User</DialogTitle>
                <DialogContent>
                    <TextField
                        inputRef={nameRef}
                        defaultValue={props.user.name}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="string"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        inputRef={usernameRef}
                        defaultValue={props.user.username}
                        autoFocus
                        margin="dense"
                        id="username"
                        label="UserName"
                        type="string"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        inputRef={emailRef}
                        defaultValue={props.user.email}
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="string"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        inputRef={addressRef}
                        defaultValue={props.user.address}
                        autoFocus
                        margin="dense"
                        id="address"
                        label="Address"
                        type="string"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        inputRef={phoneRef}
                        defaultValue={props.user.phone}
                        autoFocus
                        margin="dense"
                        id="phone"
                        label="Phone"
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