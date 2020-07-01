//get value of input field
//send it to backend
//load dashboard

const adminDashboard = document.querySelector('#admin-dashboard');
const dashboard = document.querySelector('#dashboard');
const userName = document.querySelector('#span-username');
const adminUsername = document.querySelector('#admin-username');


if(dashboard) {
  userName.innerHTML = `${window.localStorage.name}`
}


if (adminDashboard){
  adminUsername.innerHTML = `${window.localStorage.name}`
}

const userAuth = () => {
  if (window.localStorage.role === 'admin') {
    window.location.replace('adminDashboard.html');
  } else {
    window.location.replace('userDashboard.html');
  }
};


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
			.then((res) => 
				res.json()
			)
			.then((data) => {
        console.log(data);
				if (data.status === 200) {
					window.localStorage.token = data.token;
          window.localStorage.role = data.user.role;
          window.localStorage.name = `${data.user.firstName} ${data.user.lastName}`;
					setTimeout(() => {
						userAuth();
					}, 2000);
				} else {
					// console.log("can't go");
					let output = Object.keys(data).forEach((key) => {
						output += `<p>${data[key]}<p/>`;
					});
					
					setTimeout(() => {
						window.location.replace('login.html');
					}, 5000);
				}
			})
			.catch((error) => {
				// console.log(error);
				document.querySelector('.error').innerHTML = '<h2>server error</h2>';
				document.querySelector('.error').innerHTML = `<h3>${error}</h3>`;
				setTimeout(() => {
					window.location.replace('login.html');
				}, 5000);
			});
	});
}

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
			.then((res) => {
				console.log(res.status);
				res.json();
			})
			.then((data) => {
        if (data.success === true) {
					window.localStorage.token = data.token;
          window.localStorage.role = data.user.role;
          window.localStorage.name = `${data.user.firstName} ${data.user.lastName}`;
					setTimeout(() => {
						userAuth();
					}, 2000);
				} else {
					// console.log("can't go");
					let output = Object.keys(data).forEach((key) => {
						output += `<p>${data[key]}<p/>`;
          });
          
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
