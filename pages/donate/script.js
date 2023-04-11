function maxLengthCheck(object) {
  if (object.value.length > 4) object.value = object.value.slice(0, 4);
}

function changeRadio(radio) {
  document.getElementById("amountInput").value = radio.value;
  changeAmoutColor(radio.value);
}

function changeAmoutColor(value) {
  const nums = document.querySelector(".money").getElementsByTagName("li");
  for (let index = 0; index < nums.length; index++) {
    if (nums[index].innerText === value) nums[index].className = "active";
    else nums[index].className = "";
  }
}

function changeAmountInput(input) {
  const nums = document.querySelector(".money").getElementsByTagName("li");
  for (let index = 0; index < nums.length; index++) {
    if (nums[index].innerText === input.value) {
      nums[index].className = "active";
      document.getElementsByName("amount")[index].checked = true;
    } else {
      nums[index].className = "";
      document.getElementsByName("amount")[index].checked = false;
    }
  }
}

function clickOutside(e) {
  if (e.clientY > 310) closeMenu();
}

function openMenu() {
  document.getElementById("nav-header").style.display = "flex";
  document.getElementsByClassName("close__menu")[0].style.display = "flex";
  const elem = document.createElement("div");
  elem.className = "background";
  elem.style.height = document.body.height;
  document.body.append(elem);
  document.body.style.height = "100vh";
  document.body.style.overflow = "hidden";
  window.addEventListener("click", clickOutside);
}

function closeMenu() {
  document.getElementById("nav-header").style.display = "none";
  document.getElementsByClassName("background")[0].remove();
  document.body.style.height = "fit-content";
  document.body.style.overflowY = "scroll";
  window.removeEventListener("click", clickOutside);
}
