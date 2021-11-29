import React, { useContext, useEffect, useState } from 'react'
import { Card,Button } from 'react-bootstrap'
import AuthContext from '../store/auth-context'
import classes from './SomeGames.module.css'
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart,AiOutlineHeart } from "react-icons/ai";
import {BsFillCartCheckFill , BsHeartHalf } from "react-icons/bs";
import { auth ,database} from '../store/FireBase';
import firebase from 'firebase/app'


const GamesCard = (props) => {
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


    //    const onAddToCart =  () => {
    //     const products = database.ref(`/profile/productsOrder/${authCtx.token}`).child(`${props.name}`)
    //     console.log(products.set(props))
    // }
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
       
        <div className={classes.game}>
           <Card style={{ width: '18rem'}} key={props.id}>
         <Card.Img variant="top" src={props.thumbnail} />
          <Card.Body>
         <Card.Title style={{fontFamily:'moonspace',textAlign:'center'}}>{props.name}</Card.Title>
         <Card.Text style={{fontFamily:'initial',textAlign:'center' ,color:'black'}}>
         {props.Discription}
        </Card.Text >
        <Card.Title style={{fontFamily:'initial',textAlign:'center'}}>{props.price}{''}Rs</Card.Title>
         {!True && authCtx.token && <Button 
            onClick={onAddToCart}>  
            <AiOutlineShoppingCart 
            style={{marginBottom:"4px"}}/>
            </Button>}
          {True  && <Link to="/cart">
           <Button><BsFillCartCheckFill/></Button>
            </Link>}
         { !True2 && authCtx.token && <Button variant="danger" style={{ margin:'1rem'}}
         onClick={onAddToFav}
         ><AiOutlineHeart/></Button>}
         {True2  && <Link to="/favourite">
           <Button variant="danger" style={{ margin:'1rem'}}  ><BsHeartHalf/></Button>
            </Link>}
          {!authCtx.token && <Button variant="danger"onClick={onGoogleSignUp}>LOGIN TO START ADDING</Button>}
  </Card.Body>
</Card> 
</div>
    
    )
}

export default GamesCard
