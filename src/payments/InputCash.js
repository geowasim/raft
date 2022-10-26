import React, { useEffect, useState } from "react";
import Dialog from "../cart/Dialog";
import "./styles.css";

const InputCash = (props) => {
  const [value, setValue] = useState(0);
  const [isPrintShown, setIsPrintShown] = useState(false);
  const {
    isCach,
    handlePrint,
    resetCartItems,
    isChange,
    handleIsPrint,
    createInvoice,
    cartItems,
    method,
    paidMoney,
    change,
    serialNumber,
    itemsPrice,
    setHideQuestionShowPay,
    hideQuestionShowPay,
  } = props;

  useEffect(() => {
    if (isPrintShown) {
      isCach(isPrintShown);
    }
    isChange(value);
  }, [props.val2, isPrintShown, isCach, value, isChange]);

  const addNum = (val, val2) => {
    let a = val;
    let b = val2;
    if (a > b || b === "") {
      setIsPrintShown(false);
      props.handleRestCount2();
      alert("تأكد من المبلغ المستلم");

      return;
    }
    setValue(a - b);
    setIsPrintShown("isPrintShownT", true);
  };

  // const handleRest = () => {
  //   setValue(0);
  //   props.handleRestCount2();
  //   setIsPrintShown(false);
  // };

  return (
    <div className="inputCach">
      <button
        onClick={() => {
          addNum(props.values, props.values2);
        }}
        className="itemButton"
        style={{
          border: "1px solid gray",
          width: "auto",
          padding: "0 2px",
          height: "44px",
          fontSize: "18px",
          margin: "0 10px",
          borderRadius: "5px",
        }}
      >
        احسب المتبقي
      </button>
      <p className="remain">
        {" "}
        ({value <= 0 ? (value * -1).toFixed(2) : ""})<span>ريال سعودي</span>
      </p>
      {isPrintShown ? (
        <>
          <button
            style={{ marginRight: "5vw" }}
            onClick={function () {
              // handleRest();
              // handlePrint();
              // resetCartItems();
              // createInvoice();
              // handleIsPrint();
              setHideQuestionShowPay(true);
            }}
            className="itemButton printFromCach"
          >
            معاينة الفاتورة{" "}
          </button>
        </>
      ) : null}
      {hideQuestionShowPay && (
        <Dialog
          resetCartItems={resetCartItems}
          handlePrint={handlePrint}
          handleIsPrint={handleIsPrint}
          createInvoice={createInvoice}
          cartItems={cartItems}
          itemsPrice={itemsPrice}
          method={method}
          paidMoney={paidMoney}
          change={change}
          serialNumber={serialNumber}
          setHideQuestionShowPay={setHideQuestionShowPay}
        />
      )}
    </div>
  );
};

export default InputCash;
