import React, { useContext,useState ,useEffect} from 'react'
import {  CloseButton, Image, Table} from 'react-bootstrap'
import { database} from '../store/FireBase';
import classes from './Fav.module.css'
import AuthContext from '../store/auth-context'
import { FaRupeeSign } from "react-icons/fa";
import { Button} from 'react-bootstrap'
import { NavLink } from 'react-router-dom';

    const FavCard = (props) => {
    const authCtx = useContext(AuthContext)
    const [True , setTrue] = useState(false)
    const removeItems = () => {
    const products = database.ref(`/profile/FavProductsOrder/${authCtx.token}/${props.name}`)
    products.remove()
  }
  
  const onAddToCart =  () => {
    const products = database.ref(`/profile/productsOrder/${authCtx.token}/${props.name}`)
    products.set(props)
    }
 
    const products = database.ref(`/profile/productsOrder`).child(`${authCtx.token}`)
    useEffect(() => {
    products.orderByChild("name").equalTo(props.name).once('child_added',function(value) {
    setTrue(value.val().name === props.name)
    })
    }, [products, props.id, props.name])

     return (       
     <div className={classes.cart} >
     <CloseButton  style={{padding:'10px' , float: 'right'}} onClick={removeItems} />
     <Table striped bordered hover  >
     <thead>
     <tr>
     <th>Product </th>
     <th>Discription</th>
     <th>Price </th>
     </tr>
     </thead>
     <tbody>
     <tr>
     <td> 
     <Image src={props.thumbnail} rounded style={{width:'14rem'}} />
     </td>
     <td>{props.Discription}</td>
     <td>
     <td>{props.price} <FaRupeeSign/></td>
     {!True && <Button onClick={onAddToCart}>AddToCart</Button>} 
     {True  && <NavLink to="/cart">
             Go To Cart
             </NavLink>}
     </td>
     </tr>
     </tbody>
     </Table>
     </div>

    )
}

export default FavCard;
