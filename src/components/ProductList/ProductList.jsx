import { useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './ProductList.css';

export function ProductList(props) {
    const navigate = useNavigate();

    // Redirect to login if not logged in
    useEffect(() => {
        if (!props.userLogged) {
            navigate('/');
        }
    }, [props.userLogged, navigate]);

    useEffect(() => {
        const fetchDisplay = async () => {
            try {
                const res = await axios.get('https://ecommerce-backend-7kfm.onrender.com/books/');
                props.setProducts(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchDisplay();
    }, [props.products]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userLogged');
        props.setUserLogged('');
        props.setLoginStatus(false);
        props.setCartItems([]); // optional: clear cart on logout
        navigate('/');
    };

    return (
        <div className="productlist-container">
            <div className="productlist-header">
                <h1 className="productlist-title">Product Catalog</h1>

                <div className="productlist-nav">
                    <div className="welcome-text">
                        Welcome, {props.userLogged}
                    </div>

                    <div className="nav-buttons">
                        <Link to="/cart" className="cart-link">
                            <h3>
                                Move to Cart Page 
                                {props.cartItems.length > 0 && (
                                    <sup>
                                        <span className="cart-badge"> ({props.cartItems.length})</span>
                                    </sup>
                                )}
                            </h3>
                        </Link>
                        <button className="logout-button" onClick={handleLogout}>
                        Logout
                            </button>
                    </div>
                    
                </div>
            </div>

            <div className="ProductList">
                {props.products.map((item, index) => (
                    <div className="Product" key={index}>
                        <h3>{item.book_name}</h3>
                        <p>{item.book_description}</p>
                        <h3><mark>${item.book_price}</mark></h3>
                        <button onClick={async () => {
                            const cartItem = {
                                user_name: props.userLogged,
                                cart_itemName: item.book_name,
                                cart_itemPrice: item.book_price,
                                cart_itemDes: item.book_description
                            };
                            console.log("Sending cart item:", cartItem);
                            try {
                                await axios.post('http://127.0.0.1:8000/cart/', cartItem);
                            } catch (err) {
                                console.error(err);
                            }
                        }}>
                            Add To Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
