import React,{useEffect, useState}from 'react'

const databaseURL = "https://roll-tissue-default-rtdb.firebaseio.com/";

function Input(){
    const [inputText, setInputText] = useState({name:"", value:""});
    const [outputText, setOutputText]  = useState({});


    function _get(){
        fetch(`${databaseURL}/One.json`).then(res=>{
            if(res.status !== 200){
                throw new Error(res.statusText)
            }
            return res.json();
        }).then(One =>setOutputText(One))
    }

    function _post(inputData){
        fetch(`${databaseURL}/One.json`,{
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

    function _delete(){
        fetch(`${databaseURL}/One/${id}`,{
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
    },[])

    const handleChange = (e) =>{
        setInputText({...inputText,[e.target.name]:e.target.value});

    }

    const handleClick = (e)=>{
        alert(`Did you see?
${inputText.name}, ${inputText.value}`)
        _post(inputText)
    }

    const handleDelete = (id)=>{
        _delete(id)
    }
    return(
        <>
        <div>
            <label>name<input type = "text" name = "name" onChange = {handleChange} autoFocus/></label>
            <br/>
            <label>value<input type = "text" name = "value" onChange = {handleChange} /></label>
            <br/>
            <button type= "submit" onClick = {handleClick}>"put in"</button>
        </div>

        {Object.keys(outputText).map(id=>{
            const one = outputText[id];
            return(<>
                <ul>
                    <li>name : {one.name}</li>             
                    <li>value : {one.value}</li>
                    <button type = "submit"onClick = {()=>handleDelete(id)}>delete</button>
                </ul>

                </>
            )
        })}
       </>
    )
}



export default Input;