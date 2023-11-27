import React from 'react';
import { useParams } from 'react-router-dom';

const MyClassDetails = () => {

    const {id} = useParams()


    return (
        <div>
            detals
            <p>{id}</p>

<div>
    Class progress
</div>

<div>
    add assignment
</div>



        </div>
    );
};

export default MyClassDetails;