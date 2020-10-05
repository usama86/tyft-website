import MaterialTable from 'material-table';
import React from 'react';
import axios from 'axios';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


export default function BasicSearch(props) {
  const theme = createMuiTheme({
    overrides: {
      // Style sheet name ⚛️
      MuiIcon: {
        // Name of the rule
        root: {
          // Some CSS
          color: 'white',
        },
      },
      MuiTypography:{
        root: {
          // Some CSS
          color: 'white',
        },
      },
    },
  });

  
	const [ data, setData ] = React.useState([]);
	React.useEffect(
		() => {
			axios
				.get('https://tyft-backend.herokuapp.com/api/users/getUser')
				.then(async (Response) => {
					let Data = Response.data;
					let isCust = false;
					let newData = [];
					if (Data) {
						for (let i = 0; i < Data.length; i++) {
							if (Data[i].userType === 'Customer' && props.drawerPage === 'Customer') {
								newData.push({...Data[i]})
							} else if (Data[i].userType === 'Supplier' && props.drawerPage === 'Truck') {
								newData.push({...Data[i]})
							} else {
							}
						}
						setData(newData); //
						console.log(Data);
						// navigation.navigate(Route.SIGNIN);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		[ props.drawerPage ]
	);
	return (
    <ThemeProvider theme={theme}>
		<MaterialTable
      title={props.drawerPage}
      style={{height:'100%',background:'#202020',color:'white'}}
			columns={[
				{ title: 'Name', field: 'Language' },
				{ title: 'Email', field: 'email' },
				{ title: 'Phone No', field: 'phoneNumber' },
				{ title: 'Profile Name', field: 'profileName' },
				{ title: 'User Type', field: 'userType' },
				{ title: 'Created At', field: 'created_at' }
      ]}
      
			data={data}
			options={{
        search: true,
        pageSizeOptions:[5],
        searchFieldStyle:{color:'white'}

      }}
		/>
    </ThemeProvider>
	);
}
