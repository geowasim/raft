import React from "react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { FaPrint } from "react-icons/fa";

import "../OneInvoice.css";

import { createContext } from "react";
import { totalBeforeAfterOfferType } from "../../OfferFunction";
import { ComponentToPrint } from "./TaifComponentToPrint/TaifComponentToPrint";
export const InvoiceContext = createContext();

const OneInvoice = ({
  todo,
  isEcode,
  toggleComplete,
  deleteTodo,
  handleEdit,
  readDataFromInvoiceComponent,
}) => {
  const {
    cartItems,
    methodArray,
    invoiceNumber,
    paidandchange,
    dateMyPC,
    totalPrice,
  } = todo;
  const { isOffer } = todo.off ? todo.off : "";

  const { change, paidMoney } = paidandchange;
  const serialNumber = invoiceNumber.sn;
  const timeInMyPC = todo.off ? dateMyPC : new Date(dateMyPC).toISOString();
  // const timeInMyPC = new Date().toISOString();

  const otherPrice = totalBeforeAfterOfferType(cartItems).otherPrice;
  const perfumePrice = totalBeforeAfterOfferType(cartItems).after;

  const itemPriceBefore = totalBeforeAfterOfferType(cartItems).before;

  const itemsPrice = perfumePrice + otherPrice;

  const subtotal = perfumePrice + otherPrice;

  const totalItems = cartItems.reduce((a, c) => a + c.qty, 0);

  const componentRef = useRef();
  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    handleReactToPrint();
  };

  return (
    <div className="myOneInvoice">
      <p>{todo.invoiceNumber.sn}</p>
      <p>{(subtotal * 15) / 100 + subtotal}</p>
      <p>{subtotal}</p>
      <p>{((subtotal * 15) / 100 + subtotal - subtotal).toFixed(2)}</p>
      <p>{totalItems}</p>
      <p>{methodArray.method}</p>
      <p>{todo.dateMyPC}</p>

      <p
        onClick={function () {
          handlePrint();
        }}
        style={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <FaPrint />
      </p>
      <div style={{ display: "none" }}>
        <ComponentToPrint
          cartItems={cartItems}
          ref={componentRef}
          itemsPrice={itemsPrice}
          method={methodArray.method}
          paidMoney={paidMoney}
          change={change}
          serialNumber={serialNumber}
          timeInMyPC={timeInMyPC}
          totalPrice={totalPrice}
          isOffer={isOffer ? isOffer : ""}
          itemPriceBefore={itemPriceBefore}
          todo={todo}
          offerOrNot={todo.off}
        />
      </div>
    </div>
  );
};

export default OneInvoice;
