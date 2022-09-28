import React from "react";
import { useState } from "react";

const Invoicetoreback = ({ item }) => {
  const [count, setCount] = useState();
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "70vw",
          }}
        >
          <p>
            {item.category} - {item.title}
          </p>
          <div
            style={{
              width: "100px",
              display: "flex",
              justifyContent: "space-between",
              textAlign: "center",
              margin: "10px 0",
            }}
          >
            <button
              style={{
                background: "lightgray",
                width: "20px",
              }}
            >
              {" "}
              -
            </button>
            <p>{item.qty}</p>
            <p>{Number(item.price * 0.15) + Number(item.price)}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoicetoreback;
