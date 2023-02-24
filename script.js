document
  .querySelector("body")
  .addEventListener("wheel", preventScroll, { passive: false });

function preventScroll(e) {
  e.preventDefault();
  e.stopPropagation();

  return false;
}

document.addEventListener(
  "touchmove",
  function (event) {
    event = event.originalEvent || event;

    if (event.scale > 1) {
      event.preventDefault();
    }
  },
  false
);
// запрет поворота экрана
// screen.addEventListener("orientationchange", function () {
//   console.log("The orientation of the screen is: " + screen.orientation);
//   screen.lockOrientation("landscape");
// });
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Сначала получаем высоту окна просмотра
// и умножаем ее на 1%
let vh = window.innerHeight * 0.01;

// Затем устанавливаем значение свойства переменной --vh
// для корневого элемента
document.documentElement.style.setProperty("--vh", `${vh}px`);
// слушаем событие resize
window.addEventListener("resize", () => {
  // получаем текущее значение высоты
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});
//////////////////////////////выделение навигации при загрузке страницы//////////////////////////////////////////
window.onload = changeOnLoad;
const tar = document.querySelectorAll(".panel__nav");

function changeOnLoad() {
  const a = setTimeout(function () {
    tar.forEach((el) => el.classList.remove("panel__nav"));
    tar.forEach((el) => el.classList.add("panel__nav-active"));
  }, 400);
  const b = setTimeout(function () {
    tar.forEach((el) => el.classList.remove("panel__nav-active"));
    tar.forEach((el) => el.classList.add("panel__nav"));
  }, 1000);
  const c = setTimeout(function () {
    tar.forEach((el) => el.classList.remove("panel__nav"));
    tar.forEach((el) => el.classList.add("panel__nav-active"));
  }, 1400);
  const d = setTimeout(function () {
    tar.forEach((el) => el.classList.remove("panel__nav-active"));
    tar.forEach((el) => el.classList.add("panel__nav"));
  }, 2000);
}
///////////////////////////////////////////отправка данных в телеграмм////////////////////////////////////////////

const popUp = document.createElement("div");
popUp.className = "modal";

const form = document.querySelector("form");
form.className = "form";

const btn = document.querySelector(".btn");

const closeBtn = document.createElement("button");
closeBtn.className = "closeModalBtn";
closeBtn.type = "button";

const img = document.createElement("img");
img.src = "./images/close.svg";
img.width = "20";
img.height = "20";

const sendBtn = document.querySelector(".sendBtn");

const TOKEN = "5856059976:AAHi68Tu9T8jSghs6j6tlfVk1dZWWPw-PGc";

const CHAT_ID = "-1001695833016";

const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

closeBtn.append(img);
form.append(closeBtn);
popUp.append(form);
document.body.append(popUp);

btn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
popUp.addEventListener("click", closeModal);
form.addEventListener("click", (event) => event.stopPropagation());

function openModal() {
  popUp.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeModal() {
  popUp.style.display = "none";
  // document.body.style.overflow = "initial";
}

form.addEventListener("submit", function (el) {
  el.preventDefault();

  const checkState = [...document.querySelectorAll(".checkbox:checked")].map(
    (el) => el.value
  );

  let message = `<b>ЗАЯВКА С САЙТА</b>\n\n`;
  message += `<b>Модель:  </b>${this.model.value}\n`;
  message += `<b>Марка:  </b>${this.mark.value}\n`;
  message += `<b>Пробег:  </b>${Math.round(this.run.value)}\n`;
  message += `<b>Год выпуска:  </b>${this.year.value}\n`;
  message += `<b>Состояние: </b>${checkState}\n`;
  message += `<b>Имя:  </b>${this.fName.value}\n`;
  message += `<b>Телефон:  </b>${this.tel.value}`;
  axios.post(URL, {
    chat_id: CHAT_ID,
    parse_mode: "html",
    text: message,
  });
  // form.reset();
  closeModal();
  form.submit();
});

///////////////////////////////////////////модальное окно, форма-квиз, валидация////////////////////////////

let currentTab = 0;

showTab(currentTab);

function showTab(n) {
  const x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
    document.getElementById("nextBtn").style.display = "inline";
  } else {
    sendBtn.style.display = "none";
    document.getElementById("prevBtn").style.display = "inline";
    document.getElementById("nextBtn").style.display = "inline";
  }
  if (n == x.length - 1) {
    document.getElementById("nextBtn").style.display = "none";
    sendBtn.style.display = "inline-block";
  } else {
    document.getElementById("nextBtn").innerHTML = "ВПЕРЕД";
  }
  fixStepIndicator(n);
}

function nextPrev(n) {
  const x = document.getElementsByClassName("tab");
  if (n == 1 && !validateForm()) return false;
  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  showTab(currentTab);
}

function validateForm() {
  let x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  for (i = 0; i < y.length; i++) {
    if (y[i].value === "") {
      y[i].className += " invalid";
      valid = false;
    }
  }
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid;
}

