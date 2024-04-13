const productDetails = []; // Array to store user info objects
let grandTotal = 0;
let totalAmount = 0;
let totalTravelFee = 0;
const form = document.getElementById("myForm");
const submit = document.getElementById("submit");
const calculate = document.getElementById("calculate");
var a = [
  "",
  "one ",
  "two ",
  "three ",
  "four ",
  "five ",
  "six ",
  "seven ",
  "eight ",
  "nine ",
  "ten ",
  "eleven ",
  "twelve ",
  "thirteen ",
  "fourteen ",
  "fifteen ",
  "sixteen ",
  "seventeen ",
  "eighteen ",
  "nineteen ",
];
var b = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];

function inWords(num) {
  if ((num = num.toString()).length > 9) return "overflow";
  n = ("000000000" + num)
    .substr(-9)
    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return;
  var str = "";
  str +=
    n[1] != 0
      ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "crore "
      : "";
  str +=
    n[2] != 0
      ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "lakh "
      : "";
  str +=
    n[3] != 0
      ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "thousand "
      : "";
  str +=
    n[4] != 0
      ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "hundred "
      : "";
  str +=
    n[5] != 0
      ? (str != "" ? "and " : "") +
        (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) +
        "only "
      : "";
  return str;
}

form.addEventListener("submit", function (event) {
  // Prevent default form submission behavior
  event.preventDefault();

  const productName = document.getElementById("productName").value;
  let quantity = document.getElementById("quantity").value;
  const price = Number(document.getElementById("price").value);
  const hsnCode = document.getElementById("hsn_code").value;
  let travelFee = Number(document.getElementById("travelFee").value);
  // console.log(travelFee);
  const unit = document.getElementById("unit").value;
  console.log(unit);
  //For unit based test code
  if (unit == "ton"){ quantity = quantity * 1000;}
  const taxableAmount = price * quantity;
  console.log(quantity);

  // Add product info to array
  productDetails.push({
    productName,
    hsnCode,
    quantity,
    price,
    taxableAmount,
    travelFee,
  });

  // Clear form fields
  form.reset();
  

  console.table(JSON.stringify(productDetails));
  console.log(productDetails);
});

//Event listener for claculating data after been entered
calculate.addEventListener("click", function (event) {
  // Prevent default form submission behavior
  event.preventDefault();
  //To get Total of taxable amount form the array
  if (productDetails.length > 0) {
    productDetails.forEach((element) => {
      totalAmount += element.taxableAmount;
      totalTravelFee += element.travelFee;
      // console.log(totalAmount, totalTravelFee);
    });
    console.log("Total amount: " + totalAmount);

    netAmount = totalAmount + totalTravelFee;
    const gst = netAmount * 0.18;
    const sgst = gst / 2;
    const cgst = gst / 2;
    console.log("SGST :", sgst, "CGST", cgst);
    //Round-off grand total value
    grandTotal = Math.ceil(gst + totalAmount + totalTravelFee);
    console.log("Grand Total: ", grandTotal);

    roundOffValue = grandTotal - (gst + totalAmount + totalTravelFee);
    console.log("Round off +: ", roundOffValue);
    //Grand Total value in words
    const grandTotalValueInWords = inWords(grandTotal);
    console.log("Grand Total in words: ", inWords(grandTotal));
    productDetails.forEach(value=>{
      value.grandTotal = grandTotal;
      value.sgst = sgst;
      value.cgst = cgst;
      value.grandTotalValueInWords = grandTotalValueInWords;
      value.netAmount = netAmount;
      value.roundOffValue = roundOffValue;
      value.travelFee = totalTravelFee;
    })
  } else {
    alert("Enter details first!!");
  }
});

//print functionalty
const print = document.getElementById("print");
const test = document.getElementById("test_print").contentWindow;
print.addEventListener("click", function (e) {
  // test.focus();
  localStorage.setItem("productDetails",JSON.stringify(productDetails))
  window.location.href = "page.html";

  // test.print();
  // console.log(test);
});


//Push data to another page to display a pdf

//Local storage code here for store cache of users company details and clients details
