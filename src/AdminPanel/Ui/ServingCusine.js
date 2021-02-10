import React from 'react';
import Grid from './Grid';
import Label from './Label';
import useStyles from './UiStyle';
import axios from 'axios';

import TransferList from './TransferList';
//need to fix User Cusine

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
