
  <div> <label>How much money is in your account? </label> <input id="p"> </div>
  <div> <label>How much are you putting in? </label> <input id="d"> </div>

const rate = 0.01

function calculate() {
currentBalance = document.getElementById("p").value;

depositAmount = document.getElementById("d").value;
result = document.getElementById("result");
resultY = document.getElementById("resultY");

//Month: The equation is month = currentBalance * [[1 + (r/n)] ^ nt]
  month = (currentBalance * Math.pow((1 + (rate / (1 * 100))), (1/12 * 1))) + (depositAmount*1);
  let num = parseFloat(month).toFixed(2);
  result.innerHTML = "The total amount in one month " + num;

// Year: The equation is A = currentBalance * [[1 + (r/n)] ^ nt]
  year = (currentBalance * Math.pow((1 + (rate / (12 * 100))), (12 * 1))) + (depositAmount*12);
  let numY = parseFloat(year).toFixed(2);
  resultY.innerHTML = "The total amount in one year " + numY;
// toFixed is used for rounding the amount with two decimal places.
}


  <p id="result"></p>
  <p id="resultY"></p>
