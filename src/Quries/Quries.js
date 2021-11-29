import React, { useContext, useEffect, useRef, useState } from 'react'
import { Overlay,Button, Form, Col} from 'react-bootstrap';
import emailjs from 'emailjs-com';
import classes from './Qury.module.css'
import {database} from '../store/FireBase';
import AuthContext from '../store/auth-context';

const Quries = () => {
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const authCtx = useContext(AuthContext)

  useEffect(() => {
    database.ref(`/profile/${authCtx.token}`).on('value',(value)=>{
        if (authCtx.token) {
            setname(value.val().name.split(' '))      
            setemail(value.val().email)      
        }else{
            return false
        }
        
    })
}, [authCtx.token])

    function sendEmail(e) {
        e.preventDefault();

         emailjs.sendForm('service_2r4s6g4', 'template_i25fb2h', e.target, 'user_RGQJJP5Vi5dIZKBS5mlMO')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset()
    }


    const [show, setShow] = useState(false);
    const target = useRef(null);
    return (
        <div className={classes.qury}>
      <Button variant="danger" ref={target} onClick={() => setShow(!show)}>
        Ask Queries
      </Button>
      <Overlay target={target.current} show={show} placement="left">
        {({ placement, arrowProps, show: _show, popper, ...props }) => (
          <div
            {...props}
            style={{
              backgroundColor: 'rgba(255, 100, 100, 0.85)',
              padding: '2px 10px',
              color: 'white',
              borderRadius: 3,
              ...props.style,
            }}
          >
          
     <Form onSubmit={sendEmail}>
     <Form.Group as={Col} controlId="formGridEmail">
      <Form.Control type="firstname"  name="firstname" plaintext readOnly defaultValue={name}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
     <Form.Control type="email" name="email" plaintext readOnly defaultValue={email}/>
     </Form.Group>
     <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
     <Form.Label>Your Question </Form.Label>
     <Form.Control as="textarea" rows={3} type="message" name="message" 
     placeholder="Your Question will be answered in 24 hours.On your Email"
     required/>
     </Form.Group>
     <Button type="submit">Send</Button>
    </Form>


          </div>
        )}
      </Overlay>
     </div>
   
  );
}

   
export default Quries;
