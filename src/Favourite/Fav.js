import React, { useState,useContext,useEffect } from 'react'
import { Card, Image } from 'react-bootstrap'
import { database} from '../store/FireBase';
import AuthContext from '../store/auth-context'
import classes from './Fav.module.css'
import { Link, NavLink } from 'react-router-dom';
import { FaRupeeSign } from "react-icons/fa";
import FavCard from './FavCard';


        const Fav = () => {
        const authCtx = useContext(AuthContext)
        const [games, setgames] = useState([])
        const products = database.ref(`/profile/FavProductsOrder/${authCtx.token}`)
        const [price, setprice] = useState('')    
        // const [amount, setamount] = useState('')   
      
        useEffect(() => {
        let gamesList = []
        let Total=[]
        let FakeTotal =[0,0,0,0,0]
        products.once('value', (value) => {
        const object=value.val()
        for (const key in object) {
        gamesList.push(object[key])
        }
         
        Total.push( gamesList.map(games => games.price))
        for (let i = 0; i < Total.length; i++) {
        if (Total[i].length === 0) {
        return  setprice((FakeTotal).reduce((a, b) => a + b ))
        }
        setprice((Total[i]||FakeTotal).reduce((a, b) => a + b ))
            
        }
        setgames(gamesList)
        })
    
        }, [games, products])
          
      
    
       

           const cartList = games.map((game) =>
           <FavCard
           id={game.id}
           name={game.name}
           price={game.price}
           Discription={game.Discription}
           thumbnail={game.thumbnail}
           />
           )

      

          return (
          <div>
          <Link to='/'>
          <Image src="https://cdn.discordapp.com/attachments/681857617504763919/909770945143668746/buyitcheaplogo.png" 
          className={classes.cartImg}/>
          </Link>
          <Card  className={classes.card} >
          {cartList}
          {(games.length!==0 ) && <h3>TOTAl: {price}<FaRupeeSign/></h3>}
          {(games.length===0 || !games) && 
          <Image className={classes.empty}
          src="https://www.seekpng.com/png/detail/117-1170538_404-your-cart-is-empty.png"/>}
          {(games.length===0 || !games) &&
          <NavLink to='/'>
          Start Adding
          </NavLink>} 
          </Card>
          </div>
          );
        }

          export default Fav;
