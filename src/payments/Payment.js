import { useEffect, useState } from "react";
import Cash from "./Cash";
import Mada from "./Mada";
import "./styles.css";
import "./payments.css";

export default function Payment(props) {
  const [showCashe, setShowCashe] = useState(false);
  const [showMethod, setShowMethod] = useState("Mada");

  const {
    itemsPrice,
    checkPaymentMethod,
    isCach,
    handlePrint,
    resetCartItems,
    moneyFromClient,
    isChange,
    handleData,
    handleIsPrint,
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
          itemsPrice={itemsPrice}
          isCach={isCach}
          handlePrint={handlePrint}
          resetCartItems={resetCartItems}
          moneyFromClient={moneyFromClient}
          isChange={isChange}
          handleData={handleData}
          handleIsPrint={handleIsPrint}
        />
      ) : (
        <>
          <Mada itemsPrice={itemsPrice} />
        </>
      )}
      <button onClick={handleCashe} className="itemButton change">
        {showCashe ? (
          <>" Mada الرجوع إلى مدى"</>
        ) : (
          <>cash/ لتغير إلى الدفع كاش</>
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
