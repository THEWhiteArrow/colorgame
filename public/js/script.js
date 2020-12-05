const squares = document.querySelectorAll('.square');
const colorDisplay = document.querySelector('#colorDisplay');
const messageDisplay = document.querySelector('#message');
const h1 = document.querySelector('h1');
const resetButton = document.querySelector('#reset');
const modeButtons = document.querySelectorAll('.mode');
const buttons = document.querySelectorAll('button');

const content = document.querySelectorAll('.content');
const saveBtn = document.querySelector('.save');
const userRecordDisplay = document.querySelector('#recordUser');
const recordDisplay = document.querySelector('#recordScore');

let numOfColors = 6;
let colors = [];
let winningColor;
let buttonsColor;

let streak;
let score = 0;
let interval;
let form;
let mode = 'hard';
let removable = true;

const init = () => {
   reset(numOfColors);
   setUpSquares();
   setUpButtons();
   fetchData();
}


const setUpSquares = async () => {
   for (let square of squares) {
      square.style.backgroundColor = colors[square];
      square.addEventListener('mouseenter', function () {
         this.classList.add('entice');
         setTimeout(() => { this.classList.remove('entice'); }, 200)
      })
      square.addEventListener('click', function () {
         if (this.style.backgroundColor === winningColor) {
            if (streak) {
               score += 1;
               messageDisplay.textContent = `Correct! ${score}`;
               resetButton.textContent = 'KEEP GOING?';
               buttonsColor = winningColor;
               buttonsColorWin();
            } else {
               resetButton.textContent = 'PLAY AGAIN?';
               markOutSaveBtn();
            }
            changeSguaresColor(winningColor);
         } else {
            score > parseInt(recordDisplay.innerText) ? appendBlur() : null;
            streak = false;
            markOutSaveBtn();
            this.style.opacity = 0;
            messageDisplay.textContent = 'Try Again!';
         }
      })
   }
}

const markOutSaveBtn = () => {
   saveBtn.classList.add('markOut');
   setTimeout(() => {

      saveBtn.classList.remove('markOut');
   }, 200)
}

const setUpButtons = () => {
   for (let modeBtn of modeButtons) {
      modeBtn.addEventListener('mouseout', mouseOut);
      modeBtn.addEventListener('mouseover', mouseOver);
      modeBtn.addEventListener('click', function () {
         for (let modeBtn of modeButtons) {
            modeBtn.classList.remove('selected');
         }
         this.classList.add('selected');
         if (this.textContent === 'Easy') {
            if (mode !== 'easy') {
               score = 0;
               mode = 'easy';
               messageDisplay.innerText = `${score}`
            }
            numOfColors = 3;
         } else {
            if (mode !== 'hard') {
               score = 0;
               messageDisplay.innerText = `${score}`
               mode = 'hard';
            }
            numOfColors = 6;
         }
         reset(numOfColors);

         for (let j = 3; j < squares.length; j++) {
            colors[j] ? squares[j].style.display = 'block' : squares[j].style.display = 'none'
         }
      });
   }
   resetButton.addEventListener('mouseout', mouseOut);
   resetButton.addEventListener('mouseover', mouseOver);
   resetButton.addEventListener('click', function () {
      reset(numOfColors);
      this.style.color = 'white';
      this.style.background = 'steelblue';
   });
   saveBtn.addEventListener('click', appendBlur);
}

const reset = (numOfColors) => {
   streak === false ? score = 0 : null;
   streak = true;
   colors = generateColors(numOfColors);
   winningColor = pickWinningColor();
   buttonsColor = 'steelblue';
   resetButtonsColors();
   colorDisplay.textContent = winningColor;
   for (let i = 0; i < squares.length; i++) {
      squares[i].style.backgroundColor = colors[i];
      squares[i].style.opacity = 1;
      squares[i].classList.remove('animation');
   }
   h1.style.backgroundColor = 'steelblue';
   messageDisplay.textContent = `${score}`;
   resetButton.textContent = 'NEW COLORS';
}

