import React, { useContext, useState } from 'react'
import { Button, Card, Form, Image} from 'react-bootstrap'
import classes from './Heading.module.css'
import { BsSearch } from  'react-icons/bs';import Slider from '../Slider/Slider';
import FetchProducts from '../store/FetchProducts';
import Search from '../Search/Serach';
import { auth ,database} from '../store/FireBase';
import AuthContext from '../store/auth-context'
import firebase from 'firebase/app'
import NoProducts from '../Search/NoProducts';
import Profile from './Profile';


    const Heading = () => {
      const [name, setname] = useState('')
    const authCtx = useContext(AuthContext)
    const logInStatus = authCtx.token
    const Fetch = FetchProducts()


    const SeachValue = (props) => {
    props.preventDefault()
    Fetch.setIsProducts(props.target.value)
   }

 
   const signInWithProvider = (provider)=>{
    
    auth.onAuthStateChanged(authObj=>{
      auth.signInWithPopup(provider)
      if (!authObj) {
        return false
      }else{
        setname(authObj.displayName)
        authCtx.login(authObj.uid )
        database.ref(`/profile/${authObj.uid}`).set({
          name: authObj.displayName,
          createdAt:firebase.database.ServerValue.TIMESTAMP,
          email: authObj.email,
        })
      }
    })
    
  }

       const onGoogleSignUp = ()=>{
       signInWithProvider(new firebase.auth.GoogleAuthProvider())
      //  window.location.reload()
       }


      const LogOut = ()=>{
        authCtx.logout()
        window.location.reload()    
      }

   const onKeyDown = (ev) => {
    if (ev.keyCode === 13) {
      Fetch.fetchProducts()
    
    }
  }

   const productsList =  Fetch.products.map((game) => {

    return(
     <Search
     id={game.id}
     name={game.name}
     price={game.price}
     Discription={game.Dis}
     thumbnail={game.thumbnail}
      />
      )
 })



    return (
        <div>
                
                 <div className={classes.heading}> 
                 <Image src="https://cdn.discordapp.com/attachments/681857617504763919/909770945143668746/buyitcheaplogo.png" 
                 className={classes.title}/>
                 <div className={classes.login}>
                 <Profile
                 onGoogleSignUp={onGoogleSignUp}
                 LogOut={LogOut}
                 logInStatus={logInStatus}
                 name={name}
                 />
                  </div>                     
                 <Form className={classes.Form}>
                 <Form.Control 
                 placeholder="Search.."
                 type="text"
                 value={Fetch.isProducts}
                 onChange={SeachValue}
                 onKeyDown={onKeyDown}
                />
                <Button onClick={Fetch.fetchProducts} ><BsSearch/></Button>
                </Form>
                <Card.Title className={classes.title2}>BUYITCHEAP</Card.Title>
                </div>
                {!Fetch.touched&& <Slider/>}
                {Fetch.touched&& productsList}
                {Fetch.touched&& productsList.length === 0&& 
                <NoProducts/>
                }
        </div>
    )
}

export default Heading
