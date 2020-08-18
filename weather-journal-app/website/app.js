/* Global Variables */

// Create a new date instance dynamically with JS

// Personal API Key for OpenWeatherMap API

let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=bd7c9be239bc196112dd11ef3bbb4cdf&units=imperial';
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);


function performAction(e){
	let zip = document.getElementById('zip').value;
	let content = document.getElementById('feelings').value;
	getWeather(baseURL, zip, apiKey)

	.then(function(data){
		console.log('data checkin ', data)
		let temp = data.main.temp;
		postData('/addData', {temp:temp, content:content, date:newDate} )
	})

	.then(function(){
		updateUI()
	});
};

const getWeather = async(baseURL, zip, key)=>{
	
	const res = await fetch(baseURL+zip+key)
	try {

		const data = await res.json();
		return data;
	} catch (error) {
		console.log("error", error);
		
	}
}
const postData = async ( url = '', data = {})=>{
	console.log('data', data)
	  const response = await fetch(url, {
	  method: 'POST', 
	  credentials: 'same-origin', 
	  headers: {
	  	'Content-Type': 'application/json',
	  },
	  body: JSON.stringify(data),

    });
     try {
	  	const newData = await response.json();
	  	
	  	return newData
	  	console.log("newData", newData);
	  } catch (error) {
	  	console.log("error", error);
	  }
}

const updateUI = async () => {
	const request = await fetch ('/all');
	try {
		const allData = await request.json();
		console.log('all data: ',allData);
		document.getElementById('date').innerHTML = allData.date;
		document.getElementById('temp').innerHTML = allData.temperature;
		document.getElementById('content').innerHTML = allData.userResponse;
	} catch(error){
		console.log("error", error);
	}
}
