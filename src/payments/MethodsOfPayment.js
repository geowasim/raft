import React, { useState } from "react";
import CashCard from "./CashCard";

export default function MethodsOfPayment() {
  const [showCashCard, setShowCashCard] = useState(false);
  const totalPrice = 402;
  return (
    <div
      style={{
        position: "fixed",
        bottom: "300px",
        color: "#3d3d3d",
      }}
    >
      <h3>اختر طريقة الدفع</h3>
      <div className="methods-container">
        <button className="itemButton payment-methods">كاش/cash</button>
        <button className="itemButton payment-methods">بطاقة/card</button>
        <button
          className="itemButton payment-methods"
          onClick={() => setShowCashCard(true)}
        >
          <span> كاش و بطاقة/</span>
          <span>card & cash</span>
        </button>
        {showCashCard && <CashCard totalPrice={totalPrice} />}
      </div>
    </div>
  );
}
