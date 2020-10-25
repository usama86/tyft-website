import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Appbar from './AppToolbar/AppBar';
import Grid from '@material-ui/core/Grid';
// import Login from './Login';
import SideDrawer from './SideDrawer/SideDrawer';
import HomePage from './HomePage'
const useStyles = makeStyles((theme) => ({
	root: {
        flexGrow: 1,
        height:'100%',
        width:'100%'
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary
	}
}));
 
export default function App(props) {
	const classes = useStyles();
	const [drawerPage, setDrawerPage]=React.useState("Customer")
	return (
		<div className={classes.root}>
			<Grid container  style={{width:'100%',height:'100%'}}>
				<Grid item xs={12} style={{width:'100%',height:'100vh'}}>
					<Grid item xs={12} style={{width:'100%',height:'10%'}}>
						<Appbar/>	
					</Grid>
					<Grid item xs={12} style={{width:'100%',height:'90%',background:'225, 227, 240',display:'flex'}}>
						<Grid item xs={2} style={{width: '18%',height: '100%'}}>
							<SideDrawer setDrawerPage={setDrawerPage} drawerPage={drawerPage} />
						</Grid>
						<Grid item xs={9} style={{marginLeft: '70px',marginTop: '10px',marginBottom:'10px'}}>
							<HomePage drawerPage={drawerPage} {...props}/>	
						</Grid>
					</Grid>
					
				</Grid>
			</Grid>
		</div>
	);
}
