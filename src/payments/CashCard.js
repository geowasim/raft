import React, { useState } from "react";

export default function CashCard(props) {
  const totalV = 402;

  const { totalPrice } = props;
  const [cash, setCash] = useState("");

  function handleChange(e) {
    console.log(e.target.value);
    setCash(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (cash > totalPrice) {
      alert("المبلغ المدخل أكبر يجب أن يكون أصغر من المبلغ المطلوب");
    }
  }

  return (
    <div style={{ position: "absolute", bottom: "150px" }}>
      <p>المبلغ الكلي :{totalPrice}</p>
      <br />
      <div className="cash-container">
        <form className="cash" onSubmit={handleSubmit}>
          <input
            onChange={(e) => handleChange(e)}
            value={cash ? cash : ""}
            type="number"
            placeholder="ادخل المدفوع نقداً"
            required
          />
          <p>كاش </p>
          <button type="submit">احسب</button>
        </form>
      </div>
      <p> المتبقي للدفع بطاقة {totalPrice - cash}</p>
    </div>
  );
}
