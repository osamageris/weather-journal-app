

/*
In this Weather app web pages 
in this Client page i divided it into sections 
 

1- a section to find today's day 

2- a section for declearing and intializing the general variables

3- a section to find the temperature for some place or city through its ZIP Code by using a suitable API and its personal key 
from http://wwww.OpenWeatherMap.com

4- a section to get and collect all enterd data by the user such as zip code and his / her feeling 

5- a section to link between the home page index.htm and this client page for operating its main section
 find info  through  addEventListener function 

 6-a section for declaring and coding 3 important functions 

 6-1- a function **GetWeatherDataByZipCode** to fetch and get the  temperature for some place or city through its ZIP Code by using a suitable API and its personal key 
from http://wwww.OpenWeatherMap.com

6-2- a function **SendingAllData**to send all collected data to be stored in an object or array or data base through the server this data consists of 3 parts
 one part from the user and the temperature calledback  by API and the generated Date by built in date function.

 6-3- a function **UpdatingU**to update the main html page (index.htm) by geting all stored collected data by the server in last step and showing them.


7 - a mian function which like the brain of this app this fuction named FindInfo and will opearte when the user 
click genearte button through addEventListener the FindInfo function will call the 3 prevouse functions 
in step no 6 consequantly which are ** GetWeatherDataByZipCode ** then SendingAllData then **UpdatingU**



*/
// Creating a new date instance dynamically with JS
let d = new Date();
let date2 = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Declaring general variables 

// My Personal API Key from OpenWeatherMap API
// &units=metric to get the Celsius Temperature
const apiKey = "&appid=61bd029b78512691ff194fd4f1b5e9bb&units=metric";
//const apiKey = "61bd029b78512691ff194fd4f1b5e9bb";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const server="Server running on localhost:";

const Errors = function(errors) {
 console.log( "errors", errors);
};
const ZipCodeEl=document.getElementById("zip");
const FeelingsCodeEl=document.getElementById("feelings");
const dateel=document.getElementById("date");
const tempel=document.getElementById("temp");
const contentel=document.getElementById("content");
const feelel=document.getElementById("feelings");



// Event listener function to operate a function by clicking from the existing index.html
// generatingData Function called by event listener through clicking
document.getElementById("generate").addEventListener("click", FindInfo);

// 
//Function for Send Data to API  then recieving or geting required or selected data from Web API in JSON format
// by fetching it using zip Key
function FindInfo(){ 
  // declearing a Variable to get AllData after click on the button
 
  const AllData = {
    zipcode: ZipCodeEl.value ,
  //  zipcode : 10001 ,
      content : feelel.value ,
      date: date2 ,

  };

// Send Or Post zip code and apKey to API to get Its Information or data  
alert(AllData.zipcode)
alert(AllData.content)
  GetWeatherDataByZipCode(AllData.zipcode).then(data1=>{
    // check if the recieved data is succeded 
if (data1.cod !=200)
return alert(data1.message);

// Posting Or sending Data to the Server for preparing for displaying in  in Index.htm
AllData.temp=data1.main.temp;



// posting the recieved data to the server ??
 // Sending or Posting All Data to the server 
 SendingAllData(AllData);


  }).catch(Errors);


// To call the updateUI so all collected data apear in the index.htm
  UpdatingUI();
  document.getElementById('entry').style.opacity = 1;
  
  
  
}
// To Get The Weather Data by asyncrounnace waite  for fetch the api link then promise  by returning  the required data using following function 
async function GetWeatherDataByZipCode(zipcode) {
  

  //return await (await ( fetch('apiUrl + zipcode + apiKey')).JSON());
try{
  alert(apiUrl + zipcode + apiKey)
  const res =await fetch(apiUrl + zipcode + apiKey);
const tempdata = await res.json();
return tempdata ;
}
catch (errors) {
  Errors(errors);
}
}
// Posting or Sending all data to the server 
async function SendingAllData ( temp11={}){
   
const req =await fetch ("/Add", {
  method : 'post',
  headers :{'content-type' :'application/json'} ,
  body: JSON.stringify(temp11),
  
});
try {
  // sending data after waiting and collecting through json
  const res = await req.json();
 //console.log(`You just saved`, res);
  return res;

  
} 

catch (errors) {
  Errors(errors);
}
}




// a function **UpdatingU**to update the main html page (index.htm) by geting all stored collected data by the server the entered and generated and the collected from API in last step and showing them.


async function UpdatingUI(){

  const req =await fetch("/All");
  try{
       const res = await req.json();
       /*res.json().then(AllData=>{
       dateel.innerHTML= AllData.date;
       tempel.innerHTML=AllData.temp;
       contentel.innerHTML=AllData.content;


       })
       
       */

       dateel.innerHTML= res.date;
       tempel.innerHTML=res.temp;
       contentel.innerHTML=res.content;
      }
  
  catch (errors) {
  Errors(errors);
}


}

    