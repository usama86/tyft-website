import React from 'react';
import TextField from './Ui/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '25ch'
		}
	}
}));

export default function Profile({ userData }) {
	const classes = useStyles();
	console.log(userData);
	const [ updateUser, SetUpdateUser ] = React.useState({
		email: null,
		Language: null,
		isAdmin: null,
		phoneNumber: null,
		profileName: null,
		userType: null,
		TruckID: null,
		MenuID: null,
		businessDesc: null,
		categoryArray: null,
		coverPhoto: null,
		customerReview: null,
		latitude: null,
		longitude: null,
		schedule: null,
		selectedServingCusines: null,
		socialMedia: {
			facebook: null,
			instagram: null,
			twitter: null
		},
		status: null,
		truckCity: null,
		truckContact: null,
		truckEmail: null,
		truckLogo: null,
		truckName: null,
		truckWebsite: null
	});

	React.useEffect(() => {
		updateVal();
	}, []);

	const updateVal = async () => {
		updateUser.email = await userData.email;
		updateUser.Language = await userData.Language;
		updateUser.isAdmin = await userData.isAdmin;
		updateUser.phoneNumber = await userData.phoneNumber;
		updateUser.profileName = userData.profileName;
		updateUser.userType = userData.userType;
		updateUser.TruckID = userData.TruckID;
		updateUser.MenuID = userData.MenuID;
		updateUser.businessDesc = userData.businessDesc;
		updateUser.categoryArray = userData.categoryArray;
		updateUser.coverPhoto = userData.coverPhoto;
		updateUser.customerReview = userData.customerReview;
		updateUser.latitude = userData.latitude;
		updateUser.longitude = userData.longitude;
		updateUser.schedule = userData.schedule;
		updateUser.selectedServingCusines = userData.selectedServingCusines;
		userData.socialMedia ? (updateUser.socialMedia.facebook = userData.socialMedia.facebook) : null;
		userData.socialMedia ? (updateUser.socialMedia.instagram = userData.socialMedia.instagram) : null;
		userData.socialMedia ? (updateUser.socialMedia.twitter = userData.socialMedia.twitter) : null;
		updateUser.status = userData.status;
		updateUser.truckCity = userData.truckCity;
		updateUser.truckContact = userData.truckContact;
		updateUser.truckEmail = userData.truckEmail;
		updateUser.truckLogo = userData.truckLogo;
		updateUser.truckName = userData.truckName;
		updateUser.truckWebsite = userData.truckWebsite;
		SetUpdateUser(updateUser);
	};
	const convertDate = (inputFormat) => {
		function pad(s) {
			return s < 10 ? '0' + s : s;
		}
		var d = new Date(inputFormat);
		return [ pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear() ].join('/');
	};
	return (
		<Grid container style={{ width: '100%', height: '100%', marginTop: '20px' }}>
			<Grid item xs={12} style={{display: 'flex'  }} >
				{userData && userData.profilePhoto ? (
					<Avatar alt="Photo" src={userData.profilePhoto} style={{ width: '80px', height: '80px' }} />
				) : userData && userData.profileName ? (
					<Avatar style={{ width: '80px', height: '80px' }}>
						{userData.profileName.charAt(0).toUpperCase()}
					</Avatar>
				) : null}
				<h3
					style={{
					    height: '9%',
                        width: '19%',
                        margin: '29px',
					}}
				>
					{userData && userData.profileName ? userData.profileName : null}
					{userData && userData.truckName ? userData.truckName : null}
				</h3>
			</Grid>
			{userData && userData.created_at ? (
				<TextField label="Created at" disabled defaultValue={convertDate(userData.created_at)} />
			) : null}
			{userData && userData.email ? (
				<TextField
					id="outlined-required"
					label="Email"
					value={updateUser.email}
					defaultValue="Hello World"
					onChange={(e) => {
						updateUser.email = e.target.value;
						console.log(updateUser);
						SetUpdateUser(updateUser);
					}}
				/>
			) : null}
			{userData && userData.Language ? (
				<TextField
					id="standard-required1"
					label="Language"
					value={updateUser.Language}
					onChange={(e) => {
						updateUser.Language = e.target.value;
						console.log(updateUser);
						SetUpdateUser(updateUser);
					}}
				/>
			) : null}
			{userData && userData.isAdmin ? (
				<TextField id="standard-required2" label="is Admin" defaultValue={userData.isAdmin} />
			) : null}
			{userData && userData.phoneNumber ? (
				<TextField id="standard-required3" label="phone Number" defaultValue={userData.phoneNumber} />
			) : null}
			{userData && userData.profileName ? (
				<TextField id="standard-required4" label="profile Name" defaultValue={userData.profileName} />
			) : null}
			{userData && userData.userType ? (
				<TextField id="standard-required5" label="User Type" defaultValue={userData.userType} />
			) : null}

			{userData && userData.TruckID ? (
				<TextField id="standard-required5" label="Truck ID" disabled defaultValue={userData.TruckID} />
			) : null}

			{userData && userData.truckName ? (
				<TextField id="standard-required5" label="Truck Name" defaultValue={userData.truckName} />
			) : null}
			{userData && userData.truckEmail ? (
				<TextField id="standard-required5" label="Truck Email" defaultValue={userData.truckEmail} />
			) : null}
			{userData && userData.truckWebsite ? (
				<TextField id="standard-required5" label="Truck Website" defaultValue={userData.truckWebsite} />
			) : null}
			{userData && userData.truckLogo ? (
				<TextField id="standard-required5" label="Truck Logo" defaultValue={userData.truckLogo} />
			) : null}
			{userData && userData.truckContact ? (
				<TextField id="standard-required5" label="Truck Contact" defaultValue={userData.truckContact} />
			) : null}
			{userData && userData.truckCity ? (
				<TextField id="standard-required5" label="Truck City" defaultValue={userData.truckCity} />
			) : null}
			{userData && userData.status ? (
				<TextField id="standard-required5" label="Truck Status" defaultValue={userData.status} />
			) : null}
			{userData && userData.socialMedia && userData.socialMedia.facebook ? (
				<TextField id="standard-required5" label="Facebook" defaultValue={userData.socialMedia.facebook} />
			) : null}
			{userData && userData.socialMedia && userData.socialMedia.instagram ? (
				<TextField id="standard-required5" label="Instagram" defaultValue={userData.socialMedia.instagram} />
			) : null}
			{userData && userData.socialMedia && userData.socialMedia.twitter ? (
				<TextField id="standard-required5" label="Twitter" defaultValue={userData.socialMedia.twitter} />
			) : null}
			{userData && userData.businessDesc ? (
				<TextField id="standard-required5" label="Business Description" defaultValue={userData.businessDesc} />
			) : null}
			{userData && userData.MenuID ? (
				<TextField id="standard-required5" label="Menu ID" disabled defaultValue={userData.MenuID} />
			) : null}
			{/* {userData.coverPhoto ? <TextField  id="standard-required5" label="Cover Photo"  defaultValue={userData.coverPhoto} />:null} */}
			{/* {userData.selectedServingCusines ? <TextField  id="standard-required5" label="Cusine"  defaultValue={userData.selectedServingCusines} />:null} */}
		</Grid>
	);
}

