import { useEffect, useState } from "react";

export default function Invoices() {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("SN")) || [
      {
        sn: 0,
        items: [],
        totalWithoutVat: 0,
        vat: 0,
        Amount: 0,
        qty: 0,
        method: "",
        paid: 0,
        change: 0,
        dateTime: `${
          new Date().toLocaleTimeString() +
          " - " +
          new Date().toLocaleDateString()
        }`,
      },
    ]
  );
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("SN"));
    console.log(items);
    if (items) {
      setData((data) => data, items);
    }
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (data) {
      localStorage.setItem("SN", JSON.stringify(data));
    }
  }, [data]);

  return (
    <>
      {data.map((item) => (
        <div
          key={item.sn + 1}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <p>SN/{item.sn}/</p>
          <p>Ammount:/{item.am}/</p>
        </div>
      ))}
    </>
  );
}
