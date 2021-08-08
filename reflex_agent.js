function reflex_agent(location) {
  if (location == "A") return "RIGHT";
  else if (location == "B") return "LEFT";
}

function addLog(location, action) {
  document.getElementById(`log`).innerHTML += `<br><FONT><b>LOCATION:</b> ${location} | <b>ACTION:</b> ${action}</FONT>`;
}

function changeImg(states) {
  if (states[2] == "A") {
    document.getElementById("aspiradoraL").src = "aspiradora.png";
    document.getElementById("aspiradoraR").src = "https://fondosmil.com/fondo/17538.jpg";
    
  } else if (states[2] == "B") {
    document.getElementById("aspiradoraR").src = "aspiradora.png";
    document.getElementById("aspiradoraL").src = "https://fondosmil.com/fondo/17538.jpg";
  }
  document.getElementById("trashL").src = (states[0]=="DIRTY") ? "basura.png" : "check.png";
  document.getElementById("trashR").src = (states[1]=="DIRTY") ? "basura.png" : "check.png";
}

function test() {
  var estado;
  var location = states[2];
  var state = location== "A" ? states[0] : states[1];
  var action_result = reflex_agent(location);

  if (location   === "A") {
    //IZQUIERDA
    estado = state === "DIRTY"
        ? cleanThis(1, 0, 3, 1, location)
        : changeRoom(5, 7, location, action_result, 1);
  } else {
    //DERECHA
    estado =  state === "DIRTY"
        ? cleanThis(0, 1, 6, 2, location)
        : changeRoom(4, 8, location, action_result, 0);
  }

  
  document.getElementById(`estado${estado}`).innerHTML = (count[estado - 1] += 1);
  dirty(location);
  changeImg(states)
  if (Math.min(...count) < 2) {
    setTimeout(function () { test(); }, 1000);
  }
}

function cleanThis(index, index2, status1, status2, place) {
  addLog(place,'CLEAN');
  states[index2] = "CLEAN";
  return states[index] === "CLEAN" ? status1 : status2;
}

function changeRoom(status1, status2, place, lado, index) {
  addLog( place, `MOVE TO ${lado}`);
  states[2] = states[2] === "A" ? "B" : "A";
  return states[index] === "DIRTY" ? status1 : status2;
}

function dirty(location) {
  
  var probability = Math.floor(Math.random() * 11);

  if (probability < 2) {
    states[0] = "DIRTY";
    addLog('A','DIRTY');
  }
  if (probability < 4 && 2 <= probability) {
    states[1] = "DIRTY";
    addLog('B','DIRTY');
  }
  if (probability == 10) {
    states = ["DIRTY", "DIRTY", location];
    addLog('A & B','DIRTY');
  }
}

var states = ["DIRTY", "DIRTY", "A"];
var count = [0, 0, 0, 0, 0, 0, 0, 0];
test();