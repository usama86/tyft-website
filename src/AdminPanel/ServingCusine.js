import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Label from './Ui/Label';
import EditCard from './EditCard'
import axios from 'axios';


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
let index =0;
const ServingCusine = (props) => {
    const [selectedCusineName, setSelectedCusineName] = useState('')
    const itemClickHandler = (name,ind) => {
        setSelectedCusineName(name)
		index=ind;
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

	const onUpdatePress = () => {
		let copy = [...cusines];
		copy[index].cusineName =  selectedCusineName;
		console.log(copy);
		let data = {
			_id:"5ec17c2a3a68ae4a28e0c980",
			cusine: copy
		};
		axios
			.post('https://tyft-backend.herokuapp.com' + '/api/servingcusine/updatecusines', data)
			.then(async (Response) => {
				let responseMessage = await Response.data.code;
				if(responseMessage==='ABT0000')
				{
					alert('Updated Succesfully');
					toggleCardHandler();
				}
				else
					alert('Unable to update Serving Cusine, Please try again later.')
			})
			.catch((error) => {
				console.log(error);
				setLoader(false);
			});
		
		
		
		
		
		;
		
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
                    cusines.map((data,indexes) => (
                        <ListItem button onClick={() => itemClickHandler(data.cusineName,indexes)} >
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
				onUpdatePress={onUpdatePress}
            />

        </React.Fragment >
    );
};
export default ServingCusine;
