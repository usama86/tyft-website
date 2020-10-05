import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    height:'45%',
    width:'25%',
    background:'white',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
}));

export default function BasicTextFields() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="filled-basic" label="Filled" variant="filled" style={{background:'white'}} />
    </form>
  );
}
