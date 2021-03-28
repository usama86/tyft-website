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
import axios from 'axios';
import AddIcon from '@material-ui/icons/Add';
import List from './List';

let cusineTemp = [];
function getSteps() {
	return ['Supplier Information', 'Truck Information', 'Business Hour', 'Serving Cusine', 'Menu'];

	//first info and logo  and Cover Photo
	//Truck Info 'Social Media'
}
let indexes = 0;
function getStepContent(stepIndex, date) {
	React.useEffect(() => {
		getCusine();
	}, []);
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
						cusineTemp = res;
						console.log('Cusines', res);
						setCusine(result);
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


	/////////////////////////  states ////////////////////////////////////

	const classes = useStyles();
	const [category, setCategory] = React.useState([]);
	const [tempCategory, setTempCategory] = React.useState([]);
	const [menuArr, setMenuArr] = React.useState([
		{
			category: category[category.length - 1],
			name: '',
			price: '',
			description: ''
		}
	]);
	const [updateUser, SetUpdateUser] = React.useState({
		profileName: '',
		email: '',
		Language: '',
		isAdmin: '',
		phoneNumber: '',
		profileName: '',
		password: '',
		userType: '',
		TruckID: '',
		MenuID: '',
		businessDesc: '',
		categoryArray: '',
		coverPhoto: '',
		customerReview: '',
		latitude: '',
		longitude: '',
		schedule: '',
		selectedServingCusines: '',
		facebook: '',
		instagram: '',
		twitter: '',
		status: '',
		truckCity: '',
		truckContact: '',
		truckEmail: '',
		truckLogo: '',
		truckName: '',
		truckWebsite: '',
		activeStatus: 'Active'
	});



	const [resets, isResets] = React.useState(false);
	const [cusine, setCusine] = React.useState([]);
	const [cusines, setCusines] = React.useState([]);
	const [week, setWeek] = React.useState([
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



	////////////////////// CALLBACKS /////////////////////////

	const onChangeUserData = (e, val) => {
		let tempObj = {...updateUser};
		tempObj[val] = e.target.value;
		SetUpdateUser(tempObj);
		// isReset(!reset);
	};

	const checkState = (query) => {
		if (updateUser[query] == null) {
			return ''
		} else return updateUser[query]
	}

	const saveData = () => {  //[1,2,3]  len 3    c=0 1  c=1 3          2
		let count=0;
		for(let i=0;i<cusineTemp.length;i++)
		{
			if(cusineTemp[i].cusineName===cusines[count])
			{
				cusineTemp[i].checked=true;
				i=0;
				count++;
				if(count===cusines.length)
					break;
			}
		}

		console.log(cusineTemp)
		/// khelo ()
		// cusine(start)  cusineName:'ss', checked:'true' 
		//cusines(right)(names)
		let data = {
			email: (updateUser.email) ? updateUser.email : '',
			password: (updateUser.password) ? updateUser.password : '',
			profileName: (updateUser.profileName) ? updateUser.profileName : '',
			truckLogo: (updateUser.truckLogo) ? updateUser.truckLogo : '',
			coverPhoto: (updateUser.coverPhoto) ? updateUser.coverPhoto : '', //img
			phoneNumber: (updateUser.phoneNumber) ? updateUser.phoneNumber : '',
			userType: 'Supplier',
			truckName: (updateUser.truckName) ? updateUser.truckName : '',
			businessDesc: (updateUser.bussinessDesc) ? updateUser.bussinessDesc : '',
			truckContact: (updateUser.truckContact) ? updateUser.truckContact : '',
			truckEmail: (updateUser.truckEmail) ? updateUser.truckEmail : '',
			truckCity: (updateUser.truckCity) ? updateUser.truckCity : '',
			truckWebsite: (updateUser.Website) ? updateUser.Website : '',
			schedule: week,
			facebook: (updateUser.facebook) ? updateUser.facebook : '',
			instagram: (updateUser.instagram) ? updateUser.instagram : '',
			twitter: (updateUser.twitter) ? updateUser.twitter : '',
			selectedServingCusines: cusineTemp,
			Menu: menuArr,
			categoryArray: category,
		}

		console.log('exporting the data', data)
		axios.post("https://tyft-backend.herokuapp.com/api/users/signup", data).then(
			async Response => {
				let Code = Response.data.code;
				console.log('Response is here')
				if (Code === 'ABT0000') {
					alert('Successfully Added a Supplier')
					//succesfull
				} else {
					alert('Unable to add a Supplier')
					//fail
				}
			}
		).catch(error => {
			console.log(error);
		})
	}
	// axios
	// 	.post(
	// 		url + '/api/users/signup',
	// 		data,
	// 	)
	// 	.then(async Response => {
	// 		let Code = Response.data.code;
	// 		console.log('Response is here')
	// 		if (Code === 'ABT0000') {
	// 			//succesfykk
	// 		} else {
	// 			//fail
	// 		}
	// 	})
	// 	.catch(error => {
	// 		console.log(error);
	// 	});

	const handleChange = (e, val) => {
		let copyArr = week;
		console.log(copyArr);
		copyArr[val].working = !copyArr[val].working;
		console.log(copyArr);
		setWeek(copyArr);
		isResets(!resets);
	};
	const getServingCusine = (data) => {
		console.log(data);
		setCusines(data);
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
	const onChangeMenu = (e, name) => {
		menuArr[indexes][name] = e.target.value;
		setMenuArr(menuArr);
		isResets(!resets);
	};
	const update = () => {
		return true
	}
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
						onChange: (e) => onChangeUserData(e, 'profileName'),
						required: true,
						id: 'row-heights0',
						value: updateUser.profileName,
					}
				},
				{
					label: 'Email Address:',
					xsLabel: 6,
					xsSize: 6,
					component: TextField,

					props: {
						className: classes.inputclass,
						data: ['Auto', 'Exact', 'Atleast'],
						onChange: (e) => onChangeUserData(e, 'email'),
						required: true,
						id: 'row-heights1',
						value: updateUser.email,

					}
				},
				{
					label: 'Cell Phone:',
					xsLabel: 6,
					xsSize: 6,
					component: TextField,
					props: {
						className: classes.inputclass,
						data: ['Auto', 'Exact', 'Atleast'],
						onChange: (e) => onChangeUserData(e, 'phoneNumber'),
						required: true,
						id: 'row-heights2',
						value: updateUser.phoneNumber
					}
				},
				{
					label: 'Password:',
					xsLabel: 6,
					xsSize: 6,
					component: TextField,
					props: {
						className: classes.inputclass,
						data: ['Auto', 'Exact', 'Atleast'],
						onChange: (e) => onChangeUserData(e, 'password'),
						required: true,
						id: 'row-heights3',
						value: updateUser.password
					}
				},
				{
					label: 'Facebook:',
					xsLabel: 6,
					xsSize: 6,
					component: TextField,
					props: {
						className: classes.inputclass,
						data: ['Auto', 'Exact', 'Atleast'],
						onChange: (e) => onChangeUserData(e, 'facebook'),
						required: true,
						id: 'row-heights4',
						value: updateUser.facebook
					}
				},
				{
					label: 'Instagram:',
					xsLabel: 6,
					xsSize: 6,
					component: TextField,
					props: {
						className: classes.inputclass,
						data: ['Auto', 'Exact', 'Atleast'],
						onChange: (e) => onChangeUserData(e, 'instagram'),
						required: true,
						id: 'row-heights5',
						value: updateUser.instagram
					}
				},
				{
					label: 'Twitter:',
					xsLabel: 6,
					xsSize: 6,
					component: TextField,
					props: {
						className: classes.inputclass,
						data: ['Auto', 'Exact', 'Atleast'],
						onChange: (e) => onChangeUserData(e, 'twitter'),
						required: true,
						id: 'row-heights6',
						value: updateUser.twitter
					}
				}
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
						data: ['Auto', 'Exact', 'Atleast'],
						onChange: (e) => onChangeUserData(e, 'truckName'),
						required: true,
						id: 'row-heights7',
						value: updateUser.truckName

					}
				},
				{
					label: 'Business Description:',
					xsLabel: 6,
					xsSize: 6,
					component: TextField,
					props: {
						className: classes.inputclass,
						data: ['Auto', 'Exact', 'Atleast'],
						onChange: (e) => onChangeUserData(e, 'businessDesc'),
						required: true,
						id: 'row-heights8',
						value: updateUser.businessDesc
					}
				},
				{
					label: 'Contact:',
					xsLabel: 6,
					xsSize: 6,
					component: TextField,
					props: {
						className: classes.inputclass,
						data: ['Auto', 'Exact', 'Atleast'],
						onChange: (e) => onChangeUserData(e, 'truckContact'),
						required: true,
						id: 'row-heights9',
						value: updateUser.truckContact
					}
				},
				{
					label: 'Truck Email:',
					xsLabel: 6,
					xsSize: 6,
					component: TextField,
					props: {
						className: classes.inputclass,
						data: ['Auto', 'Exact', 'Atleast'],
						onChange: (e) => onChangeUserData(e, 'truckEmail'),
						required: true,
						id: 'row-heights10',
						value: updateUser.truckEmail
					}
				},
				{
					label: 'Truck City:',
					xsLabel: 6,
					xsSize: 6,
					component: TextField,
					props: {
						className: classes.inputclass,
						data: ['Auto', 'Exact', 'Atleast'],
						onChange: (e) => onChangeUserData(e, 'truckCity'),
						required: true,
						id: 'row-heights11',
						value: updateUser.truckCity
					}
				},
				{
					label: 'Truck Website:',
					xsLabel: 6,
					xsSize: 6,
					component: TextField,
					props: {
						className: classes.inputclass,
						data: ['Auto', 'Exact', 'Atleast'],
						onChange: (e) => onChangeUserData(e, 'truckWebsite'),
						required: true,
						id: 'row-heights12',
						value: updateUser.truckWebsite
					}
				}
			]
		}) ||
		(stepIndex === 2 && {
			heading: 'Business Hour',
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
						data: cusine,
						right: cusines,
						// getServingCusine: getServingCusine,
						getServingCusine: getServingCusine,
						required: true,
						id: 'row-heights13',
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
					xsSize: 4,
					component: TextField,
					props: {
						className: classes.inputclass,
						data: ['Auto', 'Exact', 'Atleast'],
						onChange: (e) => setTempCategory(e.target.value),
						required: true,
						id: 'row-heights14',
						value: tempCategory
					}
				},
				{
					xsSize: 2,
					component: AddIcon,
					alignItem: 'center',
					props: {
						onClick: () => {
							category.push(tempCategory);
							setCategory(category);
							setTempCategory('');
							isResets(!resets);
						},
						style: {
							cursor: 'pointer'
						},
						// rootClass: classes.smallWidth,
						// data: category,
						// // onChange: (e) => onChangeUserData(e, 'email'),
						// required: true,
						id: 'row-heights15'
						// value: 'e',
					}
				},
				{
					label: 'Categories:',
					xsLabel: 6,
					xsSize: 6,
					component: Select,
					props: {
						rootClass: classes.smallWidth,
						data: category,
						onChange: (e) => onChangeMenu(e, 'category'),
						required: true,
						id: 'row-heights16',
						value: menuArr[indexes].category
					}
				},

				{
					label: 'Name:',
					xsLabel: 6,
					xsSize: 6,
					component: TextField,
					props: {
						className: classes.inputclass,
						data: ['Auto', 'Exact', 'Atleast'],
						onChange: (e) => onChangeMenu(e, 'name'),
						required: true,
						id: 'row-heights17',
						value: menuArr[indexes].name
					}
				},
				{
					label: 'Description:',
					xsLabel: 6,
					xsSize: 6,
					component: TextField,
					props: {
						className: classes.inputclass,
						data: ['Auto', 'Exact', 'Atleast'],
						onChange: (e) => onChangeMenu(e, 'description'),
						required: true,
						id: 'row-heights18',
						value: menuArr[indexes].description
					}
				},
				{
					label: 'Price:',
					xsLabel: 6,
					xsSize: 6,
					component: TextField,
					props: {
						className: classes.inputclass,
						onChange: (e) => onChangeMenu(e, 'price'),
						required: true,
						id: 'row-heights19',
						value: menuArr[indexes].price
					}
				},
				{
					xsSize: 12,
					component: Button,
					props: {
						className: classes.inputclass,
						data: ['Auto', 'Exact', 'Atleast'],
						onClick: () => {
							indexes += 1;
							console.log(menuArr);
							let copycat = [
								...menuArr,
								{
									category: category[category.length - 1],
									name: '',
									price: '',
									description: ''
								}
							];
							console.log(copycat);
							setMenuArr(copycat);
							isResets(!resets);
						},
						style: { background: 'grey' },
						// onChange: (e) => onChangeUserData(e, 'email'),
						required: true,
						id: 'row-heights20',
						value: 'e',
						children: 'Add to List'
					}
				},
				{
					xsSize: 12,
					component: List,
					props: {
						data: menuArr
					}
				},
				{
					xsSize: 12,
					component: Button,
					props: {
						className: classes.inputclass,
						data: ['Auto', 'Exact', 'Atleast'],
						onClick: saveData,
						style: { background: '#3f51b5' ,color:'white',    marginLeft: '39%'},
						// onChange: (e) => onChangeUserData(e, 'email'),
						required: true,
						id: 'row-heights20',
						value: 'e',
						children: 'Save Supplier'
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

export default function HorizontalLabelPositionBelowStepper(props) {
	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const [date, setDate] = React.useState(new Date());
	const steps = getSteps();

	const handleNext = (active, step) => {
		console.log(active);
		console.log(step);
		if (active === 4) {

			props.onClose();
			setActiveStep(1);
		}
		else setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
						<Typography className={classes.instructions}>{getStepContent(activeStep, date)}</Typography>
						<div>
							<Button disabled={activeStep === 0} onClick={handleBack} className={classes.backButton}>
								Back
							</Button>
							<Button
								variant="contained"
								color="primary"
								onClick={() => handleNext(activeStep, steps)}
							>
								{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
