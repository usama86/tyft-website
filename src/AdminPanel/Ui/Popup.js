import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props) {
	const handleClose = () => {
		props.setOpen(false);
	};

	return (
		<div>
			<Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To subscribe to this website, please enter your email address here. We will send updates
						occasionally.
					</DialogContentText>
					{props.columnData.Language ? (
						<TextField
							autoFocus
							margin="dense"
							id="name1"
							value={props.columnData.Language}
							label="Language"
							fullWidth
						/>
					) : null}
					<TextField
						autoFocus
						margin="dense"
						id="name2"
						value={props.columnData.profileName}
						label="Name"
						fullWidth
					/>

					<TextField
						autoFocus
						margin="dense"
						id="name3"
						value={props.columnData.email}
						label="Email"
						fullWidth
					/>
					<TextField
						autoFocus
						margin="dense"
						id="name4"
						value={props.columnData.phoneNumber}
						label="Phone Number"
						fullWidth
					/>

					<TextField
						autoFocus
						margin="dense"
						id="name5"
						value={props.columnData.userType}
						label="User Type"
						fullWidth
					/>
					<TextField
						autoFocus
						margin="dense"
						id="name6"
						value={props.columnData.created_at}
						label="Created at"
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleClose} color="primary">
						Approve
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
