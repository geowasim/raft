import React, { useState, useEffect } from "react";
import OneInvoice from "./OneInvoice";
import { db } from "../firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  // addDoc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";

import "./OneInvoice.css";

const style = {
  bg: `h-screen w-screen p-4 `,
  container: `bg-slate-100 max-w-[90vw] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`,
};

function Invoices() {
  const [todos, setTodos] = useState([]);

  // Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, "todos"), orderBy("invoiceNumber", "desc"));
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

  return (
    <div className={`${style.bg} invoices`}>
      <div className={style.container}>
        <h3 className={style.heading}>Invoices</h3>
        <div className="myOneInvoice customers">
          <p>Order#</p>
          <p>Total</p>
          <p>Qty</p>
          <p>Payment Method</p>
          <p>Date & Time</p>
          <p>Print</p>
        </div>

        {todos.map((todo, index) => {
          return (
            <OneInvoice
              key={index}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              invoiceNumber={todo.invoiceNumber.sn}
            />
          );
        })}

        {todos.length < 1 ? null : (
          <p className={style.count}>{`You have ${todos.length} Invoices`}</p>
        )}
      </div>
      {/* <div>{todos.forEach((x) => console.log(x))}</div> */}
    </div>
  );
}

export default Invoices;

/**
 * // Create todo
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === "") {
      alert("Please enter a valid todo");
      return;
    }
    await addDoc(collection(db, "todos"), {
      methodArray: {
        method: "Mada",
      },
      cartItems: {
        item1: {
          id: 1,
          title: "fiore",
          descreption: "perfum",
          category: "odor",
          price: 199,
          vol: 150,
          qty: 1,
        },
        item2: {
          id: 2,
          title: "viola",
          descreption: "spray",
          category: "Hair Mist",
          price: 50,
          vol: 30,
          qty: 1,
        },
      },
      invoiceNumber: {
        sn: 1000002,
      },
      sum: {
        qty: 2,
        subtotal: 398,
        total: 457.7,
      },
    });
    setInput("");
  };
 * 
 */
