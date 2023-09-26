"use client";

import React, { useEffect, useState } from "react";
import Nabar from "../components/nav/Nabar";
import Footer from "../components/footer/Footer";
import Card from "../components/card/Card";
import Dialog from "../components/dialog/Dialog";

const Dashboard = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [playlists, setplaylists] = useState([
    { key: 1, value: "General" },
    { key: 2, value: "Favorite" },
    { key: 3, value: "Custom" },
  ]);
  const [playlistData, setplaylistData] = useState([]);
  const [themeValue, setthemeValue] = useState("cupcake");
  const childEmiter = (childData: any) => {
    // console.log("Emit from child",childData);
    let correctURL = childData.includes("?v=")
      ? childData.split("?v=")[1].split("").splice(0, 11).join("")
      : childData.split(".be/")[1].split("").splice(0, 11).join("");
    setVideoUrl("https://www.youtube.com/embed/" + correctURL);

    try {
      const data = {
        videoUrl: `https://www.youtube.com/embed/${correctURL}`,
        playlist: "General",
        thumbnail: `https://img.youtube.com/vi/${correctURL}/0.jpg`,
      };
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

  const changeVedio = (url: string) => {
    console.log(url);
    setVideoUrl(url);
  };
  useEffect(() => {
    // const URL = `/api/playlist`;
    // fetch(URL)
    //   .then((data) => data.json())
    //   .then((response) => {
    //     setplaylists(response);
    //   });
  }, []);
  const UpdateTheme = () => {
    themeValue == "halloween"
      ? setthemeValue("cupcake")
      : setthemeValue("halloween");
    console.log(themeValue);
  };

  useEffect(() => {
    const URL = `/api/addItem`;
    fetch(URL)
      .then((data) => data.json())
      .then((response) => {
        setplaylistData(response.playlistData);
      });
  }, []);

  return (
    <>
      <div data-theme={themeValue}>
        <Nabar changeTheme={UpdateTheme} />
        <main className="flex m-2  flex-col gap-2 h-screen">
          <Dialog childEmiter={childEmiter} />
          <select className="select select-bordered w-full max-w-xs">
            <option disabled>Your Playlist</option>
            {playlists &&
              playlists.map((item: any) => {
                return <option key={item.key}>{item.value}</option>;
              })}
          </select>
          <Card vedioUrl={videoUrl} />

          <div className="stats stats-vertical shadow">
            {playlistData &&
              playlistData.map((item: any) => {
                let divstyle = {
                  backgroundImage: "url(" + item.thumbnail + ")",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  cursor: "pointer",
                };
                return (
                  <div
                    key={item._id}
                    className="stat"
                    style={divstyle}
                    onClick={() => {
                      changeVedio(item.videoUrl);
                    }}
                  ></div>
                );
              })}
          </div>
        </main>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Dashboard;
