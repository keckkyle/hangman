
let word = '',
    guessesLeft = 10,
    prevGuesses = [],
    messageDisplay = document.getElementById('message'),
    endGame = document.getElementById('endGame'),
    playAgain = document.getElementById('playAgain'),
    resetBtn = document.getElementById('resetGame');


function reset() {
    guessesLeft = 10
    prevGuesses = []
    document.getElementById('word').innerHTML = ''
    displayGuessesLeft(guessesLeft)
    wordSelect()
    answer()
    document.querySelectorAll('#buttons li').forEach(function(button){button.classList.remove('clicked')})
    messageDisplay.innerHTML = "<p>Pick a letter.<p>"
    endGame.style.display = 'none';
}

function wordSelect(){
    let countries = ['argentina', 'australia', 'azerbaijan', 'belgium', 'belize', 'botswana', 'brazil', 'chile', 'china', 'cuba', 'denmark', 'djibouti', 'dominica', 'ecuador', 'egypt', 'ethiopia', 'fiji', 'finland', 'france', 'ghana', 'greece', 'guatemala', 'haiti', 'honduras', 'hungary', 'india', 'indonesia', 'ireland', 'jamaica', 'japan', 'jordan', 'kenya', 'korea', 'kyrgyzstan', 'laos', 'liechtenstein', 'luxembourg', 'malaysia', 'mexico', 'mozambique', 'netherlands', 'nicaragua', 'norway', 'oman', 'pakistan', 'paraguay', 'peru', 'qatar', 'russia', 'rwanda', 'seychelles', 'spain', 'switzerland', 'thailand', 'turkey', 'turkmenistan', 'ukraine', 'uruguay', 'uzbekistan', 'venezuela', 'vietnam', 'zimbabwe']
    let index = Math.floor(Math.random() * (countries.length+1))
    word = countries[index]
}

function answer() {
    let wordHolder = document.getElementById('word');
    let showWord = document.createElement('ul');
    wordHolder.appendChild(showWord)
    for (let i = 0; i < word.length; i++) {
        showWord.innerHTML += '<li>_</li>'
    }
}

function createButton() {
    let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h','i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's','t', 'u', 'v', 'w', 'x', 'y', 'z'];
    let myButtons = document.getElementById('buttons')
    let letterUL = document.createElement('ul')
    let letter
    let fragment = document.createDocumentFragment()
    for (let i = 0; i < alphabet.length; i++) {
        letter = document.createElement('li')
        letter.innerText = alphabet[i]
        check(letter)
        fragment.appendChild(letter)
    }
    letterUL.appendChild(fragment)
    myButtons.appendChild(letterUL)
}
  
function check(letter) {
    letter.addEventListener("click", function() {
            letter.classList.add("clicked")
            let currentGuess = letter.innerHTML;
            validateSelect(currentGuess);
            displayGuessesLeft(guessesLeft);
            checkWon();
    })
  }
  
function validateSelect(currentGuess){
    let hiddenLetters = document.querySelectorAll('#word ul li')
    if (prevGuesses.indexOf(currentGuess) > -1) {
        messageDisplay.innerHTML = "<p>Letter has already been guessed. Pick again.<p>"
    } else if (word.indexOf(currentGuess) > -1){
        for(let i = 0; i < word.length; i++){
            if(word[i] === currentGuess){
                hiddenLetters[i].innerText = currentGuess
            }
            hiddenLetters[0].style.textTransform = "uppercase"
            messageDisplay.innerHTML = "<p>Pick another letter.<p>"
            prevGuesses.push(currentGuess)
        }
    } else {
        guessesLeft -= 1
        prevGuesses.push(currentGuess)
        messageDisplay.innerHTML = "<p>Pick another letter.<p>"
    }
}
  
function displayGuessesLeft(guessesLeft) {
    let remaining = document.getElementById('guessesLeft')
    remaining.innerText = guessesLeft
}
  
function checkWon(){
    let hiddenLetters = document.querySelectorAll('#word ul li')
    let hiddenWord = ''
    let resultMsg = document.getElementById('result')
    let answer = document.getElementById('answer')
    answer.innerText = word
    answer.style.textTransform = "capitalize"
    for (let i = 0; i < word.length; i++) {
        hiddenWord += hiddenLetters[i].innerHTML
        }
    if(hiddenWord === word) {
        endGame.style.display = 'flex';
        endGame.style.backgroundColor = "rgba(100, 255, 100, 0.85)"
        resultMsg.innerText = "You Win!"
    } else if (guessesLeft <= 0){
        endGame.style.display = 'flex';
        endGame.style.backgroundColor = "rgba(255, 0, 0, 0.85)"
        resultMsg.innerText = "Game Over!"
    }
}

playAgain.addEventListener('click', reset)
resetBtn.addEventListener('click', reset)

wordSelect()
answer()
createButton()
