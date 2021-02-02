import React from 'react';
import Grid from './Grid';
import Label from './Label';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from './TextField';
import useStyles from './UiStyle';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import TransferList from './TransferList';

import Select from './Select/ELXSelect';
function getSteps() {
	return [ 'Supplier Information', 'Truck Information', 'Business Hour', 'Serving Cusine', 'Menu' ];

	//first info and logo  and Cover Photo
	//Truck Info 'Social Media'
}

function getStepContent(stepIndex,date) {
	const classes = useStyles();
	let expData = [
		(stepIndex === 0 && {
			heading: 'Rows',
			controls: [
				{
					label: 'Name:',
					xsLabel: 6,
					xsSize: 6,
					component: TextField,
					props: {
						className: classes.inputclass,
						// onChange: (e) => onChangeUserData(e, 'email'),
						required: true,
						id: 'row-heights0',
						value: 'e'
					}
				},
				{
					label: 'Email Address:',
					xsLabel: 6,
					xsSize: 6,
					component: TextField,
					props: {
						className: classes.inputclass,
						data: [ 'Auto', 'Exact', 'Atleast' ],
						// onChange: (e) => onChangeUserData(e, 'email'),
						required: true,
						id: 'row-heights1',
						value: 'e'
					}
				},
				{
					label: 'Cell Phone:',
					xsLabel: 6,
					xsSize: 6,
					component: TextField,
					props: {
						className: classes.inputclass,
						data: [ 'Auto', 'Exact', 'Atleast' ],
						// onChange: (e) => onChangeUserData(e, 'email'),
						required: true,
						id: 'row-heights2',
						value: 'e'
					}
				},
				{
					label: 'Password:',
					xsLabel: 6,
					xsSize: 6,
					component: TextField,
					props: {
						className: classes.inputclass,
						data: [ 'Auto', 'Exact', 'Atleast' ],
						// onChange: (e) => onChangeUserData(e, 'email'),
						required: true,
						id: 'row-heights3',
						value: 'e'
					}
				},
				{
					label: 'Facebook:',
					xsLabel: 6,
					xsSize: 6,
					component: TextField,
					props: {
						className: classes.inputclass,
						data: [ 'Auto', 'Exact', 'Atleast' ],
						// onChange: (e) => onChangeUserData(e, 'email'),
						required: true,
						id: 'row-heights3',
						value: 'e'
					}
				},
				{
					label: 'Instagram:',
					xsLabel: 6,
					xsSize: 6,
					component: TextField,
					props: {
						className: classes.inputclass,
						data: [ 'Auto', 'Exact', 'Atleast' ],
						// onChange: (e) => onChangeUserData(e, 'email'),
						required: true,
						id: 'row-heights3',
						value: 'e'
					}
				},
				{
					label: 'Twitter:',
					xsLabel: 6,
					xsSize: 6,
					component: TextField,
					props: {
						className: classes.inputclass,
						data: [ 'Auto', 'Exact', 'Atleast' ],
						// onChange: (e) => onChangeUserData(e, 'email'),
						required: true,
						id: 'row-heights3',
						value: 'e'
					}
				},
			]
		}) ||
			(stepIndex === 1 && {
				heading: 'Rows',
				controls: [
					{
						label: 'Truck Name:',
						xsLabel: 6,
						xsSize: 6,
						component: TextField,
						props: {
							className: classes.inputclass,
							data: [ 'Auto', 'Exact', 'Atleast' ],
							// onChange: (e) => onChangeUserData(e, 'email'),
							required: true,
							id: 'row-heights0',
							value: 'e'
						}
					},
					{
						label: 'Business Description:',
						xsLabel: 6,
						xsSize: 6,
						component: TextField,
						props: {
							className: classes.inputclass,
							data: [ 'Auto', 'Exact', 'Atleast' ],
							// onChange: (e) => onChangeUserData(e, 'email'),
							required: true,
							id: 'row-heights0',
							value: 'e'
						}
					},
					{
						label: 'Contact:',
						xsLabel: 6,
						xsSize: 6,
						component: TextField,
						props: {
							className: classes.inputclass,
							data: [ 'Auto', 'Exact', 'Atleast' ],
							// onChange: (e) => onChangeUserData(e, 'email'),
							required: true,
							id: 'row-heights0',
							value: 'e'
						}
					},
					{
						label: 'Truck Email:',
						xsLabel: 6,
						xsSize: 6,
						component: TextField,
						props: {
							className: classes.inputclass,
							data: [ 'Auto', 'Exact', 'Atleast' ],
							// onChange: (e) => onChangeUserData(e, 'email'),
							required: true,
							id: 'row-heights0',
							value: 'e'
						}
					},
					{
						label: 'Truck City:',
						xsLabel: 6,
						xsSize: 6,
						component: TextField,
						props: {
							className: classes.inputclass,
							data: [ 'Auto', 'Exact', 'Atleast' ],
							// onChange: (e) => onChangeUserData(e, 'email'),
							required: true,
							id: 'row-heights0',
							value: 'e'
						}
					},
					{
						label: 'Truck Website:',
						xsLabel: 6,
						xsSize: 6,
						component: TextField,
						props: {
							className: classes.inputclass,
							data: [ 'Auto', 'Exact', 'Atleast' ],
							// onChange: (e) => onChangeUserData(e, 'email'),
							required: true,
							id: 'row-heights0',
							value: 'e'
						}
					}
				]
			}) ||
			(stepIndex === 2 && {
				heading: 'Date',
				controls: [
					{
						xsSize: 4,
						component: FormControlLabel,
						props:{
							control:(
								<Checkbox
								  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
								  checkedIcon={<CheckBoxIcon fontSize="small" />}
								  name="checkedI"
								/>
								),
							  label:"Monday",
							  paddingTop:'21px'
						},
					},
					{
						// label: 'Name:',
						// xsLabel: 1,
						xsSize: 4,
						component: TextField,
						props: {
							id:"time",
							label:"Alarm clock",
							type:"time",
							defaultValue:"07:30",
							className:classes.textField,
							variants:true,
							InputLabelProps:{
							  shrink: true,
							},
							inputProps:{
							  step: 300, // 5 min
							},
						}
					},
					{
						// label: 'Name:',
						// xsLabel: 1,
						xsSize: 4,
						component: TextField,
						props: {
							id:"time",
							label:"Alarm clock",
							type:"time",
							defaultValue:"07:30",
							className:classes.textField,
							variants:true,
							InputLabelProps:{
							  shrink: true,
							},
							inputProps:{
							  step: 300, // 5 min
							},
						}
					},
					{
						xsSize: 4,
						component: FormControlLabel,
						props:{
							control:(
								<Checkbox
								  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
								  checkedIcon={<CheckBoxIcon fontSize="small" />}
								  name="checkedI"
								/>
								),
							  label:"Tuesday",
							  paddingTop:'21px'
						},
					},
					{
						// label: 'Name:',
						// xsLabel: 1,
						xsSize: 4,
						component: TextField,
						props: {
							id:"time",
							label:"Alarm clock",
							type:"time",
							defaultValue:"07:30",
							className:classes.textField,
							variants:true,
							InputLabelProps:{
							  shrink: true,
							},
							inputProps:{
							  step: 300, // 5 min
							},
						}
					},
					{
						// label: 'Name:',
						// xsLabel: 1,
						xsSize: 4,
						component: TextField,
						props: {
							id:"time",
							label:"Alarm clock",
							type:"time",
							defaultValue:"07:30",
							className:classes.textField,
							variants:true,
							InputLabelProps:{
							  shrink: true,
							},
							inputProps:{
							  step: 300, // 5 min
							},
						}
					},
					{
						xsSize: 4,
						component: FormControlLabel,
						props:{
							control:(
								<Checkbox
								  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
								  checkedIcon={<CheckBoxIcon fontSize="small" />}
								  name="checkedI"
								/>
								),
							  label:"Wednesday",
							  paddingTop:'21px'
						},
					},
					{
						// label: 'Name:',
						// xsLabel: 1,
						xsSize: 4,
						component: TextField,
						props: {
							id:"time",
							label:"Alarm clock",
							type:"time",
							defaultValue:"07:30",
							className:classes.textField,
							variants:true,
							InputLabelProps:{
							  shrink: true,
							},
							inputProps:{
							  step: 300, // 5 min
							},
						}
					},
					{
						// label: 'Name:',
						// xsLabel: 1,
						xsSize: 4,
						component: TextField,
						props: {
							id:"time",
							label:"Alarm clock",
							type:"time",
							defaultValue:"07:30",
							className:classes.textField,
							variants:true,
							InputLabelProps:{
							  shrink: true,
							},
							inputProps:{
							  step: 300, // 5 min
							},
						}
					},
					{
						xsSize: 4,
						component: FormControlLabel,
						props:{
							control:(
								<Checkbox
								  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
								  checkedIcon={<CheckBoxIcon fontSize="small" />}
								  name="checkedI"
								/>
								),
							  label:"Thursday",
							  paddingTop:'21px'
						},
					},
					{
						// label: 'Name:',
						// xsLabel: 1,
						xsSize: 4,
						component: TextField,
						props: {
							id:"time",
							label:"Alarm clock",
							type:"time",
							defaultValue:"07:30",
							className:classes.textField,
							variants:true,
							InputLabelProps:{
							  shrink: true,
							},
							inputProps:{
							  step: 300, // 5 min
							},
						}
					},
					{
						// label: 'Name:',
						// xsLabel: 1,
						xsSize: 4,
						component: TextField,
						props: {
							id:"time",
							label:"Alarm clock",
							type:"time",
							defaultValue:"07:30",
							className:classes.textField,
							variants:true,
							InputLabelProps:{
							  shrink: true,
							},
							inputProps:{
							  step: 300, // 5 min
							},
						}
					},
					{
						xsSize: 4,
						component: FormControlLabel,
						props:{
							control:(
								<Checkbox
								  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
								  checkedIcon={<CheckBoxIcon fontSize="small" />}
								  name="checkedI"
								/>
								),
							  label:"Friday",
							  paddingTop:'21px'
						},
					},
					{
						// label: 'Name:',
						// xsLabel: 1,
						xsSize: 4,
						component: TextField,
						props: {
							id:"time",
							label:"Alarm clock",
							type:"time",
							defaultValue:"07:30",
							className:classes.textField,
							variants:true,
							InputLabelProps:{
							  shrink: true,
							},
							inputProps:{
							  step: 300, // 5 min
							},
						}
					},
					{
						// label: 'Name:',
						// xsLabel: 1,
						xsSize: 4,
						component: TextField,
						props: {
							id:"time",
							label:"Alarm clock",
							type:"time",
							defaultValue:"07:30",
							className:classes.textField,
							variants:true,
							InputLabelProps:{
							  shrink: true,
							},
							inputProps:{
							  step: 300, // 5 min
							},
						}
					},
					{
						xsSize: 4,
						component: FormControlLabel,
						props:{
							control:(
								<Checkbox
								  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
								  checkedIcon={<CheckBoxIcon fontSize="small" />}
								  name="checkedI"
								/>
								),
							  label:"Saturday",
							  paddingTop:'21px'
						},
					},
					{
						// label: 'Name:',
						// xsLabel: 1,
						xsSize: 4,
						component: TextField,
						props: {
							id:"time",
							label:"Alarm clock",
							type:"time",
							defaultValue:"07:30",
							className:classes.textField,
							variants:true,
							InputLabelProps:{
							  shrink: true,
							},
							inputProps:{
							  step: 300, // 5 min
							},
						}
					},
					{
						// label: 'Name:',
						// xsLabel: 1,
						xsSize: 4,
						component: TextField,
						props: {
							id:"time",
							label:"Alarm clock",
							type:"time",
							defaultValue:"07:30",
							className:classes.textField,
							variants:true,
							InputLabelProps:{
							  shrink: true,
							},
							inputProps:{
							  step: 300, // 5 min
							},
						}
					},
					{
						xsSize: 4,
						component: FormControlLabel,
						props:{
							control:(
								<Checkbox
								  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
								  checkedIcon={<CheckBoxIcon fontSize="small" />}
								  name="checkedI"
								/>
								),
							  label:"Sunday",
							  paddingTop:'21px'
						},
					},
					{
						// label: 'Name:',
						// xsLabel: 1,
						xsSize: 4,
						component: TextField,
						props: {
							id:"time",
							label:"Alarm clock",
							type:"time",
							defaultValue:"07:30",
							className:classes.textField,
							variants:true,
							InputLabelProps:{
							  shrink: true,
							},
							inputProps:{
							  step: 300, // 5 min
							},
						}
					},
					{
						// label: 'Name:',
						// xsLabel: 1,
						xsSize: 4,
						component: TextField,
						props: {
							id:"time",
							label:"Alarm clock",
							type:"time",
							defaultValue:"07:30",
							className:classes.textField,
							variants:true,
							InputLabelProps:{
							  shrink: true,
							},
							inputProps:{
							  step: 300, // 5 min
							},
						}
					},
					
				]
			}) ||
			(stepIndex === 3 && {
				heading: 'Serving Cusines',
				controls: [
					{
						// xsLabel: 1,
						xsSize: 12,
						component: TransferList,
						props: {
							className: classes.inputclass,
							data: [ 'Auto', 'Exact', 'Atleast' ],
							// onChange: (e) => onChangeUserData(e, 'email'),
							required: true,
							id: 'row-heights0',
							value: 'e'
						}
					}
				]
			}) ||
			(stepIndex === 4 && {
				heading: 'Rows',
				controls: [
					{
						label: 'Add Category:',
						xsLabel: 6,
						xsSize: 6,
						component: TextField,
						props: {
							className: classes.inputclass,
							data: [ 'Auto', 'Exact', 'Atleast' ],
							// onChange: (e) => onChangeUserData(e, 'email'),
							required: true,
							id: 'row-heights0',
							value: 'e'
						}
					},
					{
						label: 'Categories:',
						xsLabel: 6,
						xsSize: 6,
						component: Select,
						props: {
							className: classes.inputclass,
							data: [ 'Auto', 'Exact', 'Atleast' ],
							// onChange: (e) => onChangeUserData(e, 'email'),
							required: true,
							id: 'row-heights0',
							value: 'e'
						}
					},
					{
						label: 'Name:',
						xsLabel: 6,
						xsSize: 6,
						component: TextField,
						props: {
							className: classes.inputclass,
							data: [ 'Auto', 'Exact', 'Atleast' ],
							// onChange: (e) => onChangeUserData(e, 'email'),
							required: true,
							id: 'row-heights0',
							value: 'e'
						}
					},
					{
						label: 'Description:',
						xsLabel: 6,
						xsSize: 6,
						component: TextField,
						props: {
							className: classes.inputclass,
							data: [ 'Auto', 'Exact', 'Atleast' ],
							// onChange: (e) => onChangeUserData(e, 'email'),
							required: true,
							id: 'row-heights0',
							value: 'e'
						}
					},
					{
						label: 'Price:',
						xsLabel: 6,
						xsSize: 6,
						component: TextField,
						props: {
							className: classes.inputclass,
							data: [ 'Auto', 'Exact', 'Atleast' ],
							// onChange: (e) => onChangeUserData(e, 'email'),
							required: true,
							id: 'row-heights0',
							value: 'e'
						}
					},
					{
						xsSize: 6,
						component: Button,
						props: {
							className: classes.inputclass,
							data: [ 'Auto', 'Exact', 'Atleast' ],
							// onChange: (e) => onChangeUserData(e, 'email'),
							required: true,
							id: 'row-heights0',
							value: 'e',
							children:"Add to List"
						}
					},
				]
			})
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
												style={{ justifyContent: control.justifyComponent,paddingTop:control.paddingTop }}
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

export default function HorizontalLabelPositionBelowStepper() {
	const classes = useStyles();
	const [ activeStep, setActiveStep ] = React.useState(0);
	const [date, setDate] = React.useState(new Date());
	const steps = getSteps();

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	return (
		<div className={classes.root}>
			<Stepper activeStep={activeStep} alternativeLabel>
				{steps.map((label) => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
			<div>
				{activeStep === steps.length ? (
					<div>
						<Typography className={classes.instructions}>All steps completed</Typography>
						<Button onClick={handleReset}>Reset</Button>
					</div>
				) : (
					<div>
						<Typography className={classes.instructions}>{getStepContent(activeStep,date)}</Typography>
						<div>
							<Button disabled={activeStep === 0} onClick={handleBack} className={classes.backButton}>
								Back
							</Button>
							<Button variant="contained" color="primary" onClick={handleNext}>
								{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
