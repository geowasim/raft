import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { db } from "../firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import { ComponentToPrint } from "../ComponentToPrint/ComponentToPrint";

import Payment from "../payments/Payment";

import "./Cart.css";

const Basket = (props) => {
  const {
    cartItems,
    resetCartItems,
    onAdd,
    onRemove,
    handleData,
    handleIsPrint,
  } = props;
  const [method, setMethod] = useState("Mada");
  const [isCachDone, setIsCachDone] = useState(false);
  const [paidMoney, setPaidMoney] = useState(null);
  const [change, setChange] = useState(null);
  const [serialNumber, setSerialNumber] = useState(null);

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const totalItems = cartItems.reduce((a, c) => a + c.qty, 0);

  const taxPrice = itemsPrice * 0.15;
  // const bagPrice = itemsPrice > 300 ? 0 : 7;
  const totalPrice = taxPrice + itemsPrice;

  const componentRef = useRef();
  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    handleReactToPrint();
  };

  const checkPaymentMethod = (v) => {
    setMethod(v);
  };

  const isCach = (v) => {
    setIsCachDone(v);
  };

  const moneyFromClient = (v) => {
    setPaidMoney(v);
  };

  const isChange = (value) => {
    setChange(value <= 0 ? (value * -1).toFixed(2) : "");
  };

  //get lastSn //
  //get data frm const {second} = first
  // Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, "todos"), orderBy("invoiceNumber", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      console.log("1", serialNumber);
      setSerialNumber(todosArr[0].invoiceNumber.sn + 1);
      console.log("2", serialNumber);
    });
    return () => unsubscribe();
  }, []);
  // Create invoice
  const createInvoice = async () => {
    await addDoc(collection(db, "todos"), {
      methodArray: {
        method: "Mada",
      },
      cartItems: cartItems,
      invoiceNumber: {
        sn: serialNumber,
      },

      date: serverTimestamp(),
    });
  };

  return (
    <div className="basketContainer">
      <div className="basket">
        <h2 className="basketName">السلة</h2>
        <div>
          {cartItems.length === 0 && (
            <div>
              <p>السلة فارغة</p>
            </div>
          )}
        </div>
        {cartItems.map((item) => (
          <div key={item.id} className="row">
            <div className="basketTitle">{item.description}</div>
            <div className="basketIND">
              <button onClick={() => onAdd(item)} className="itemButton add">
                +
              </button>
              <button
                onClick={() => onRemove(item)}
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
        {cartItems.length !== 0 && (
          <>
            <div
              style={{
                display: "none",
              }}
            >
              {/* ---------- */}
              <ComponentToPrint
                cartItems={cartItems}
                itemsPrice={itemsPrice}
                ref={componentRef}
                method={method}
                paidMoney={paidMoney}
                change={change}
                handleData={handleData}
              />
              {/* ------------ */}
            </div>
            <hr />

            <div className="row " style={{ margin: "5px 0" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "15px 15px",
                }}
              >
                <span>السعر الاجمالي</span> شامل الضريبة
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "15px",
                }}
              >
                <span> ريال سعودي</span> {totalPrice} SAR{" "}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "15px",
                }}
              >
                {" "}
                <span>عدد القطع</span> {totalItems}{" "}
              </div>
            </div>
          </>
        )}
        <hr />
        {cartItems.length !== 0 && (
          <div className="payments">
            <div className="paymentArea">
              <Payment
                itemsPrice={itemsPrice}
                checkPaymentMethod={checkPaymentMethod}
                isCach={isCach}
                handlePrint={handlePrint}
                resetCartItems={resetCartItems}
                moneyFromClient={moneyFromClient}
                isChange={isChange}
                handleData={handleData}
                handleIsPrint={handleIsPrint}
              />
              {method === "Mada" ? (
                <button
                  className="itemButton pay"
                  onClick={() => {
                    handlePrint();
                    resetCartItems();
                    handleData();
                    handleIsPrint();
                    createInvoice();
                  }}
                >
                  الدفع - طباعة
                </button>
              ) : null}
            </div>
          </div>
        )}
      </div>
      <div className="cartLogo">
        <img
          src="https://i.ibb.co/LnBP58T/Qandella-Company-Logo1.png"
          alt="Qandella-Company-Logo1"
        />
        <div className="copyRights">
          <p>
            {" "}
            Copyright <span>&copy;</span> reserved for Alnathra Al-Raqiqa -{" "}
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Basket;
