import { useEffect, useState } from "react";
import Cash from "./Cash";
import Mada from "./Mada";
import "./styles.css";
import "./payments.css";

export default function Payment(props) {
  const [showCashe, setShowCashe] = useState(false);
  const [showMethod, setShowMethod] = useState("Mada");

  const {
    checkPaymentMethod,
    isCach,
    handlePrint,
    resetCartItems,
    moneyFromClient,
    isChange,
    handleIsPrint,
    createInvoice,
    itemsPrice,
    cartItems,
    method,
    paidMoney,
    change,
    serialNumber,
    setHideQuestionShowPay,
    hideQuestionShowPay,
    showCalc,
    setShowCalc,
  } = props;

  useEffect(() => {
    if (showMethod === "Mada") {
      checkPaymentMethod("Mada");
    } else {
      checkPaymentMethod("Cash");
    }
  });

  const handleCashe = () => {
    setShowCashe(!showCashe);
    !showCashe ? setShowMethod("Cash") : setShowMethod("Mada");
  };
  return (
    <div className="payments">
      <br />

      {showCashe ? (
        <Cash
          isCach={isCach}
          handlePrint={handlePrint}
          resetCartItems={resetCartItems}
          moneyFromClient={moneyFromClient}
          isChange={isChange}
          handleIsPrint={handleIsPrint}
          createInvoice={createInvoice}
          cartItems={cartItems}
          itemsPrice={itemsPrice}
          method={method}
          paidMoney={paidMoney}
          change={change}
          serialNumber={serialNumber}
          setHideQuestionShowPay={setHideQuestionShowPay}
          hideQuestionShowPay={hideQuestionShowPay}
          showCalc={showCalc}
          setShowCalc={setShowCalc}
        />
      ) : (
        <>
          <Mada itemsPrice={itemsPrice} />
        </>
      )}
      <button onClick={handleCashe} className="itemButton change">
        {showCashe ? (
          <div>Mada / الرجوع إلى الدفع بالبطاقة</div>
        ) : (
          <div style={{ marginTop: "-8px" }}>cash/ لتغير إلى الدفع كاش</div>
        )}
      </button>
    </div>
  );
}

/**
 * 
 * {showCashe ? (
        <Cashe />
      ) : showMada ? (
        <button
          onClick={handleCashe}
          style={{ position: "absolute", top: "200px", left: "100px" }}
        >
          Mada
        </button>
      ) : null}
      {showMada ? (
        <Mada />
      ) : showCashe ? (
        <button
          onClick={handleCashe}
          style={{ position: "absolute", top: "200px", left: "100px" }}
        >
          Cashe
        </button>
      ) : null}
 */
