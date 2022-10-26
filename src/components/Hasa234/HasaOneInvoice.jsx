import React from "react";
import { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { FaRegTrashAlt, FaPrint } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// import { InvoiceToPrint } from "./InvoiceToPrint/InvoiceToPrint";
// import Reback from "./Reback/Reback";

import "./OneInvoice.css";

import { createContext } from "react";
import { totalBeforeAfterOfferType } from "../OfferFunction";
import { ComponentToPrint } from "../ComponentToPrint/ComponentToPrint";
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

  const otherPrice = totalBeforeAfterOfferType(cartItems).otherPrice;
  const perfumePrice = totalBeforeAfterOfferType(cartItems).after;

  const itemPriceBefore = totalBeforeAfterOfferType(cartItems).before;

  const itemsPrice = perfumePrice + otherPrice;

  const subtotal = perfumePrice + otherPrice;
  // console.log("off", off);
  // const subtotal = Math.round(todo.totalPrice);
  const totalItems = cartItems.reduce((a, c) => a + c.qty, 0);

  const componentRef = useRef();
  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    handleReactToPrint();
  };

  // const navigate = useNavigate();

  // const rebackHandler = (todo) => {
  //   readDataFromInvoiceComponent(todo);
  //   navigate("/reback");
  // };

  return (
    <div className="myOneInvoice">
      <p>{todo.invoiceNumber.sn}</p>
      <p>{(subtotal * 15) / 100 + subtotal}</p>
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
      {/* <p onClick={() => handleEdit(todo.id, todo)}>
          <FaEdit />
        </p>
        <Reback />
        <p onClick={() => rebackHandler(todo)}>Edit</p> */}
      {/* <button onClick={() => deleteTodo(todo.id)}>{<FaRegTrashAlt />}</button> */}
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
