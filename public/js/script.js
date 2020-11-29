const squares = document.querySelectorAll(".square");
const colorDisplay = document.querySelector("#colorDisplay");
const messageDisplay = document.querySelector("#message");
const h1 = document.querySelector("h1");
const resetButton = document.querySelector("#reset");
const modeButtons = document.querySelectorAll(".mode");
const buttons = document.querySelectorAll("button");
const recordDisplay = document.querySelector("#absolute")

let numOfColors = 6;
let colors = [];
let winningColor;
let buttonsColor;

let streak = true;
let score = 0;
let user = 'anonymous';

const init = () => {
   reset(numOfColors);
   setUpSquares();
   setUpButtons();
}

const sendScore = () => {
   fetch('/', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         user: user, score: score
      })
   });
}


const setUpSquares = () => {
   for (let square of squares) {
      square.style.backgroundColor = colors[square];
      square.addEventListener("click", function () {
         if (this.style.backgroundColor === winningColor) {
            streak ? score += 1 : null;
            changeSguaresColor(winningColor);
            buttonsColor = winningColor;
            buttonsColorWin();
            messageDisplay.textContent = "Correct!";
            resetButton.textContent = "PLAY AGAIN?"
         } else {

            score > parseInt(recordDisplay.textContent) ? sendScore() : score = 0;
            streak = false;

            this.style.backgroundColor = "#232323";
            messageDisplay.textContent = "Try Again!";
         }
      })
   }
}

const setUpButtons = () => {
   for (let modeBtn of modeButtons) {
      modeBtn.addEventListener('mouseout', mouseOut);
      modeBtn.addEventListener('mouseover', mouseOver);
      modeBtn.addEventListener("click", function () {
         for (let modeBtn of modeButtons) {
            modeBtn.classList.remove("selected");
         }
         this.classList.add('selected');
         this.textContent === "Easy" ? numOfColors = 3 : numOfColors = 6;
         reset(numOfColors);

         for (let j = 3; j < squares.length; j++) {
            colors[j] ? squares[j].style.display = "block" : squares[j].style.display = "none"
         }
      });
   }
   resetButton.addEventListener('mouseout', mouseOut);
   resetButton.addEventListener('mouseover', mouseOver);
   resetButton.addEventListener("click", function () {
      reset(numOfColors);
      this.style.color = "white";
      this.style.background = "steelblue";
   });
}

const reset = (numOfColors) => {
   streak = true;
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

const resetButtonsColors = () => {
   for (let button of buttons) {
      if (button.classList.contains('selected')) {
         button.style.color = 'white';
         button.style.backgroundColor = buttonsColor;
      } else {
         button.style.color = buttonsColor;
         button.style.backgroundColor = "white";
      }
   }
}

const buttonsColorWin = () => {
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

const changeSguaresColor = (color) => {
   for (let i = 0; i < colors.length; i++) {
      h1.style.backgroundColor = color;
      squares[i].style.backgroundColor = color;
      squares[i].classList.add("animation");
   }
}

const pickWinningColor = () => {
   let random = Math.floor(Math.random() * colors.length);
   return colors[random];
}

const generateColors = (num) => {
   let arr = [];
   for (let i = 0; i < num; i++) {
      arr.push(randomColor());
   }
   return arr;
}

const randomColor = () => {
   let red = Math.floor(Math.random() * 256);
   let green = Math.floor(Math.random() * 256);
   let blue = Math.floor(Math.random() * 256);
   return "rgb(" + red + ", " + green + ", " + blue + ")";
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
//onLoad
init();