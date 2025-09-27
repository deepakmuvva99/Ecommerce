import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

export function Checkout({ cartItems, userLogged }) {
    const navigate = useNavigate();
    const [total, setTotal] = useState(0);

    // Redirect to login if user is not logged in
    useEffect(() => {
        if (!userLogged) {
            navigate('/');
        }
    }, [userLogged, navigate]);

    // Calculate total whenever cartItems change
    useEffect(() => {
        const totalPrice = cartItems.reduce((sum, item) => {
            return sum + Number(item.cart_itemPrice);
        }, 0);
        setTotal(totalPrice);
    }, [cartItems]);

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>

            {cartItems.length === 0 ? (
                <p>Your cart is empty!</p>
            ) : (
                <div className="checkout-table">
                    {cartItems.map((item, index) => (
                        <div className="checkout-item" key={index}>
                            <div className="item-name">{item.cart_itemName}</div>
                            <div className="item-price">${item.cart_itemPrice}</div>
                        </div>
                    ))}

                    <div className="checkout-total">
                        <strong>Total: ${total}</strong>
                    </div>

                    <button className="checkout-button">
                        Proceed to Payment
                    </button>
                </div>
            )}
        </div>
    );
}
