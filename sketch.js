function preload() {
  //my table is comma separated value "csv"
  //and has a header specifying the columns labels
  table = loadTable('future_cities_data.csv', 'csv', 'header');
  //the file can be remote
  //table = loadTable("http://p5js.org/reference/assets/mammals.csv",
  //                  "csv", "header");
}

let slider1;
let slider2;
let current_temp = [];
let future_temp = [];
let lat_city = [];
var row_select = 0;
const rows_to_load = 200;


function setup() {
  
  //load data into array
  for (let index = 0; index < rows_to_load; index++) {
    current_temp[index] = table.get(index, "Annual_Mean_Temperature");
    future_temp[index] = table.get(index, "future_Annual_Mean_Temperature");
    lat_city[index] = table.get(index, "Latitude");
  }

  let max_current_temp = max(current_temp);
  let min_current_temp = min(current_temp);
  let max_future_temp = max(future_temp);
  let min_future_temp = min(future_temp);
  var max_lat_city = max(lat_city);
  var min_lat_city = min(lat_city);

  //print("min latitude :" + min_lat_city);
  //print("max latitude :" + max_lat_city);
  //print("min current temperature :" + min_current_temp);
  //print("max current temperature :" + max_current_temp);
  //print("min future temperature :" + min_future_temp);
  //print("max future temperature :" + max_future_temp);

  createCanvas(windowHeight/2, windowHeight);
  background(220);

  //plot city data
  for (let index = 0; index < current_temp.length; index++) {
    let yPos = map(lat_city[index], min_lat_city, max_lat_city, height, 0);
    let xPos1 = map(current_temp[index], min_current_temp, max_current_temp, 0, width);
    let xPos2 = map(future_temp[index], min_future_temp, max_future_temp, 0, width);
    stroke(0);
    strokeWeight(1);
    line(xPos1, yPos, xPos2, yPos);
    strokeWeight(4);
    stroke(0, 0, 200);
    point(xPos1, yPos);
    stroke(200, 0, 0);
    point(xPos2, yPos);
    noStroke();
    textAlign(CENTER);
    textSize(8);
    fill(0);
    text(table.get(index, "current_city"), (((xPos2-xPos1)/2)+xPos1), yPos+12);
  }

  //map legend
  textSize(12);
  text("Current temperature", width-(width/2.5), height-(height/50));
  strokeWeight(10);
  stroke(0, 0, 200);
  point(width-(width/2.5), height-(height/25));
  noStroke();
  text("Future temperature", width-(width/8), height-(height/50));
  stroke(200, 0, 0);
  point(width-(width/8), height-(height/25));

  //find latitude range
  let lat_range = max_lat_city - min_lat_city;
  print("Latitude range :" + lat_range);
  
  //draw latitude lines from data
  let counter_1 = 0;
  let lat_divisions = 20;
  for (let i = 0; i < height; i = i + (height/lat_divisions)) {
    counter_1 = counter_1 + 1;
    let latitude = max_lat_city - (lat_range/lat_divisions)*counter_1;
    //print(latitude);
    stroke(0, 0, 0, 20);
    strokeWeight(1);
    line(0, i, width, i);
    textAlign(LEFT);
    textSize(8);
    noStroke();
    fill(0);
    text(round(latitude)+"°", 20, i+3);
  }

  //annotation latitude axis
  push();
  translate(15, height/2);
  rotate( radians(-90) );
  textSize(12);
  textAlign(CENTER);
  text("Latitude", 0,0);
  pop();

  let temp_range = max_future_temp - min_current_temp;
  print("Temperature range :" + temp_range);

  //draw temperature lines from data
  let counter_2 = 0;
  let temp_divisions = round(temp_range/2);
  for (let j = 0; j < width; j = j + (width/temp_divisions)) {
    counter_2 = counter_2 + 1;
    let step = (temp_range/temp_divisions)*counter_2;
    let temperature = ((min_current_temp-(temp_range/temp_divisions))+step);
    //print(temperature);
    stroke(0, 0, 0, 20);
    strokeWeight(1);
    line(j, 0, j, height);
    textAlign(CENTER);
    textSize(8);
    noStroke();
    fill(0);
    text(round(temperature) + "°C", j+3, 35);
  }

  //annotation temperature axis
  textSize(12);
  textAlign(CENTER);
  text("Temperature", width/2, 15);
}

function draw() {
 
}