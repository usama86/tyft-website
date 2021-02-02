import React from 'react';

const ServingCusine = (props) => {
	let { cusines } = props;
	return <div>{cusines ? cusines.map((data) => 
    <div>{data.cusineName}</div>
    
    ) : null}</div>;
};
export default ServingCusine;
