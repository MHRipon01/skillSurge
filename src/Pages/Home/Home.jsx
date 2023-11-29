// import Banner from "../../Components/Banner";
import Footer from "../../Components/Footer";
import Banner from "./Banner";
import Feedback from "./Feedback";
import HighlightedClass from "./HighlightedClass";

import JoinAsTeacher from "./JoinAsTeacher";
import Partners from "./Partners";
import SuccessStories from "./SuccessStories";
import TotalStatistics from "./TotalStatistics";
import WhatWeOffer from "./WhatWeOffer";
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from "react";
const Home = () => {

  useEffect(() => {
    AOS.init({ 
      duration: 1200,  
    });
  }, []);







  return (
    <div>
      <Banner></Banner>
      <HighlightedClass></HighlightedClass>
     
      <Feedback></Feedback>
      <TotalStatistics></TotalStatistics>
      <JoinAsTeacher></JoinAsTeacher>
      <SuccessStories></SuccessStories>
      <WhatWeOffer></WhatWeOffer>
       <Partners></Partners>
      <Footer></Footer>
    </div>
  );
};

export default Home;
