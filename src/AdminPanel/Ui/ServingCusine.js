import React from 'react';
import Grid from './Grid';
import Label from './Label';
import useStyles from './UiStyle';
import axios from 'axios';

import TransferList from './TransferList';
//need to fix User Cusine
let count=0;
export default function MenuFunction(props) {
	const classes = useStyles();
	const [ resets, isResets ] = React.useState(false);
    React.useEffect(() => {
		getCusine();
    }, []);
    const [ cusine, setCusine ] = React.useState([]);
    const [ cusines, setCusines ] = React.useState([]);
    const getServingCusine = (data) => {
		console.log(data);
		setCusines(data);
	};
	const getCusine = async () => {
		if(props.TruckID)
		{
			let TruckId = props.TruckID;
			count=0;
			axios
			  .get('https://tyft-backend.herokuapp.com/api/servingcusine/getcusines')
			  .then(async Response => {
				if (Response) {
				  if (Response.data.length > 0) {
					let AllCusines = Response.data[0].cusine;
					axios
					  .post('https://tyft-backend.herokuapp.com/api/supplier/getservingcusine', {
						_id: TruckId,
					  })
					  .then(async Response => {
						if (Response) {
						  if (Response.data.length > 0) {
							let res = Response.data;
							console.log('Selected Cusines', res);
							// setData(res);
							res.map(a => {
							  AllCusines.map(b => {
								if (a.cusineName === b.cusineName && a.checked) {
								  b.checked = true;
								  count=count + 1;
								  console.log(count);
								}
								
							  });
							  let result = [];
							  for (let i = 0; i < AllCusines.length; i++) {
									result.push(AllCusines[i].cusineName);
								}
							  setCusine(result);
                        		isResets(!resets)
							//   setData(AllCusines);
							});
						  } else {
							setCusine(null);
							// setData(null);
						  }
						//   setIndicator(false);
						} else {
						//   setIndicator(false);
						}
					  })
					  .catch(error => {
						console.log(error);
						// setIndicator(false);
					  });
		
					// console.log('All Cusines after update', AllCusines);
					console.log('count is',count);
					// setData(AllCusines);
				  }
				}
			  })
			  .catch(error => {
				console.log(error);
			  });
		}
		else{
		axios
			.get('https://tyft-backend.herokuapp.com/api/servingcusine/getcusines')
			.then(async (Response) => {
				if (Response) {
					if (Response.data.length > 0) {
						let res = Response.data[0].cusine;
						let result = [];
						for (let i = 0; i < res.length; i++) {
							result.push(res[i].cusineName);
						}

						console.log('Cusines', res);
                        setCusine(result);
                        isResets(!resets)
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
	};
	let expData = [
		{
			heading: 'Rows',
			controls: [
                {
                    // xsLabel: 1,
                    xsSize: 12,
                    component: TransferList,
                    props: {
                        className: classes.inputclass,
                        data: cusine,
                        right: cusines,
                        // getServingCusine: getServingCusine,
                        getServingCusine: getServingCusine,
                        required: true,
                        id: 'row-heights0',
                        value: 'e'
                    }
                }
			]
		}
	];

	const onChangeMenu = (e, name) => {
		catArr[indexes][name] = e.target.value;
		setcatArr(catArr);
		isResets(!resets);
	};

	return (
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
												<Grid item xs={control.xsLabel} style={{ paddingTop: '28px' }}>
													<Label style={{ fontSize: '15px', fontWeight: 'bolder' }}>
														{control.label}
													</Label>
												</Grid>
											)}
											<Grid
												item
												xs={control.xsSize}
												style={{
													justifyContent: control.justifyComponent,
													paddingTop: control.paddingTop,
													alignSelf: control.alignItem
												}}
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
			
		</React.Fragment>
	);
}
