import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const EnrolledClasses = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  console.log(payments);

  return (
    <div >
      EnrolledClasses {payments.length}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 w-full">
        {payments.map((payment) => (
        <div key={payment._id} className="grid grid-cols-1 md:grid-cols-3 w-full">
          <div className="card w-96 ml-6  shadow-xl py-20 bg-[#F8FBE9]">
            <div className="card-body">
              <div>
                <img src={payment?.img} alt="" />
              </div>
              <h2 className="text-2xl font-bold my-4 text-center">
                {payment?.className}
              </h2>
              <p className="text-xl text-center">Teacher: {payment?.teacher}</p>
              <div className="flex w-full items-center justify-center">
                 <button  className=" w-fit px-5 text-xl font-bold py-2 bg-blue-100 hover:bg-purple-400 hover:text-white rounded-lg my-5 ">Continue</button>
              </div>
             
            </div>
          </div>
        </div>
      ))}
      </div>
      
    </div>
  );
};

export default EnrolledClasses;
