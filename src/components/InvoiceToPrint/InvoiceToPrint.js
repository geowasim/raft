import React from "react";
import "./InvoiceToPrint.css";

export const InvoiceToPrint = React.forwardRef((props, ref) => {
  const { todo, cartItemsArrays, methodArray, invoiceNumber } = props;
  // const {  itemsPrice, method, paidMoney, change, serialNumber } =
  //   props;

  const itemsPrice = cartItemsArrays.reduce((a, c) => a + c.price * c.qty, 0);
  const totalItems = cartItemsArrays.reduce((a, c) => a + c.qty, 0);

  const taxPrice = itemsPrice * 0.15;
  // const bagPrice = itemsPrice > 300 ? 0 : 7;
  const totalPrice = taxPrice + itemsPrice;

  function calculateDateTime() {
    var timestamp = todo.date.seconds * 1000;
    var date = new Date(timestamp);

    return `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

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
          <p>{todo.dateMyPC}</p>
          <span style={{ fontSize: "11px" }}>order# {invoiceNumber.sn}</span>
        </div>
      </div>
      <div className="p-5">
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
            {cartItemsArrays.length !== 0
              ? cartItemsArrays.map((cartProduct, key) => (
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
            <div className="L1">
              <p> payment by : طريقة الدفع </p>
              <p>{methodArray.method === "Mada" ? "Mada(مدى)" : "Cash(كاش)"}</p>
            </div>
            {methodArray.method === "Mada" ? (
              <div className="L1">
                <p> Received: المبلغ المستلم</p>
                <p> {(itemsPrice * 15) / 100 + itemsPrice} SAR</p>
              </div>
            ) : (
              <>
                <div className="L1">
                  <p>المبلغ المستلم Received:</p>
                  <p> {todo.paidandchange.paidMoney} SAR</p>
                </div>

                <div className="L1">
                  <p>المتبقي للعميل Change:</p>
                  <p>SAR {todo.paidandchange.change}</p>
                </div>
              </>
            )}
          </div>
        </div>{" "}
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
