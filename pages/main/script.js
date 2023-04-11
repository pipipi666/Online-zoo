window.onresize = function () {
  location.reload();
};
let wasLeft = false;
let wasRight = false;
let isScroll = false;
const carouselTablet = document.getElementsByClassName("gallery__images")[0];
const nodesTablet = document.getElementsByClassName("gallery__img");
if (carouselTablet.clientWidth === 600) {
  while (nodesTablet.length > 4) {
    nodesTablet[nodesTablet.length - 1].remove();
  }
}

let isCardsScroll = false;
let cardsId = 0;

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

function switchPetsRight() {
  if (isScroll) return;
  isScroll = true;
  const carousel = document.getElementsByClassName("gallery__images")[0];
  const nodes = document.getElementsByClassName("gallery__img");
  const len = carousel.clientWidth === 600 ? 4 : 6;
  const leftOffset =
    carousel.clientWidth === 1160
      ? 1185
      : carousel.clientWidth === 940
      ? 1027
      : carousel.clientWidth === 600
      ? 628
      : 0;
  if (wasLeft) {
    while (nodes.length > len) {
      nodes[nodes.length - 1].remove();
    }
  }
  let images = [];
  for (let index = 0; index < len; index++) {
    images.push(nodes[index].cloneNode(true));
  }
  shuffle(images);
  for (let index = 0; index < len; index++) {
    carousel.append(images[index]);
  }
  carousel.scrollBy({
    top: 0,
    left: leftOffset,
    behavior: "smooth",
  });
  wasRight = true;
  wasLeft = false;
  setTimeout(() => {
    isScroll = false;
  }, 600);
}

function switchPetsLeft() {
  if (isScroll) return;
  isScroll = true;
  const carousel = document.getElementsByClassName("gallery__images")[0];
  const nodes = document.getElementsByClassName("gallery__img");
  const len = carousel.clientWidth === 600 ? 4 : 6;
  const leftOffset =
    carousel.clientWidth === 1160
      ? 1185
      : carousel.clientWidth === 940
      ? 1027
      : carousel.clientWidth === 600
      ? 628
      : 0;
  if (wasRight) {
    while (nodes.length > len) {
      nodes[0].remove();
    }
  }
  let images = [];
  for (let index = 0; index < len; index++) {
    images.push(nodes[index].cloneNode(true));
  }
  shuffle(images);
  for (let index = 0; index < len; index++) {
    carousel.prepend(images[index]);
  }
  carousel.scrollLeft =
    carousel.clientWidth === 1160
      ? 1185
      : carousel.clientWidth === 940
      ? 940
      : carousel.clientWidth === 600
      ? 600
      : 0;
  carousel.scrollBy({
    top: 0,
    left: 0 - leftOffset,
    behavior: "smooth",
  });
  wasLeft = true;
  wasRight = false;
  setTimeout(() => {
    isScroll = false;
  }, 600);
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex].innerHTML, array[randomIndex].innerHTML] = [
      array[randomIndex].innerHTML,
      array[currentIndex].innerHTML,
    ];
  }
  return array;
}

function rangeInput(range) {
  if (window.innerWidth <= 1280) {
    document.getElementById("range").max = 8;
    switchCards(range.value, 322);
  } else {
    document.getElementById("range").max = 7;
    switchCards(range.value, 297);
  }
}

function switchCards(value, offset) {
  const cards = document.getElementById("cards__wrapper");
  const newId = value;
  if (newId > cardsId) {
    cards.scrollTo({
      top: 0,
      left: offset * value,
      behavior: "smooth",
    });
  }
  if (newId < cardsId) {
    cards.scrollTo({
      top: 0,
      left: offset * value,
      behavior: "smooth",
    });
  }
  cardsId = newId;
}

function openModal(elem) {
  if (document.body.clientWidth < 1000) {
    if (document.getElementById("modal-wrapper").children.length > 1) {
      document.getElementById("modal-wrapper").children[0].remove();
    }
    document.getElementById("modal").style.display = "flex";
    const el = elem.cloneNode(true);
    document.getElementById("modal-wrapper").prepend(el);
    el.style.height = "391px";
    el.style.width = "267px";
    el.children[0].style.height = "387px";
    el.children[0].style.width = "263px";
    el.style.marginTop = "8px";
    document
      .getElementById("modal")
      .addEventListener("click", (e) => closePopup(e));
  }
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
  document
    .getElementById("modal")
    .removeEventListener("click", (e) => closePopup(e));
}

function closePopup(e) {
  if (e.target === e.currentTarget) closeModal();
}
