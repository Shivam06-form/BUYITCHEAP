import React, { useEffect, useState } from 'react'
import { database} from '../store/FireBase';
import GamesCard from './GamesCard';
import classes from './SomeGames.module.css'


 const SomeGames = () => {
 const [games, setgames] = useState([])
    const products = database.ref(`/Game`)

    useEffect(() => {
        products.orderByChild("Game").once('value',function(value) { 
            setgames(value.val().slice(0,8))
        })
      
    }, [products])

    const gamesList = games.map((game)=>
    <GamesCard
    key={game.id}
    id={game.id}
    name={game.name}
    price={game.price}
    Discription={game.Dis}
    thumbnail={game.thumbnail}
    />
    )
    return (
        <div className={classes.some}>
            <div>
          <h3 style={{textAlign:'left'}}>BestSellingGames</h3> 
          {gamesList} 
          </div>
        </div>
    )
}

export default SomeGames
