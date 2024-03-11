
// localStorage setup
let token = localStorage.getItem('token');

// Get token if not exists
if (!token === '' || token === null) {
  fetch('http://localhost:3000/api/token')
    .then(data => data.json())
    .then(data => {
      localStorage.setItem('token', data.access_token);
      //save token
      let myToken = data.access_token;
      runBCWeb();
    })
    .catch(error => {
      console.log('A kérés sikertelen', error);
    });
} else {
  // A token használata a localStorage-ből
  let myToken = token;
  runBCWeb();
}

function runBCWeb() {}
