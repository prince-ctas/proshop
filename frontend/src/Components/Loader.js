import React from "react";
const iconPath = process.env.PUBLIC_URL + "/images/";

const Loader = () => {
  return (
    <div>
      <div style={{ padding: "227px 498px" }}>
        <img src={`${iconPath}loader.svg`} alt="more" />
      </div>
    </div>
  );
};

export default Loader;
