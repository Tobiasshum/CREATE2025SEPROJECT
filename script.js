let deck, playerHand, dealerHand;
const suits = ['♠', '♥', '♣', '♦'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

const playerDiv = document.getElementById('player-hand');
const dealerDiv = document.getElementById('dealer-hand');
const resultDiv = document.getElementById('result');

document.getElementById('hit').onclick = playerHit;
document.getElementById('stand').onclick = dealerTurn;

startGame();

function startGame() {
  deck = createDeck();
  shuffle(deck);
  playerHand = [deck.pop(), deck.pop()];
  dealerHand = [deck.pop(), deck.pop()];
  renderHands();
}

function createDeck() {
  let deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ value, suit });
    }
  }
  return deck;
}

function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function renderHands(revealDealer = false) {
  playerDiv.innerHTML = handToString(playerHand) + ` (${calculateScore(playerHand)})`;
  if (revealDealer) {
    dealerDiv.innerHTML = handToString(dealerHand) + ` (${calculateScore(dealerHand)})`;
  } else {
    dealerDiv.innerHTML = `${dealerHand[0].value}${dealerHand[0].suit} [?]`;
  }
}

function handToString(hand) {
  return hand.map(card => `${card.value}${card.suit}`).join(' ');
}

function calculateScore(hand) {
  let score = 0;
  let aces = 0;
  for (let card of hand) {
    if (['J', 'Q', 'K'].includes(card.value)) {
      score += 10;
    } else if (card.value === 'A') {
      score += 11;
      aces += 1;
    } else {
      score += parseInt(card.value);
    }
  }
  while (score > 21 && aces > 0) {
    score -= 10;
    aces--;
  }
  return score;
}

function playerHit() {
  playerHand.push(deck.pop());
  renderHands();
  let score = calculateScore(playerHand);
  if (score > 21) {
    endGame("You bust! Dealer wins.");
  }
}

function dealerTurn() {
  while (calculateScore(dealerHand) < 17) {
    dealerHand.push(deck.pop());
  }
  renderHands(true);
  let playerScore = calculateScore(playerHand);
  let dealerScore = calculateScore(dealerHand);

  if (dealerScore > 21 || playerScore > dealerScore) {
    endGame("You win!");
  } else if (dealerScore > playerScore) {
    endGame("Dealer wins.");
  } else {
    endGame("It's a tie.");
  }
}

function endGame(message) {
  resultDiv.innerText = message;
  document.getElementById('hit').disabled = true;
  document.getElementById('stand').disabled = true;
}
