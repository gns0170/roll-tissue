import React from 'react'
import Input from './Input'
import Input2 from './Input2'
import AppShell from './AppShell'
import {HashRouter as Router, Route} from 'react-router-dom'
import Home from './Home'
import Login from './Login'


function App(){
    return(
        <>
        <h2>Test for You, Sir</h2>
        <Router>
            <AppShell>
                <div>
                    <Route exact path = "/" component= {Home}/>
                    <Route exact path = "/login" component= {Login}/>
                    <Route exact path = "/input2" component= {Input2}/>
                </div>
            </AppShell>
        </Router>
        </>
    )
}

export default App
