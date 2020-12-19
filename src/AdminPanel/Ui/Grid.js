
import React from 'react';
import Grid from '@material-ui/core/Grid';

export default ({children,...props}) => (
    <Grid 
    {...props}>
        {children}
    </Grid>
);
