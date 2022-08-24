import { useState, useContext, useEffect } from "react";
import PerfumeContext from "../context/ProductContext";
import "./Item.css";

const Item = (props) => {
  const { onAdd } = props;
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
            <h1 className="itemName">{showItem.title}</h1>
            <img
              className="itemImage"
              src={showItem.image}
              alt={showItem.title}
            />
            {/* <p className="itemPrice">Price {showItem.price} SAR</p> */}
            <div>
              <p className="itemDes">{showItem.description}</p>
            </div>
            <button className="itemButton" onClick={() => onAdd(showItem)}>
              إضافة للسلة
            </button>
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
