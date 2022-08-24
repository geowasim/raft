import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import "./OneInvoice";

const style = {
  li: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
  liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
  row: `flex`,
  text: `ml-2 cursor-pointer`,
  textComplete: `ml-2 cursor-pointer line-through`,
  button: `cursor-pointer flex items-center`,
};

const Todo = ({ todo, toggleComplete, deleteTodo }) => {
  const { cartItems, invoiceNumber, methodArray } = todo;
  const [cartItemsArrays, setCarItemsArrays] = useState([]);
  console.log("todoONe", todo.date.seconds);

  useEffect(() => {
    const arr = [];
    for (const key in cartItems) {
      if (Object.hasOwnProperty.call(cartItems, key)) {
        const element = cartItems[key];
        arr.push(element);
      }
    }
    setCarItemsArrays(arr);
  }, [cartItems]);

  const subtotal = cartItemsArrays.reduce((a, c) => a + c.price * c.qty, 0);
  const totalItems = cartItemsArrays.reduce((a, c) => a + c.qty, 0);

  function calculateDateTime() {
    var timestamp = todo.date.seconds * 1000;
    var date = new Date(timestamp);

    return `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

  return (
    <>
      <table id="customers" style={{ width: "80%" }}>
        <tr>
          <th>{todo.invoiceNumber.sn}</th>
          <th>{(subtotal * 15) / 100 + subtotal}</th>
          <th>{totalItems}</th>
          <th>{methodArray.method}</th>
          <th>{calculateDateTime()}</th>
        </tr>
      </table>
    </>
  );
};

export default Todo;

/**
 * 
 *       <li className={todo.completed ? style.liComplete : style.li}>
        <div className={style.row}>
          <input
            onChange={() => toggleComplete(todo)}
            type="checkbox"
            checked={todo.completed ? "checked" : ""}
          />
          <p
            onClick={() => toggleComplete(todo)}
            className={todo.completed ? style.textComplete : style.text}
          ></p>
          <div>
            <p>method : {methodArray.method}</p>
            <p>Total: {(subtotal * 15) / 100 + subtotal}</p>
          </div>
        </div>
        <button onClick={() => deleteTodo(todo.id)}>{<FaRegTrashAlt />}</button>
      </li>
 */