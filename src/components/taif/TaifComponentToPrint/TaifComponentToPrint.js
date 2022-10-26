import React, { useEffect } from "react";
import { Buffer } from "buffer";

import QRCode from "react-qr-code";

import { Invoice } from "@axenda/zatca";
import OfferComponent from "../../../OffersComponent/OfferComponent";

export const ComponentToPrint = React.forwardRef((props, ref) => {
  const {
    cartItems,
    itemsPrice,
    method,
    paidMoney,
    change,
    serialNumber,
    timeInMyPC,
    // totalPrice,
    isOffer,
    itemPriceBefore,
    offerOrNot,
  } = props;
  window.Buffer = Buffer;

  let timeBuf = `${timeInMyPC}`;

  let totalWithVat = String(((itemsPrice * 15) / 100 + itemsPrice).toFixed(2));
  let totalVat = String((itemsPrice * 0.15).toFixed(2));

  //----------------
  const invoice = new Invoice({
    sellerName: "النظرة الرقيقه للتجارة",
    vatRegistrationNumber: "310430668500003",
    invoiceTimestamp: timeBuf,
    invoiceTotal: totalWithVat,
    invoiceVatTotal: totalVat,
  });

  return (
    <div className="fatorah" ref={ref}>
      <div className="com_title">
        {/* <h2>Qandella</h2> */}
        <h2>مؤسسة النظرة الرقيقه للتجارة </h2>
        <br />
        <div className="under_line"></div>
        <br />
      </div>
      <div className="perData">
        <p>معرض صناع العطور الثاني - الطائف</p>
        <p>Simplified Vat Invoice</p>
        <p>فاتورة ضريبية مبسطة</p>

        <p>Vat: 310430668500003 :الرقم الضريبي</p>

        <p>C.R: 1010725434 :س .ت</p>
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
          <p>{timeInMyPC}</p>
          <span style={{ fontSize: "11px" }}>order# {serialNumber}</span>
        </div>
      </div>
      <div className="p-5">
        {/* ref to chcek  ref={ref}*/}
        <table className="table">
          <thead>
            <tr>
              <td>الصنف</td>
              <td>الوصف</td>
              <td>Vol-مل</td>
              <td>الكمية</td>
              <td>السعر</td>
              <td>المجموع</td>
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
            {isOffer && (
              <div className="L1" style={{ fontSize: "12px" }}>
                <p
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span> المبلغ السابق بدون الضريبة</span>{" "}
                  <span>Subtotal no discount:</span>{" "}
                </p>
                <h4>{itemPriceBefore} SAR</h4>
              </div>
            )}
            {isOffer && (
              <div className="L1">
                <p>Discount * الخصم</p>
                <p>
                  <b>{Math.ceil(itemsPrice) - itemPriceBefore} SAR</b>
                </p>
              </div>
            )}
            <div className="L1">
              <p>Total without VAT - المجموع بدون الضريبة</p>
              <p>{Math.ceil(itemsPrice)} SAR</p>
            </div>
            <div className="L1">
              <p>VAT 15% الضريبة</p>
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
              <p>{method === "Mada" ? "Card(بطاقة)" : "Cash(كاش)"}</p>
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
      <hr />
      <br />
      <br />
      <div
        className="qr-container"
        style={{
          height: "auto",
          margin: "0 auto",
          maxWidth: 180,
          width: "100%",
          marginTop: "15px",
        }}
      >
        <QRCode
          className="qr-code"
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={invoice.toBase64()}
          viewBox={`0 0 256 256`}
        />
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
