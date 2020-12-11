import React from 'react';
import Input from '../src/AdminPanel/Ui/Input';
import Head from 'next/head';
import Button from '@material-ui/core/Button';
import { withRouter } from 'next/router';
import axios from 'axios';
// import url from './../Constants/constants';
const Login = (props) => {
	const [ email, setEmail ] = React.useState({
		value: '',
		touch: false,
		error: false
	});

	const [ password, setPassword ] = React.useState({
		value: '',
		touch: false,
		error: false
	});

	const onSubmit = (event) => {
		event.preventDefault();
		let credentials = {
			email: email.value,
			password: password.value
		};
		axios
			.post('https://tyft-backend.herokuapp.com' + '/api/users/loginadmin', credentials)
			.then(async (Response) => {
				let responseMessage = await Response.data.message;
				console.log(responseMessage);
				if (responseMessage === 'Auth Successful') props.router.push('/home');
				else {
					setEmail({
						value: '',
						touch: false,
						error: true
					});
					setPassword({
						value: '',
						touch: false,
						error: true
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<React.Fragment>
			<Head>
				<title>Login Page</title>
				<link rel="icon" href="/favicon.ico" />
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
				/>
				<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
				<link
					rel="stylesheet"
					href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
					integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
					crossorigin="anonymous"
				/>
				<link
					rel="stylesheet"
					href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
					integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
					crossorigin="anonymous"
				/>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
				/>
			</Head>

			<div className="container pt-5 mt-3">
				<div className="d-flex justify-content-center h-100">
					<div className="card">
						<div className="card-header">
							<h3>Sign In</h3>
						</div>
						<div className="card-body">
							<form>
								<div className="input-group form-group">
									<div className="input-group-prepend">
										<span className="input-group-text" style={{ backgroundColor: '#42b0f5' }}>
											<i className="fas fa-user" />
										</span>
									</div>

									<Input
										type="email"
										name="email"
										value={email.value}
										onChange={(event) =>
											setEmail({
												value: event.target.value,
												touch: true,
												error: email.value ? false : true
											})}
									/>
								</div>
								<div className="input-group form-group">
									<div className="input-group-prepend">
										<span className="input-group-text" style={{ backgroundColor: '#42b0f5' }}>
											<i className="fas fa-key" />
										</span>
									</div>
									<Input
										type="password"
										value={password.value}
										name="password"
										onChange={(event) =>
											setPassword({
												value: event.target.value,
												touch: true,
												error: password.value ? false : true
											})}
									/>
								</div>
								<div className="form-group" style={{ textAlign: 'end' }}>
									<Button variant="outlined" color="#495057" onClick={onSubmit}>
										Login
									</Button>
								</div>
							</form>
						</div>
						{/* <div className="card-footer">
						<div className="d-flex justify-content-center links">
							Don't have an account?
							<Link to="/consultant-registration" className="text-white font-weight-bold">
								Sign Up
							</Link>
						</div>
						<div className="d-flex justify-content-center">
							<a href="#" className="text-white">
								Forgot your password?
							</a>
						</div>
					</div> */}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};
export default withRouter(Login);
