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
import MenuFunction from './Ui/Menu';
import Cusine from './Ui/ServingCusine';
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
	const [ openMenu, setOpenMenu ] = React.useState(false);
	const [ openCusine, setOpenCusine ] = React.useState(false);
	
	
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
						<Button variant="outlined" style={{ marginLeft: '10px' }} onClick={()=>setOpenCusine(true)} >
							Serving Cusine
						</Button>
						<Button variant="outlined" style={{ marginLeft: '10px' }} onClick={()=>setOpenMenu(true)}>
							Menu
						</Button>
						<Button variant="outlined" style={{ marginLeft: '10px' }} >
							Schedule
						</Button>
						<Button variant="outlined" style={{ marginLeft: '10px' }}>
							Categories
						</Button>
					</div>
				</React.Fragment>
			)}
			<Popup open={open} onClose = {()=>setOpen(false)}>
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
			<Popup open={openMenu} onClose = {()=>setOpenMenu(false)}>
				<MenuFunction menuID={userData.MenuID}/>
			</Popup>
			<Popup open={openCusine} onClose = {()=>setOpenCusine(false)}>
				<Cusine/>
			</Popup>
			
		</React.Fragment>
	);
}
export default withRouter(Profile);