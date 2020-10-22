import React from 'react'
import {Route} from 'react-router-dom'
import Signin from './components/signin'
import Signup from './components/signup'
import Home from './components/home'
import Shop from './components/shop'
import Cart from './components/cart' 
import SingleProduct from './components/singleProduct'
import Contact from './components/contact'
import Profile from './components/profile'
import Orders from './components/orders'
import SingleOrder from'./components/singleOrder'
import Checkout from './components/checkout'
const MainRouter=()=>(
    <div>

    <Route exact path='/' component={Home} />
    <Route exact path='/signin' component={Signin} />
    <Route exact path='/signup' component={Signup} />
    <Route exact path='/shop' component={Shop} />
    <Route exact path='/cart' component={Cart} />
    <Route exact path='/product/:productID' component={SingleProduct} />
    <Route exact path='/contact' component={Contact} />
    <Route exact path='/profile' component={Profile} />
    <Route exact path='/orders' component={Orders} />
    <Route exact path='/order/:orderID' component={SingleOrder} />
    <Route exact path='/checkout' component={Checkout} />

    </div>
)

export default MainRouter;