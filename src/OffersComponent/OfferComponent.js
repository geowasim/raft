import React from "react";

const OfferComponent = (props) => {
  if (!props) {
    return;
  } else if (props.codeE === "HAS432") {
    return (
      <div className="offer-component">
        <p>
          {" "}
          الخصومات على العطور فقط<span>*</span>
        </p>
        <p>
          - أربعة عطور مختلفة بـ 620 ريال{" "}
          <span style={{ textDecoration: "underline" }}>
            بدون القيمة المضافة
          </span>{" "}
          بدل من 796ريال
        </p>
        <p>
          - ثلاثة عطور مختلفة بـ 500 ريال{" "}
          <span style={{ textDecoration: "underline" }}>
            بدون القيمة المضافة
          </span>{" "}
          بدل من 597ريال
        </p>
        <p>
          - اثنين عطور مختلفة بـ 350 ريال{" "}
          <span style={{ textDecoration: "underline" }}>
            بدون القيمة المضافة
          </span>{" "}
          بدل من 398ريال
        </p>
        <hr />
      </div>
    );
  } else if (props.codeE === "RYD1122") {
    return (
      <div className="offer-component">
        <p>
          {" "}
          25% الخصومات على جميع الأصناف<span>*</span>
        </p>
      </div>
    );
  }
};

export default OfferComponent;
