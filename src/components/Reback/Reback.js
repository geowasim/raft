import React, { useState, useEffect } from "react";

import { db } from "../../firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  collectionGroup,
  // addDoc,
  deleteDoc,
  orderBy,
  getDoc,
  where,
} from "firebase/firestore";
import Invoicetoreback from "./InvoiceToReback";

import InvoiceMain from "./Invoices/InvoiceMain";

export default function Reback() {
  const [findInvoice, setFindInvoice] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(false);
  const [invoiceToReturn, setInvoiceToReturn] = useState("");
  const [basket, SetBasket] = useState({
    invoiceNumber: "",
  });

  // console.log("basket", basket);
  const { cartItems } = invoiceToReturn;

  // Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, "hasa22"), orderBy("invoiceNumber", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  function handleFindInvoice(e) {
    e.preventDefault();
    try {
      const found = todos.find(
        (invoice) => invoice.invoiceNumber.sn === Number(findInvoice)
      );
      if (!found) {
        setError(true);
        setFindInvoice("");
        return;
      }

      SetBasket((basket) => (basket.invoiceNumber = found));
      // console.log("findInvoice", findInvoice);
      setError(false);
      setInvoiceToReturn(found);
      setFindInvoice("");
    } catch (error) {
      console.log("wrong in finiding invoice");
      setError(true);
      setFindInvoice("");
    }
  }

  return (
    <div>
      {" "}
      <form
        className="serach"
        style={{ display: "flex", justifyContent: "center", margin: "15px 0" }}
        onSubmit={handleFindInvoice}
      >
        <input
          type="number"
          value={findInvoice}
          onChange={(e) => setFindInvoice(e.target.value)}
          style={{ border: "1px solid gray" }}
        />
        <button
          type="submit"
          style={{
            background: "lightgray",
            width: "150px",
            color: `${findInvoice.length === 7 ? "black" : "red"}`,
            cursor: "pointer",
          }}
          disabled={findInvoice.length === 7 ? false : true}
        >
          Search
        </button>
      </form>
      {error ? (
        <h4 style={{ textAlign: "center" }}>Please Check the invoice number</h4>
      ) : null}
      {!error && cartItems && (
        <InvoiceMain basket={basket} cartItems={cartItems} />
      )}
      {invoiceToReturn && (
        <button
          className="itemButton"
          onClick={() => {
            setError(false);
            setFindInvoice("");
            // setTodos("");
            setInvoiceToReturn("");
          }}
        >
          Action
        </button>
      )}
    </div>
  );
}

/**
 * export default function Reback({ dataFromInvoice }) {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    setCartItems(dataFromInvoice ? dataFromInvoice.cartItems : []);
  }, [dataFromInvoice]);

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  //handle todo by apllaying cart
  //+ some functionallity to calculate the diffrient
  return (
    <div>
      {dataFromInvoice &&
        dataFromInvoice.cartItems.map((item) => (
          <div key={item.id} className="row">
            <div className="basketTitle">{item.description}</div>
            <div className="basketIND">
              <button onClick={() => onAdd(item)} className="itemButton add">
                +
              </button>
              <button
                // onClick={() => onRemove(item)}
                className="itemButton remove"
              >
                -
              </button>
            </div>
            <div className="basketQT">
              {item.qty} X {Number(item.price) * 0.15 + Number(item.price)}
            </div>
          </div>
        ))}
    </div>
  );
}
 */
// {
//   /* {invoiceToReturn &&
//         invoiceToReturn.cartItems.map((item) => {
//           return (
//             <div key={item.id}>
//               <Invoicetoreback item={item} />
//             </div>
//           );
//         })} */
// }
