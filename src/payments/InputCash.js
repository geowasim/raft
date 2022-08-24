import React, { useEffect, useState } from "react";
import "./styles.css";

const InputCash = (props) => {
  const [value, setValue] = useState(0);
  const [isPrintShown, setIsPrintShown] = useState(false);
  const {
    isCach,
    handlePrint,
    resetCartItems,
    isChange,
    handleData,
    handleIsPrint,
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
      alert("تأكد من المبلغ المستلم");
      props.handleRestCount2();

      return;
    }
    setValue(a - b);
    setIsPrintShown(true);
  };

  const handleRest = () => {
    setValue(0);
    props.handleRestCount2();
    setIsPrintShown(false);
  };

  return (
    <div className="inputCach">
      <button
        onClick={() => addNum(props.values, props.values2)}
        className="itemButton"
        style={{
          border: "1px solid gray",
          width: "108px",
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
        <button
          onClick={function () {
            handleRest();
            handlePrint();
            resetCartItems();
            handleData();
            handleIsPrint();
          }}
          className="itemButton printFromCach"
        >
          طباعة الفاتورة{" "}
        </button>
      ) : null}
    </div>
  );
};

export default InputCash;
