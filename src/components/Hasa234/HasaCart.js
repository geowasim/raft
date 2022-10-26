import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "../ComponentToPrint/ComponentToPrint";

import "./Cart.css";
import Payment from "../payments/Payment";

import { auth, db } from "../firebase";
import {
  query,
  collection,
  onSnapshot,
  addDoc,
  orderBy,
  serverTimestamp,
  // updateDoc,
  // doc,
  // deleteDoc,
} from "firebase/firestore";
import Dialog from "./Dialog";
import { totalBeforeAfterOfferType } from "../OfferFunction";
import MethodsOfPayment from "../payments/MethodsOfPayment";

const Basket = (props) => {
  const {
    cartItems,
    resetCartItems,
    onAdd,
    onRemove,
    handleIsPrint,
    showCalc,
    setShowCalc,
  } = props;
  const [method, setMethod] = useState("Mada");
  const [isCachDone, setIsCachDone] = useState(false);
  const [paidMoney, setPaidMoney] = useState(null);
  const [change, setChange] = useState(null);
  const [hideQuestionShowPay, setHideQuestionShowPay] = useState(false);
  const [isOffer, setIsOffer] = useState(false);
  const [codeE, setCodeE] = useState("HAS432");

  const otherPrice = totalBeforeAfterOfferType(cartItems).otherPrice;
  const perfumePrice = totalBeforeAfterOfferType(cartItems).after;

  useEffect(() => {
    if (Math.max(...totalBeforeAfterOfferType(cartItems).offerType) > 1) {
      setIsOffer(true);
    } else {
      setIsOffer(false);
    }
  }, [cartItems]);

  // console.log(totalBeforeAfterOfferType(cartItems));
  const itemPriceBefore = totalBeforeAfterOfferType(cartItems).before;
  // console.log(itemPriceBefore * 0.15 + itemPriceBefore);
  const itemsPrice = perfumePrice + otherPrice;

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

  const [serialNumber, setSerialNumber] = useState(null || 1000296);

  //get lastSn //
  //get data frm const {second} = first
  // Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, "hasa22"), orderBy("invoiceNumber", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setSerialNumber(todosArr[0].invoiceNumber.sn + 1);
    });
    return () => unsubscribe();
  }, [serialNumber]);

  let tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  let timeInMyPC = new Date(Date.now() - tzoffset).toISOString();

  // Create invoice
  const createInvoice = async () => {
    await addDoc(collection(db, "hasa22"), {
      methodArray: {
        method: method,
      },
      cartItems: cartItems,
      invoiceNumber: {
        sn: serialNumber,
      },
      paidandchange: {
        paidMoney: paidMoney,
        change: change,
      },
      date: serverTimestamp(),
      dateMyPC: timeInMyPC,
      totalPrice: totalPrice,
      totalItems: totalItems,
      off: { isOffer: isOffer, codeE: codeE },
      casher: auth.currentUser.email.slice(
        0,
        auth.currentUser.email.indexOf("@")
      ),
    });
  };
  return (
    <div className="basketContainer">
      <div className="basket">
        <h2 className="basketName">السلة</h2>
        {/* <p style={{ color: "red" }}>{handlePriceForCash(totalPrice, method)}</p> */}
        {cartItems.length !== 0 && (
          <button
            className="cancelOrder"
            onClick={() => {
              resetCartItems();
              handleIsPrint();
              setIsOffer(false);
            }}
          >
            إفراغ السلة
          </button>
        )}
        <div className="basketName">
          {cartItems.length === 0 && (
            <div>
              <p>السلة فارغة</p>
            </div>
          )}
        </div>
        {cartItems.length !== 0 &&
          cartItems.map((item) => (
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
                serialNumber={serialNumber}
                timeInMyPC={timeInMyPC}
                totalPrice={totalPrice}
                isOffer={isOffer}
                itemPriceBefore={itemPriceBefore}
              />
              {/* ------------ */}
            </div>
            <hr />

            <div className="row " style={{ margin: "10px 0" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "15px 15px",
                }}
              >
                <span>السعر الاجمالي</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "15px",
                }}
              >
                <span> ر.س</span> {totalPrice}
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
        {/* handle method of payment */}
        {/* choose payment method */}
        {/* {cartItems.length !== 0 && <MethodsOfPayment />} */}
        {cartItems.length !== 0 && (
          <div className="payments">
            <div className="paymentArea">
              <Payment
                checkPaymentMethod={checkPaymentMethod}
                isCach={isCach}
                handlePrint={handlePrint}
                resetCartItems={resetCartItems}
                moneyFromClient={moneyFromClient}
                isChange={isChange}
                handleIsPrint={handleIsPrint}
                createInvoice={createInvoice}
                itemsPrice={itemsPrice}
                cartItems={cartItems}
                method={method}
                paidMoney={paidMoney}
                change={change}
                serialNumber={serialNumber}
                setHideQuestionShowPay={setHideQuestionShowPay}
                hideQuestionShowPay={hideQuestionShowPay}
                showCalc={showCalc}
                setShowCalc={setShowCalc}
              />
              {method === "Mada" && (
                <div className="madaOptions">
                  <button
                    onClick={() => setHideQuestionShowPay(true)}
                    className="itemButton"
                  >
                    {" "}
                    معاينة الفاتورة
                  </button>
                </div>
              )}
              {hideQuestionShowPay && (
                <Dialog
                  setHideQuestionShowPay={setHideQuestionShowPay}
                  resetCartItems={resetCartItems}
                  handlePrint={handlePrint}
                  handleIsPrint={handleIsPrint}
                  createInvoice={createInvoice}
                  totalPrice={totalPrice}
                  cartItems={cartItems}
                  itemsPrice={itemsPrice}
                  method={method}
                  paidMoney={paidMoney}
                  change={change}
                  serialNumber={serialNumber}
                  codeE={codeE}
                  itemPriceBefore={itemPriceBefore}
                  isOffer={isOffer}
                />
              )}
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

// const sortOther = cartItems.filter((x) => x.category !== "Perfume");
// const otherPrice = sortOther.reduce((a, c) => a + c.price * c.qty, 0);

// const sortPerfumes = cartItems.filter((x) => x.category === "Perfume");
// console.log(sortPerfumes);

// const perfumesPrice = sortPerfumes.length
//   ? totalBeforeAfterOfferType(sortPerfumes)[1].after
//   : 0;

// useEffect(() => {
//   if (sortPerfumes.length > 1) {
//     setIsOffer(true);
//   }
// }, [perfumesPrice]);

// console.log("perfumesPrice", perfumesPrice * 0.15 + perfumesPrice);
