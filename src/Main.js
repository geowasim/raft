import Products from "./products/Products";
import "./App.css";
import Item from "./Item/Item";
import { useState, useEffect, createContext } from "react";
import Basket from "./cart/Cart";

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date) {
  return [
    date.getFullYear(),

    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("");
}

const OrderNumberContext = createContext();

function Main() {
  const [item, setItem] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [orderNumber, setOrderNumber] = useState(formatDate(new Date()) + 1000);
  const [isPrint, setIsPrint] = useState(false);

  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("SN")) || [
      {
        sn: orderNumber,
        items: [],
        totalWithoutVat: 0,
        vat: 0,
        Amount: 0,
        qty: 0,
        method: "",
        paid: 0,
        change: 0,
        dateTime: `${
          new Date().toLocaleTimeString() +
          " - " +
          new Date().toLocaleDateString()
        }`,
      },
    ]
  );

  const resetCartItems = () => {
    setCartItems([]);
  };
  const findItem = (id) => {
    setItem(id);
  };

  // add+
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
  // remove-
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  const handleIsPrint = (v) => {
    setIsPrint(v);
  };

  return (
    <OrderNumberContext.Provider value={orderNumber}>
      <div className="App">
        <header
          className="App-header"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Products findItem={findItem} handleIsPrint={handleIsPrint} />
        </header>
        {isPrint ? (
          <Item item={item} onAdd={onAdd} />
        ) : (
          <div className="chooseItem"> اختر منتج</div>
        )}
        <Basket
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          resetCartItems={resetCartItems}
          handleIsPrint={handleIsPrint}
        />
        {/* <Invoice cartItems={cartItems} totalPrice={totalPrice} /> */}
      </div>
    </OrderNumberContext.Provider>
  );
}

export default Main;
