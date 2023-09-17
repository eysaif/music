import React, { useState } from "react";

type props = {
  changeTheme: ()=>void;
}
const Nabar = ({changeTheme}:props) => {
  return (
    <nav>
      <div className="navbar bg-neutral text-neutral-content flex justify-between">
        <button className="btn btn-outline btn-accent">+ List</button>
        <span>
          <input type="checkbox" className="toggle" onClick={changeTheme} />
        </span>
      </div>
    </nav>
  );
};

export default Nabar;