function fixStepIndicator(num) {
  let i,
    bolProgres = document.getElementsByClassName("step");
  for (i = 0; i < bolProgres.length; ++i) {
    bolProgres[i].className = bolProgres[i].className.replace(" active", "");
  }
  bolProgres[num].className += " active";
}

/***/ /////////////////////////////////////////////поле с номером тел и инпуты type='range'////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
  let input = document.querySelector(".maskphone");
  input.addEventListener("input", mask);
  input.addEventListener("focus", mask);
  input.addEventListener("blur", mask);

  function mask(event) {
    let blank = "+_ (___) ___-__-__";
    let i = 0;
    let val = this.value.replace(/\D/g, "").replace(/^8/, "7");

    this.value = blank.replace(/./g, function (char) {
      if (/[_\d]/.test(char) && i < val.length) return val.charAt(i++);

      return i >= val.length ? "" : char;
    });

    if (event.type == "blur") {
      if (this.value.length == 2) this.value = "";
    } else {
      setCursorPosition(this, this.value.length);
    }
  }

  function setCursorPosition(elem, pos) {
    elem.focus();

    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
      return;
    }

    if (elem.createTextRange) {
      let range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select();
      return;
    }
  }
});

///////////////////////////////////////////классы/////////////////////////////////////////////////////

const win = window,
  doc = document;

function hasClass(el, cls) {
  return el.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}

function addClass(el, cls) {
  if (!this.hasClass(el, cls)) {
    el.className += " " + cls;
  }
}

function removeClass(el, cls) {
  if (this.hasClass(el, cls)) {
    let reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    el.className = el.className.replace(reg, " ");
  }
}

//////////////////////////////////////// элементы///////////////////////////////////////////////////

const site = doc.getElementsByClassName("site-wrap")[0];
const wrap = doc.getElementsByClassName("panel-wrap")[0];

const panel = doc.getElementsByClassName("panel");

const zoom = doc.getElementsByClassName("js-zoom");

const nav_up = doc.getElementsByClassName("js-up"),
  nav_left = doc.getElementsByClassName("js-left"),
  nav_right = doc.getElementsByClassName("js-right"),
  nav_down = doc.getElementsByClassName("js-down");

const animation = doc.getElementsByClassName("js-animation");

////////////////////////////////////переходы между секциями////////////////////////////////////////////
let pos_x = 0,
  pos_y = 0;

function setPos() {
  wrap.style.transform =
    "translateX(" + pos_x + "00%) translateY(" + pos_y + "00%)";
  setTimeout(function () {
    removeClass(wrap, "animate");
  }, 800);
}

setPos();

function moveUp() {
  addClass(wrap, "animate");
  pos_y++;
  setPos();
}

function moveLeft() {
  addClass(wrap, "animate");
  pos_x++;
  setPos();
}

function moveRight() {
  addClass(wrap, "animate");
  pos_x--;
  setPos();
}

function moveDown() {
  addClass(wrap, "animate");
  pos_y--;
  setPos();
}

for (let x = 0; x < nav_up.length; x++) {
  nav_up[x].addEventListener("click", moveUp);
}

for (let x = 0; x < nav_left.length; x++) {
  nav_left[x].addEventListener("click", moveLeft);
}

for (let x = 0; x < nav_right.length; x++) {
  nav_right[x].addEventListener("click", moveRight);
}

for (let x = 0; x < nav_down.length; x++) {
  nav_down[x].addEventListener("click", moveDown);
}

///////////////////////////////////////////// анимация ////////////////////////////////////////////

for (let x = 0; x < animation.length; x++) {
  (function (_x) {
    animation[_x].addEventListener("click", function () {
      toggleAnimation(_x);
    });
  })(x);
}

function toggleAnimation(i) {
  for (let x = 0; x < animation.length; x++) {
    if (i === x) {
      addClass(animation[x], "active");
      addClass(wrap, animation[x].getAttribute("data-animation"));
    } else {
      removeClass(animation[x], "active");
      removeClass(wrap, animation[x].getAttribute("data-animation"));
    }
  }
}

for (let x = 0; x < zoom.length; x++) {
  zoom[x].addEventListener("click", zoomOut);
}

function zoomOut(e) {
  e.stopPropagation();
  addClass(site, "show-all");
  for (let x = 0; x < panel.length; x++) {
    (function (_x) {
      panel[_x].addEventListener("click", setPanelAndZoom);
    })(x);
  }
}

function setPanelAndZoom(e) {
  (pos_x = -e.target.getAttribute("data-x-pos")),
    (pos_y = e.target.getAttribute("data-y-pos"));
  setPos();
  zoomIn();
}

function zoomIn() {
  for (let x = 0; x < panel.length; x++) {
    panel[x].removeEventListener("click", setPanelAndZoom);
  }
  removeClass(site, "show-all");
}

// window.addEventListener("mousewheel", function (e) {
//   if (e.ctrlKey) {
//     e.preventDefault();
//     return false;
//   }
// });
