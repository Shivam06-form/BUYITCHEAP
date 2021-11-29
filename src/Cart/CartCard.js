import React, { useContext } from 'react'
import {  CloseButton, Form, Image, Table} from 'react-bootstrap'
import { database} from '../store/FireBase';
import classes from './Cart.module.css'
import AuthContext from '../store/auth-context'
import { FaRupeeSign } from "react-icons/fa";


    const CartCard = (props) => {
    const authCtx = useContext(AuthContext)
    
    const removeItems = () => {
    const products = database.ref(`/profile/productsOrder/${authCtx.token}/${props.name}`)
    products.remove()
     }
      
  

     return (       
     <div className={classes.cart} >
     <CloseButton  style={{padding:'10px' , float: 'right'}} onClick={removeItems} />
     <Table striped bordered hover  >
     <thead>
     <tr>
     <th> </th>
     <th>Product Name</th>
     <th>Amount </th>
     <th>Price </th>
     </tr>
     </thead>
     <tbody>
     <tr>
     <td> 
   
      <Image src={props.thumbnail} rounded style={{width:'4rem'}} />
      </td>
      <td >{props.name}</td>
      <td>
      <Form>
      <Form.Control 
      onChange={props.onAmountChange}
      value={props.onAmount}
      type="number"  
      max="10" min="1"
      plaintext readOnly
      />
      </Form>
      </td>
      <td>{props.price} <FaRupeeSign/></td>
      </tr>
      </tbody>
      </Table>
      </div>

    )
}

export default CartCard
