import React from 'react'
import Button from '@material-ui/core/Button';

const EditCard = (props) => {
    const stylesForCard = {
        position: 'absolute',
        top: '50%',
        left: '55%',
        transform: 'translateX(-50%) translateY(-50%)',
        background: 'white',
        width: '30vw',
        height: '50vh',
        border: '1px solid #a8a8a8',
        padding: '1rem',
        display: 'flex',
        boxShadow: '0px 3px 11px -1px rgba(0,0,0,0.75)',
        borderRadius: '5px',
        flexDirection: 'column'
    }

    const btnStyle = {
        padding: '10px',
        marginTop: '10px',
        display: 'inline',
        background: 'grey',
        width: '100px',
        marginRight: '10px'
    }

    const btnContainerStyles = {
        display: 'flex',
        marginTop: '3rem',
        padding: '1rem',
        width: '15rem',
        justifyContent: 'space-evenly',
    }
    return (
        <div style={stylesForCard}>
            <h1 style={{
                textAlign: 'center',
                fontWeight: '400',
                letterSpacing: '3px',
            }}>Edit Cusine</h1>
            <div style={
                {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            }>
                <label for="editName" style={{
                    marginBottom: '15px',
                    fontSize: '16px'
                }} >Enter a new name</label>
                <input type="text" id="editName" style={{
                    padding: '15px',
                    fontFamily: 'roboto'
                }} />
                <div style={btnContainerStyles}>
                    <Button variant="contained" color="primary" disableElevation style={btnStyle}>
                        Save
                    </Button>
                    <Button variant="contained" color="primary" disableElevation style={btnStyle}>
                        Cancel
                    </Button>
                </div>

                {/* <BiEdit size={16} /> */}
                {/* <BiTrash size={16} color={'red'} /> */}
            </div>
        </div>
    )
}

export default EditCard
