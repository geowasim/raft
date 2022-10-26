import { useState, useContext, useEffect } from "react";
import PerfumeContext from "../context/ProductContext";
import "./Item.css";

const Item = (props) => {
  const { onAdd, setShowCalc } = props;
  const perfumes = useContext(PerfumeContext);
  const [showItem, setShowItem] = useState(null);
  useEffect(() => {
    const perObj = perfumes.find((item) => item.id === props.item);
    setShowItem(perObj);
  }, [showItem, props, perfumes]);

  return (
    <div className="itemContainer">
      <div className="item">
        {showItem ? (
          <div>
            {/* <h1 className="itemName">{showItem.title}</h1> */}
            <p className="itemDes"> __ {showItem.description} __</p>
            <img
              className="itemImage"
              src={showItem.image}
              alt={showItem.title}
            />
            {/* <p className="itemPrice">Price {showItem.price} SAR</p> */}
            <div></div>
            <button
              className="itemButton"
              onClick={() => {
                onAdd(showItem);
                setShowCalc(false);
                // console.log("item has been added");
              }}
            >
              إضافة للسلة
            </button>
            <>
              {showItem.category !== "Bag" && (
                <div>
                  <b className="row" style={{ marginTop: "10px" }}>
                    الهرم العطري
                  </b>
                  <div className="row">
                    <p>
                      <span> القمة__</span>
                      <span>{showItem.top}</span>
                    </p>
                  </div>
                  <div className="row">
                    <p>
                      <span> القلب__</span>
                      <span>{showItem.heart}</span>
                    </p>
                  </div>
                  <div className="row">
                    <p>
                      <span> القاعدة__</span>
                      <span>{showItem.base}</span>
                    </p>
                  </div>
                </div>
              )}
            </>
          </div>
        ) : (
          <div>
            <h2>المنتج</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Item;
