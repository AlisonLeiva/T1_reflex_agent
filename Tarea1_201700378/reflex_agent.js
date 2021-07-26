function reflex_agent(location, state) {
  if (state == "DIRTY") return "CLEAN";
  else if (location == "A") return "RIGHT";
  else if (location == "B") return "LEFT";
}

function changeImg(state, action) {
  if (state[0] == "A") {
    document.getElementById("aspiradoraL").src = "aspiradora.png";
    document.getElementById("aspiradoraR").src =
      "https://fondosmil.com/fondo/17538.jpg";
  } else if (state[0] == "B") {
    document.getElementById("aspiradoraR").src = "aspiradora.png";
    document.getElementById("aspiradoraL").src =
      "https://fondosmil.com/fondo/17538.jpg";
  }

  if (action == "CLEAN" && state[0] == "A") {
    document.getElementById("trashL").src = "check.png";
  }

  if (action == "CLEAN" && state[0] == "B") {
    document.getElementById("trashR").src = "check.png";
  }
}

function test(states) {
  var location = states[0];
  var state = states[0] == "A" ? states[1] : states[2];
  var action_result = reflex_agent(location, state);

  changeImg(states, action_result);

  document.getElementById("log").innerHTML += "<br>Location: "
    .concat(location)
    .concat(" | Action: ")
    .concat(action_result);

  if (action_result == "CLEAN") {
    if (location == "A") states[1] = "CLEAN";
    else if (location == "B") states[2] = "CLEAN";
  } else if (action_result == "RIGHT") states[0] = "B";
  else if (action_result == "LEFT") states[0] = "A";
  setTimeout(function () {
    test(states);
  }, 2000);
}

const printInitial = () => {
  document.getElementById("trashL").src = "basura.png";
  document.getElementById("trashR").src = "basura.png";
};

var states = ["A", "DIRTY", "DIRTY"];
printInitial();
test(states);
