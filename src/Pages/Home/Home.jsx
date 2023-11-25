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

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <HighlightedClass></HighlightedClass>
      <Partners></Partners>
      <Feedback></Feedback>
      <TotalStatistics></TotalStatistics>
      <JoinAsTeacher></JoinAsTeacher>
      <SuccessStories></SuccessStories>
      <WhatWeOffer></WhatWeOffer>
      <Footer></Footer>
    </div>
  );
};

export default Home;
