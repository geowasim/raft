import "./dialog.css";
import Preview from "./Preview";
function Dialog(props) {
  const {
    setHideQuestionShowPay,
    resetCartItems,
    handlePrint,
    handleIsPrint,
    createInvoice,
    cartItems,
    itemsPrice,
    method,
    paidMoney,
    change,
    serialNumber,
    itemPriceBefore,
    isOffer,
  } = props;

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 5,
      }}
      onClick={() => setHideQuestionShowPay(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          color: "#3d3d3d",
          fontFamily: "'El Messiri','sans-serif'",
          height: "100vh",
        }}
      >
        <Preview
          cartItems={cartItems}
          itemsPrice={itemsPrice}
          method={method}
          paidMoney={paidMoney}
          change={change}
          serialNumber={serialNumber}
          resetCartItems={resetCartItems}
          handlePrint={handlePrint}
          handleIsPrint={handleIsPrint}
          createInvoice={createInvoice}
          itemPriceBefore={itemPriceBefore}
          isOffer={isOffer}
        />
        <h3
          style={{
            fontSize: "24px",
            marginBottom: "10px",
            borderRadius: "5px",
            width: "98%",
          }}
          className="warning"
        >
          طريقة الدفع
          {method === "Mada" ? <span>- بطاقة</span> : <span> كاش</span>}
        </h3>

        <div style={{ display: "flex", alignItems: "center" }}>
          <button onClick={() => setHideQuestionShowPay(false)} className="no">
            لا - الرجوع للقائمة السابقة{" "}
          </button>
          <button
            onClick={() => {
              setHideQuestionShowPay(false);
              handleIsPrint();
              handlePrint();
              resetCartItems();
              createInvoice();
            }}
            className="yes"
          >
            نعم - اطبع الفاتورة
          </button>
        </div>
      </div>
    </div>
  );
}
export default Dialog;
