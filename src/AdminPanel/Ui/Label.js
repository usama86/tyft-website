import React from 'react';
import { InputLabel } from '@material-ui/core';
import useStyles from './Label.styles';
import PropTypes from 'prop-types';


const ELXLabel = ({children, rootClass, wrapText, style, autoCapitalize, ...otherProps }) => {
	const classes = useStyles();

	const inputLabel = (
		<InputLabel
			{...otherProps}
			classes={{
				root:
					autoCapitalize && classes.autoCapitalize + '  ' + rootClass != undefined && rootClass != null
						? rootClass
						: classes.rootclass
			}}
			style={{ ...style }}
		>
			{/* <LocalizeUtil>{children}</LocalizeUtil> */}
			{children}
		</InputLabel>
	);

	return(
  <React.Fragment>{inputLabel}</React.Fragment>
  )
};

ELXLabel.defaultProps = {
	htmlFor: '',
	children: '',
	rootClass: undefined,
	style: {},
	wrapText: true,
	formstyle: { display: 'flex' },
	autoCapitalize: true
};

ELXLabel.propTypes = {
	htmlFor: PropTypes.any,
	children: PropTypes.object,
	rootClass: PropTypes.any,
	wrapText: PropTypes.any,
	style: PropTypes.any,
	autoCapitalize: PropTypes.any
};

export default ELXLabel
