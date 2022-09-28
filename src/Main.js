import Products from "./products/Products";
import "./App.css";
import Item from "./Item/Item";
import { useState } from "react";
import Basket from "./cart/Cart";

function Main() {
  const [item, setItem] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isPrint, setIsPrint] = useState(false);
  const [showCalc, setShowCalc] = useState(false);

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
    <>
      <div className="App">
        <header
          className="App-header"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Products findItem={findItem} handleIsPrint={handleIsPrint} />
        </header>
        {isPrint ? (
          <Item item={item} onAdd={onAdd} setShowCalc={setShowCalc} />
        ) : (
          <div className="chooseItem"> اختر منتج</div>
        )}
        <Basket
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          resetCartItems={resetCartItems}
          handleIsPrint={handleIsPrint}
          showCalc={showCalc}
          setShowCalc={setShowCalc}
        />
        {/* <Invoice cartItems={cartItems} totalPrice={totalPrice} /> */}
      </div>
    </>
  );
}

export default Main;
