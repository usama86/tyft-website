import MaterialTable from 'material-table';
import React from 'react';
import axios from 'axios';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Popup from './Ui/Popup';
// import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';
import { withRouter } from 'next/router'
function HomePage(props) {
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
  const [open, setOpen] = React.useState(false);
  const [columnData,setColumnData]=React.useState({});
  const [isLoading,setIsLoading]= React.useState(true);
	React.useEffect(
		() => {
	 setIsLoading(true);		
      if(props.drawerPage==='Truck')
      {
        axios
				.get('https://tyft-backend.herokuapp.com/api/Supplier/getalltruck')
				.then(async (Response) => {
					let Data = Response.data;
                    console.log(Data.TruckInfo)
					setData(Data.TruckInfo); //
					setIsLoading(false);
					// navigation.navigate(Route.SIGNIN);
				})
				.catch((error) => {
					console.log(error);
					setIsLoading(false);
        });
      }
      else{
			axios
				.get('https://tyft-backend.herokuapp.com/api/users/getallusers')
				.then(async (Response) => {
					let Data = Response.data;
					let isCust = false;
					let newData = [];
					if (Data) {
						for (let i = 0; i < Data.length; i++) {
							if (Data[i].userType === 'Customer' && props.drawerPage === 'Customer') {
								newData.push({ ...Data[i] });
							} else if (Data[i].userType === 'Supplier' && props.drawerPage === 'Supplier') {
								newData.push({ ...Data[i] });
							} else {
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
		},
		[ props.drawerPage ]
  );
  const getColumn = () => {
	if(props.drawerPage === 'Customer' || props.drawerPage === 'Supplier')
	return [
		{ title: 'Name', field: 'profileName' },
		{ title: 'Email', field: 'email' },
		{ title: 'Phone No', field: 'phoneNumber' },
		{ title: 'Profile Name', field: 'profileName' },
		{ title: 'User Type', field: 'userType' },
		{ title: 'Created At', field: 'created_at' }
	]
	else
	return [
		{title: 'Name', field: 'truckName' },
		{ title: 'Email', field: 'truckEmail' },
		// { title: 'Logo', field: 'truckLogo' },
		{ title: 'Contact', field: 'truckContact' },
		{ title: 'City', field: 'truckCity' },
		{ title: 'Website', field: 'truckWebsite' },
		{ title: 'Status', field: 'status' },
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
	]
  }
  
  const rowClickHander=(row,columns,event)=>{
    // setColumnData(columns)
    // setOpen(true);
	console.log(columns);
	console.log(props);
	let getName = '';
	if(columns.profileName)
		getName = getName.replace(/\s/g, '');
	else if(columns.truckName)
		getName = getName.replace(/\s/g, '');

	//profileName
	//truckName
	props.router.push({
		pathname: '/profile/' + props.drawerPage,
		query: columns,
	})
  }
	return (
    <React.Fragment>
		<ThemeProvider theme={theme}>

		{isLoading ? <Skeleton variant="rect" width={210} height={118} style={{
			    width: '100%',
				height: '90%',
				marginTop: '3%'
		}} /> :	
		<React.Fragment>
			<MaterialTable
				title={props.drawerPage}
				style={{ height: '100%', color: 'black' }}
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
			</React.Fragment>
			}
		</ThemeProvider>
    <Popup open={open} setOpen={setOpen} columnData={columnData} />
    </React.Fragment>
	);
}
export default withRouter(HomePage);