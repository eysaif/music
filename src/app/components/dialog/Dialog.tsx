"use client";

import React, { useState } from "react";

type props = {
  childEmiter: (event: String) => void;
};

const Dialog = ({ childEmiter }: props) => {
  const [newVideoUrl, setnewVideoUrl] = useState("");
  const handleInput = (event :any) => {
    setnewVideoUrl(event.target.value);
  };

  const OpenDialog = () => {
    const model: any = document.getElementById("my_modal_1");
    model.showModal();
  };

  return (
    <>
      <div>
        <button className="btn btn-success" onClick={OpenDialog}>
          + Video
        </button>

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Enter Your Video URL</span>
              </label>
              <input
                type="url"
                placeholder="https://www.youtube.com/watch?v=MIKHPrCZTPk"
                className="input input-bordered w-full"
                onInput={handleInput}
              />
            </div>
            <div className="modal-action flex justify-between">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button
                  className="btn btn-accent m-1"
                  onClick={() => childEmiter(newVideoUrl)}
                >
                  Add
                </button>
                <button className="btn m-1">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default Dialog;
