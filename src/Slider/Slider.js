import React, { useEffect, useState } from 'react'
import { Card, Carousel } from 'react-bootstrap'
import classes from './Slider.module.css'
import {database} from '../store/FireBase';

const Slider = () => {
  const [games, setgames] = useState([])
  const products = database.ref(`/Game`)
  useEffect(() => {
    products.orderByChild("Game").once('value',function(value) { 
        setgames(value.val())
    })
  
}, [products])

const items1 = games.slice(0,2).map((game) =>
<Carousel.Item  key={game.id}>
<Card className={classes.card}>
<Card.Img variant="top" src={game.thumbnail} />
<Card.Body>
<Card.Title style={{color:'darkblue' ,textAlign:'center'}}>{game.name}</Card.Title>
<Card.Text style={{color:'darkcyan'}}>
 {game.Dis}
</Card.Text>
</Card.Body>
</Card>
</Carousel.Item>
)
const items2 = games.slice(3,5).map((game) =>
<Carousel.Item key={game.id} >
<Card className={classes.card}>
<Card.Img variant="top" src={game.thumbnail} />
<Card.Body>
<Card.Title style={{color:'darkblue' ,textAlign:'center'}}>{game.name}</Card.Title>
<Card.Text style={{color:'darkcyan'}}>
{game.Dis}
</Card.Text>

</Card.Body>
</Card>
</Carousel.Item>
)

    return (
          <div className={classes.overall}>
          <div>
        
          <Carousel className={classes.left}>
          <Carousel.Item>
          <img
           className="d-inline-flex"
           src="https://wallpaperaccess.com/full/842447.jpg"
           alt="First slide"
          />
          </Carousel.Item>
          <Carousel.Item  >
          <img
          className="d-inline-flex"
          src="https://wallpapercave.com/wp/wp5334246.jpg"
          alt="First slide"
         />
          </Carousel.Item>
          </Carousel>
        
         
          <Carousel className={classes.right}>
          <Carousel.Item  >
          <img
          className="d-inline-flex"
          src="https://www.pixel4k.com/wp-content/uploads/2020/02/kratos-god-of-war_1581271695.jpg"
          alt="First slide"
         />
          </Carousel.Item>
          <Carousel.Item  >
          <img
          className="d-inline-flex"
          src="https://wallpapercave.com/wp/wp5334246.jpg"
          alt="First slide"
         />
          </Carousel.Item>
          <Carousel.Item  >
         <img
         className="d-inline-flex"
         src="https://wallpaperaccess.com/full/2403409.jpg"
         alt="First slide"
         />
         </Carousel.Item>
         </Carousel>
         </div>
         <Carousel className={classes.slider}>
        {items1}
        </Carousel>
         <Carousel className={classes.slider}>
        {items2}
        </Carousel>
        </div>
    )
}

export default Slider
