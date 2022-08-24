import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

export default function Invoices() {
  const [data, setData] = useState({
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
      new Date().toLocaleTimeString() + " - " + new Date().toLocaleDateString()
    }`,
  });

  console.log("db", db);
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
