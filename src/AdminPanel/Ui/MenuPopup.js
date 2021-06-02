import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { FaRegBell } from 'react-icons/fa';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
	},
	paper: {
		marginRight: theme.spacing(2)
	}
}));

export default function MenuListComposition() {
	const classes = useStyles();
	const [ open, setOpen ] = React.useState(false);
	const [ loader, setLoader ] = React.useState(false);
  const [data,setData]  = React.useState([]);
	const anchorRef = React.useRef(null);

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	function handleListKeyDown(event) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		}
	}

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = React.useRef(open);
	React.useEffect(
		() => {
			if (prevOpen.current === true && open === false) {
				anchorRef.current.focus();
			}
      else{
        setLoader(true);
        axios
          .get('https://tyft-backend.herokuapp.com/api/notification/getnotification')
          .then(async (Response) => {
            let Data = Response.data;
            console.log(Data);
            if(!Data || Data.length===0)
              setData("Empty");
            else
              setData(Data);
            
            
            setLoader(false);
          })
          .catch((error) => {
            console.log(error);
            setLoader(false);
          });
      }

			prevOpen.current = open;
		},
		[ open ]
	);

	return (
		<div className={classes.root}>
			<div>
				<Button
					ref={anchorRef}
					aria-controls={open ? 'menu-list-grow' : undefined}
					aria-haspopup="true"
					onClick={handleToggle}
					style={{ color: 'white' }}
				>
					<FaRegBell size={18} />
				</Button>
				<Popper
					open={open}
					anchorEl={anchorRef.current}
					style={{ zIndex: '9999' }}
					role={undefined}
					transition
					disablePortal
				>
					{({ TransitionProps, placement }) => (
						<Grow
							{...TransitionProps}
							style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
						>
							<Paper>
								<ClickAwayListener onClickAway={handleClose}>
									{loader ? (
										<CircularProgress style={{ height: '20px', width: '20px' }} />
									) : (
										<MenuList
											autoFocusItem={open}
											id="menu-list-grow"
											onKeyDown={handleListKeyDown}
										>
                      {Array.isArray(data) ? data.map(val=>(
                        <MenuItem onClick={handleClose}>
                        XYZ Supplier created, Click on the link to Approve the Supplier.
                      </MenuItem>
                      )):
                      <MenuItem onClick={handleClose}>
                        Empty
                      </MenuItem>
                      }
										</MenuList>
									)}
								</ClickAwayListener>
							</Paper>
						</Grow>
					)}
				</Popper>
			</div>
		</div>
	);
}
