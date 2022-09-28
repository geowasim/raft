// import { useEffect, useRef, useState } from "react";

// import { db } from "../firebase";
// import {
//   query,
//   collection,
//   onSnapshot,
//   addDoc,
//   orderBy,
//   serverTimestamp,
//   // updateDoc,
//   // doc,
//   // deleteDoc,
// } from "firebase/firestore";

// const TestNewCollection = (props) => {
//   const [data, setData] = useState([]);
//   //get lastSn //
//   //get data frm const {second} = first
//   // Read todo from firebase
//   useEffect(() => {
//     const q = query(collection(db, "sessions"));
//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       let sessionArray = [];
//       querySnapshot.forEach((doc) => {
//         sessionArray.push({ ...doc.data(), id: doc.id });
//       });
//       setData(sessionArray);
//     });
//     return () => unsubscribe();
//   }, []);

//   console.log(data);
//   return <div>Eeeeee</div>;
// };

// export default TestNewCollection;
