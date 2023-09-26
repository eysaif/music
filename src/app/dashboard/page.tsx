"use client";

import React, { useEffect, useState } from "react";
import Nabar from "../components/nav/Nabar";
import Footer from "../components/footer/Footer";
import Card from "../components/card/Card";
import Dialog from "../components/dialog/Dialog";

const Dashboard = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [playlists, setplaylists] = useState([]);
  const [themeValue, setthemeValue] = useState("cupcake");
  const childEmiter = (childData: any) => {
    // console.log("Emit from child",childData);
    let correctURL = childData.includes("?v=")
      ? childData.split("?v=")[1].split("").splice(0, 11).join("")
      : childData.split(".be/")[1].split("").splice(0, 11).join("");
    setVideoUrl("https://www.youtube.com/embed/" + correctURL);

    try {
      const data = {videoUrl: `https://www.youtube.com/embed/${correctURL}`,playlist:"General",thumbnail:`https://img.youtube.com/vi/${correctURL}/0.jpg`}
      const response = fetch(`/api/addItem`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const URL = `/api/playlist`;
    fetch(URL)
      .then((data) => data.json())
      .then((response) => {
        setplaylists(response);
      });
  }, []);
  const UpdateTheme = () => {
    themeValue == "halloween"
      ? setthemeValue("cupcake")
      : setthemeValue("halloween");
    console.log(themeValue);
  };
  return (
    <>
      <div data-theme={themeValue}>
        <Nabar changeTheme={UpdateTheme} />
        <main className="flex m-2  flex-col gap-2 h-screen">
          <Dialog childEmiter={childEmiter} />
          <select className="select select-bordered w-full max-w-xs">
            <option  disabled>
              Your Playlist
            </option>
            {playlists &&
              playlists.map((item: any) => {
                return <option key={item.key}>{item.value}</option>;
              })}
          </select>
          <Card vedioUrl={videoUrl} />
        </main>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Dashboard;
