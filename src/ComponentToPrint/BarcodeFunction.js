import { Buffer } from "buffer";

export function getTLVForValue(tagNum, tagValue) {
  let tagBuf = Buffer.from([tagNum], "utf8");
  let tagValueLenBuf = Buffer.from([tagValue.length], "utf8");
  let tagValueBuf = Buffer.from(tagValue, "utf8");
  let bufsArray = [tagBuf, tagValueLenBuf, tagValueBuf];

  return Buffer.concat(bufsArray);
}

// export function getBarcode() {
// cn, vr, t, to, va;
// console.log(cn);
// console.log(vr);
// console.log(t);
// console.log(to);
// console.log(va);
// function toHex(str) {
//   var result = "";
//   for (var i = 0; i < str.length; i++) {
//     result += str.charCodeAt(i).toString(16);
//   }
//   return result;
// }
// let aa = toHex("مؤسسة النظرة الرقيقة للتجارة");
// console.log("aa", aa);
// // return aa;
// function hexToBase64(str) {
//   return btoa(
//     String.fromCharCode.apply(
//       null,
//       str
//         .replace(/\r|\n/g, "")
//         .replace(/([\da-fA-F]{2}) ?/g, "0x$1 ")
//         .replace(/ +$/, "")
//         .split(" ")
//     )
//   );
// }
// // Demo
// let data =
//   "010c20645624633633629206276446466386316292062764463164264a6426292064464462a62c627631629020F3331303433303636383530303030330314323032322d30392d32365432303a34393a35302e3530325a04073430322e3530050635322e3530";
// let d1 = hexToBase64(data);
// console.log(d1);
// return d1;
// }
