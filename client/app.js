//get value of input field
//send it to backend
//load dashboard

const loginFormButton = document.querySelector('#login-button');
if(loginFormButton){
  loginFormButton.addEventListener('click', (e) => {
e.preventDefault();
const email = document.querySelector('#login-email').value;
const password = document.querySelector('#login-password').value;

fetch('http://localhost:7000/api/auth/login', {
  method: 'POST',
  mode: 'cors',
  body: JSON.stringify({
    email, 
    password
  }),
  headers: {
    'Content-Type' : 'application/json'
  }
})
.then(res =>{
  console.log(res.status);
  res.json()
}
)
.then((data) => {
  if (data.success === true) {
    window.localStorage.token = data.data.token;
    window.localStorage.admin = data.data.isAdmin;
    window.localStorage.user = data.data.id;
    document.querySelector('.message').style.display = 'block';
    setTimeout(() => {
      authLogin();
    }, 8000);
  } else {
    // console.log("can't go");
    let output = Object.keys(data).forEach((key) => {
      output += `<p>${data[key]}<p/>`;
    });
    document.querySelector('.error').innerHTML = output;
    document.querySelector('.error').style.display = 'block';
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

    fetch('http://localhost:7000/api/auth/register', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res =>{
        console.log(res.status);
        res.json()
      }
      )
      .then((data) => {
        if (data.success === true) {
          window.localStorage.token = data.data.token;
          window.localStorage.admin = data.data.isAdmin;
          window.localStorage.user = data.data.id;
          document.querySelector('.message').style.display = 'block';
          setTimeout(() => {
            authSignup();
          }, 8000);
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