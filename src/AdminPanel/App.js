import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Appbar from './AppToolbar/AppBar';
import Grid from '@material-ui/core/Grid';
// import Login from './Login';
import SideDrawer from './SideDrawer/SideDrawer';
import HomePage from './HomePage';
import Profile from './Profile';
import { withRouter } from 'next/router';
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		height: '100%',
		width: '100%'
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
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
	return (
		<div className={classes.root}>
			<Grid container style={{ width: '100%', height: '100%' }}>
				<Grid item xs={12} style={{ width: '100%', height: '100vh' }}>
					<Grid item xs={12} style={{ width: '100%', height: '9%' }}>
						<Appbar />
					</Grid>
					<Grid item xs={12} style={{ width: '100%', height: '90%', background: '#F1F4F5', display: 'flex' }}>
						<Grid item xs={2} style={{ width: '18%', height: '100%' }}>
							<SideDrawer setDrawerPage={setDrawerPage} drawerPage={drawerPage} userData={props.router.query}/>
						</Grid>
						<Grid item xs={10} style={isProfile() ?{ marginLeft: '70px', marginTop: '10px', marginBottom: '10px' }:null}>
							{!isProfile() ? <Profile userData={props.router.query} {...props} /> : <HomePage drawerPage={drawerPage} {...props} />}
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}
export default withRouter(App);
