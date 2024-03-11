let myToken = '';

fetch('http://localhost:3000/api/token')
  .then(data => data.json())
  .then(data => {
    myToken = data.access_token; // Itt mentjük el a választ a változóba
    // Itt kezeld a választ
  })
  .catch(error => {
    console.log('A kérés sikertelen', error);
  });