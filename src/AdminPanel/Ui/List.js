import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper
	}
}));

export default function InsetList({ data }) {
	const classes = useStyles();

	return (
		<List component="nav" className={classes.root} aria-label="contacts">
            	<ListItem>
						<ListItemText inset primary="Name" />
						<ListItemText inset primary="Category" />
						<ListItemText inset primary="Description" />
						<ListItemText inset primary="Price" />
				</ListItem>
			{data.map((item,index) => (
               !(data.length-1 === index) && (
				<React.Fragment>
					<ListItem button>
						<ListItemText inset primary={item.name} />
						<ListItemText inset primary={item.category} />
						<ListItemText inset primary={item.description} />
						<ListItemText inset primary={item.price} />
					</ListItem>
				</React.Fragment>
               )
			))}
		</List>
	);
}
