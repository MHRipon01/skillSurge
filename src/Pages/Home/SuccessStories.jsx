const SuccessStories = () => {
  return (
    <div>
        <div data-aos="fade-up" className="w-full text-center mt-14"> 
           <h2 className="text-4xl font-bold text-red-400">Success Stories </h2>
           <p className="text-gray-400">The presence of our students in the ever expanding IT industry <br /> motivates us, drives us to guide more people towards a sustainable future.</p>  
        </div>
     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
        <div className="tooltip "data-tip="video isn't uploaded yet!">
          <img
            className="rounded-lg  " 
            src="https://i.ibb.co/bg01V89/image.png"
            alt=""
          />
        </div>
        <div className="tooltip "data-tip="video isn't uploaded yet!">
          <img
            className="rounded-lg"
            src="https://i.ibb.co/7vh81Pw/image.png"
            alt=""
          />
        </div>
        <div className="tooltip "data-tip="video isn't uploaded yet!">
          <img
            className="rounded-lg"
            src="https://i.ibb.co/7CPRL3K/image.png"
            alt=""
          />
        </div>
        <div className="tooltip "data-tip="video isn't uploaded yet!">
          <img
            className="rounded-lg"
            src="https://i.ibb.co/6mGX9qd/image.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
