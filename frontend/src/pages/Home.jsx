import React, { useEffect } from "react";
import Faqs from "../components/Faqs";
import Header from "../components/Header";
import Video from "../components/Video";
import Works from "../components/Works";
// const fetch = axios({
//   URL: "http//:locahost:3000",
// });

// useEffect(() => {
//   fetch("", (responce) => {
//     responce.json();
//   }).then((json) => console.log(json))
// });
const Home = () => {
  return (
    <>
      <Header />
      <Works />
      <Video />
      <Faqs />
    </>
  );
};

export default Home;
