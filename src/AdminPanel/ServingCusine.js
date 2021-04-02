

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Label from './Ui/Label';
import { BiEdit, BiTrash } from 'react-icons/bi';
import EditCard from './EditCard'



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        maxHeight: '600px',
        overflow: 'scroll',
        overflowX: 'hidden'
    }
}));



const ServingCusine = (props) => {
    const classes = useStyles();
    let { cusines } = props;
    return (
        <React.Fragment>
            <Label style={{
                fontSize: '20px',
                fontWeight: 'bold',
                margin: '100px',
            }}>Serving Cusines</Label>
            <List component="nav" className={classes.root} aria-label="contacts">
                {cusines ? (
                    cusines.map((data) => (

                        <ListItem button>
                            {/* kkkk */}
                            <ListItemText inset primary={data.cusineName} />
                        </ListItem>

                    ))
                ) : null}
            </List>
            <EditCard />
        </React.Fragment >
    );
};
export default ServingCusine;
