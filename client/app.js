//get value of input field
//send it to backend
//load dashboard

// SELECTORS
const adminDashboard = document.querySelector('#admin-dashboard');
const dashboard = document.querySelector('#dashboard');
const userName = document.querySelector('#span-username');
const adminUsername = document.querySelector('#admin-username');

if (dashboard) {
	userName.innerHTML = `${window.localStorage.name}`;
}

if (adminDashboard) {
	adminUsername.innerHTML = `${window.localStorage.name}`;

	const allUsersCount = document.querySelector('#users-count');

	fetch('http://localhost:7000/users', {
		method: 'GET',
		withCredentials: true,
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'auth-token': `${window.localStorage.token}`,
		},
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			allUsersCount.innerHTML = data.getUsers.length;
		})
		.catch((error) => {
			document.querySelector('.error').innerHTML = '<h2>server error</h2>';
			document.querySelector('.error').innerHTML = `<h3>${error}</h3>`;
			setTimeout(() => {
				window.location.replace('signup.html');
			}, 5000);
		});

	const surveyResponseCount = document.querySelector('#survey-response-count');

	fetch('http://localhost:7000/feedback', {
		method: 'GET',
		withCredentials: true,
		mode: 'cors',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Access-Control-Allow-Origin': '*',
			'auth-token': `${window.localStorage.token}`,
		},
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			surveyResponseCount.innerHTML = data.getFeedback.length;
		})
		.catch((error) => {
			document.querySelector('.error').innerHTML = '<h2>server error</h2>';
			document.querySelector('.error').innerHTML = `<h3>${error}</h3>`;
			setTimeout(() => {
				window.location.replace('signup.html');
			}, 5000);
		});

	const surveyQuestionsCount = document.querySelector('#survey-question-count');

	fetch('http://localhost:7000/survey', {
		method: 'GET',
		withCredentials: true,
		mode: 'cors',
		headers: {},
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			surveyQuestionsCount.innerHTML = data.getSurvey.length;
		})
		.catch((error) => {
			document.querySelector('.error').innerHTML = '<h2>server error</h2>';
			document.querySelector('.error').innerHTML = `<h3>${error}</h3>`;
			setTimeout(() => {
				window.location.replace('signup.html');
			}, 5000);
		});
}

// FUNCTIONS
const userAuth = () => {
	if (window.localStorage.role === 'admin') {
		window.location.replace('adminDashboard.html');
	} else {
		window.location.replace('userDashboard.html');
	}
};

// LOGIN FUNCTIONALITY
const loginFormButton = document.querySelector('#login-button');
if (loginFormButton) {
	loginFormButton.addEventListener('click', (e) => {
		e.preventDefault();
		const email = document.querySelector('#login-email').value;
		const password = document.querySelector('#login-password').value;

		fetch('http://localhost:7000/api/auth/login', {
			method: 'POST',
			mode: 'cors',
			body: JSON.stringify({
				email,
				password,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.status === 200) {
					window.localStorage.token = data.token;
					window.localStorage.role = data.user.role;
					window.localStorage.name = `${data.user.firstName} ${data.user.lastName}`;
					setTimeout(() => {
						userAuth();
					}, 2000);
				} else {
					let output = Object.keys(data).forEach((key) => {
						output += `<p>${data[key]}<p/>`;
					});

					setTimeout(() => {
						window.location.replace('login.html');
					}, 5000);
				}
			})
			.catch((error) => {
				document.querySelector('.error').innerHTML = '<h2>server error</h2>';
				document.querySelector('.error').innerHTML = `<h3>${error}</h3>`;
				setTimeout(() => {
					window.location.replace('login.html');
				}, 5000);
			});
	});
}

// SIGNUP FUNCTIONALITY
const signupFormButton = document.querySelector('#signup-button');
if (signupFormButton) {
	signupFormButton.addEventListener('click', (e) => {
		e.preventDefault();
		const firstName = document.querySelector('#first-name').value;
		console.log(firstName);
		const lastName = document.querySelector('#last-name').value;
		const email = document.querySelector('#signup-email').value;
		const password = document.querySelector('#signup-password').value;
		const companyName = document.querySelector('#company-name').value;

		fetch('http://localhost:7000/api/auth/register', {
			method: 'POST',
			mode: 'cors',
			body: JSON.stringify({
				firstName,
				lastName,
				email,
				password,
				companyName,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.status === 200) {
					window.localStorage.token = data.token;
					window.localStorage.role = data._savedUser.role;
					window.localStorage.user = data._savedUser._id;
					window.localStorage.name = `${data._savedUser.firstName} ${data._savedUser.lastName}`;
					setTimeout(() => {
						userAuth();
					}, 2000);
				} else {
					// console.log("can't go");
					let output = Object.keys(data).forEach((key) => {
						output += `<p>${data[key]}<p/>`;
					});
					document.querySelector('.error').innerHTML = output;
					document.querySelector('.error').style.display = 'block';
					setTimeout(() => {
						window.location.replace('signup.html');
					}, 5000);
				}
			})
			.catch((error) => {
				// console.log(error);
				document.querySelector('.error').innerHTML = '<h2>server error</h2>';
				document.querySelector('.error').innerHTML = `<h3>${error}</h3>`;
				setTimeout(() => {
					window.location.replace('signup.html');
				}, 5000);
			});
	});
}

// DISPLAY ALL USERS
const allUsers = document.querySelector('#users');
if (allUsers) {
	allUsers.addEventListener('click', (e) => {
		console.log(allUsers);
		e.preventDefault();

		fetch('http://localhost:7000/users', {
			method: 'GET',
			withCredentials: true,
			// credentials:'include',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'auth-token': `${window.localStorage.token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				// 	if (data.status === 200) {
				// 		window.localStorage.token = data.token;
				// 		window.localStorage.role = data._savedUser.role;
				// 		window.localStorage.user = data._savedUser._id;
				// 		window.localStorage.name = `${data._savedUser.firstName} ${data._savedUser.lastName}`;
				// 		setTimeout(() => {
				//       userAuth();
				// 		}, 2000);
				// 	} else {
				// 		// console.log("can't go");
				// 		let output = Object.keys(data).forEach((key) => {
				// 			output += `<p>${data[key]}<p/>`;
				// 		});
				// 		document.querySelector('.error').innerHTML = output;
				// 		document.querySelector('.error').style.display = 'block';
				// 		setTimeout(() => {
				// 			window.location.replace('signup.html');
				// 		}, 5000);
				// 	}
			})
			.catch((error) => {
				// console.log(error);
				document.querySelector('.error').innerHTML = '<h2>server error</h2>';
				document.querySelector('.error').innerHTML = `<h3>${error}</h3>`;
				setTimeout(() => {
					window.location.replace('signup.html');
				}, 5000);
			});
	});
}