const resetButtonsColors = () => {
   for (let button of buttons) {
      if (button.classList.contains('selected')) {
         button.style.color = 'white';
         button.style.backgroundColor = buttonsColor;
      } else {
         button.style.color = buttonsColor;
         button.style.backgroundColor = 'white';
      }
   }
   messageDisplay.style.color = 'steelblue';
}

const buttonsColorWin = () => {
   for (let k = 0; k < buttons.length; k++) {
      if (buttons[k].classList.contains('selected')) {
         buttons[k].style.backgroundColor = buttonsColor;
         buttons[k].style.color = 'white';
      } else {
         buttons[k].style.color = buttonsColor;
         buttons[k].style.backgroundColor = 'white';
      }

   }

   h1.style.backgroundColor = buttonsColor;
   messageDisplay.style.color = buttonsColor;
}

const changeSguaresColor = (color) => {
   for (let i = 0; i < colors.length; i++) {
      squares[i].style.backgroundColor = color;
      squares[i].style.opacity = 1;
      squares[i].classList.add('animation');
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
   return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
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

const toggleComponents = () => {
   for (let i of content) i.classList.toggle('disable')
}

const manageOldCards = (action, ...arguments) => {
   for (let arg of arguments) {
      const items = document.querySelectorAll(arg);
      if (action === 'hide' || action === 'show') {
         for (let item of items) item.classList.toggle('hide')
      } else {
         for (let item of items) item.remove();
      }
   }
}

const displayError = (msg) => {
   manageOldCards('delete', '.error');
   const error = document.createElement('div');

   error.innerHTML = [
      `
         <p>ERROR:  ${msg}</p>
         <button id="closeError">
         <sup>X</sup></button>`
   ];
   error.classList.add('error', 'content');
   document.body.append(error);

   error.addEventListener('click', function () {
      fadeOutHideError(this);
   })
   setTimeout(() => {
      fadeOutHideError(error);

   }, 7000);
}

const fadeOutHideError = (el) => {
   el.style.opacity = '0';
   setTimeout(() => {
      el.remove();
   }, 700);
}

const onFormSubmit = async function (e) {
   e.preventDefault();
   const inputVal = form.elements.user.value;
   const user = inputVal;
   sendScore(user);
}

const appendBlur = () => {
   if (score > 0) {
      toggleComponents();

      const formula = document.createElement('div');
      formula.classList.add('formula')
      formula.innerHTML = [`
      <button class="btnForm">X</button>
      <form action='/ranking'>
         <input type='text' name='user' placeholder='Your nickname'>
         <button class="btnForm" style="height:3rem;font-size:1.5rem">Sumbit The Record!</button>
      </form>
      `];


      document.body.append(formula);
      form = document.querySelector('form');
      document.querySelector('.btnForm').addEventListener('click', function () {
         if (removable) {
            removable = false;
            toggleComponents();
            form.removeEventListener('submit', onFormSubmit);
            formula.style.transform = 'scale(0.01)';
            formula.style.opacity = '0';
            setTimeout(() => {
               formula.remove();
               removable = true;
            }, 700)
         }
      })
      form.addEventListener('submit', onFormSubmit);
   } else {
      displayError('You need to score over 0 !')
   }
}

const sendScore = async (user) => {
   try {
      const res = await fetch('/ranking', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            user: user || `player${Math.floor(Math.random() * 1000) + 1}_`,
            score: score,
            mode: mode
         })
      })
      console.log('SUCCES');
   } catch (e) {
      console.log('ERROR', e)
   }
   window.location.replace('/ranking');
}

const fetchData = () => {
   interval = setInterval(async () => {
      try {
         const res = await fetch('/?q=fetch')
         const data = await res.json();
         console.log(data)
         if (data.score !== parseInt(recordDisplay.innerText)) {
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
//onLoad
init();