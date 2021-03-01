import React,{useEffect, useState}from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import {makeStyles, withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Dialog from '@material-ui/core/Dialog'
import DialogAction from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'


const useStyles = makeStyles({
    fab :{
        position:'fixed',
        bottom : '20px',
        right: '20px'
    }

})


const databaseURL = "https://roll-tissue-default-rtdb.firebaseio.com/";

function Input2(){

    const classes = useStyles();

    const [inputText, setInputText] = useState({name:"", text:"",password:""});
    const [outputText, setOutputText]  = useState({});
    const [setting, setSetting] = useState({
        dialog : 'false'
    })

    function _get(){
        fetch(`${databaseURL}/Two.json`).then(res=>{
            if(res.status !== 200){
                throw new Error(res.statusText)
            }
            return res.json();
        }).then(Two =>setOutputText(Two))
    }

    function _post(inputData){
        fetch(`${databaseURL}/Two.json`,{
            method : 'POST',
            body :JSON.stringify(inputData)
        }).then(res=>{
            if(res.status!==200){
                throw new Error(res.statusText)
            }
            return res.json();
        }).then(data=>{
            let nextState = outputText;
            nextState[data.name]=inputData;
            setOutputText(nextState)
        })
    }

    function _delete(id){
        fetch(`${databaseURL}/Two/${id}.json`,{
            method : 'DELETE'
        }).then(res=>{
            if(res.status!==200){
                throw new Error(res.statusText)
            }
            return res.json();
        }).then(()=>{
            let nextState = outputText;
            delete nextState[id];
            setOutputText(nextState)
        })
    }
    useEffect(()=>{
        _get();
    },[outputText])

    const handleChange = (e) =>{
        setInputText({...inputText,[e.target.name]:e.target.value});
    }

    const handleDialogToggle = () => {
        setSetting({dialog : !setting.dialog})
    }

    const handleClick = (e)=>{
        if((!inputText.name||!inputText.text||!inputText.password))
            {alert(`make full, no blank allowed here`)
                return;
            }
        alert(`Did you see?
${inputText.name}`)
        _post(inputText)
    }

    const handleDelete = (id)=>{
        _delete(id)
    }
    return(<>
        {Object.keys(outputText).map(id=>{
            const two = outputText[id];
            return(
            <Card><CardContent>
                <Grid container>
                    <Grid item xs = {9}>
                    <Typography gutterBottom>
                        {two.name}             
                    </Typography>
                    <Typography variant = "h6" component="h2">
                        {two.text}
                    </Typography>
                    </Grid>
                    <Grid item xs = {3}>
                        <Button variant = "contained" color = "primary" onClick = {()=>handleDelete(id)}>delete</Button>
                    </Grid>
                </Grid>
            </CardContent></Card>
            )
        })}

        
        <Fab color = "primary" className = {classes.fab} onClick = {handleDialogToggle}><AddIcon/></Fab>
        <Dialog open = {setting.dialog} onClose = {handleDialogToggle}>
            <DialogTitle>Write</DialogTitle>
            <DialogContent>
                <TextField label = "name" type = "text" name ="name" value = {inputText.name} onChange = {handleChange}/><br/>
                <TextField label = "text" type = "text" name ="text" value = {inputText.text} onChange = {handleChange}/><br/>
                <TextField label = "password" type = "text" name ="password" value = {inputText.password} onChange = {handleChange}/><br/>
            </DialogContent>
            <DialogActions>
                <Button variant = "contained" color = "primary" onClick = {handleClick}>GO</Button>
                <Button variant = "contained" color = "primary" onClick = {handleDialogToggle}>Cancel</Button>
            </DialogActions>
        </Dialog>
    </>)
}


export default Input2;

