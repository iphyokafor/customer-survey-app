//get value of input field
//send it to backend
//load dashboard

// SELECTORS
const loginFormButton = document.querySelector('#login-button');
const signupFormButton = document.querySelector('#signup-button');
const adminDashboard = document.querySelector('#admin-dashboard');
const dashboard = document.querySelector('#dashboard');
const userName = document.querySelector('#span-username');
const adminUsername = document.querySelector('#admin-username');
const surveyResponseCount = document.querySelector('#survey-response-count');
const allUsersCount = document.querySelector('#users-count');
const surveyQuestionsCount = document.querySelector('#survey-question-count');
const surveyTableBody = document.querySelector('#survey-table-body');
const usersTableBody = document.querySelector('#users-table-body');

// FUNCTIONS
const userAuth = () => {
	if (window.localStorage.role === 'admin') {
		window.location.replace('adminDashboard.html');
	} else {
		window.location.replace('userDashboard.html');
	}
};

if (surveyTableBody) {
	fetch('http://localhost:7000/feedback', {
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
			if (data.success === true) {
				let output;
				const loadSurveyData = data.getFeedback.forEach((feedback) => {
					output += `
  <tr>
  <td>${feedback._id}</td>
  <td>${feedback.customer}</td>
	<td>${feedback.surveyId}</td>
	<td>${feedback.customerReply}</td>
  <td>${new Date(feedback.createdAt).toLocaleDateString()}</td>
  </tr>
  `;
				});
				surveyTableBody.innerHTML = output;
			}
		});
}



if (usersTableBody) {
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
			if (data.success === true) {
				let output;
				const loadUsersData = data.getUsers.forEach((user) => {
					output += `
  <tr>
  <td>${user._id}</td>
  <td>${user.firstName}</td>
	<td>${user.lastName}</td>
	<td>${user.companyName}</td>
  <td>${user.email}</td>
  <td>${new Date(user.createdAt).toLocaleDateString()}</td>
  </tr>
  `;
				});
				usersTableBody.innerHTML = output;
			}
		});
}

if (dashboard) {
	userName.innerHTML = `${window.localStorage.name}`;
}

if (adminDashboard) {
	adminUsername.innerHTML = `${window.localStorage.name}`;

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
			allUsersCount.innerHTML = data.getUsers.length;
		})
		.catch((error) => {
			document.querySelector('.error').innerHTML = '<h2>server error</h2>';
			document.querySelector('.error').innerHTML = `<h3>${error}</h3>`;
			setTimeout(() => {
				window.location.replace('signup.html');
			}, 5000);
		});

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
			surveyResponseCount.innerHTML = data.getFeedback.length;
		})
		.catch((error) => {
			document.querySelector('.error').innerHTML = '<h2>server error</h2>';
			document.querySelector('.error').innerHTML = `<h3>${error}</h3>`;
			setTimeout(() => {
				window.location.replace('signup.html');
			}, 5000);
		});

	fetch('http://localhost:7000/survey', {
		method: 'GET',
		withCredentials: true,
		mode: 'cors',
		headers: {},
	})
		.then((res) => res.json())
		.then((data) => {
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

// LOGIN FUNCTIONALITY
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
if (signupFormButton) {
	signupFormButton.addEventListener('click', (e) => {
		e.preventDefault();
		const firstName = document.querySelector('#first-name').value;
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
				document.querySelector('.error').innerHTML = '<h2>server error</h2>';
				document.querySelector('.error').innerHTML = `<h3>${error}</h3>`;
				setTimeout(() => {
					window.location.replace('signup.html');
				}, 5000);
			});
	});
}
