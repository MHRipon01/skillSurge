import React from 'react';
import { useParams } from 'react-router-dom';

const ClassProgress = () => {

    const {id} = useParams()
    console.log(id);


    return (
        <div>
            reviewssssssssss
            {id}
        </div>
    );
};

export default ClassProgress;