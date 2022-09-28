import React from "react";
const total = 458;
const Cashandcard = () => {
  const [partCash, setPartCash] = useState(total);
  return (
    <div>
      <p>{partCash}</p>
    </div>
  );
};

export default Cashandcard;
