// const  MenuFunction=(props)=> {
//

// 	return (

// 	);
// }
// export default MenuFunction;

import React from 'react';
import Grid from './Grid';
import Label from './Label';
import Button from '@material-ui/core/Button';
import TextField from './TextField';
import useStyles from './UiStyle';
import Select from './Select/ELXSelect';
import axios from 'axios';
import AddIcon from '@material-ui/icons/Add';
import List from './List';

let indexes = 0;

export default function MenuFunction(props) {
	const classes = useStyles();
	const [ resets, isResets ] = React.useState(false);
	const [ tempCategory, setTempCategory ] = React.useState([]);
	const [ category, setCategory ] = React.useState([]);
	const [ catArr, setcatArr ] = React.useState([
		{
			category: category[category.length - 1],
			name: '',
			price: '',
			description: ''
		}
	]);
	React.useEffect(()=>{
		getMenu();
	},[])
	const getMenu =async () => {
		let truckID = await localStorage.getItem('IDs')
		axios
		  .post('https://tyft-backend.herokuapp.com' + '/api/menu/getmenu', {_id: props.menuID})
		  .then(async Response => {
			let ERROR = Response.data.code;
			let MenuData = Response.data.MenuData;
	
			console.log('FAVVV', MenuData);
			if (ERROR !== 'ABT0001') {
			  MenuData = MenuData.sort(function(a, b) {
				if (a.category < b.category) {
				  return -1;
				}
				if (a.category > b.category) {
				  return 1;
				}
				return 0;
			  });
			  if(MenuData.length===0)
			  {
				MenuData=[{
					category: category[category.length - 1],
					name: '',
					price: '',
					description: ''
				}]
			  }
			  setcatArr(MenuData);
			  axios
			  .post('https://tyft-backend.herokuapp.com' + '/api/supplier/getcategory', {
				_id: truckID,
			  })
			  .then(async Response => {
				const ERROR = Response.data.code;
				console.log('Ctageogory', Response.data);
				if (ERROR !== 'ABT0001') {
				  let modifiedArray = [];
				  for (let i = 0; i < Response.data.length; i++) {
					modifiedArray.push({
					  label: Response.data[i],
					  value: Response.data[i],
					});
				  }
				  let unique = modifiedArray.filter(
					(item, indexOfItem, myArray) =>
					  myArray.findIndex(t => t.label === item.label) ===
					  indexOfItem,
				  );
  
				  setCategory(unique);
				//   setSelectedValue(unique[0].label);
				  //unique[0].label
				} else {
				}
			  })
			  .catch(error => {
				console.log(error);
			  });
			//   setisLoading(false);
			} else {
			//   setisLoading(false);
			}
		  })
		  .catch(error => {
			// setisLoading(false);
			console.log(error);
		  });
	  };
	let expData = [
		{
			heading: 'Rows',
			controls: [
						{
							label: 'Add Category:',
							xsLabel: 6,
							xsSize: 4,
							component: TextField,
							props: {
								className: classes.inputclass,
								data: [ 'Auto', 'Exact', 'Atleast' ],
								onChange: (e) => setTempCategory(e.target.value),
								required: true,
								id: 'row-heights0',
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
								id: 'row-heights03'
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
								id: 'row-heights0',
								value: catArr ? catArr[indexes].category :''
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
								onChange: (e) => onChangeMenu(e, 'name'),
								required: true,
								id: 'row-heights0',
								value: catArr ?catArr[indexes].name:null
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
								onChange: (e) => onChangeMenu(e, 'description'),
								required: true,
								id: 'row-heights0',
								value:catArr ? catArr[indexes].description:null
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
								id: 'row-heights0',
								value: catArr ?catArr[indexes].price:null
							}
						},
						{
							xsSize: 12,
							component: Button,
							props: {
								className: classes.inputclass,
								data: [ 'Auto', 'Exact', 'Atleast' ],
								onClick: () => {
									indexes += 1;
									console.log(catArr);
									let copycat = [
										...catArr,
										{
											category: category[category.length - 1],
											name: '',
											price: '',
											description: ''
										}
									];
									console.log(copycat);
									setcatArr(copycat);
									isResets(!resets);
								},
								style: { background: 'grey' },
								// onChange: (e) => onChangeUserData(e, 'email'),
								required: true,
								id: 'row-heights0',
								value: 'e',
								children: 'Add to List'
							}
						},
						{
							xsSize: 12,
							component: List,
							props: {
								data: catArr
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
