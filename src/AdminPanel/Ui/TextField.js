import React from 'react';
import TextField from '@material-ui/core/TextField';

export default (props) => (
	<React.Fragment>
		{props.variants ? <TextField {...props} /> : <TextField variant="outlined" {...props} />}
	</React.Fragment>
);
