import React from "react";
import OfferComponent from "../OffersComponent/OfferComponent";

const Preview = React.forwardRef((props, ref) => {
  const {
    cartItems,
    itemsPrice,
    method,
    paidMoney,
    change,
    serialNumber,
    timeInMyPC,
    isOffer,
    codeE,
    itemPriceBefore,
  } = props;
  return (
    <div
      className="fatorah-p"
      ref={ref}
      style={{ height: "82vh", width: "100%", scale: "0.95" }}
    >
      <div className="perData-p">
        <p>معرض صناع العطور - الاحساء</p>
        <p>Simplified Vat Invoice</p>
        <p>فاتورة ضريبية مبسطة</p>

        <p>Vat: 310430668500003 :الرقم الضريبي</p>

        <p>C.R: 1010725434 :س .ت</p>
      </div>
      <div className="clientDataContainer-p">
        <div className="L1-p">
          <p>Customer: Expo Customer</p>
          <p>Phone: </p>
        </div>
        <div className="L1-p">
          <p>Flat: </p>
          <p>Building:</p>
        </div>
        <div className="L1-p">
          <p>Street: </p>
          <p>Block: </p>
        </div>
      </div>
      <hr />

      <div className="casher-p">
        <p style={{ display: "none" }}>Cachier: </p>
        <p>Salesperson: EXPO </p>
        <div className="date-p" style={{ marginTop: "5px" }}>
          <p>{timeInMyPC}</p>
          <span style={{ fontSize: "11px" }}>order# {serialNumber}</span>
        </div>
      </div>
      <div className="p-5-p" style={{ padding: "0", marginTop: "5px" }}>
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
        <div className="paymentDataContainer-p">
          <div className="paymentData-p ">
            {isOffer && (
              <div className="L1-p" style={{ fontSize: "12px" }}>
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
              <div className="L1-p">
                <p>Discount *</p>
                <p>
                  <b>{itemsPrice - itemPriceBefore} SAR</b>
                </p>
              </div>
            )}
            <div className="L1-p">
              <p>Subtotal without VAT </p>
              <p>{itemsPrice} SAR</p>
            </div>
            <div className="L1-p">
              <p>VAT 15%</p>
              <p>{Math.ceil(itemsPrice * 15) / 100} SAR </p>
            </div>
            <div className="L1-p" style={{ fontSize: "12px" }}>
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
              <h4 style={{ fontSize: "20px", color: "red" }}>
                {Number(((itemsPrice * 15) / 100 + itemsPrice).toFixed(2))} SAR
              </h4>
            </div>
            <div className="L1-p">
              <p> payment by : طريقة الدفع </p>
              <p
                style={{
                  fontSize: "18px",
                  background: "#3d69bd",
                  color: "#fff",
                }}
              >
                {method === "Mada" ? "Mada(مدى) بطاقة" : "Cash(كاش)"}
              </p>
            </div>
            {method === "Mada" ? (
              <div className="L1-p">
                <p> Received: المبلغ المستلم</p>
                <p>
                  {" "}
                  {Number(
                    ((itemsPrice * 15) / 100 + itemsPrice).toFixed(2)
                  )}{" "}
                  SAR
                </p>
              </div>
            ) : (
              <>
                <div className="L1-p">
                  <p>المبلغ المستلم Received:</p>
                  <p style={{ fontSize: "15px" }}> {paidMoney} SAR</p>
                </div>

                <div className="L1-p">
                  <p>المتبقي للعميل Change:</p>
                  <p style={{ fontSize: "15px", fontStyle: "italic" }}>
                    SAR {change}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        <br />
      </div>
      <hr />
      <OfferComponent codeE={"RYD1122"} />
      {/* <div className="welcome">
        <p style={{ marginTop: "10px" }}> نشكركم لاختياركم منتجاتنا </p>
        <p> Thank you for choosing our products</p>
        <p>See you soon!</p>
        <p>😊</p>
      </div> */}
      <hr />
    </div>
  );
});

export default Preview;
