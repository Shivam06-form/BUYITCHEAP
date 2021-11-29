import React, { useContext, useEffect, useState } from 'react'
import { Card  ,Button} from 'react-bootstrap'
import classes from './Search.module.css'
import AuthContext from '../store/auth-context'
import {BiRupee} from 'react-icons/bi'
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart,AiOutlineHeart } from "react-icons/ai";
import {BsFillCartCheckFill,BsHeartHalf } from "react-icons/bs";
import { auth ,database} from '../store/FireBase';
import firebase from 'firebase/app'



const Search = (props) => {
   const [True , setTrue] = useState(false)
   const [True2 , setTrue2] = useState(false)
    const authCtx = useContext(AuthContext)

    const signInWithProvider = (provider)=>{
    
      auth.onAuthStateChanged(authObj=>{
        auth.signInWithPopup(provider)
         if (!authObj.uid) {
         return false;
         }else{
          authCtx.login(authObj.uid )
          database.ref(`/profile/${authObj.uid}`).set({
          name: authObj.displayName,
          createdAt:firebase.database.ServerValue.TIMESTAMP
          })
          }
        })
      
    }
  
         const onGoogleSignUp = ()=>{
         signInWithProvider(new firebase.auth.GoogleAuthProvider())
         }
  
    
         const onAddToCart =  () => {
         const products = database.ref(`/profile/productsOrder/${authCtx.token}/${props.name}`)
         products.set(props)
         }
   
        const onAddToFav =  () => {
        const products = database.ref(`/profile/FavProductsOrder/${authCtx.token}/${props.name}`)
        products.set(props)
        }
   

      const products = database.ref(`/profile/productsOrder`).child(`${authCtx.token}`)
      const products2 = database.ref(`/profile/FavProductsOrder`).child(`${authCtx.token}`)
      useEffect(() => {
        products.orderByChild("name").equalTo(props.name).once('child_added',function(value) {
        setTrue(value.val().name === props.name)
      })
        products2.orderByChild("name").equalTo(props.name).once('child_added',function(value) {
        setTrue2(value.val().name === props.name)
    })

  }, [products, props.id, props.name ,products2])

 

      return (
            <div className={classes.games}>          
            <Card key={props.id}>
            <Card.Img variant="top" src={props.thumbnail}/>
            <Card.Body>
            <Card.Title style={{color:"red"}}>{props.name}</Card.Title>
            <Card.Text style={{color:"black"}}>
            Price:<BiRupee style={{marginBottom:'3px'}}/>{props.price}
            </Card.Text>
            <Card.Text style={{color:"black"}}>
            <h6>{props.Discription}</h6>
            </Card.Text>
            </Card.Body>
            {!True && authCtx.token && <Button 
            onClick={onAddToCart}>  
            <AiOutlineShoppingCart 
            style={{marginBottom:"4px"}}/>
            </Button>}
            {!True2 && authCtx.token && <Button variant="danger" 
            onClick={onAddToFav}
            ><AiOutlineHeart/></Button>}
            {True2  && authCtx.token && 
             <Button variant="danger" >
            <Link to="/favourite">
           <BsHeartHalf/>
            </Link>
            </Button>}
            {True  && <Button style={{color:"black"}}><Link to="/cart">
             <BsFillCartCheckFill style={{color:"white"}}/>
             </Link></Button>}
           {!authCtx.token && <Button variant="danger"onClick={onGoogleSignUp}>LOGIN TO START ADDING</Button>}
            </Card>
            </div>
          
         
        )
    }

    export default Search
