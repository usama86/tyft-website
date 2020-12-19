import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  rootclass: {
    display: 'inline !important',
    fontSize: '12px',
    color: '#666666',
  },
  autoCapitalize: {
    textTransform: 'capitalize',
  },
}));

export default useStyles;
