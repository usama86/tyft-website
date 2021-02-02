import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  selectNativeClass: {
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
    height: '56px !important',
    // fontFamily: 'Noto Sans',
    textOverflow: 'ellipsis ',
    '&:focus': {
      backgroundColor: '#FFFFFF',
    },
  },
  input: {
    '&:focus': {
      outline: 0,
    },
  },
  classSelectStyle: {
    width: '209px !important',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '0px',
    paddingBottom: '0px !important',
    backgroundColor: '#FFFFFF',
    // border: 'none !important',
    border: '1px solid grey',
    borderRadius: '4px',
    // color: '#676767',

    //change added in order to have generic font styling for select
    // fontSize: '11px !important',
    // color: '#666666 !important',
    // textTransform: 'capitalize !important',

    '&:focus': {
      backgroundColor: '#FFFFFF',
    },
  },

  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  option: {
    color: 'black',
    //fontSize: '30px !important',

    // backgroundColor: 'black !important',
    // color: 'white !important'
  },

  filled: {},
  iconClass: {
    color: '#666666 !important',
  },
}));

export default useStyles;
