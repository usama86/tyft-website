import PropTypes from 'prop-types';
import React from 'react';
import NativeSelect from '@material-ui/core/NativeSelect';
import ExpandMoreSharpIcon from '@material-ui/icons/ExpandMoreSharp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import useStyles from './ELXSelect.styles';
import { withStyles } from '@material-ui/core/styles';

const StyledExpandMoreSharpIcon = withStyles(() => {
	return {
		root: {
			fontSize: '21px'
		}
	};
})(ExpandMoreSharpIcon);

const ELXSelect = ({
	data,
	onChange,
	onEditComplete,
	value,
	style,
	optClassName,
	classSelectStyle,
	rootClass,
	filled,
	showCustomIcon,
	iconClass,
	disabled,
	...otherprops
}) => {
	const classes = useStyles();

	React.useEffect(() => {}, []);
	let listData = [];
	let valueFound = false;
	data.map((item) => {
		listData.push(item);
		if (item === value || item.key === value) valueFound = true;
	});
	if (!valueFound) listData.push(value);

	const handleBlur = () => {
		if (onEditComplete) onEditComplete();
	};

	const renderSelectComponent = () => {
		return (
			<NativeSelect
				{...otherprops}
				IconComponent={showCustomIcon ? StyledExpandMoreSharpIcon : ArrowDropDownIcon}
				onChange={onChange}
				onBlur={handleBlur}
				value={value}
				style={style}
				disabled={disabled}
				classes={{
					// root: classes.selectNativeClass,
					root: rootClass == undefined ? classes.selectNativeClass : rootClass,
					select: classSelectStyle ? classSelectStyle : classes.classSelectStyle,
					filled: filled == undefined ? classes.filled : filled,
					icon: iconClass === undefined ? classes.iconClass : iconClass
				}}
			>
				{listData ? (
					listData.map((item, index) => {
						return (
							<option
								className={optClassName === undefined ? classes.option : optClassName}
								key={index}
								value={item ? item.key ? item.key : item : ''}
							>
								{item ? item.value ? item.value : item : ''}
							</option>
						);
					})
				) : null}
			</NativeSelect>
		);
	};
	return (
		<React.Fragment>
			<React.Fragment>{renderSelectComponent()}</React.Fragment>
		</React.Fragment>
	);
};

ELXSelect.propTypes = {
	data: PropTypes.array,
	disableUnderline: PropTypes.bool,
	value: PropTypes.string,
	optClassName: PropTypes.any,
	style: PropTypes.object,
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
	onEditComplete: PropTypes.func,
	classSelectStyle: PropTypes.any,
	rootClass: PropTypes.any,
	filled: PropTypes.any,
	showCustomIcon: PropTypes.any,
	iconClass: PropTypes.any
};

ELXSelect.defaultProps = {
	data: [],
	disableUnderline: true,
	//disableTypography: true,//causing console error
	value: '',
	optClassName: undefined,
	rootClass: undefined,
	filled: undefined,
	style: {},
	showCustomIcon: true,
	disabled: false
};

// const areEqual = (prevProps, nextProps) => {
//   return (
//     prevProps.value == nextProps.value &&
//     _.isEqual(prevProps.data, nextProps.data)
//   );
// };
// export default React.memo(ELXSelect, areEqual);

export default React.memo(ELXSelect);
