// Challenge 1: Your age in days
function ageInDays() {
    var birthyear = document.getElementById('date').value;
    var ageInDayz = (new Date() - new Date(birthyear)) / (1000 * 60 * 60 * 24);
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + ageInDayz + ' days old, your highness!');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset() {
    document.getElementById('ageInDays').remove();
    document.getElementById("ff").reset();
}

//Challenge 2: Cat Generator
function generateCat() {
    var image = document.createElement('img');
    var div = document.getElementById("cat-gen");
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif";
    div.appendChild(image);
}

//Challenge 3: Rock, Paper, Scissors
function rpsGame(yourChoice) {
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    console.log(humanChoice);
    botChoice = numberToChoice(randToRpsInt());
    console.log(botChoice);
    console.log(humanChoice, botChoice);
    result = decideWinner(humanChoice, botChoice);
    console.log(result);
    message = finalMessage(result);
    rpsFrontEnd(humanChoice, botChoice, message);
}
function randToRpsInt() {
    return Math.floor(Math.random() * 3);
}
function numberToChoice(number) {
    return ['rock', 'paper', 'scissor'][number];
}
function decideWinner(yourChoice, computerChoice) {
    var rpsDatabase = { 
        'rock': { 'scissor': 1, 'rock': 0.5, 'paper': 0 },
        'paper': { 'scissor': 0, 'rock': 1, 'paper': 0.5 },
        'scissor': {'scissor': 0.5, 'rock': 0, 'paper': 1 }
    }
    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];
    return [yourScore, computerScore];
}
function finalMessage([yourScore, computerScore]) {
    if (yourScore === 0)
        return { 'message': 'You Lost!!', 'color': '#ff2f00' };
    else if (yourScore === 0.5)
        return { 'message': 'You Tied!', 'color': "yellow" };
    else
        return { 'message': 'You Won!!!!', 'color': '#34fa42' };
}
function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    var imageDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissor': document.getElementById('scissor').src
    }
    //remove images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messagesDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imageDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 30px rgba(37,50,233,1)'>"
    botDiv.innerHTML = "<img src='" + imageDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 30px rgba(243,38,24,1)'>"
    messagesDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding:30px'>" + finalMessage['message'] + "</h1>"

    document.getElementById('flexbox-rps-div').appendChild(humanDiv);
    document.getElementById('flexbox-rps-div').appendChild(botDiv);
    document.getElementById('flexbox-rps-div').appendChild(messagesDiv);
}

//Challenge 4: Change the colour of the buttons!!!!
var allButtons = document.getElementsByTagName('button');
var copyAllButtons = [];
for (let i = 0; i < allButtons.length; i++) {
    copyAllButtons.push(allButtons[i].classList[1]);
}
function buttonColorChallenge(buttonThingy) {
    if (buttonThingy.value === 'red') {
        buttonRed();
    } else if (buttonThingy.value === 'green') {
        buttonGreen();
    } else if (buttonThingy.value === 'reset') {
        buttonReset();
    } else {
        buttonRandom();
    }
}
function buttonRed() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-danger');
    }
}
function buttonGreen() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-success');
    }
}
function buttonReset() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyAllButtons[i]);
    }
}
function buttonRandom() {
    let choices = ['btn-primary', 'btn-danger', 'btn-warning', 'btn-success'];
    for (let i = 0; i < allButtons.length; i++) {
        let randomNumber = Math.floor(Math.random() * 4);
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(choices[randomNumber]);
    }
}

//challenge 5: Blackjack
let blackjackGame = {
    'you': { 'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0 },
    'dealer': { 'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
    'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1, 11] },
    'wins': 0, 'losses': 0, 'draws': 0, 'isStand': false, 'turnsOver': false
}
const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']
const HITSOUND = new Audio('sounds/swish.m4a')
const WINSOUND = new Audio('sounds/cash.mp3')
const LOSSOUND = new Audio('sounds/aww.mp3')
document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);
function randomCards() {
    randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}
function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `images/${card}.png`;
        cardImage.style.width = '100px';
        cardImage.style.height = '135px';
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        HITSOUND.play();
    }
}
function blackjackHit() {
    if (blackjackGame['isStand'] === false) {
        let card = randomCards();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }
}
function blackjackDeal() {
    //showResult(computeWinner());
    if (blackjackGame['turnsOver'] === true) {
        blackjackGame['isStand'] = false;
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        for (i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }
        for (i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }
        YOU['score'] = 0;
        DEALER['score'] = 0;
        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#your-blackjack-result').style.color = '#5dedf5';
        document.querySelector('#dealer-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').style.color = '#5dedf5';
        document.querySelector('#blackjack-result').textContent = `Let's Play`;
        document.querySelector('#blackjack-result').style.color = '#5dedf5';
        blackjackGame['turnsOver'] = false;
    }
}
function updateScore(card, activePlayer) {
    //if adding 11 keeps the score below 21, then add 11, otherwise add 1
    if (card === 'A') {
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}
function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'Bust!!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}
async function dealerLogic() {
    blackjackGame['isStand'] = true;
    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
        let card = randomCards();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(500);
    }
    //if (DEALER['score'] > 15) {
        blackjackGame['turnsOver'] = true;
        let winner = computeWinner();
        showResult(winner);
    //}
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function computeWinner() {
    let winner;
    if (YOU['score'] <= 21) {
        if ((YOU['score'] > DEALER['score']) || (DEALER['score'] > 21)) {
            blackjackGame['wins']++;
            winner = YOU;
        } else if (YOU['score'] < DEALER['score']) {
            blackjackGame['losses']++
            winner = DEALER;
        } else if (YOU['score'] == DEALER['score']) {
            blackjackGame['draws']++;
        }
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        winner = DEALER;
        blackjackGame['losses']++;
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++;
    }
    return winner;
}
function showResult(winner) {
    let message, messageColor;
    if (blackjackGame['turnsOver'] === true) {
        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'Congratulations, You Won!';
            messageColor = '#70fa14';
            WINSOUND.play();
        } else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'Sorry, You Lost!';
            messageColor = 'red';
            LOSSOUND.play();
        } else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You drew!';
            messageColor = 'white';
        }
        document.querySelector('#blackjack-result').style.color = messageColor;
        document.querySelector('#blackjack-result').textContent = message;
    }
}