// getting all the html variables
const word = document.querySelector(".word");
const hint = document.querySelector(".hint");
const time = document.querySelector(".time");
const input = document.querySelector(".card input");
const refresh = document.querySelector(".refresh");
const submit = document.querySelector(".submit");
const scores = document.querySelector(".score");

let correct; //to store the correct answer
let scored; // to store a boolean to check if refresh was clicked
let timer; //set the timer

let score = 0; // the counter for the score
const timerFunction = (maxTime) => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--;

      if (maxTime === 0) {
        alert(`time is up the correct word is ${correct}`);
        starting();
      }
      return (time.innerText = maxTime + "s");
    }
    clearInterval(timer);
  }, 1000);
};

const starting = () => {
  timerFunction(30);
  let random = words[Math.floor(Math.random() * words.length)]; //getting random object from the words;
  let shuflledArr = random.word.split("");
  correct = random.word.toLowerCase();

  for (let i = shuflledArr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); //getting random number
    [shuflledArr[i], shuflledArr[j]] = [shuflledArr[j], shuflledArr[i]]; //changing the element placement
  }
  shuflledArr = shuflledArr.join("");

  word.innerText = shuflledArr.toUpperCase();
  hint.innerText = random.hint;
};

starting();

const checkWord = () => {
  let inputValue = input.value.trim().toLowerCase();
  if (inputValue === "") {
    return;
  }
  if (inputValue === correct) {
    score += 10;
    starting();

    scores.innerText = score;
  } else {
    score -= 10 / 2;
    scores.innerText = score;
  }
  input.value = "";
};

refresh.addEventListener("click", () => {
  starting();
  scored = true;
  if (scored) {
    score -= 10;
    scores.innerText = score;
  }
});

submit.addEventListener("click", checkWord);
