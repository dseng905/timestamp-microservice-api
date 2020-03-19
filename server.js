const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));


app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req,res) => {
  res.sendFile(process.cwd() + '/views/index.html');
  //res.sendFile(process.cwd() + '/views/style.css');
});

// Respond to POST request from clicking the submit button
app.post('/api/timestamp/', (req,res) => {
  let date = null;

  if(req.body.date !== undefined) {
    const unixTimestamp = parseInt(req.body.date*1);
    if(isNaN(unixTimestamp)){
      date = new Date(req.body.date);
    }
    else {
      date = new Date(unixTimestamp);
    }
  }
  else {
    date = new Date(Date.now());
  }

  const response = date == "Invalid Date" ?
          { error: "Invalid Date" } :
          {
            "unix": date.getTime(),
            "utc": date.toUTCString()
          };
  
  res.json(response); 
})

//Use GET request if date is added after '/api/timestamp'
app.get('/api/timestamp/:date?', (req,res) => {
  let date = null;

  if(req.params.date !== undefined) {
    const unixTimestamp = parseInt(req.params.date*1);
    if(isNaN(unixTimestamp)){
      date = new Date(req.params.date);
    }
    else {
      date = new Date(unixTimestamp);
    }
  }
  else {
    date = new Date(Date.now());
  }

  const response = date == "Invalid Date" ?
          { error: "Invalid Date" } :
          {
            "unix": date.getTime(),
            "utc": date.toUTCString()
          };
  
  res.json(response);
});

//Send 404 error if request cannot be fulfilled
app.use((req, res, next) => {
  res.status(404)
  .type('text')
  .send('Not Found'); 
});

app.listen(process.env.PORT || 3000, () => console.log('Node.js listening'));