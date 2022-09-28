import React, { useState, useEffect } from "react";

import { db } from "./firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  // addDoc,
  limit,
  deleteDoc,
  setDoc,
  orderBy,
  getDoc,
  getDocs,
  where,
} from "firebase/firestore";
import { async } from "@firebase/util";

const Documents = () => {
  const [myData, setMyData] = useState([]);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const unsbscribe = async function myData() {
      const citiesRef = collection(db, "cities");

      await setDoc(doc(citiesRef, "SF"), {
        name: "San Francisco",
        state: "CA",
        country: "USA",
        capital: false,
        population: 860000,
        regions: ["west_coast", "norcal"],
      });
      await setDoc(doc(citiesRef, "LA"), {
        name: "Los Angeles",
        state: "CA",
        country: "USA",
        capital: false,
        population: 3900000,
        regions: ["west_coast", "socal"],
      });
      await setDoc(doc(citiesRef, "DC"), {
        name: "Washington, D.C.",
        state: null,
        country: "USA",
        capital: true,
        population: 680000,
        regions: ["east_coast"],
      });
      await setDoc(doc(citiesRef, "TOK"), {
        name: "Tokyo",
        state: null,
        country: "Japan",
        capital: true,
        population: 9000000,
        regions: ["kanto", "honshu"],
      });
      await setDoc(doc(citiesRef, "BJ"), {
        name: "Beijing",
        state: null,
        country: "China",
        capital: true,
        population: 21500000,
        regions: ["jingjinji", "hebei"],
      });
      // auto id document and every update will create a copy
      // await setDoc(doc(citiesRef), {
      // name: "Aleppo",
      // state: null,
      // country: "Syria",
      // capital: true,
      // population: 21500000,
      // regions: ["MiddleEast", "north"],
      // });
    };

    return () => unsbscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "cities"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <p>{JSON.stringify(todos, null)}</p>
    </div>
  );
};

export default Documents;

/**
 * const unsbscribe = async function myData() {
      const citiesRef = collection(db, "cities");

      await setDoc(doc(citiesRef, "SF"), {
        name: "San Francisco",
        state: "CA",
        country: "USA",
        capital: false,
        population: 860000,
        regions: ["west_coast", "norcal"],
      });
      await setDoc(doc(citiesRef, "LA"), {
        name: "Los Angeles",
        state: "CA",
        country: "USA",
        capital: false,
        population: 3900000,
        regions: ["west_coast", "socal"],
      });
      await setDoc(doc(citiesRef, "DC"), {
        name: "Washington, D.C.",
        state: null,
        country: "USA",
        capital: true,
        population: 680000,
        regions: ["east_coast"],
      });
      await setDoc(doc(citiesRef, "TOK"), {
        name: "Tokyo",
        state: null,
        country: "Japan",
        capital: true,
        population: 9000000,
        regions: ["kanto", "honshu"],
      });
      await setDoc(doc(citiesRef, "BJ"), {
        name: "Beijing",
        state: null,
        country: "China",
        capital: true,
        population: 21500000,
        regions: ["jingjinji", "hebei"],
      });
      // auto id document and every update will create a copy
      // await setDoc(doc(citiesRef), {
        // name: "Aleppo",
        // state: null,
        // country: "Syria",
        // capital: true,
        // population: 21500000,
        // regions: ["MiddleEast", "north"],
      // });
    };

    return () => unsbscribe();
 */
