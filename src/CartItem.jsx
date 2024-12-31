import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { updateQuantity, removeItem } from './store';
import { removeItem, updateQuantity } from './CartSlice';  // Adjust path if necessary
import './CartItem.css';

  const CartItem = ({ onContinueShopping }) => {
    // const cart = useSelector(state => state.cart.items);  // Get cart items from Redux store
    const cart = useSelector(state => state.cart?.items || []);
    console.log('Cart items:', cart); // Log cart items

    const dispatch = useDispatch();
  
    // Calculate total amount for all products in the cart
    const calculateTotalAmount = () => {
      return cart.reduce((total, item) => {
        const cost = item.cost ? parseFloat(item.cost.replace('$', '')) : 0; // Ensure cost exists and is numeric
        return total + cost * item.quantity;
      }, 0).toFixed(2); // Format result to 2 decimal places
    };    

    const calculateTotalQuantity = () => {
     return cart.reduce((total, item) => total + item.quantity, 0);
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

   // Handle decrement of item quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name)); // Remove item if quantity goes to 0
    }
  };
  
    // Remove item from cart
    const handleRemove = (itemId) => {
      dispatch(removeItem(itemId)); // Dispatch removeItem to remove the item by unique id
    };    
  
    // Calculate the total cost for a specific item
    const calculateTotalCost = (item) => {
      const itemCost = item.cost ? parseFloat(item.cost.replace('$', '')) : 0;
      return (itemCost * item.quantity).toFixed(2);
    };
    

    const handleCheckoutShopping = (e) => {
      alert('Functionality to be added for future reference');
    };
    
const handleQuantityChange = (name, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ name, quantity: newQuantity }));
    } else {
      handleRemove(name); // Remove item if quantity is 0
    }
  };

const calculateTotal = (cartItems) => {
  return cartItems.reduce((total, item) => {
    const itemCost = parseFloat(item.cost.replace('$', '')) || 0; // Remove $ symbol
    return total + itemCost * item.quantity;
  }, 0).toFixed(2);
};


  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>

     {/* Display Total Quantity of Items in the Cart */}
  <div className="cart-quantity">
    <h3>Total Quantity: {calculateTotalQuantity()}</h3>
  </div>

      <div>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) :(
        cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">
              {item.cost ? `$${item.cost}` : 'Cost not available'}
              </div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>

  
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item.name)}>Delete</button>
              <button onClick={() => dispatch(removeItem(item.name))}>Remove</button>

            </div>
          </div>
        )))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      {/* Continue Shopping and Checkout Buttons */}
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={onContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={() => alert('Checkout functionality to be added!')}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;


