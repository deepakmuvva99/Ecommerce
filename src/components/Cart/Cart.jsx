// import { Link } from "react-router-dom";
// import './Cart.css';
// import axios from "axios";
// import { useEffect } from "react";
// export function Cart(props) {

//     useEffect(()=>{
//         const fetchCart = async(e) =>{
//             let response = await axios.get('http://127.0.0.1:8000/cart/');
//             response = response.data;
//             props.setCartItems(response.filter((item)=>{
//                 return item.user_name === props.userLogged;
//             }))
//         }

//         fetchCart();
//     },[props.cartItems])
//     return (<>

//         {props.cartItems.length === 0 ?
//             <h1>
//                 Your Cart Is empty
//             </h1> :
//             <div className = "ProductList">
//                 {
//                     props.cartItems.map((item, id) => (
//                         <div  className="Product">
//                             <h3>{item.cart_itemName}</h3>
//                             <p>{item.cart_itemDes}</p>
//                             <h3><mark>{item.cart_itemPrice}</mark></h3>
//                             <button onClick={() => {
                               
//                             }}>Delete</button>

//                         </div>
//                     )
//                     )
//                 }
//             </div>
//         }

//     </>)
// }

import { Link } from "react-router-dom";
import './Cart.css';
import axios from "axios";
import { useEffect } from "react";

export function Cart(props) {

    // Fetch cart items for the logged-in user
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get('https://ecommerce-backend-7kfm.onrender.com/cart/');
                props.setCartItems(
                    response.data.filter(item => item.user_name === props.userLogged)
                );
            } catch (err) {
                console.error(err);
            }
        }

        fetchCart();
    }, [props.userLogged]); // Only re-fetch when user changes

    // Delete cart item
    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://ecommerce-backend-7kfm.onrender.com/cart/${id}/`);
            props.setCartItems(prev => prev.filter(item => item.cart_itemId !== id));
        } catch (err) {
            console.error(err);
        }
    }

    if (!props.cartItems || props.cartItems.length === 0) {
        return (
            <h1 className="cart-empty">Your Cart Is Empty</h1>
        );
    }
  
    return (
        <div className="cart-container">
            {/* Header similar to ProductList nav */}
            <div className="productlist-nav">
                <h2 className="welcome-text">Your Cart</h2>
                <Link to="/checkout" className="cart-link">Proceed to Checkout</Link>
            </div>

            <div className="ProductList">
                {props.cartItems.map((item) => (
                    <div className="Product" key={item.cart_itemId}>
                        <h3>{item.cart_itemName}</h3>
                        <p>{item.cart_itemDes}</p>
                        <h3><mark>{item.cart_itemPrice}</mark></h3>
                        <button onClick={() => handleDelete(item.cart_itemId)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );

    
}
