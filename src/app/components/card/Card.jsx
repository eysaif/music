import React from "react";

const Card = (props) => {
  return (
    <div className="card card-compact  bg-base-100 shadow-xl lg:w-96 md:w-60">
      <iframe src={props.vedioUrl}></iframe>
      <div className="join join-vertical lg:join-horizontal flex justify-center m-5">
        <button className="join-item btn">«</button>
        <button className="join-item btn">»</button>
      </div>
    </div>
  );
};

export default Card;
