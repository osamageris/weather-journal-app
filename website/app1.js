// Creating a new date instance dynamically with JS
let d = new Date();
let date2 = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// The URL to retrieve weather information from  API 
const urls = "https://api.openweathermap.org/data/2.5/weather?zip=";

// My Personal API Key from OpenWeatherMap API
// &units=metric to get the Celsius Temperature
const apiKey = ",&appid=61bd029b78512691ff194fd4f1b5e9bb&units=metric";

// the URL of the server to post data
const serv = "Server running on localhost:3000";


// showing the error to the user
const error = document.getElementById("errors");
/*
 for generatingData 
 function to get input values from index.html
 calling getWetherData function to fetch the data from API link
 creating object from API object 
 posting data to backend the server
 geting data from server for updating 
 Filalizing and enfnding be brousing index.html
 */
/*Function for GETing Project Data
and updating userinterface by this data
*/







// Event listener function to operate a function by clicking from the existing index.html
// generatingData Function called by event listener through clicking
document.getElementById("generate").addEventListener("click", foundinginfo() );


// Function for POSTING data to the back enf the server
async function sendinginfo  (url = "", inf = {}) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inf),
  });

  try {
    const nData = await res.json();
    console.log(`You just saved`, nData);
    return nData;
  } catch (error) {
    console.log(error);
  }
}



//Function to Get or and recieve data from Web API Data
async function getWetherData  (zip){
  try {
    const res = await fetch(urls + zip + apiKey);
    const data = await res.json();

    if (data.cod != 200) {
      // display the error on userinterface
      error.innerHTML = data.message;
      setTimeout(_=> error.innerHTML = '', 2000)
      throw `${data.message}`;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
}

//Function for updating all data which are inputed from index.html and recieved or and (get) from Web API 
async function updatUI  (){
  const res = await fetch(serv + "/alls");
  try {
    const jinfo = await res.json();

    const info = document.getElementsByClassName("infor");
    info[0].innerHTML= jinfo.date2;
    info[1].innerHTML= jinfo.temp ;
    info[2].innerHTML =jinfo.feelings;
    } catch (error) {
    console.log(error);
  }
}



//Function for recieving or geting required or selected data from Web API in JSON format
// by feting it using zip Key
function foundinginfo(){ 
  //get value after click on the button
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  // getWetherData by returning  the required data using following arrow function 
  getWetherData(zip).then((data) => {
    //if there is data condition to get especific information from data object
    if (data) {
      const {main: { temp },name: city,  } = data;
      const inf = {date2,city,temp,feelings,};

// posting the recieved data to the server 
      sendinginfo(serv + "/sendinfo", inf);

// updaing the interface Index.html by all data the input and the recived data from API
      updatUI();
      document.getElementById('entry').style.opacity = 1;
    }
  });
}