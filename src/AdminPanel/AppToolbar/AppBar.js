import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withRouter } from 'next/router'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

 function AppBars(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{background:'#202020'}}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            TYFT Admin Panel
          </Typography>
          <Button onClick={()=>props.router.push('/login')} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default withRouter(AppBars);