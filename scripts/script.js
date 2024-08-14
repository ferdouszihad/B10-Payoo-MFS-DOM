const globalpin = "1234";
let isBonusCollected = false;
function get(id) {
  return document.getElementById(id);
}
function getElementValue(id) {
  return parseFloat(get(id).innerText);
}
function getInputValue(id) {
  return parseFloat(get(id).value);
}
function getInputText(id) {
  return get(id).value;
}
function setBalance(value) {
  get("balance").innerText = value.toFixed(2);
}
function hideFeatures() {
  get("addmoney").classList.add("hidden");
  get("transfer").classList.add("hidden");
  get("cashout").classList.add("hidden");
  get("get-bonus").classList.add("hidden");
  get("transaction-container").classList.add("hidden");
  get("paybill").classList.add("hidden");
}

get("cashout-btn").addEventListener("click", function () {
  hideFeatures();
  get("cashout").classList.remove("hidden");
});

get("cashout-submit-btn").addEventListener("click", function () {
  const acc = getInputText("cashout-acc");
  const amount = getInputValue("cashout-amount");
  const pin = getInputText("cashout-pin");
  const balance = getElementValue("balance");

  if (acc.length != 11) {
    alert("Invalid Account Number. Account number will be 11 Digit");
    return;
  }

  if (isNaN(amount)) {
    alert("Invalid Amount");
    return;
  }
  if (amount > balance) {
    alert("Low Balance");
    return;
  }
  if (pin.length != 4 || pin != globalpin) {
    alert("Invalid Pin");
    return;
  }
  const totalCashout = amount + amount * 0.015;
  setBalance(balance - totalCashout);
  alert(" Cashout Successfull");
  get("transaction").innerHTML += `
    <p class="m-3 p-2 text-sm bg-green-200">${amount} Taka Cashout Successfull to Agent ${acc} : ${new Date()}</p>
`;
});

get("addmoney-btn").addEventListener("click", function () {
  hideFeatures();
  get("addmoney").classList.remove("hidden");
});

get("addmoney-submit-btn").addEventListener("click", function () {
  const bankName = getInputText("addmoney-bank");
  const amount = getInputValue("addmoney-amount");
  const pin = getInputText("addmoney-pin");
  const balance = getElementValue("balance");
  const acc = getInputText("addmoney-acc");

  if (acc.length != 11) {
    alert("Invalid Account Number.Number should be 11 Digit");
    return;
  }

  if (pin.length != 4 || pin != globalpin) {
    alert("Invalid Pin");
    return;
  }
  const newAmount = balance + amount;

  setBalance(newAmount);

  alert(" Add Money Successfull");
  get("transaction").innerHTML += `
    <p class="m-3 p-2 text-sm bg-green-200">${amount}  Taka Added  from ${bankName} system , Acc:${acc} Successfull to Agent ${acc} : ${new Date()}</p>
`;
});

get("paybill-btn").addEventListener("click", function () {
  hideFeatures();
  get("paybill").classList.remove("hidden");
});

get("paybill-submit-btn").addEventListener("click", function () {
  const bankName = getInputText("paybill-option");
  const amount = getInputValue("paybill-amount");
  const pin = getInputText("paybill-pin");
  const balance = getElementValue("balance");
  const acc = getInputText("paybill-acc");

  if (acc.length != 11) {
    alert("Invalid Account Number.Number should be 11 Digit");
    return;
  }

  if (pin.length != 4 || pin != globalpin) {
    alert("Invalid Pin");
    return;
  }

  const remaining = balance - amount;
  setBalance(remaining);

  alert(" Bill Pay  Successfull");
  get("transaction").innerHTML += `
    <p class="m-3 p-2 text-sm bg-green-200">${amount}  Taka Paid to   ${bankName} Bill , Acc:${acc} Successfull to Biller ${acc} : ${new Date()}</p>
`;
});

get("transfer-btn").addEventListener("click", function () {
  hideFeatures();
  get("transfer").classList.remove("hidden");
});

get("transfer-submit-btn").addEventListener("click", function () {
  const acc = getInputText("transfer-acc");
  const amount = getInputValue("transfer-amount");
  const pin = getInputText("transfer-pin");
  const balance = getElementValue("balance");

  if (acc.length != 11) {
    alert("Invalid Account Number.  Number should be 11 digit");
    return;
  }

  if (pin.length != 4 || pin.value != globalpin) {
    alert("Invalid Pin");
    return;
  }
  if (isNaN(amount)) {
    alert("Invalid Amount");
    return;
  }
  if (parseFloat(amount.value) > parseFloat(balance.innerText)) {
    alert("Low Balance");
    return;
  }

  balance.innerText = (
    parseFloat(balance.innerText) - parseFloat(amount.value)
  ).toFixed(2);
  alert("Transfer Money Successfull");
  get("transaction").innerHTML += `
    <p class="m-3 p-2 text-sm bg-green-200">${
      amount.value
    }  Taka Transfer  to Acc:${acc.value} : ${new Date()}</p>
`;
});

get("get-bonus-btn").addEventListener("click", function () {
  hideFeatures();
  get("get-bonus").classList.remove("hidden");
});

get("get-bonus-submit-btn").addEventListener("click", function (e) {
  if (isBonusCollected == true) {
    return alert("You Allready Collected");
  }
  const cupon = getInputText("get-bonus-cupon");
  let balance = getElementValue("balance");

  if (cupon == "NEW24") {
    const newBalance = 2000 + balance;
    setBalance(newBalance);
    alert("Bonus Added");
    isBonusCollected = true;
    get("transaction").innerHTML += `
    <p class="m-3 p-2 text-sm bg-green-200">${200}  Taka Added  From Bonus : ${new Date()}</p>`;
  } else {
    alert("WRong Coupon");
  }
});

get("transaction-btn").addEventListener("click", function () {
  hideFeatures();
  get("transaction-container").classList.remove("hidden");
});

// document.addEventListener("mousemove", function (e) {
//   if (e.clientY <= 10 && isBonusCollected == false) {
//     // alert("are you want to Leave?? You have not collected your Bonus Yet");
//     get("my_modal_2").showModal();
//   }
// });
