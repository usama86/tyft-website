import MaterialTable from 'material-table';
import React from 'react';
import axios from 'axios';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import TextField from './Ui/TextField';
// import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';
import { withRouter } from 'next/router';
import { convertDate } from './../util/setDate';
import Grid from './Ui/Grid';
import Label from './Ui/Label';
import Button from '@material-ui/core/Button';
import Popup from './Ui/Popup';
import Select from './Ui/Select/ELXSelect';
import HorizontalLabelPositionBelowStepper from './Ui/HorizontalStepper';
import ServingCusine from './ServingCusine';
const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '25ch'
		}
	}
}));
function HomePage(props) {
	const classes = useStyles();
	const theme = createMuiTheme({
		overrides: {
			// Style sheet name ⚛️
			MuiIcon: {
				// Name of the rule
				root: {
					// Some CSS
					// color: 'white'
				}
			},
			MuiTypography: {
				root: {
					// Some CSS
					// color: 'white'
				}
			}
		}
	});

	const [ data, setData ] = React.useState([]);
	const [ MapRadius, setMapRadius ] = React.useState(0);
	const [open,setOpen] = React.useState(false);
	const [ columnData, setColumnData ] = React.useState({});
	const [ isLoading, setIsLoading ] = React.useState(true);
	const [cusines,setCusines] = React.useState([]);
	React.useEffect(
		() => {
			if (props.drawerPage !== 'Setting') {
				setIsLoading(true);
				if (props.drawerPage === 'Truck') {
					axios
						.get('https://tyft-backend.herokuapp.com/api/Supplier/getalltruck')
						.then(async (Response) => {
							let copyData = [];
							let Data = Response.data;
							console.log(Data.TruckInfo);
							for (let i = 0; i < Data.TruckInfo.length; i++)
								if (Data.TruckInfo[i].isDeleted === true){

								} 
								else 
									copyData.push(Data.TruckInfo[i]);

							setData(copyData); //
							setIsLoading(false);
							// navigation.navigate(Route.SIGNIN);
						})
						.catch((error) => {
							console.log(error);
							setIsLoading(false);
						});
				}
				else if(props.drawerPage === 'Serving Cusine')
				{
					axios
					.get('https://tyft-backend.herokuapp.com/api/servingcusine/getcusines')
					.then(async (Response) => {
						if (Response) {
							if (Response.data.length > 0) {
								let res = Response.data[0].cusine;
						
								setCusines(res);
							}
							// setIndicator(false);
						} else {
							// setIndicator(false);
						}
					})
					.catch((error) => {
						console.log(error);
					});
				}
				else {
					axios
						.get('https://tyft-backend.herokuapp.com/api/users/getallusers')
						.then(async (Response) => {
							let Data = Response.data;
							let isCust = false;
							let newData = [];
							if (Data) {
								for (let i = 0; i < Data.length; i++) {
									if (Data[i].isDeleted === true){

									} 
									else{

									
									if (Data[i].userType === 'Customer' && props.drawerPage === 'Customer') {
										Data[i].created_at = convertDate(Data[i].created_at);
										newData.push({ ...Data[i] });
									} else if (Data[i].userType === 'Supplier' && props.drawerPage === 'Supplier') {
										Data[i].created_at = convertDate(Data[i].created_at);
										newData.push({ ...Data[i] });
									} else {
									}
								}
								}
								setData(newData); //
								console.log(Data);
								setIsLoading(false);
								// navigation.navigate(Route.SIGNIN);
							}
						})
						.catch((error) => {
							console.log(error);
							setIsLoading(false);
						});
				}
			}
			else {
				setIsLoading(true);
				axios
					.get('https://tyft-backend.herokuapp.com/api/general/getradius')
					.then(async (Response) => {
						let Data = Response.data;
						console.log(Data);
						let miles = Data[0].MapRadius / 1609.34;

						//1609.34
						setMapRadius(miles);
						setIsLoading(false);

						// navigation.navigate(Route.SIGNIN);
					})
					.catch((error) => {
						console.log('EOOROS IS', error);
						setIsLoading(false);
					});
			}
		},
		[ props.drawerPage ]
	);
	const updateVal = () => {
		let miles = MapRadius * 1609.34;
		let data = [
			{
				_id: '5ff226cc961c9485c423d996',
				MapRadius: miles
			}
		];
		axios
			.post('https://tyft-backend.herokuapp.com' + '/api/general/UpdateRadius', data)
			.then(async (Response) => {
				let responseMessage = await Response.data.code;
				console.log(responseMessage);
				if (responseMessage === 'ABT0000') alert('Updated');
			})
			.catch((error) => {
				console.log(error);
				setLoader(false);
			});
	};
	const getColumn = () => {
		if (props.drawerPage === 'Customer' || props.drawerPage === 'Supplier')
			return [
				{ title: 'Name', field: 'profileName' },
				{ title: 'Email', field: 'email' },
				{ title: 'Phone No', field: 'phoneNumber' },
				{ title: 'Profile Name', field: 'profileName' },
				{ title: 'User Type', field: 'userType' },
				{ title: 'Created At', field: 'created_at' }
			];
		else
			return [
				{ title: 'Name', field: 'truckName' },
				{ title: 'Email', field: 'truckEmail' },
				// { title: 'Logo', field: 'truckLogo' },
				{ title: 'Contact', field: 'truckContact' },
				{ title: 'City', field: 'truckCity' },
				{ title: 'Website', field: 'truckWebsite' },
				{ title: 'Status', field: 'status' }
				// socialMedia.facebook
				// socialMedia.instagram
				// socialMedia.twitter
				// schedule //array
				// selectedServingCusines // array
				// customerReview // array
				// coverPhoto
				// categoryArray // simp arr
				// businessDesc // simp arr
				// Menu         // id
			];
	};
	const onChangeMapRadius = (e) => {
		setMapRadius(e.target.value);
	};
	let expData = [
		{
			heading: 'Rows',
			controls: [
				{
					label: 'Set Map Radius in Miles:',
					xsLabel: 2,
					xsSize: 3,
					component: TextField,
					props: {
						className: classes.inputclass,
						data: [ 'Auto', 'Exact', 'Atleast' ],
						onChange: onChangeMapRadius,
						required: true,
						type: 'number',
						id: 'row-heights',
						value: MapRadius
					}
				}
			]
		}
	];

	const rowClickHander = (row, columns, event) => {
		// setColumnData(columns)
		// setOpen(true);

		let getName = '';
		if (columns.profileName) getName = getName.replace(/\s/g, '');
		else if (columns.truckName) getName = getName.replace(/\s/g, '');
		columns.socialMedia = JSON.stringify(columns.socialMedia);
		// profileName
		// truckName
		props.router.push({
			pathname: '/profile/' + props.drawerPage,
			query: columns
		});
	};
	return (
		<React.Fragment>
			{props.drawerPage === 'Serving Cusine' ? (
				<ServingCusine {...props} cusines={cusines}/>
			):
			<ThemeProvider theme={theme}>
				{isLoading ? (
					<Skeleton
						variant="rect"
						width={210}
						height={118}
						style={{
							width: '100%',
							height: '90%',
							marginTop: '3%'
						}}
					/>
				) : props.drawerPage === 'Setting' ? (
					<React.Fragment>
						{expData.map((pane, paneIndex) => {
							if (pane !== undefined) {
								return (
									<Grid container spacing={3} style={{ paddingTop: '25px' }}>
										{pane.controls.map((control, index) => {
											if (control !== undefined && control.showNothing !== true) {
												return (
													<React.Fragment key={index}>
														{control.label && (
															<Grid
																item
																xs={control.xsLabel}
																style={{ paddingTop: '28px' }}
															>
																<Label
																	style={{ fontSize: '15px', fontWeight: 'bolder' }}
																>
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
							<Button variant="outlined" onClick={(e) => updateVal(e, 'update')}>
								Update
							</Button>
						</div>
					</React.Fragment>
				) : (
					<React.Fragment>
						<MaterialTable
							title={props.drawerPage}
							style={{ marginTop: '4vh', color: 'black' }}
							columns={getColumn()}
							data={data}
							// actions={[
							//   props.drawerPage==='Supplier' ? {
							//     icon: 'save',
							//     tooltip: 'Save User',
							//     onClick: (event, rowData) => alert("You saved " + rowData.name)
							//   }:null
							// ]}
							// components={{
							//   Action: propss => (
							//     props.drawerPage==='Supplier' ?
							//     <Button variant="outlined" color="primary" onClick={(e)=>{alert("You saved");e.stopPropagation(); }}>
							//         Show Truck
							//   </Button>: null
							//   ),
							// }}
							onRowClick={rowClickHander}
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
						{props.drawerPage === 'Supplier' ? <Button style={{marginTop:'10px'}} onClick={()=>setOpen(true)}  variant="outlined">Add Supplier</Button>:null}
					</React.Fragment>
				)}
			</ThemeProvider>
				}
			<Popup open={open} setOpen={setOpen}>
				<HorizontalLabelPositionBelowStepper/>
			</Popup>
		</React.Fragment>
	);
}
export default withRouter(HomePage);
