import { Buffer } from "buffer";

export function getTLVForValue(tagNum, tagValue) {
  let tagBuf = Buffer.from([tagNum], "utf8");
  let tagValueLenBuf = Buffer.from([tagValue.length], "utf8");
  let tagValueBuf = Buffer.from(tagValue, "utf8");
  let bufsArray = [tagBuf, tagValueLenBuf, tagValueBuf];

  return Buffer.concat(bufsArray);
}

/**
 * inside the print component
 *  //----------------

  
   * 
   //1.Seller Name
   let sellerNameBuf = getTLVForValue("1", "Alnathra Al-Raqiqa");
   //2.Vat Registration
   let vatRegistrationNameBuf = getTLVForValue("2", "310430668500003");
   //Seller Name
   let timeStampBuf = getTLVForValue("3", timeBuf);
   //Seller Name
   let taxTotalNameBuf = getTLVForValue("4", totalWithVat);
   //Seller Name
   let vatTotalBuf = getTLVForValue("5", totalVat);
   
   let tagsBufsArray = [
     sellerNameBuf,
     vatRegistrationNameBuf,
     timeStampBuf,
     taxTotalNameBuf,
     vatTotalBuf,
    ];
    
    let qrCodeBuf = Buffer.concat(tagsBufsArray);
    let qrCodeB64 = qrCodeBuf.toString("base64");
    
    */
//-------------

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
