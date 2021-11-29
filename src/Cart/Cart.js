import React, { useState,useContext,useEffect } from 'react'
import { Card, Image ,Button, Form,Col,Alert} from 'react-bootstrap'
import { database} from '../store/FireBase';
import CartCard from './CartCard';
import AuthContext from '../store/auth-context'
import classes from './Cart.module.css'
import { Link, NavLink } from 'react-router-dom';
import { FaRupeeSign ,FaLevelDownAlt} from "react-icons/fa";
import emailjs from 'emailjs-com';





      const Cart = () => {
        const authCtx = useContext(AuthContext)
        const [succeeds, setsucceeds] = useState('')
        const [name, setname] = useState('')
        const [email, setemail] = useState('')
        const [games, setgames] = useState([])
        const products = database.ref(`/profile/productsOrder/${authCtx.token}`)
        const [price, setprice] = useState('')    

      

        useEffect(() => {
          database.ref( `/profile/${authCtx.token}`).on('value',(value)=>{
              if (authCtx.token) {
                  setname(value.val().name.split(' '))      
                  setemail(value.val().email)      
              }else{
                  return false
              }
              
           })

           }, [authCtx.token])

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
            // setgameName(gamesList.map(games => games.name))
            
           }
  
           setgames(gamesList)
           })
    
           }, [games, products])
          
      
            function sendEmail(e) {
            e.preventDefault();
    
             emailjs.sendForm('service_2r4s6g4', 'template_i25fb2h', e.target, 'user_RGQJJP5Vi5dIZKBS5mlMO')
            .then((result) => {
                console.log(result.text);
                database.ref(`/profile/productsOrder/${authCtx.token}`).remove()
                setsucceeds(result.text)
                
            }, (error) => {
                console.log(error.text);
            });
            e.target.reset()
        }
       

           const cartList = games.map((game) =>
           <CartCard
           key={game.id}
           name={game.name}
           price={game.price}
           thumbnail={game.thumbnail}
           />
           )

          return (
          <div style={{backgroundColor: 'silver'}}>
             
          <Link to='/'>
          <Image src="https://cdn.discordapp.com/attachments/681857617504763919/909770945143668746/buyitcheaplogo.png" 
          className={classes.cartImg}/>
          </Link>
              
          <Card  className={classes.card} >
          {cartList}
          {(games.length!==0 ) && <h3>TOTAl: {price }<FaRupeeSign/></h3>}
          {/* {(games.length!==0 ) && <NavLink to="/Checkout">CHECKOUT</NavLink>}  */}
          {succeeds &&  <Alert  variant="primary">
              <h1 style={{textAlign: 'center' ,fontFamily:'inherit'}}> 
     Hi, Thanks For Purchasing. Your item will be delivered In your Gmail in (24Hours). Please Check your Gmail       
              </h1>
              </Alert>}
          {(games.length===0 || !games) && 
          <Image className={classes.empty}
          src="https://www.seekpng.com/png/detail/117-1170538_404-your-cart-is-empty.png"/>}
          {(games.length===0 || !games) &&
          <NavLink to='/'>
          Start Adding
          </NavLink>} 
          {(games.length!==0 ) && <h1  style={{textAlign: 'center'}}>Manual Payment</h1>}
          {(games.length!==0 ) &&  <h4 >UPI-9999262611@paytm</h4>}
          {(games.length!==0 ) &&   <h4>Paytm Wallet-8700270816 </h4>}
          <h5>After Payment Click Here <FaLevelDownAlt/> </h5>
          <h6 style={{textAlign: 'right'}}>Invoice are  recorded</h6>
       <Form onSubmit={sendEmail} >
      <Form.Group as={Col} controlId="formGridEmail" hidden>
      <Form.Control type="firstname"  name="firstname" plaintext readOnly defaultValue={name} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" hidden>
      <Form.Control type="email" name="email" plaintext readOnly defaultValue={email}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
      <Form.Control as="textarea" rows={2} type="message" name="message" 
      placeholder={ price} readOnly defaultValue={price} hidden
      required/>
      <Form.Control as="textarea" rows={3} type="message" name="message" 
      placeholder={ games.map(game=>game.name)} 
      readOnly defaultValue={games.map(game=>game.name)} hidden
      required/>
      </Form.Group>
      <Button type="submit" 
      style={{width: '100%'}}
      >Paid</Button>
      </Form>
          {/* <Image
          src='https://cdn.discordapp.com/attachments/681857617504763919/912317703266631700/Scan_qr_code_for_site.png'/> */}
          </Card>   
          {/* <GooglePay/> */}

   
  

          </div>
          
          );
        }

          export default Cart
