import React from 'react';

export default ({ id, type, value, onChange, name, required, styles }) => (
	<input
		id={id}
		type={type}
		required={required}
		name={name}
		value={value}
		className="form-control"
		onChange={onChange}
		placeholder={name}
		style={styles}
	/>
);
