import React, { useState, useEffect } from "react";

import MyLogo from "./logoForPrint.png";
import "./ComponentToPrint.css";

export const ComponentToPrint = React.forwardRef((props, ref) => {
  const { cartItems, itemsPrice, method, paidMoney, change } = props;

  const [data, setData] = useState(JSON.parse(localStorage.getItem("SN")));

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("SN"));
    if (items) {
      setData((data) => data, items);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      localStorage.setItem("SN", JSON.stringify(data));
    }
  }, [data]);

  return (
    <div className="fatorah" ref={ref}>
      <div className="com_title">
        <h2>Qandella</h2>
        <h2> كانديـــلا </h2>
        <br />
        <div className="under_line"></div>
        <br />
      </div>
      <div className="perData">
        <p>معرض صناع العطور الثاني - الطائف</p>
        <p>Simplified Vat Invoice</p>
        <p>فاتورة ضريبية مبسطة</p>

        <p>Vat: 310430668500003 :الرقم الضريبي</p>

        <p>C.R: 1010208753 :س .ت</p>
      </div>
      <div className="clientDataContainer">
        <div className="L1">
          <p>Customer: Expo Customer</p>
          <p>Phone: </p>
        </div>
        <div className="L1">
          <p>Flat: </p>
          <p>Building:</p>
        </div>
        <div className="L1">
          <p>Street: </p>
          <p>Block: </p>
        </div>
      </div>
      <br />
      <hr />
      <br />
      <div className="casher">
        <p style={{ display: "none" }}>Cachier: </p>
        <p>Salesperson: EXPO </p>
        <div className="date">
          <p>{new Date().toLocaleString()}</p>
          <span style={{ fontSize: "11px" }}>
            order# {data[data.length - 1].sn + 1}
          </span>
        </div>
      </div>
      <div className="p-5">
        {/* ref to chcek  ref={ref}*/}
        <table className="table">
          <thead>
            <tr>
              <td>Category</td>
              <td>Description</td>
              <td>Vol-مل</td>
              <td>Qty</td>
              <td>Price</td>
              <td>Total</td>
            </tr>
          </thead>
          <tbody>
            {cartItems.length !== 0
              ? cartItems.map((cartProduct, key) => (
                  <tr key={key}>
                    <td>{cartProduct.category} </td>
                    <td>
                      <span>{cartProduct.description}</span>{" "}
                      <span>{cartProduct.title}</span>{" "}
                    </td>
                    <td>{cartProduct.vol} </td>
                    <td>{cartProduct.qty}</td>
                    <td>{cartProduct.price}</td>
                    <td>{cartProduct.qty * cartProduct.price}</td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
        <div className="paymentDataContainer">
          <div className="paymentData ">
            <div className="L1">
              <p>Total without VAT </p>
              <p>{Math.ceil(itemsPrice)} SAR</p>
            </div>
            <div className="L1">
              <p>VAT 15%</p>
              <p>{Math.ceil(itemsPrice * 15) / 100} SAR </p>
            </div>
            <div className="L1" style={{ fontSize: "12px" }}>
              <p
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span style={{ fontWeight: "bold" }}>المبلغ شامل الضريبة</span>{" "}
                <span>Total Amount include VAT:</span>{" "}
              </p>
              <h4 style={{ fontSize: "14px" }}>
                {(itemsPrice * 15) / 100 + itemsPrice} SAR
              </h4>
            </div>
            {method === "Mada" ? (
              <div className="L1">
                <p> Received: المبلغ المستلم</p>
                <p> {(itemsPrice * 15) / 100 + itemsPrice} SAR</p>
              </div>
            ) : (
              <>
                <div className="L1">
                  <p>المبلغ المستلم Received:</p>
                  <p> {paidMoney} SAR</p>
                </div>

                <div className="L1">
                  <p>المتبقي للعميل Change:</p>
                  <p>SAR {change}</p>
                </div>
              </>
            )}
          </div>
        </div>
        <br />
      </div>
      <br />
      <hr />
      <div className="welcome">
        <p style={{ marginTop: "10px" }}> نشكركم لاختياركم منتجاتنا </p>
        <p> Thank you for choosing our products</p>
        <p>See you soon!</p>
        <p>😊</p>
      </div>
    </div>
  );
});
