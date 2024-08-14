document.getElementById("submit").addEventListener("click", function () {
  const number = document.getElementById("number");
  const pin = document.getElementById("pin");
  if (number.value == "01712345678" && pin.value == "1234") {
    alert("Login Success");
    window.location.assign("/main.html");
  } else {
    alert("Ivalid Pin");
  }
});
