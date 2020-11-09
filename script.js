console.log("CONNECTED");

let numOfColors = 6;
let colors = [];
let winningColor;
let buttonsColor;
const squares = document.querySelectorAll(".square");
const colorDisplay = document.querySelector("#colorDisplay");
const messageDisplay = document.querySelector("#message");
const h1 = document.querySelector("h1");
const resetButton = document.querySelector("#reset");
const modeButtons = document.querySelectorAll(".mode");
const buttons = document.querySelectorAll("button");

//onLoad
init();

//defined functions

function init() {
  reset(numOfColors);
  setUpSquares();
  setUpButtons();
}

function setUpSquares() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
    squares[i].addEventListener("click", function () {
      // if (this.style.opacity === "1") {
      if (this.style.backgroundColor === winningColor) {
        changeSguaresColor(winningColor);
        buttonsColor = winningColor;
        buttonsColorWin();
        messageDisplay.textContent = "Correct!";
        resetButton.textContent = "PLAY AGAIN?"
      } else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try Again!";
      }
      // }
    })
  }
}

function setUpButtons() {
  for (let i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function () {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add('selected');
      this.textContent === "Easy" ? numOfColors = 3 : numOfColors = 6;
      reset(numOfColors);

      for (let j = 3; j < squares.length; j++) {
        if (colors[j]) {
          squares[j].style.display = "block";

          // if (squares[j].classList.contains("hide")) {
          //   squares[j].classList.remove("hide");
          //   squares[j].classList.add("show");
          // }
        } else {
          // squares[j].classList.remove("show");
          // squares[j].classList.add("hide");
          squares[j].style.display = "none";
        }
      }
    });
  }

  resetButton.addEventListener("click", function () {
    reset(numOfColors);
    this.style.color = "white";
    this.style.background = "steelblue";
  });
}


function reset(numOfColors) {
  colors = generateColors(numOfColors);
  winningColor = pickWinningColor();
  buttonsColor = "steelblue";
  resetButtonsColors();
  colorDisplay.textContent = winningColor;
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
    squares[i].classList.remove("animation");
  }
  h1.style.backgroundColor = "steelblue";
  messageDisplay.textContent = "";
  resetButton.textContent = "NEW COLORS";
}

function resetButtonsColors() {
  for (let k = 0; k < buttons.length; k++) {
    if (buttons[k].classList.contains('selected')) {
      buttons[k].style.color = 'white';
      buttons[k].style.backgroundColor = buttonsColor;
    } else {
      buttons[k].style.color = buttonsColor;
      buttons[k].style.backgroundColor = "white";
    }
    buttons[k].removeEventListener('mouseout', mouseOut);
    buttons[k].removeEventListener('mouseover', mouseOver);

    buttons[k].addEventListener('mouseout', mouseOut);
    buttons[k].addEventListener('mouseover', mouseOver);
  }
}

function buttonsColorWin() {
  for (let k = 0; k < buttons.length; k++) {
    if (buttons[k].classList.contains("selected")) {
      buttons[k].style.backgroundColor = buttonsColor;
      buttons[k].style.color = 'white';
    } else {
      buttons[k].style.color = buttonsColor;
      buttons[k].style.backgroundColor = 'white';
    }

  }
}


function mouseOver() {
  if (this.classList.contains('selected')) {
    this.style.color = 'white';
    this.style.backgroundColor = buttonsColor;
  } else {
    this.style.color = 'white';
    this.style.backgroundColor = buttonsColor;
  }
}

function mouseOut() {
  if (this.classList.contains('selected')) {
    this.style.color = 'white';
    this.style.backgroundColor = buttonsColor;
  } else {
    this.style.color = buttonsColor;
    this.style.backgroundColor = 'white';
  }
}


function changeSguaresColor(color) {
  for (let i = 0; i < colors.length; i++) {
    h1.style.backgroundColor = color;
    squares[i].style.backgroundColor = color;
    squares[i].classList.add("animation");
  }
  //changeButtonsColors(color);

}

function pickWinningColor() {
  let random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateColors(num) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

function randomColor() {
  let red = Math.floor(Math.random() * 256);
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256);
  return "rgb(" + red + ", " + green + ", " + blue + ")";
}