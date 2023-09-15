import React from "react";

const Nabar = () => {
  return (
    <nav>
      <div className="navbar bg-neutral text-neutral-content flex justify-between">
        <button className="btn btn-outline btn-accent">+ List</button>
        <span>
          <input type="checkbox" className="toggle" />
        </span>
      </div>
    </nav>
  );
};

export default Nabar;
