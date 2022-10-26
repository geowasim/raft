import React, { useEffect, useState } from "react";
import Dialog from "../cart/Dialog";
import InputCash from "./InputCash";

export default function Cash(props) {
  const count = props.itemsPrice;
  const {
    setHideQuestionShowPay,
    resetCartItems,
    moneyFromClient,
    createInvoice,
    itemsPrice,
    cartItems,
    method,
    paidMoney,
    change,
    serialNumber,
    hideQuestionShowPay,
    showCalc,
    setShowCalc,
    readIsInputDisable,
    disableInputField,
  } = props;
  const countVat = (count * 15) / 100 + count;
  const { isCach, handlePrint, isChange, handleIsPrint } = props;
  const [count2, setCount2] = useState(null);
  const [dispableInput, setDisableInput] = useState(false);

  useEffect(() => {
    // if add more then count2 = 0
    moneyFromClient(count2);
  }, [moneyFromClient, count2]);

  const handleaddNumber2 = (e) => {
    setCount2(e.target.value);
    if (e.target.value === "") {
      setCount2(0);
    }
  };

  const handleRestCount2 = () => {
    setCount2(null);
  };

  useEffect(() => {
    const ttt = count * 0.15 + count;
    function checkInput() {
      if (count2 < ttt) {
        // console.log("WWWWWWWWWWWWWW");
        //اخفاء المعاينة
      }
    }

    checkInput();
  }, [count2, count]);

  return showCalc ? (
    <div className="cacheContainer">
      <h2>
        Cash <span>كاش</span>
      </h2>

      <h2 className="TP">
        المبلغ المطلوب :{" "}
        <span> {Number((count * 0.15 + count).toFixed(2))} ريال </span>
      </h2>
      <div className="cachChange">
        <input
          onChange={(e) => handleaddNumber2(e)}
          value={count2 ? count2 : ""}
          type="number"
          placeholder="ادخل المدفوع نقداً"
          required
          disabled={dispableInput}
        />

        <InputCash
          values={countVat ? countVat : ""}
          values2={count2 ? count2 : ""}
          isCach={isCach}
          isChange={isChange}
          resetCartItems={resetCartItems}
          handleRestCount2={handleRestCount2}
          handlePrint={handlePrint}
          handleIsPrint={handleIsPrint}
          createInvoice={createInvoice}
          cartItems={cartItems}
          method={method}
          paidMoney={paidMoney}
          change={change}
          serialNumber={serialNumber}
          itemsPrice={itemsPrice}
          hideQuestionShowPay={hideQuestionShowPay}
          setHideQuestionShowPay={setHideQuestionShowPay}
          setCount2={setCount2}
        />
      </div>
    </div>
  ) : (
    <button onClick={() => setShowCalc(true)} className="itemButton">
      الحساب{" "}
    </button>
  );
}

/**
 * <div className="cacheContainer" style={{ background: "red" }}>
      <h2>
        Cash <span>كاش</span>
      </h2>

      <h2 className="TP">
        المبلغ المطلوب : <span> {count * 0.15 + count} ريال </span>
      </h2>
      <div className="cachChange">
        <input
          onChange={(e) => handleaddNumber2(e)}
          value={count2 ? count2 : ""}
          type="number"
          placeholder="ادخل المدفوع نقداً"
          required
        />

        <InputCash
          values={countVat ? countVat : ""}
          values2={count2 ? count2 : ""}
          isCach={isCach}
          isChange={isChange}
          resetCartItems={resetCartItems}
          handleRestCount2={handleRestCount2}
          handlePrint={handlePrint}
          handleIsPrint={handleIsPrint}
          createInvoice={createInvoice}
          cartItems={cartItems}
          method={method}
          paidMoney={paidMoney}
          change={change}
          serialNumber={serialNumber}
          itemsPrice={itemsPrice}
          hideQuestionShowPay={hideQuestionShowPay}
          setHideQuestionShowPay={setHideQuestionShowPay}
          setCount2={setCount2}
        />
      </div>
    </div>
 */
