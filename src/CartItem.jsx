import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';  // Adjust path if necessary
import './CartItem.css';

import './CartItem.css';

  const CartItem = ({ onContinueShopping }) => {
    const cart = useSelector(state => state.cart.items);  // Get cart items from Redux store
    const dispatch = useDispatch();
  
    // Calculate total amount for all products in the cart
    const calculateTotalAmount = () => {
      return cart.reduce((total, item) => total + item.cost * item.quantity, 0).toFixed(2);
    };
  
    // Handle increment of item quantity
    const handleIncrement = (item) => {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };
  
    // Handle decrement of item quantity
    // const handleDecrement = (item) => {
    //   if (item.quantity === 1) {
    //     dispatch(removeItem(item.name)); // Remove item if quantity is 1 and user clicks decrement
    //   } else {
    //     dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    //   }
    // };

    const handleDecrement = (name, currentQuantity) => {
      if (currentQuantity > 1) {
        dispatch(updateQuantity({ name, quantity: currentQuantity - 1 })); // Dispatch decrement action
      } else {
        handleRemove(name); // Remove item if quantity goes below 1
      }
    };
  
    // Remove item from cart
    const handleRemove = (name) => {
      dispatch(removeItem(name)); // Dispatch removeItem to remove the plant by name
    };
  
    // Calculate the total cost for a specific item
    const calculateTotalCost = (item) => {
      return (item.cost * item.quantity).toFixed(2);  // Multiply cost by quantity
    };

    const handleCheckoutShopping = (e) => {
      alert('Functionality to be added for future reference');
    };
    

const handleQuantityChange = (name, newQuantity) => {
    dispatch(updateQuantity({ name, quantity: newQuantity }));  // Dispatch updateQuantity with the new quantity
};

const calculateTotal = (cartItems) => {
  return cartItems.reduce((total, item) => {
    const itemCost = parseFloat(item.cost.replace('$', '')) || 0; // Remove $ symbol
    return total + itemCost * item.quantity;
  }, 0).toFixed(2);
};


const calculateTotalQuantity = () => {
  return cart.reduce((total, item) => total + item.quantity, 0);
};

removeItem: (state, action) => {
  state.items = state.items.filter(item => item.name !== action.payload);
},


  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>

     {/* Display Total Quantity of Items in the Cart */}
  <div className="cart-quantity">
    <h3>Total Quantity: {calculateTotalQuantity()}</h3>
  </div>

      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">${item.cost}</div>
              <div className="cart-item-quantity">
                {/* <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button> */}

               <button onClick={() => dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }))}>
                 +
               </button>
               <button onClick={() => dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }))}>
                 -
               </button>

              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
              <button onClick={() => dispatch(removeItem(item.name))}>Remove</button>

            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


