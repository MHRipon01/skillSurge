import React, { useState } from 'react';

import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useEnrolledClasses = ({id}) => {
 const {user , loading} = useAuth()

 const [teacherName, setTeacherName] = useState('');
 const [title, setTitle] = useState('');

  

 const axiosSecure = useAxiosSecure()
 const { data: enrolledClass = [] } = useQuery({
    queryKey: ["enrolledClass", id],
    enabled: !loading,
    queryFn: async () => {

    const res = await axiosSecure.get(`/enrolledClass/${id}`);
    console.log(res);
    setTeacherName(res?.data[0]?.teacherName)
    // console.log( res.data[0].teacher);
    setTitle(res?.data[0]?.title)
    console.log( res?.data[0].className);
    return [ teacherName, title]
}
    })
    
//     console.log(teacherName , title);
// return enrolledClass

};
export default useEnrolledClasses;