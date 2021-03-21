import React from 'react';
import Grid from './Grid';
import Label from './Label';
import TextField from './TextField';
import useStyles from './UiStyle';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBoxIcon from '@material-ui/icons/CheckBox';



export default function BusinessHour(props) {

	const classes = useStyles();
	const [ resets, isResets ] = React.useState(false);
	const [ week, setWeek ] = React.useState([
		{
			day: 'Monday',
			working: false,
			opening: '8:00 AM',
			closing: '5:00 PM'
		},
		{
			day: 'Tuesday',
			working: false,
			opening: '8:00 AM',
			closing: '5:00 PM'
		},
		{
			day: 'Wednesday',
			working: false,
			opening: '8:00 AM',
			closing: '5:00 PM'
		},
		{
			day: 'Thursday',
			working: false,
			opening: '8:00 AM',
			closing: '5:00 PM'
		},
		{
			day: 'Friday',
			working: false,
			opening: '8:00 AM',
			closing: '5:00 PM'
		},
		{
			day: 'Saturday',
			working: false,
			opening: '8:00 AM',
			closing: '5:00 PM'
		},
		{
			day: 'Sunday',
			working: false,
			opening: '8:00 AM',
			closing: '5:00 PM'
		}
	]);
	const handleChange = (e, val) => {
		let copyArr = week;
		console.log(copyArr);
		copyArr[val].working = !copyArr[val].working;
		console.log(copyArr);
		setWeek(copyArr);
		isResets(!resets);
	};
	const handleChangeTime = (e, timeType, Day, index) => {
		let copyArr = week;
		let hour = e.target.value;
		let save = '';
		hour = hour.split(':', 1)[0];
		if (Number(hour) > 12) {
			hour = hour - 12;
			hour = hour + ':' + e.target.value.split(':', 2)[1] + ' PM';
			save = hour;
		} else save = e.target.value + ' AM';
		copyArr[index][timeType] = save;
		copyArr[index].day = Day;
		setWeek(copyArr);
		isResets(!resets);
	};

	let expData = [
			 {
				heading: 'Date',
				controls: [
					{
						xsSize: 4,
						component: FormControlLabel,
						props: {
							control: (
								<Checkbox
									icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
									checkedIcon={<CheckBoxIcon fontSize="small" />}
									name="checkedI"
									checked={week[0].working}
									onChange={() => handleChange('Monday', 0)}
									onC
								/>
							),
							label: 'Monday',
							paddingTop: '21px'
						}
					},
					{
						// label: 'Name:',
						// xsLabel: 1,
						xsSize: 4,
						component: TextField,
						props: {
							id: 'time',
							label: 'Alarm clock',
							type: 'time',
							// defaultValue: '08:00AM',
							className: classes.textField,
							onChange: (e) => handleChangeTime(e, 'opening', 'Monday', 0),
							disabled: !week[0].working,
							variants: true,
							InputLabelProps: {
								shrink: true
							},
							inputProps: {
								step: 300 // 5 min
							}
						}
					},
					{
						// label: 'Name:',
						// xsLabel: 1,
						xsSize: 4,
						component: TextField,
						props: {
							id: 'time',
							label: 'Alarm clock1',
							type: 'time',
							onChange: (e) => handleChangeTime(e, 'closing', 'Monday', 0),
							disabled: !week[0].working,
							// defaultValue: '05:00PM',
							className: classes.textField,
							variants: true,
							InputLabelProps: {
								shrink: true
							},
							inputProps: {
								step: 300 // 5 min
							}
						}
					},
					{
						xsSize: 4,
						component: FormControlLabel,
						props: {
							control: (
								<Checkbox
									icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
									checkedIcon={<CheckBoxIcon fontSize="small" />}
									name="checkedI"
									checked={week[1].working}
									onChange={() => handleChange('Tuesday', 1)}
								/>
							),
							label: 'Tuesday',
							paddingTop: '21px'
						}
					},
					{
						// label: 'Name:',
						// xsLabel: 1,
						xsSize: 4,
						component: TextField,
						props: {
							id: 'time',
							label: 'Alarm clock',
							type: 'time',
							onChange: (e) => handleChangeTime(e, 'opening', 'Tuesday', 1),
							disabled: !week[1].working,
							className: classes.textField,
							variants: true,
							InputLabelProps: {
								shrink: true
							},
							inputProps: {
								step: 300 // 5 min
							}
						}
					},
					{
						// label: 'Name:',
						// xsLabel: 1,
						xsSize: 4,
						component: TextField,
						props: {
							id: 'time',
							label: 'Alarm clock',
							type: 'time',
							onChange: (e) => handleChangeTime(e, 'closing', 'Tuesday', 1),
							disabled: !week[1].working,
							className: classes.textField,
							variants: true,
							InputLabelProps: {
								shrink: true
							},
							inputProps: {
								step: 300 // 5 min
							}
						}
					},
					{
						xsSize: 4,
						component: FormControlLabel,
						props: {
							control: (
								<Checkbox
									icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
									checkedIcon={<CheckBoxIcon fontSize="small" />}
									name="checkedI"
									checked={week[2].working}
									onChange={() => handleChange('Wednesday', 2)}
								/>
							),
							label: 'Wednesday',
							paddingTop: '21px'
						}
					},
					{
						// label: 'Name:',
						// xsLabel: 1,
						xsSize: 4,
						component: TextField,
						props: {
							id: 'time',
							label: 'Alarm clock',
							type: 'time',
							onChange: (e) => handleChangeTime(e, 'opening', 'Wednesday', 2),
							disabled: !week[2].working,
							className: classes.textField,
							variants: true,
							InputLabelProps: {
								shrink: true
							},
							inputProps: {
								step: 300 // 5 min
							}
						}
					},
					{
						// label: 'Name:',
						// xsLabel: 1,
						xsSize: 4,
						component: TextField,
						props: {
							id: 'time',
							label: 'Alarm clock',
							type: 'time',
							onChange: (e) => handleChangeTime(e, 'closing', 'Wednesday', 2),
							disabled: !week[2].working,
							className: classes.textField,
							variants: true,
							InputLabelProps: {
								shrink: true
							},
							inputProps: {
								step: 300 // 5 min
							}
						}
					},
					{
						xsSize: 4,
						component: FormControlLabel,
						props: {
							control: (
								<Checkbox
									icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
									checkedIcon={<CheckBoxIcon fontSize="small" />}
									name="checkedI"
									checked={week[3].working}
									onChange={() => handleChange('Thursday', 3)}
								/>
							),
							label: 'Thursday',
							paddingTop: '21px'
						}
					},
					{
						// label: 'Name:',
						// xsLabel: 1,
						xsSize: 4,
						component: TextField,
						props: {
							id: 'time',
							label: 'Alarm clock',
							type: 'time',
							onChange: (e) => handleChangeTime(e, 'opening', 'Thursday', 3),
							disabled: !week[3].working,
							className: classes.textField,
							variants: true,
							InputLabelProps: {
								shrink: true
							},
							inputProps: {
								step: 300 // 5 min
							}
						}
					},
					{
						// label: 'Name:',
						// xsLabel: 1,
						xsSize: 4,
						component: TextField,
						props: {
							id: 'time',
							label: 'Alarm clock',
							type: 'time',
							onChange: (e) => handleChangeTime(e, 'closing', 'Thursday', 3),
							disabled: !week[3].working,
							className: classes.textField,
							variants: true,
							InputLabelProps: {
								shrink: true
							},
							inputProps: {
								step: 300 // 5 min
							}
						}
					},
					{
						xsSize: 4,
						component: FormControlLabel,
						props: {
							control: (
								<Checkbox
									icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
									checkedIcon={<CheckBoxIcon fontSize="small" />}
									name="checkedI"
									checked={week[4].working}
									onChange={() => handleChange('Friday', 4)}
								/>
							),
							label: 'Friday',
							paddingTop: '21px'
						}
					},
					{
						// label: 'Name:',
						// xsLabel: 1,
						xsSize: 4,
						component: TextField,
						props: {
							id: 'time',
							label: 'Alarm clock',
							type: 'time',
							onChange: (e) => handleChangeTime(e, 'opening', 'Friday', 4),
							disabled: !week[4].working,
							className: classes.textField,
							variants: true,
							InputLabelProps: {
								shrink: true
							},
							inputProps: {
								step: 300 // 5 min
							}
						}
					},
					{
						// label: 'Name:',
						// xsLabel: 1,
						xsSize: 4,
						component: TextField,
						props: {
							id: 'time',
							label: 'Alarm clock',
							type: 'time',
							onChange: (e) => handleChangeTime(e, 'closing', 'Friday', 4),
							disabled: !week[4].working,
							className: classes.textField,
							variants: true,
							InputLabelProps: {
								shrink: true
							},
							inputProps: {
								step: 300 // 5 min
							}
						}
					},
					{
						xsSize: 4,
						component: FormControlLabel,
						props: {
							control: (
								<Checkbox
									icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
									checkedIcon={<CheckBoxIcon fontSize="small" />}
									name="checkedI"
									checked={week[5].working}
									onChange={() => handleChange('Saturday', 5)}
								/>
							),
							label: 'Saturday',
							paddingTop: '21px'
						}
					},
					{
						// label: 'Name:',
						// xsLabel: 1,
						xsSize: 4,
						component: TextField,
						props: {
							id: 'time',
							label: 'Alarm clock',
							type: 'time',
							onChange: (e) => handleChangeTime(e, 'opening', 'Saturday', 5),
							disabled: !week[5].working,
							className: classes.textField,
							variants: true,
							InputLabelProps: {
								shrink: true
							},
							inputProps: {
								step: 300 // 5 min
							}
						}
					},
					{
						// label: 'Name:',
						// xsLabel: 1,
						xsSize: 4,
						component: TextField,
						props: {
							id: 'time',
							label: 'Alarm clock',
							type: 'time',
							onChange: (e) => handleChangeTime(e, 'closing', 'Saturday', 5),
							disabled: !week[5].working,
							className: classes.textField,
							variants: true,
							InputLabelProps: {
								shrink: true
							},
							inputProps: {
								step: 300 // 5 min
							}
						}
					},
					{
						xsSize: 4,
						component: FormControlLabel,
						props: {
							control: (
								<Checkbox
									icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
									checkedIcon={<CheckBoxIcon fontSize="small" />}
									name="checkedI"
									checked={week[6].working}
									onChange={() => handleChange('Sunday', 6)}
								/>
							),
							label: 'Sunday',
							paddingTop: '21px'
						}
					},
					{
						// label: 'Name:',
						// xsLabel: 1,
						xsSize: 4,
						component: TextField,
						props: {
							id: 'time',
							label: 'Alarm clock',
							type: 'time',
							onChange: (e) => handleChangeTime(e, 'opening', 'Sunday', 6),
							disabled: !week[6].working,
							className: classes.textField,
							variants: true,
							InputLabelProps: {
								shrink: true
							},
							inputProps: {
								step: 300 // 5 min
							}
						}
					},
					{
						// label: 'Name:',
						// xsLabel: 1,
						xsSize: 4,
						component: TextField,
						props: {
							id: 'time',
							label: 'Alarm clock',
							type: 'time',
							onChange: (e) => handleChangeTime(e, 'closing', 'Sunday', 6),
							disabled: !week[6].working,
							className: classes.textField,
							variants: true,
							InputLabelProps: {
								shrink: true
							},
							inputProps: {
								step: 300 // 5 min
							}
						}
					}
				]
			}
	];
	// switch (stepIndex) {
	// 	case 0:
	// 		return 'Select campaign settings...';
	// 	case 1:
	// 		return 'What is an ad group anyways?';
	// 	case 2:
	// 		return 'This is the bit I really care about!';
	// 	default:
	// 		return 'Unknown stepIndex';
	// }

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
