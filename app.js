let Equilibrium = [
  {
    AC: {
      ac1: false,
      ac2: false,
    },
    AD: {
      ad1: false,
      ad2: false,
    },
    BC: {
      bc1: false,
      bc2: false,
    },
    BD: {
      bd1: false,
      bd2: false,
    },
  },
];

let modal = document.getElementById("modal");
let modalBtn = document.getElementById("modalBtn");

function toggleModal() {
  modal.classList.toggle("show-modal");
  document.body.classList.toggle("modal-open");
}

let operator = "<";

var modal1 = document.getElementById("modal1");
var t1value = document.getElementById("t1value");
var t2value = document.getElementById("t2value");
var t3value = document.getElementById("t3value");
var t4value = document.getElementById("t4value");
var t1 = document.getElementById("t1");
var t2 = document.getElementById("t2");
var t3 = document.getElementById("t3");
var t4 = document.getElementById("t4");

function toggleModal1() {
  modal1.classList.toggle("show-modal");
  document.body.classList.toggle("modal-open");
}

function changeDirections() {
  t1.textContent = t1value.value;
  t2.textContent = t2value.value;
  t3.textContent = t3value.value;
  t4.textContent = t4value.value;

  toggleModal1();
}

function calculateNashEquilibrium() {
  const variables = ["ac1", "ac2", "ad1", "ad2", "bc1", "bc2", "bd1", "bd2"];
  const values = {};

  // Check if all input values are not empty
  const allValuesNotEmpty = variables.every((variable) => {
    const inputValue = document.getElementById(variable).value;
    return inputValue.trim() !== "";
  });

  // If any of the values is empty, show modal
  if (!allValuesNotEmpty) {
    toggleModal();
    return;
  }

  variables.forEach((variable) => {
    values[variable] = parseInt(document.getElementById(variable).value);
  });

  var bestResponsesPlayer1 = "";
  var bestResponsesPlayer2 = "";

  function clearState(element) {
    document.getElementById(String(element)).style.backgroundColor = "";
    document.getElementById(String(element)).style.border = "";
  }

  function calculateBestResponse1(element, element2, value1, value2) {
    const uppercaseElement = element.toUpperCase();
    const propertyToFind = uppercaseElement.slice(0, -1);
    clearState(element);
    clearState(element2);
    if (eval(`value1 ${operator} value2`)) {
      bestResponsesPlayer1 += value1 + ", ";
      Equilibrium[0][propertyToFind][element] = true;
      document.getElementById(String(element)).style.backgroundColor =
        "#FBCEB1";
    } else {
      bestResponsesPlayer1 += value2 + ", ";
      let uppercaseElement2 = element2.toUpperCase();
      let propertyToFind2 = uppercaseElement2.slice(0, -1);
      Equilibrium[0][propertyToFind2][element2] = true;
      document.getElementById(String(element2)).style.backgroundColor =
        "#FBCEB1";
    }
  }

  function calculateBestResponse2(element, element2, value1, value2) {
    const uppercaseElement = element.toUpperCase();
    const propertyToFind = uppercaseElement.slice(0, -1);
    clearState(element);
    clearState(element2);
    if (eval(`value1 ${operator} value2`)) {
      bestResponsesPlayer2 += value1 + ", ";
      Equilibrium[0][propertyToFind][element] = true;
      document.getElementById(String(element)).style.backgroundColor =
        "#DADD98";
    } else {
      bestResponsesPlayer2 += value2 + ", ";
      let uppercaseElement2 = element2.toUpperCase();
      let propertyToFind2 = uppercaseElement2.slice(0, -1);
      Equilibrium[0][propertyToFind2][element2] = true;
      document.getElementById(String(element2)).style.backgroundColor =
        "#DADD98";
    }
  }

  function findPropertiesWithTrueValues(obj) {
    const result = [];
    for (const parentKey in obj) {
      const properties = obj[parentKey];
      let trueValuesCount = 0;

      for (const value of Object.values(properties)) {
        if (value === true) {
          trueValuesCount++;

          if (trueValuesCount > 2) {
            break;
          }
        }
      }

      if (trueValuesCount === 2) {
        result.push(parentKey);
      }
    }

    return result;
  }

  for (const parentKey in Equilibrium[0]) {
    const properties = Equilibrium[0][parentKey];
    for (const key in properties) {
      properties[key] = false;
    }
  }

  // Calculate best responses for player 1
  calculateBestResponse1("ac1", "bc1", values.ac1, values.bc1);
  calculateBestResponse1("ad1", "bd1", values.ad1, values.bd1);
  // Calculate best responses for player 2
  calculateBestResponse2("ac2", "ad2", values.ac2, values.ad2);
  calculateBestResponse2("bc2", "bd2", values.bc2, values.bd2);

  let propertiesWithTrueValues = findPropertiesWithTrueValues(Equilibrium[0]);
  for (const parentKey in Equilibrium[0]) {
    document.getElementById(String(parentKey)).style.border = "";
  }

  propertiesWithTrueValues.map((property) => {
    document.getElementById(String(property)).style.border = "2px solid orange";
  });

  if (propertiesWithTrueValues.length === 0) {
    document.getElementById("result").innerText = "No Nash Equilibrium";
  } else {
    document.getElementById("result").innerText =
      "Best Response for Player 1: " +
      bestResponsesPlayer1 +
      "\nBest Response for Player 2: " +
      bestResponsesPlayer2;
  }
}
