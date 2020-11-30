const squares = document.querySelectorAll(".square");
const colorDisplay = document.querySelector("#colorDisplay");
const messageDisplay = document.querySelector("#message");
const h1 = document.querySelector("h1");
const resetButton = document.querySelector("#reset");
const modeButtons = document.querySelectorAll(".mode");
const buttons = document.querySelectorAll("button");

const userRecordDisplay = document.querySelector("#recordUser");
const recordDisplay = document.querySelector("#recordScore");

let numOfColors = 6;
let colors = [];
let winningColor;
let buttonsColor;

let streak;
let score = 0;
let user = 'anonymous';

let interval;

const init = () => {
   reset(numOfColors);
   setUpSquares();
   setUpButtons();
   fetchData();
}

const fetchData = () => {
   interval = setInterval(async () => {
      try {
         const res = await fetch('http://localhost:3000/?q=fetch')
         const data = await res.json();
         console.log(data)
         if (data.score > parseInt(recordDisplay.innerText)) {
            recordDisplay.innerText = data.score;
            userRecordDisplay.innerText = data.user;
         }
      } catch (e) {
         console.log('ERROR - CANNOT FETCH A RECORD!')
         clearInterval(interval);
         console.log('LOOKING FOR UPDATES STOPPED!')
      }
   }, 10000)

}

const sendScore = async () => {
   try {
      const res = await fetch('/ranking', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            user: user,
            score: score
         })
      })
      console.log('SUCCES');
   } catch (e) {
      console.log('ERROR', e)
   }

   window.location.replace('/ranking')
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

            score > parseInt(recordDisplay.innerText) ? sendScore() : null;
            score = 0;
            streak = false;

            this.style.opacity = 0;
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
      squares[i].style.opacity = 1;
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
      squares[i].style.opacity = 1;
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