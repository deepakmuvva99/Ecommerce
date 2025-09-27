import React from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import {ProductList} from './components/ProductList/ProductList';
import {Cart} from './components/Cart/Cart';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import {useState} from 'react';
import { Checkout } from './components/Checkout/Checkout';

function App(){
    const [products, setProducts] = useState([]);
    const [cartItems,setCartItems] = useState([]);
    const [userLogged, setUserLogged] = useState("");
    const [LoginStatus, setLoginStatus] = useState(false);
    return(
        <Router>
            <Routes>
                <Route path = "/" element = {<Login userLogged = {userLogged} setUserLogged = {setUserLogged} 
                LoginStatus = {LoginStatus} setLoginStatus = {setLoginStatus} /> } />
                <Route path = "/signup" element = {<Signup />} />
                <Route path = "/products" element = {<ProductList products = {products} setProducts = {setProducts}
                 cartItems = {cartItems} setCartItems = {setCartItems} userLogged = {userLogged} setUserLogged = {setUserLogged}/>}/>
                <Route path = "/cart" element = {<Cart  products = {products} setProducts = {setProducts}
                 cartItems = {cartItems} setCartItems = {setCartItems} userLogged = {userLogged}
                 LoginStatus = {LoginStatus} setLoginStatus = {setLoginStatus} />}/>
                <Route path="/checkout" element={<Checkout cartItems={cartItems} userLogged={userLogged}/>} />
            </Routes>
        </Router>
    )
}

export default App;