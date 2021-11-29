import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Heading from './Heading/Heading';
import { Switch ,Route} from 'react-router-dom';
import SomeGames from './SomeGames/SomeGames';
import { Fragment, useContext } from 'react';
import Disclimare from './Disclimare/Disclimare';
import Info from './Info/Info';
import Cart from './Cart/Cart';
import './App.css';
import AuthContext from './store/auth-context';
import Fav from './Favourite/Fav';
import Quries from './Quries/Quries';
// import GooglePay from './Payment/google/GooglePay';




function App() {
  const authCtx = useContext(AuthContext)
  return (
    <Fragment>    
     <Switch>
     <Route path="/" exact>
        <div>
    <Heading/>
     </div>
     <SomeGames />
     <Disclimare/>
     <Info/>
     </Route>
{authCtx.token &&<Route path="/cart">
<Cart/>
</Route>
}
{authCtx.token &&<Route path="/favourite">
<Fav/>
</Route>
}
{authCtx.token &&<Route path="/Checkout">

</Route>}
     </Switch>
     <Quries />
    </Fragment>

  );
}

export default App;
