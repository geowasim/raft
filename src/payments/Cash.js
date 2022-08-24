import React, { useEffect, useState } from "react";
import InputCash from "./InputCash";

export default function Cash(props) {
  const count = props.itemsPrice;
  const { resetCartItems, moneyFromClient, handleData } = props;
  const countVat = (count * 15) / 100 + count;
  const { isCach, handlePrint, isChange, handleIsPrint } = props;
  const [count2, setCount2] = useState(null);

  useEffect(() => {
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

  return (
    <div className="cacheContainer">
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
          handleRestCount2={handleRestCount2}
          values={countVat ? countVat : ""}
          values2={count2 ? count2 : ""}
          isCach={isCach}
          handlePrint={handlePrint}
          isChange={isChange}
          handleData={handleData}
          resetCartItems={resetCartItems}
          handleIsPrint={handleIsPrint}
        />
      </div>
    </div>
  );
}
