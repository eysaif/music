"use client";

import React, { useEffect, useState } from "react";
import Nabar from "../components/nav/Nabar";
import Footer from "../components/footer/Footer";
import Card from "../components/card/Card";
import Dialog from "../components/dialog/Dialog";

const Dashboard = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setloading] = useState(true);
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
    setloading(true);
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
      getUpdatedList();
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
  const getUpdatedList = () => {
    const URL = `/api/addItem`;
    fetch(URL)
      .then((data) => data.json())
      .then((response) => {
        setplaylistData(response.playlistData);
        setloading(false);
      });
  };
  useEffect(() => {
    getUpdatedList();
  }, []);

  const DeleteItem = (id: string) => {
    setloading(true);
    try {
      const data = {
        _id: id,
      };
      fetch(`/api/addItem`, {
        method: "DELETE", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(()=>{
        getUpdatedList();
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
          <div className="stats stats-vertical shadow " >
            {loading ? (
              <div className="flex min-h-max justify-center items-center">
              <span className="loading loading-ring loading-lg"></span>
              </div>
            ) : (
              playlistData &&
              playlistData.map((item: any, index: number) => {
                let divstyle = {
                  backgroundImage: "url(" + item.thumbnail + ")",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  cursor: "pointer",
                };
                return (
                  <div className="card card-side shadow-xl mb-1" style={{height:"150px"}} key={item._id}>
                    <figure >
                      <img style={{width:'70%',height:"auto"}} src={item.thumbnail} alt="Movie" />
                    </figure>
                    <div className="flex justify-center mt-4">
                      {/* <h2 className="card-title">{index + 1}</h2>
                      <p>Please click to play this video</p> */}
                      <div className="card-actions justify-center items-center">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            changeVedio(item.videoUrl);
                          }}
                        >
                          Watch {index + 1}
                        </button>
                        <button
                          className="btn btn-sm btn-error btn-outline"
                          onClick={() => {
                            DeleteItem(item._id);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </main>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Dashboard;
