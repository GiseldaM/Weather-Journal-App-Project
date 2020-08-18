let projectData = {};

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const { userInfo } = require('os');


app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


const cors = require('cors');
app.use(cors());

const port = 4200;
const server = app.listen(port, listening);

function listening () {
    console.log('server running');
    console.log(`running on local host: ${port}`);
}


app.use(express.static('website'));


app.get('/all', sendData);

function sendData (request, response) {
    response.send(projectData);
    console.log('Response Sent');
}

app.post('/addData', function (request, response) {
    let newEntry = {
    temperature: request.body.temp,
    date: request.body.date, 
    userResponse: request.body.content,
  };
    projectData = newEntry;
    response.send(projectData);
})
