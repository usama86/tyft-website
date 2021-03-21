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
		maxWidth: 556,
		backgroundColor: theme.palette.background.paper
	},
	listItemStyle:{
		height: '53px',
		width: '100px',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
	}
}));

export default function InsetList({ data }) {
	const classes = useStyles();

	return (
		<List component="nav" className={classes.root} aria-label="contacts">
            	<ListItem>
						<ListItemText inset primary="Name"  className={classes.listItemStyle}/>
						<ListItemText inset primary="Category" className={classes.listItemStyle}/>
						<ListItemText inset primary="Description" className={classes.listItemStyle}/>
						<ListItemText inset primary="Price" className={classes.listItemStyle} />
				</ListItem>
			{data.map((item,index) => (
               !(data.length-1 === index) && (
				<React.Fragment>
					<ListItem button>
						<ListItemText inset primary={item.name} className={classes.listItemStyle} />
						<ListItemText inset primary={item.category} className={classes.listItemStyle} />
						<ListItemText inset primary={item.description} className={classes.listItemStyle} />
						<ListItemText inset primary={item.price} className={classes.listItemStyle} />
					</ListItem>
				</React.Fragment>
               )
			))}
		</List>
	);
}
