("use strict");

/////////////////////
// Element Selections

// Operator Buttons
const plusBtn = document.querySelector(".plus");
const minusBtn = document.querySelector(".minus");
const multiplyBtn = document.querySelector(".multiply");
const divideBtn = document.querySelector(".divide");

// Number Buttons
const zeroBtn = document.querySelector(".zero");
const oneBtn = document.querySelector(".one");
const twoBtn = document.querySelector(".two");
const threeBtn = document.querySelector(".three");
const fourBtn = document.querySelector(".four");
const fiveBtn = document.querySelector(".five");
const sixBtn = document.querySelector(".six");
const sevenBtn = document.querySelector(".seven");
const eightBtn = document.querySelector(".eight");
const nineBtn = document.querySelector(".nine");

// Other Buttons
const removeBtn = document.querySelector(".remove");
const clearBtn = document.querySelector(".clear");
const equalBtn = document.querySelector(".equal");
const plusMinusBtn = document.querySelector(".plusminus");
const commaBtn = document.querySelector(".comma");

// Other Elements
const resultEl = document.querySelector(".result");
const lastOpEl = document.querySelector(".lastOp");

/////////////////////
// Variables

let prevNumber = "";
let currentNumber = "";
let selectedOperator = "";
let equalBtnPressed = false;

/////////////////////
// Functions

const selectNumber = function (number) {
  if (currentNumber === "0" && number === "0") return;
  else if (currentNumber === "0") currentNumber = "";
  currentNumber += number;
  updateDisplay();
};

const removeNumber = function () {
  if (currentNumber.length > 1) currentNumber = currentNumber.slice(0, -1);
  else currentNumber = "0";

  updateDisplay();
};

const selectPlusMinus = function () {
  if (currentNumber != "0")
    currentNumber = String(
      parseFloat(currentNumber.replace(",", ".")) * -1
    ).replace(".", ",");
  updateDisplay();
};

const selectComma = function () {
  console.log(typeof currentNumber);
  if (!currentNumber.includes(",")) currentNumber += ",";
  updateDisplay();
};

const selectOperator = function (operator) {
  if (selectedOperator) {
    prevNumber = calculate().toLocaleString("de-DE");
  } else prevNumber = currentNumber;

  selectedOperator = operator;
  currentNumber = "0";
  updateDisplay();
};

const selectEqual = function () {
  if (!selectedOperator) return;
  equalBtnPressed = true;

  updateDisplay();
  currentNumber = "0";
  prevNumber = "0";
  equalBtnPressed = false;
};

const updateDisplay = function () {
  if (equalBtnPressed) {
    lastOpEl.textContent = `${prevNumber.toLocaleString("de-DE")} ${selectedOperator} ${currentNumber.toLocaleString("de-DE")} =`;
    resultEl.textContent = calculate().toLocaleString("de-DE");
  } else {
    lastOpEl.textContent = prevNumber
      ? `${prevNumber} ${selectedOperator}`
      : "";
    resultEl.textContent = currentNumber.toLocaleString("de-DE");
  }
};

const clearNumbers = function () {
  prevNumber = "";
  currentNumber = "0";
  selectedOperator = "";

  console.log(prevNumber);
  updateDisplay();
};

const calculate = function () {
  console.log(typeof prevNumber, typeof currentNumber);
  const num1 = parseFloat(prevNumber.replace(",", "."));
  const num2 = parseFloat(currentNumber.replace(",", "."));

  switch (selectedOperator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "x":
      return num1 * num2;
    case "/":
      return num1 / num2;
    default:
      return num2;
  }
};

/////////////////////
// Events

removeBtn.addEventListener("click", removeNumber);
clearBtn.addEventListener("click", clearNumbers);
equalBtn.addEventListener("click", selectEqual);
plusMinusBtn.addEventListener("click", selectPlusMinus);
commaBtn.addEventListener("click", selectComma);

zeroBtn.addEventListener("click", () => selectNumber("0"));
oneBtn.addEventListener("click", () => selectNumber("1"));
twoBtn.addEventListener("click", () => selectNumber("2"));
threeBtn.addEventListener("click", () => selectNumber("3"));
fourBtn.addEventListener("click", () => selectNumber("4"));
fiveBtn.addEventListener("click", () => selectNumber("5"));
sixBtn.addEventListener("click", () => selectNumber("6"));
sevenBtn.addEventListener("click", () => selectNumber("7"));
eightBtn.addEventListener("click", () => selectNumber("8"));
nineBtn.addEventListener("click", () => selectNumber("9"));

plusBtn.addEventListener("click", () => selectOperator("+"));
minusBtn.addEventListener("click", () => selectOperator("-"));
multiplyBtn.addEventListener("click", () => selectOperator("x"));
divideBtn.addEventListener("click", () => selectOperator("/"));
