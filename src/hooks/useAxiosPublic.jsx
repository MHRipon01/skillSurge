import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://skill-surge.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
