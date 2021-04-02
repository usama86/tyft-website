import React, { useState } from 'react';
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
    const [selectedCusineName, setSelectedCusineName] = useState('')
    const itemClickHandler = (name) => {
        setSelectedCusineName(name)
        // prevents rerender
        if (!showCard) {
            setShowCard(true)
        }
    }

    const toggleCardHandler = () => {
        setShowCard(false)
    }

    const changeValueHandler = (e) => {
        e.preventDefault;
        // updating the state by changing
        setSelectedCusineName(e.target.value)
    }

    const [showCard, setShowCard] = useState(false)
   
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
                        <ListItem button onClick={() => itemClickHandler(data.cusineName)} >
                            {/* kkkk */}
                            <ListItemText inset primary={data.cusineName} />
                        </ListItem>
                    ))
                ) : null}
            </List>
            <EditCard
                show={showCard}
                closeCardHandler={toggleCardHandler}
                selectedState={selectedCusineName}
                changeHandler={changeValueHandler}
            />

        </React.Fragment >
    );
};
export default ServingCusine;
