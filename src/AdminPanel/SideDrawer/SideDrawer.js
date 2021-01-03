import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { withRouter } from 'next/router';
import { FiUsers,FiSettings } from 'react-icons/fi';
import { GiFoodTruck } from 'react-icons/gi';
import { ImUserTie } from 'react-icons/im';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		height: '100%'
	},
	drawerPaper: {
		width: drawerWidth,
		position: 'relative',
		background: '#30373E'
	},
	drawerContainer: {
		overflow: 'auto'
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	}
}));

function Drawers(props) {
	const classes = useStyles();

	return (
		<React.Fragment>
			<CssBaseline />
			{/* <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Clipped drawer
          </Typography>
        </Toolbar>
      </AppBar> */}
			<Drawer
				className={classes.drawer}
				variant="permanent"
				classes={{
					paper: classes.drawerPaper
				}}
			>
				{/* <Toolbar /> */}
				{/* <div className={classes.drawerContainer}> */}
				{/* ,'Setting' */}
				{Object.keys(props.userData).length === 0 ? (
					<List>
						{[ 'Customer', 'Supplier', 'Truck','Setting' ].map((text, index) => (
							<ListItem
								button
								key={text}
								style={{ background: props.drawerPage === text ? 'rgb(56,56,56)' : '' }}
								onClick={() => {
									props.setDrawerPage(text);
								}}
							>
								<ListItemIcon>
									{index === 0 ? (
										<FiUsers color="white" size={23} />
									) : index === 1 ? (
										<ImUserTie color="white" size={23} />
									) : index === 2 ? (
										<GiFoodTruck color="white" size={23} />
									) : index === 3 ? (
										<FiSettings color="white" size={23} />
									) : null}
								</ListItemIcon>
								<ListItemText primary={text} style={{ color: 'white' }} />
							</ListItem>
						))}
					</List>
				) : (
					<List>
						{[ 'Profile' ].map((text, index) => (
							<ListItem
								button
								key={text}
								style={{ background: props.drawerPage === text ? 'rgb(56,56,56)' : '' }}
							>
								<ListItemIcon>
									{index === 0 ? (
										<FiUsers color="white" size={23} />
									) : index === 1 ? (
										<ImUserTie color="white" size={23} />
									) : index === 2 ? (
										<GiFoodTruck color="white" size={23} />
									) : null}
								</ListItemIcon>
								<ListItemText primary={text} style={{ color: 'white' }} />
							</ListItem>
						))}
					</List>
				)}
				<Divider />
				{/* </div> */}
			</Drawer>
		</React.Fragment>
	);
}
export default withRouter(Drawers);
