import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

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

  return (
    <li className={todo.completed ? style.liComplete : style.li}>
      <div className={style.row}>
        <input
          onChange={() => toggleComplete(todo)}
          type="checkbox"
          checked={todo.completed ? "checked" : ""}
        />
        <p
          onClick={() => toggleComplete(todo)}
          className={todo.completed ? style.textComplete : style.text}
        >
          {todo.invoiceNumber.sn}
        </p>
        <div>
          <p>method : {methodArray.method}</p>
          <p>Total: {(subtotal * 15) / 100 + subtotal}</p>
        </div>
      </div>
      <button onClick={() => deleteTodo(todo.id)}>{<FaRegTrashAlt />}</button>
    </li>
  );
};

export default Todo;
