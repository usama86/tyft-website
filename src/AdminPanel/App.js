import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Appbar from './AppToolbar/AppBar';
import Grid from '@material-ui/core/Grid';
// import Login from './Login';
import SideDrawer from './SideDrawer/SideDrawer';
import HomePage from './HomePage';
import Profile from './Profile';
import { withRouter } from 'next/router';
import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	paper: {
		// padding: theme.spacing(2),
		// textAlign: 'center',
		color: theme.palette.text.secondary
	}
}));

function App(props) {
	const classes = useStyles();
	const [ drawerPage, setDrawerPage ] = React.useState('Customer');
	const isProfile = () => {
		if (Object.keys(props.router.query).length === 0) return true;
		else false;
	};
	const getHeight = () => {
		// var Height = Viewport height - element.offset.top - desired bottom margin
	};
	return (
		<Grid container style={{width:'100%',height:'100vh',overflow:'hidden'}}>
			<Grid item xs={12}>
				<Appbar />
			</Grid>
			{/* <Grid item xs={12} style={{ width: '100%', height: '90%', background: '#F1F4F5', display: 'flex' }}> */}
			{/* height: 'calc(100vh - 56px)' */}
			<Grid container item xs={12} spacing={2} style={{marginTop: 'auto',height: 'calc(100vh - 53px)'}}>
				<Grid item xs={2} style={{paddingTop:'0px'}}>
					<SideDrawer setDrawerPage={setDrawerPage} drawerPage={drawerPage} userData={props.router.query} />
				</Grid>
				<Grid item xs={10} style={{paddingTop:'0px',paddingLeft:'40px'}}>
					{!isProfile() ? (
						<Profile userData={props.router.query} {...props} />
					) : (
						<HomePage drawerPage={drawerPage} {...props} />
					)}
				</Grid>
			</Grid>
		</Grid>
	);
}
export default withRouter(App);
