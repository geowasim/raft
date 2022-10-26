import React, { useState, useEffect } from "react";
import OneInvoice from "./OneInvoice";
import { db } from "../../firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
  orderBy,
  where,
} from "firebase/firestore";

import "../OneInvoice.css";

const style = {
  bg: `h-screen w-screen p-4 `,
  container: `bg-slate-100 max-w-[90vw] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`,
};

const TaifInvoices = (props) => {
  const [todos, setTodos] = useState([]);
  const { readDataFromInvoiceComponent } = props;

  // Read todo from firebase
  useEffect(() => {
    const q = query(
      collection(db, "todos"),
      // orderBy("invoiceNumber", "desc"),
      // where("invoiceNumber", ">", { sn: 1000001 }),
      where("invoiceNumber", "<", { sn: 1000001 })
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  // Update todo in firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  const handleEdit = async (id, todo) => {
    // console.log("edit id", id);
    // console.log("todo edit", todo);
    await updateDoc(doc(db, "todos", todo.id), {
      // do things
      // completed: !todo.completed,
    });
  };

  const total = todos.reduce((a, c) => a + c.totalPrice, 0);
  const soldItems = todos.reduce((a, c) => a + c.totalItems, 0);
  if (todos.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          height: "98vh",
        }}
      >
        <h3>loading....</h3>
      </div>
    );
  }
  return (
    todos.length !== 0 && (
      <div className={`${style.bg} invoices`}>
        <div className={style.container}>
          <h3 className={style.heading}>Invoices</h3>
          <div className="totalInfo">
            <p>Total Income : {total.toFixed(2)}</p>
            <p>Total sold items : {soldItems}</p>
          </div>
          <div className="myOneInvoice customers">
            <p>Order#</p>
            <p>Total</p>
            <p>subtotal</p>
            <p>Vat Ammount</p>
            <p>Qty</p>
            <p>Payment Method</p>
            <p>Date & Time</p>
            {/* <p>Print</p> */}
          </div>

          {todos.length !== 0 &&
            todos.map((todo, index) => {
              return (
                <OneInvoice
                  key={todo.id}
                  todo={todo}
                  toggleComplete={toggleComplete}
                  deleteTodo={deleteTodo}
                  invoiceNumber={todo.invoiceNumber.sn}
                  handleEdit={handleEdit}
                  readDataFromInvoiceComponent={readDataFromInvoiceComponent}
                />
              );
            })}

          {todos.length < 1 ? null : (
            <p className={style.count}>{`You have ${todos.length} Invoices`}</p>
          )}
        </div>
        {/* <div>{todos.forEach((x) => console.log(x))}</div> */}
        {/* <TestNewCollection /> */}
      </div>
    )
  );
};

export default TaifInvoices;
