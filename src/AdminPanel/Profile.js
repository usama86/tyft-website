import React from 'react';
import TextField from './Ui/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from './Ui/Grid';
import Label from './Ui/Label';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Popup from './Ui/Popup';
import Select from './Ui/Select/ELXSelect';
import MaterialTable from 'material-table';
import { withRouter } from 'next/router';
const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '25ch'
		}
	}
}));

function Profile({ userData,...props }) {
	const classes = useStyles();
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
		truckWebsite: null,
		activeStatus: 'Active'
	});
	const [ isLoading, setIsLoading ] = React.useState(false);
	const [ reset, isReset ] = React.useState(false);
	const [ open, setOpen ] = React.useState(false);
	const [ popupData, setPopupData ] = React.useState([]);
	const [ tableColumn, setTableColumn ] = React.useState([
		{ title: 'Name', field: 'name' },
		{ title: 'Category', field: 'category' },
		{ title: 'Description', field: 'description' },

		{ title: 'Price', field: 'price' }
	]);
	React.useEffect(() => {
		updateVal();
	}, []);

	const onChangeUserData = (e, val) => {
		if (val === 'facebook' || val === 'twitter' || val === 'instagram')
			updateUser.socialMedia[val] = e.target.value;
		else updateUser[val] = e.target.value;
		SetUpdateUser(updateUser);
		isReset(!reset);
	};

	const updateVal = async (e, isUpdate) => {
		setIsLoading(true);
		console.log(updateUser.userType);
		// setOpen(true);
		updateUser.email = await userData.email;
		updateUser.Language = await userData.Language;
		updateUser.isAdmin = await userData.isAdmin;
		updateUser.phoneNumber = await userData.phoneNumber;
		updateUser.profileName = await userData.profileName;
		updateUser.userType = await userData.userType;
		updateUser.TruckID = await userData.TruckID;
		updateUser.MenuID = await userData.MenuID;
		updateUser.businessDesc = await userData.businessDesc;
		updateUser.categoryArray = await userData.categoryArray; //1Business Description
		updateUser.coverPhoto = await userData.coverPhoto;
		updateUser.customerReview = await userData.customerReview; //2
		updateUser.latitude = await userData.latitude; //miss, need to show radius
		updateUser.longitude = await userData.longitude; // miss
		updateUser.schedule = await userData.schedule; //3
		updateUser.selectedServingCusines = await userData.selectedServingCusines; //4
		if (userData.socialMedia && userData.socialMedia !== 'undefined')
			updateUser.socialMedia = await JSON.parse(userData.socialMedia);
		updateUser.status = await userData.status;
		updateUser.truckCity = await userData.truckCity;
		updateUser.truckContact = await userData.truckContact;
		updateUser.truckEmail = await userData.truckEmail;
		updateUser.truckLogo = await userData.truckLogo;
		updateUser.truckName = await userData.truckName;
		updateUser.truckWebsite = await userData.truckWebsite;
		if (userData.activeStatus) updateUser.activeStatus = await userData.activeStatus;

		SetUpdateUser(updateUser);
		console.log(updateUser);
		setIsLoading(false);
	};

	const submitData = () => {
		if (updateUser.userType === 'Customer' || updateUser.userType === 'Supplier') {
			let data = {
				_id: userData._id,
				email: updateUser.email,
				profileName: updateUser.profileName,
				phoneNumber: updateUser.phoneNumber,
				Language: updateUser.Language
			};
			axios
				.post('https://tyft-backend.herokuapp.com' + '/api/users/updateuser', data)
				.then(async (Response) => {
					let responseMessage = await Response.data.code;
					console.log(responseMessage);
					if (responseMessage === 'ABT0000') {
						alert('Data Updated');
					}
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			//truck
			let socialMedia = {
				facebook: updateUser.socialMedia.facebook,
				instagram: updateUser.socialMedia.instagram,
				twitter: updateUser.socialMedia.twitter
			};
			let data = {
				_id: userData._id,
				truckName: updateUser.truckName,
				businessDesc: updateUser.businessDesc,
				truckContact: updateUser.truckContact,
				truckEmail: updateUser.truckEmail,
				truckCity: updateUser.truckCity,
				truckWebsite: updateUser.truckWebsite,
				socialMedia: socialMedia,
				status: updateUser.status,
				activeStatus: updateUser.activeStatus
			};
			axios
				.post('https://tyft-backend.herokuapp.com' + '/api/supplier/updatetruck', data)
				.then(async (Response) => {
					let responseMessage = await Response.data.code;
					console.log(responseMessage);
					if (responseMessage === 'ABT0000') {
						alert('Data Updated');
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};
	const deleteUser = () => {
		let type = '';
		if (updateUser.userType === 'Customer' || updateUser.userType === 'Supplier') type = 'User';
		else type = 'Truck';
		let data = {
			_id: userData._id,
			type: type
		};
		axios
			.post('https://tyft-backend.herokuapp.com' + '/api/general/delete', data)
			.then(async (Response) => {
				let responseMessage = await Response.data.code;
				console.log(responseMessage);
				if (responseMessage === 'ABT0000') {
					alert('Deleted');
					props.router.push('/home');
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const getMenu = () => {
		let sendID = {
			_id: userData.MenuID
		};
		axios
			.post('https://tyft-backend.herokuapp.com' + '/api/menu/getmenu', sendID)
			.then(async (Response) => {
				let responseMessage = await Response.data.MenuData;
				console.log(responseMessage);
				setPopupData(responseMessage);
			})
			.catch((error) => {
				console.log(error);
			});
		setOpen(true);
	};

	let expData = [
		{
			heading: 'Rows',
			controls: [
				userData.email
					? {
							label: 'Email:',
							xsLabel: 1,
							xsSize: 3,
							component: TextField,
							props: {
								className: classes.inputclass,
								data: [ 'Auto', 'Exact', 'Atleast' ],
								onChange: (e) => onChangeUserData(e, 'email'),
								required: true,
								id: 'row-heights0',
								value: updateUser.email
							}
						}
					: { showNothing: true },
				userData.Language
					? {
							label: 'Language:',
							xsLabel: 1,
							xsSize: 3,
							component: Select,
							props: {
								className: classes.inputclass,
								data: [ 'English', 'Spanish' ],
								onChange: (e) => onChangeUserData(e, 'Language'),
								required: true,
								id: 'row-heights1',
								value: updateUser.Language
							}
						}
					: { showNothing: true },
				// userData.isAdmin
				// 	? {
				// 			label: 'is Admin:',
				// 			xsLabel: 1,
				// 			xsSize: 3,
				// 			component: TextField,
				// 			props: {
				// 				className: classes.inputclass,
				// 				data: [ 'Auto', 'Exact', 'Atleast' ],
				// 				onChange: (e) => onChangeUserData(e, 'isAdmin'),
				// 				required: true,
				// 				id: 'row-heights2',
				// 				value: updateUser.isAdmin
				// 			}
				// 		}
				// 	: { showNothing: true },
				userData.phoneNumber
					? {
							label: 'phone Number:',
							xsLabel: 1,
							xsSize: 3,
							component: TextField,
							props: {
								className: classes.inputclass,
								data: [ 'Auto', 'Exact', 'Atleast' ],
								onChange: (e) => onChangeUserData(e, 'phoneNumber'),
								required: true,
								id: 'row-heights3',
								value: updateUser.phoneNumber
							}
						}
					: { showNothing: true },
				userData.profileName
					? {
							label: 'Profile Name:',
							xsLabel: 1,
							xsSize: 3,
							component: TextField,
							props: {
								className: classes.inputclass,
								data: [ 'Auto', 'Exact', 'Atleast' ],
								onChange: (e) => onChangeUserData(e, 'profileName'),
								required: true,
								id: 'row-heights4',
								value: updateUser.profileName
							}
						}
					: { showNothing: true },
				userData.userType
					? {
							label: 'User Type:',
							xsLabel: 1,
							xsSize: 3,
							component: TextField,
							props: {
								className: classes.inputclass,
								data: [ 'Auto', 'Exact', 'Atleast' ],
								onChange: (e) => onChangeUserData(e, 'userType'),
								required: true,
								id: 'row-heights43',
								value: updateUser.userType,
								disabled: true
							}
						}
					: { showNothing: true },
				userData.TruckID
					? {
							label: 'Truck ID:',
							xsLabel: 1,
							xsSize: 3,
							component: TextField,
							props: {
								className: classes.inputclass,
								data: [ 'Auto', 'Exact', 'Atleast' ],
								onChange: (e) => onChangeUserData(e, 'TruckID'),
								required: true,
								id: 'row-heights5',
								value: updateUser.TruckID,
								disabled: true
							}
						}
					: { showNothing: true },
				userData.MenuID
					? {
							label: 'Menu:',
							xsLabel: 1,
							xsSize: 3,
							component: TextField,
							props: {
								className: classes.inputclass,
								data: [ 'Auto', 'Exact', 'Atleast' ],
								onChange: (e) => onChangeUserData(e, 'MenuID'),
								onClick: () => getMenu(),
								required: true,
								id: 'row-heights6',
								value: 'Get truck menu',
								disabled: true
							}
						}
					: { showNothing: true },
				userData.businessDesc
					? {
							label: 'Business Description:',
							xsLabel: 1,
							xsSize: 3,
							component: TextField,
							props: {
								className: classes.inputclass,
								data: [ 'Auto', 'Exact', 'Atleast' ],
								multiline: true,
								rows: 3,
								onChange: (e) => onChangeUserData(e, 'businessDesc'),
								required: true,
								id: 'row-heights7',
								value: updateUser.businessDesc
							}
						}
					: { showNothing: true },
				userData.socialMedia && userData.socialMedia !== 'undefined'
					? {
							label: 'Facebook:',
							xsLabel: 1,
							xsSize: 3,
							component: TextField,
							props: {
								className: classes.inputclass,
								data: [ 'Auto', 'Exact', 'Atleast' ],
								onChange: (e) => onChangeUserData(e, 'facebook'),
								required: true,
								id: 'row-heights8',
								value: updateUser.socialMedia.facebook
							}
						}
					: { showNothing: true },
				userData.socialMedia && userData.socialMedia !== 'undefined'
					? {
							label: 'Instagram:',
							xsLabel: 1,
							xsSize: 3,
							component: TextField,
							props: {
								className: classes.inputclass,
								data: [ 'Auto', 'Exact', 'Atleast' ],
								onChange: (e) => onChangeUserData(e, 'instagram'),
								required: true,
								id: 'row-heights9',
								value: updateUser.socialMedia.instagram
							}
						}
					: { showNothing: true },
				userData.socialMedia && userData.socialMedia !== 'undefined'
					? {
							label: 'Twitter:',
							xsLabel: 1,
							xsSize: 3,
							component: TextField,
							props: {
								className: classes.inputclass,
								data: [ 'Auto', 'Exact', 'Atleast' ],
								onChange: (e) => onChangeUserData(e, 'twitter'),
								required: true,
								id: 'row-heights11',
								value: updateUser.socialMedia.twitter
							}
						}
					: { showNothing: true },
				userData.status
					? {
							label: 'Status:',
							xsLabel: 1,
							xsSize: 3,
							component: Select,
							props: {
								className: classes.inputclass,
								data: [ 'Open', 'Close' ],
								onChange: (e) => onChangeUserData(e, 'status'),
								required: true,
								id: 'row-heights22',
								value: updateUser.status
							}
						}
					: { showNothing: true },
				userData.truckCity
					? {
							label: 'Truck City:',
							xsLabel: 1,
							xsSize: 3,
							component: TextField,
							props: {
								className: classes.inputclass,
								data: [ 'Auto', 'Exact', 'Atleast' ],
								onChange: (e) => onChangeUserData(e, 'truckCity'),
								required: true,
								id: 'row-heights33',
								value: updateUser.truckCity
							}
						}
					: { showNothing: true },
				userData.truckContact
					? {
							label: 'Truck Contact:',
							xsLabel: 1,
							xsSize: 3,
							component: TextField,
							props: {
								className: classes.inputclass,
								data: [ 'Auto', 'Exact', 'Atleast' ],
								onChange: (e) => onChangeUserData(e, 'truckContact'),
								required: true,
								id: 'row-heights44',
								value: updateUser.truckContact
							}
						}
					: { showNothing: true },
				userData.truckEmail
					? {
							label: 'Truck Email:',
							xsLabel: 1,
							xsSize: 3,
							component: TextField,
							props: {
								className: classes.inputclass,
								data: [ 'Auto', 'Exact', 'Atleast' ],
								onChange: (e) => onChangeUserData(e, 'truckEmail'),
								required: true,
								id: 'row-heights55',
								value: updateUser.truckEmail
							}
						}
					: { showNothing: true },
				userData.truckName
					? {
							label: 'Truck Name:',
							xsLabel: 1,
							xsSize: 3,
							component: TextField,
							props: {
								className: classes.inputclass,
								data: [ 'Auto', 'Exact', 'Atleast' ],
								onChange: (e) => onChangeUserData(e, 'truckName'),
								required: true,
								id: 'row-heights66',
								value: updateUser.truckName
							}
						}
					: { showNothing: true },
				userData.truckWebsite
					? {
							label: 'Truck Website:',
							xsLabel: 1,
							xsSize: 3,
							component: TextField,
							props: {
								className: classes.inputclass,
								data: [ 'Auto', 'Exact', 'Atleast' ],
								onChange: (e) => onChangeUserData(e, 'truckWebsite'),
								required: true,
								id: 'row-heights77',
								value: updateUser.truckWebsite
							}
						}
					: { showNothing: true },
				{
					label: 'Active Status:',
					xsLabel: 1,
					xsSize: 3,
					component: Select,
					props: {
						className: classes.inputclass,
						data: [ 'Active', 'InActive' ],
						onChange: (e) => onChangeUserData(e, 'activeStatus'),
						required: true,
						id: 'row-heights88',
						value: updateUser.activeStatus
					}
				}
			]
		}
	];

	return (
		<React.Fragment>
			{isLoading ? (
				<CircularProgress style={{ height: '20px', width: '20px' }} />
			) : (
				<React.Fragment>
					{expData.map((pane, paneIndex) => {
						if (pane !== undefined) {
							return (
								<Grid container spacing={3} style={{ paddingTop: '25px' }}>
									{console.log(updateUser)}
									{pane.controls.map((control, index) => {
										if (control !== undefined && control.showNothing !== true) {
											return (
												<React.Fragment key={index}>
													{control.label && (
														<Grid item xs={control.xsLabel} style={{ paddingTop: '28px' }}>
															<Label style={{ fontSize: '15px', fontWeight: 'bolder' }}>
																{control.label}
															</Label>
														</Grid>
													)}
													<Grid
														item
														xs={control.xsSize}
														style={{ justifyContent: control.justifyComponent }}
													>
														<control.component {...control.props} />
													</Grid>
												</React.Fragment>
											);
										}
									})}
								</Grid>
							);
						}
					})}
					<div style={{ marginTop: '40px', display: 'flex' }}>
						<Button variant="outlined" onClick={submitData}>
							Update
						</Button>
						<Button variant="outlined" style={{ marginLeft: '10px' }} onClick={deleteUser}>
							Delete
						</Button>
						<Button variant="outlined" style={{ marginLeft: '10px' }} onClick={updateVal}>
							Reset
						</Button>
					</div>
				</React.Fragment>
			)}
			<Popup open={open} handleClose={() => setOpen(false)}>
				<MaterialTable
					title={'Menu Data'}
					style={{ marginTop: '4vh', color: 'black' }}
					columns={tableColumn}
					data={popupData}
					// onRowClick={rowClickHander}
					options={{
						search: true,
						pageSizeOptions: [ 5 ],
						// searchFieldStyle: { color: 'white' },
						rowStyle: (x) => {
							return {
								cursor: 'pointer',
								'&:hover': {
									// background: 'red'
								}
							};
						}
					}}
				/>
			</Popup>
		</React.Fragment>
	);
}
export default withRouter(Profile);
{
	/* <Grid item xs={12} style={{ display: 'flex'}}>
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
		margin: '29px'
	}}
>
	{userData && userData.profileName ? userData.profileName : null}
	{userData && userData.truckName ? userData.truckName : null}
</h3>
</Grid> */
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

// {userData && userData.created_at ? (
// 	<TextField label="Created at" disabled defaultValue={convertDate(userData.created_at)} />
// ) : null}
// {userData && userData.email ? (
// 	<TextField
// 		id="outlined-required"
// 		label="Email"
// 		value={updateUser.email}
// 		defaultValue="Hello World"
// 		onChange={(e) => {
// 			updateUser.email = e.target.value;
// 			console.log(updateUser);
// 			SetUpdateUser(updateUser);
// 		}}
// 	/>
// ) : null}
// {userData && userData.Language ? (
// 	<TextField
// 		id="standard-required1"
// 		label="Language"
// 		value={updateUser.Language}
// 		onChange={(e) => {
// 			updateUser.Language = e.target.value;
// 			console.log(updateUser);
// 			SetUpdateUser(updateUser);
// 		}}
// 	/>
// ) : null}
// {userData && userData.isAdmin ? (
// 	<TextField id="standard-required2" label="is Admin" defaultValue={userData.isAdmin} />
// ) : null}
// {userData && userData.phoneNumber ? (
// 	<TextField id="standard-required3" label="phone Number" defaultValue={userData.phoneNumber} />
// ) : null}
// {userData && userData.profileName ? (
// 	<TextField id="standard-required4" label="profile Name" defaultValue={userData.profileName} />
// ) : null}
// {userData && userData.userType ? (
// 	<TextField id="standard-required5" label="User Type" defaultValue={userData.userType} />
// ) : null}

// {userData && userData.TruckID ? (
// 	<TextField id="standard-required5" label="Truck ID" disabled defaultValue={userData.TruckID} />
// ) : null}

// {userData && userData.truckName ? (
// 	<TextField id="standard-required5" label="Truck Name" defaultValue={userData.truckName} />
// ) : null}
// {userData && userData.truckEmail ? (
// 	<TextField id="standard-required5" label="Truck Email" defaultValue={userData.truckEmail} />
// ) : null}
// {userData && userData.truckWebsite ? (
// 	<TextField id="standard-required5" label="Truck Website" defaultValue={userData.truckWebsite} />
// ) : null}
// {userData && userData.truckLogo ? (
// 	<TextField id="standard-required5" label="Truck Logo" defaultValue={userData.truckLogo} />
// ) : null}
// {userData && userData.truckContact ? (
// 	<TextField id="standard-required5" label="Truck Contact" defaultValue={userData.truckContact} />
// ) : null}
// {userData && userData.truckCity ? (
// 	<TextField id="standard-required5" label="Truck City" defaultValue={userData.truckCity} />
// ) : null}
// {userData && userData.status ? (
// 	<TextField id="standard-required5" label="Truck Status" defaultValue={userData.status} />
// ) : null}
// {userData && userData.socialMedia && userData.socialMedia.facebook ? (
// 	<TextField id="standard-required5" label="Facebook" defaultValue={userData.socialMedia.facebook} />
// ) : null}
// {userData && userData.socialMedia && userData.socialMedia.instagram ? (
// 	<TextField id="standard-required5" label="Instagram" defaultValue={userData.socialMedia.instagram} />
// ) : null}
// {userData && userData.socialMedia && userData.socialMedia.twitter ? (
// 	<TextField id="standard-required5" label="Twitter" defaultValue={userData.socialMedia.twitter} />
// ) : null}
// {userData && userData.businessDesc ? (
// 	<TextField id="standard-required5" label="Business Description" defaultValue={userData.businessDesc} />
// ) : null}
// {userData && userData.MenuID ? (
// 	<TextField id="standard-required5" label="Menu ID" disabled defaultValue={userData.MenuID} />
// ) : null}
{
	/* {userData.coverPhoto ? <TextField  id="standard-required5" label="Cover Photo"  defaultValue={userData.coverPhoto} />:null} */
}
{
	/* {userData.selectedServingCusines ? <TextField  id="standard-required5" label="Cusine"  defaultValue={userData.selectedServingCusines} />:null} */
}
