import produce from "immer";
import React, { useState } from "react";
import InvoiceComponent from "./InvoiceComponent";

import "./style.css";

const InvoiceMain = ({ cartItems, basket }) => {
  const [totalToReturn, setTotalToReturn] = useState([]);
  const [newCartItems, setNewCartItems] = useState(basket.cartItems);

  function getModifiedItem(item) {
    //found the item in the cart and modify with match id
    setNewCartItems(
      produce((draft) => {
        draft.map((x) => {
          if (x.id === item.id) {
            x.qty = item.qty;
          }
          return x;
        });
      })
    );
  }

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const itemPriceWithVat = itemsPrice * 0.15 + itemsPrice;
  const sum = totalToReturn.reduce((acc, item) => acc + item, 0);

  // console.log({ needed: { sum, itemPriceWithVat, newCartItems } });
  return (
    <div>
      <div>InvoiceNumner # {basket.invoiceNumber.sn}</div>
      <div className="one">
        <p>Total:{itemPriceWithVat}</p>
        <p>Money to return to client : {sum.toFixed(2)}</p>

        {cartItems.map((item) => {
          return (
            <InvoiceComponent
              item={item}
              key={item.id}
              setTotalToReturn={setTotalToReturn}
              totalToReturn={totalToReturn}
              getModifiedItem={getModifiedItem}
            />
          );
        })}
      </div>
    </div>
  );
};

export default InvoiceMain;

/**
 * const InvoiceMain = ({ cartItems }) => {
  const [totalToReturn, setTotalToReturn] = useState([]);
  const [newCartItems, setNewCartItems] = useState([]);

  function handleNewCartItems(item) {
    const arr = [];
    for (let index = 0; index < 1; index++) {
      const element = cartItems[index];
      console.log("elem", element);
      arr.push(item);
    }
    console.log("arr", arr);
    setNewCartItems(arr);
  }

  console.log("newCart", newCartItems);
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const itemPriceWithVat = itemsPrice * 0.15 + itemsPrice;
  const sum = totalToReturn.reduce((acc, item) => acc + item, 0);

  // console.log({ needed: { sum, itemPriceWithVat, cartItems } });
  return (
    <div>
      <div className="one">
        <p>Total:{itemPriceWithVat}</p>
        <p>Money to return to client : {sum.toFixed(2)}</p>

        {cartItems.map((item) => {
          return (
            <InvoiceComponent
              item={item}
              key={item.id}
              setTotalToReturn={setTotalToReturn}
              totalToReturn={totalToReturn}
              handleNewCartItems={handleNewCartItems}
            />
          );
        })}
      </div>
    </div>
  );
};

 */