// Language: "English"
// created_at: "2020-09-29T18:46:20.512Z"
// email: "usama1@gmail.com"
// isAdmin: "false"
// password: "$2a$10$TeTKiVTfTPsQ/bCITDUzz.v37qcghV3gel73CV4MbTG3/.wF1eAoq"
// phoneNumber: "1234567"
// profileName: "usama"
// social: "false"
// tableData: "[object Object]"
// user: "Customer"
// userType: "Customer"

// TruckID: "5f817f955afdd100179f54f1"
// created_at: "2020-10-10T09:32:05.975Z"
// email: "ahsan@gmail.com"
// isAdmin: "false"
// password: "$2a$10$CSxyJ8rD0bYfNnjE37z4q./KJxp08KV.NC3NQt9VNDN/4yYXdKyxG"
// phoneNumber: "03355787861"
// profileName: "Ahsan Farooq"
// social: "false"
// tableData: "[object Object]"
// user: "Supplier"
// userType: "Supplier"

// MenuID: "5f74a3f49c5965001708d535"
// businessDesc: "You'd be hard-pressed to find anyone who can resist the allure of the light, airy goodness that is a churro. At The Snowy Churro, we're taking these classic confections to the next level. You'll never know how many ways you can serve up a churro unless you stop by, so keep your eyes peeled for this trailer rolling through Denver, CO and along Colorado's Front Range. Please feel free to order online at https://thesnowychurro.square.site"
// categoryArray: (3) ["Churros", "Churro Boats", "Combo Cups"]
// coverPhoto: "http://res.cloudinary.com/hmrzthc6f/image/upload/v1601487904/uploads/lvgx4mnjsecwylbhb4he.jpg"
// customerReview: "[object Object]"
// latitude: "33.673901680504734"
// longitude: "73.10547720640898"
// schedule: (7) ["[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]"]
// selectedServingCusines: (43) ["[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]", "[object Object]"]
// socialMedia: "[object Object]"
// status: "Open"
// tableData: "[object Object]"
// truckCity: "Islamabad"
// truckContact: "923335137564"
// truckEmail: "Thesnowychurro@gmail.com"
// truckLogo: "http://res.cloudinary.com/hmrzthc6f/image/upload/v1605175760/uploads/esrv1er4yx4gosznmfhu.jpg"
// truckName: "The Snow churro"
// truckWebsite: "https://thesnowychurro.square.site"
// user: "Truck"
