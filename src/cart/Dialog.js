import "./dialog.css";
function Dialog({
  createInvoice,
  resetCartItems,
  handlePrint,
  handleIsPrint,
  setHideQuestionShowPay,
  totalPrice,
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0,0,0,0.5)",
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
          width: "500px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          color: "#3d3d3d",
          fontFamily: "'El Messiri','sans-serif'",
        }}
      >
        <h3 style={{ fontSize: "24px" }}>(مدى-Mada ) الدفع بطاقة </h3>
        <h4> هل تم استلام مبلغ</h4>
        <h1 style={{ color: "#0000aa", fontSize: "24px", margin: "15px 0" }}>
          ("<span>ريال</span> "{totalPrice})
        </h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button onClick={() => setHideQuestionShowPay(false)} className="no">
            لا - الرجوع للقائمة السابقة{" "}
          </button>
          <button
            onClick={() => {
              setHideQuestionShowPay(false);
              createInvoice();
              handleIsPrint();
              handlePrint();
              resetCartItems();
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
