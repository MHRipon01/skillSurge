import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

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
    <div className="overflow-x-hidden">
      <div className="text-3xl w-full font-bold my-10 text-center ">
        <h2>EnrolledClasses {payments.length}
 </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 w-full ">
        {payments.map((payment) => (
          <div
            key={payment._id}
            className="grid grid-cols-1 md:grid-cols-3 w-full   my-7"
          >
            <div className="card w-96 ml-6  shadow-xl py-20 bg-[#dff4fbfc]">
              <div className="card-body">
                <div>
                  <img src={payment?.img} alt="" />
                </div>
                <h2 className="text-2xl font-bold my-4 text-center">
                  Title:
                  {payment.className}
                </h2>
                <p className="text-xl text-center">
                  Teacher: {payment?.teacher}
                </p>
                <div className="flex w-full items-center justify-center">
                  <Link to={`/dashboard/enrolledClassDetails/${payment?._id}`}>
                    <button className=" w-fit px-5 text-xl font-bold py-2 bg-blue-100 hover:bg-purple-400 hover:text-white rounded-lg my-5 ">
                      Continue
                    </button>
                  </Link>
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
