import React, {  useState } from 'react'



     const FetchProducts = () => {

     const [isProducts, setIsProducts] = useState('')
     const [products, setProducts] = useState([])
     const [touched, settouched] = useState(false)
   

     const fetchProducts = async () => {
     const response = await fetch(`https://shopping-app-8989f-default-rtdb.firebaseio.com/Game.json`)
     const responseData = await response.json();
     const filteredProducts = responseData.filter((user) => 
     user.name.toLowerCase().trim().includes(isProducts.toLowerCase().trim()))
      

     if (isProducts.length === 0 && !isProducts) {
     return <p>Bla Bla</p>
     }

   
          setProducts(filteredProducts)
          settouched(true)

   

     }
     return {fetchProducts , products, setIsProducts ,touched,isProducts}        
     }

     export default FetchProducts
