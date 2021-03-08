import React,{Children, useState} from 'react'
import {Link as RouterLink} from 'react-router-dom'
import Link from '@material-ui/core/Link'
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'


const styles = makeStyles({
    root: {
        flexGrow:1,

    },
    menuButton: {
        marginRight : 'auto'
    }

})

function AppShell({children}){

    const classes = styles();

    const [setting,setSetting] = useState({drawer1 : false})

    const handleDrawerToggle = () => setSetting({drawer1: !setting.drawer1})

    return(
        <>
        <div className = {classes.root}>
            <AppBar position = "static">
                    <IconButton className = {classes.menuButton} color = "inherit" onClick= {handleDrawerToggle}>
                        <MenuIcon/>
                    </IconButton>
            </AppBar>
            <Drawer open = {setting.drawer1}>
                <MenuItem onClick = {handleDrawerToggle}>
                    <Link component = {RouterLink} to = "/">
                        Home
                    </Link>
                </MenuItem>
                <MenuItem onClick = {handleDrawerToggle}>
                    <Link component = {RouterLink} to = "/input2">
                        Input2
                    </Link>
                </MenuItem>
                <MenuItem onClick = {handleDrawerToggle}>
                    <Link component = {RouterLink} to = "/login">
                        Login
                    </Link>
                </MenuItem>
            </Drawer>
        </div>
        <div id = "content" style = {{margin:'auto',marginTop : '20px'}}>
        {React.cloneElement(children, {        parent: 'AppShell',      })}
        </div>

        </>
    )
}

export default AppShell;