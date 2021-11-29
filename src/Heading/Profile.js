import React, { useContext, useEffect, useState } from 'react'
import { Offcanvas ,Button} from 'react-bootstrap';
import {  NavLink } from 'react-router-dom';
import { BsFillCartFill } from "react-icons/bs";
import classes from './Heading.module.css'
import AuthContext from '../store/auth-context';
import {database} from '../store/FireBase';

const Profile = (props) => {
    const [state, setstate] = useState('')
    const [show, setShow] = useState(false);
    const authCtx = useContext(AuthContext)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    
    useEffect(() => {
        database.ref(`/profile/${authCtx.token}`).on('value',(value)=>{
            if (authCtx.token) {
                setstate(value.val().name.split(' '))
            }else{
                return false
            }
            
        })
    }, [authCtx.token])
          
    return (
      <div>
        <Button variant="primary" onClick={handleShow}>
        {!props.logInStatus  ?"LOGIN" :"Your  Profile"}
        </Button>
        
        <Offcanvas style={{backgroundColor:'red'}} className={classes.profile} show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
        <Offcanvas.Title>Your Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <div className={classes.profile}>
        <Offcanvas.Body >
        {props.logInStatus && <h1 style={{color: 'Gold'}}>{state}</h1>}
        </Offcanvas.Body>
        </div>
        {!props.logInStatus && <Button onClick={props.onGoogleSignUp}>LOGIN</Button>}{' '}
        {props.logInStatus &&<Button onClick={ props.LogOut}>LOGOUT</Button> }
        {props.logInStatus && <Button><NavLink to="/cart"><BsFillCartFill/></NavLink></Button>}
        {props.logInStatus && <Button>  <NavLink to="/favourite">Favourite</NavLink></Button>}
        </Offcanvas>
      </div>
    )
}
export default Profile;
