'use client';

import React,{ useState }  from "react";
import Nabar from "../components/nav/Nabar";
import Footer from "../components/footer/Footer";
import Card from "../components/card/Card";
import Dialog from "../components/dialog/Dialog";
 
const Dashboard = () => {
  const [videoUrl , setVideoUrl] = useState('');
  const childEmiter = (childData :any )=>{
    // console.log("Emit from child",childData);
    let correctURL = (childData.includes('?v='))  ? childData.split('?v=')[1].split("").splice(0,11).join("") : childData.split('.be/')[1].split("").splice(0,11).join("");
    setVideoUrl("https://www.youtube.com/embed/" + correctURL);
  }
  return (
    <>
      <div data-theme="cupcake">
        <Nabar />
        <main className="flex m-2  flex-col gap-2 h-screen">
          <Dialog childEmiter={childEmiter}/>
          <select className="select select-bordered w-full max-w-xs">
            <option disabled>Select Your List</option>
            <option key="a">Normal Apple</option>
            <option key="o">Normal Orange</option>
          </select>
          <Card vedioUrl={videoUrl}/>
        </main>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Dashboard;
