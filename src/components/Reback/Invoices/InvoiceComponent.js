import React, { useState, useEffect } from "react";
import "./style.css";
const InvoiceComponent = (props) => {
  const { item, totalToReturn, setTotalToReturn, getModifiedItem } = props;

  const [newItem, setnewItem] = useState(item);

  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    getModifiedItem(newItem);
  }, [newItem]);

  // const [basket, setBasket] = useState(item);
  // const [stateQuantity, setStateQuantity] = useState(item.qty);
  // console.log(stateQuantity);

  function totalPrice(price, qty) {
    return (Number(price * 0.15) + Number(price)) * Number(qty);
  }
  function itemPriceWithVat(price) {
    return Number(price * 0.15) + Number(price);
  }

  return (
    <div>
      <div className="inf">
        <p>{newItem.category}</p>
        <p>{newItem.title}</p>
        <p>{totalPrice(newItem.price, newItem.qty)}</p>
        <p>{newItem.qty}</p>
        <button
          className="btn"
          type="button"
          onClick={() => {
            setQuantity(quantity + 1);
            setTotalToReturn([...totalToReturn, itemPriceWithVat(item.price)]);
            setnewItem({ ...newItem, qty: newItem.qty - 1 });
          }}
          disabled={newItem.qty === 0}
        >
          {" "}
          -{" "}
        </button>
        {/* <p className="itemToInventory">Items : {quantity} </p> */}
        <p>Money : {totalPrice(item.price, quantity)} SAR</p>
      </div>
    </div>
  );
};

export default InvoiceComponent;

/**
 * const InvoiceComponent = (props) => {
  const { item, totalToReturn, setTotalToReturn, handleNewCartItems } = props;
  const [basket, setBasket] = useState(item);
  const [stateQuantity, setStateQuantity] = useState(item.qty);
  console.log(stateQuantity);
  const [quantity, setQuantity] = useState(0);

  function totalPrice(price, qty) {
    return (Number(price * 0.15) + Number(price)) * Number(qty);
  }
  function itemPriceWithVat(price) {
    return Number(price * 0.15) + Number(price);
  }

  return (
    <div>
      <div className="inf">
        <p>{basket.category}</p>
        <p>{basket.title}</p>
        <p>{totalPrice(basket.price, basket.qty)}</p>
        <p>{basket.qty}</p>
        <button
          className="btn"
          type="button"
          onClick={() => {
            setBasket({ ...basket, qty: basket.qty - 1 });
            console.log("itemafter", basket);
            setQuantity(quantity + 1);
            setTotalToReturn([...totalToReturn, itemPriceWithVat(item.price)]);
            handleNewCartItems(basket);
          }}
          disabled={basket.qty === 0}
        >
          {" "}
          -{" "}
        </button>
        <p className="itemToInventory">Items : {quantity} </p>
        <p>Money : {totalPrice(item.price, quantity)} SAR</p>
      </div>
    </div>
  );
};

 */
