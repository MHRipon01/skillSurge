const WhatWeOffer = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 py-20">
        <div className="card w-96  shadow-xl py-20 bg-[#F8FBE9]">
          <div className="card-body">
            <h2 className="text-2xl font-bold my-4 text-center">Lifetime Support</h2>
            <p>
              SkillSurge and its students share a lifetime bond. We strengthen
              our bond with you by providing lifelong support that helps you
              overcome any problem in your career path even after completing
              your course. Our expert support team ensures 24 hours service to
              all of our students.
            </p>
          </div>
        </div>

        <div className="card w-96   shadow-xl py-20 bg-[#F9F9EF] ">
          <div className="card-body">
            <h2 className="text-2xl font-bold my-4 text-center">Career Placement Support</h2>
            <p>
              Our career placement department is ready to help you find a
              lucrative job. We ensure your resume gets into the hands of the
              right hiring manager. So far this department has helped more than
              16000 students to find jobs in competitive global platforms.
              Promising a better future, we have successfully raised the job
              placement rate to 66% in 2023.
            </p>
          </div>
        </div>

        <div className="card w-96   shadow-xl py-20 bg-[#FAF6F4] ">
          <div className="card-body">
            <h2 className="text-2xl font-bold my-4 text-center"> Class Videos </h2>
            <p>
              No need to worry if you miss a topic in the class. We record most
              of our classes so that students who miss a session can still get
              the information they need. They can watch the videos again and
              again until they understand the topic thoroughly. Our motto is to
              provide you a flexible learning experience to gradually improve
              your competence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatWeOffer;
