import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '25ch'
		}
	},
	smallWidth:{
		paddingLeft: '10px',
		paddingRight: '10px',
		paddingTop: '0px',
		paddingBottom: '0px !important',
		backgroundColor: '#FFFFFF',
		border: '1px solid grey',
		borderRadius: '4px',
		// border: 'none !important',
		// borderRadius: '3px',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		//fontSize: '12px !important',
		//color: '#666666 !important',
		// height: '56px !important',
		// fontFamily: 'Noto Sans',
		textOverflow: 'ellipsis ',
		'&:focus': {
		  backgroundColor: '#FFFFFF',
		},
		width:'165px !important',
		height:'50px'
	},
    root: {
		width: '100%'
	},
	backButton: {
		marginRight: theme.spacing(1)
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1)
	},
	// container: {
	// 	display: 'flex',
	// 	flexWrap: 'wrap',
	//   },
	  textField: {
		// marginLeft: theme.spacing(1),
		// marginRight: theme.spacing(1),
		// width: 200,
		width: 120,
		height: 44
	  },
}));
export default useStyles;