let numbers1 = [];
let numbers2 = [];
let selectOperator = false;
let operatorSelected;
let saveResult;
let firstValue = false;

function cleanScreen() {
  document.getElementById("screen").innerHTML = "0";
  numbers1 = [];
  numbers2 = [];

  firstValue = false;
  selectOperator = false;
  saveResult = 0;

  const message = document.getElementById("message");
  message.innerHTML = "";
}

function showScreen(numbers) {
  let numberComplete = "";
  for (const number of numbers) {
    numberComplete += number;
  }
  document.getElementById("screen").innerHTML = numberComplete;
}

function addNumber(number) {
  const message = document.getElementById("message");
  message.innerHTML = "";

  if (numbers1[0] == 0) {
    numbers1.splice(-1, 1);
  }
  if (numbers2[0] == 0) {
    numbers2.splice(-1, 1);
  }

  let value = number.value;
  if (selectOperator) {
    numbers2.push(value);
    showScreen(numbers2);
  } else {
    numbers1.push(value);
    firstValue = true;
    showScreen(numbers1);
  }
}

function handleOperator(operator) {
  selectOperator = true;

  switch (operator.value) {
    case "+":
      operatorSelected = 1;
      document.getElementById("screen").innerHTML = "+";
      break;
    case "-":
      operatorSelected = 2;
      document.getElementById("screen").innerHTML = "-";
      break;
    case "*":
      operatorSelected = 3;
      document.getElementById("screen").innerHTML = "*";
      break;
    case "/":
      operatorSelected = 4;
      document.getElementById("screen").innerHTML = "/";
      break;
  }

  if (!firstValue) {
    if (numbers1[0] !== saveResult) numbers1.push(saveResult);
  }
}

function result() {
  if (selectOperator) {
    switch (operatorSelected) {
      case 1:
        console.log(numbers1[0]);
        saveResult = returnNumber(numbers1) + returnNumber(numbers2);
        fixed();
        document.getElementById("screen").innerHTML = saveResult;
        break;

      case 2:
        saveResult = returnNumber(numbers1) - returnNumber(numbers2);
        fixed();
        document.getElementById("screen").innerHTML = saveResult;
        break;

      case 3:
        saveResult = returnNumber(numbers1) * returnNumber(numbers2);
        fixed();
        document.getElementById("screen").innerHTML = saveResult;
        break;

      case 4:
        if (returnNumber(numbers2) == 0) {
          const message = document.getElementById("message");
          message.innerHTML = "No se puede dividir por 0";
          message.setAttribute("class", "error");
          saveResult = 0;
          break;
        }
        saveResult = returnNumber(numbers1) / returnNumber(numbers2);
        fixed();
        document.getElementById("screen").innerHTML = saveResult;
        break;
    }

    numbers1 = [];
    numbers2 = [];
    selectOperator = false;
    firstValue = false;
  } else {
    saveResult = returnNumber(numbers1);
    document.getElementById("screen").innerHTML = saveResult;
  }
}

function fixed() {
  let string = saveResult.toString();
  if (/^[-+]?[0-9]+.[0-9]+$/.test(string)) {
    const value = saveResult;

    let parts = string.split(".");
    if (parts[1] != null && parts[1].length > 8) {
      saveResult = saveResult.toFixed(6);
    } else {
      saveResult = value;
    }
  }
}

function returnNumber(numbers) {
  let numberComplete = "";
  let i = 0;

  for (const number of numbers) {
    numberComplete += number;
  }

  return Number(numberComplete);
}

function deleteNumber() {
  let newNumber = "";

  if (selectOperator) {
    numbers2.splice(-1, 1);

    if (numbers2.length == 0) {
      numbers2 = [0];
    }
    showScreen(numbers2);
  } else {
    numbers1.splice(-1, 1);

    if (numbers1.length == 0) {
      numbers1 = [0];
    }
    showScreen(numbers1);
  }
  const message = document.getElementById("message");
  message.innerHTML = "";
}
