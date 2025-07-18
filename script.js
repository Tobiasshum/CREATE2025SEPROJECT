let deck = [];
let player1Hand = [];
let player2Hand = [];
let dealerHand = [];

function startGame() {
  deck = createDeck();
  shuffle(deck);

  player1Hand = [deck.pop(), deck.pop()];
  player2Hand = [deck.pop(), deck.pop()];
  dealerHand = [deck.pop(), deck.pop()];

  document.getElementById("player1-controls").style.display = "block";
  document.getElementById("player2-controls").style.display = "none";
  document.getElementById("results").innerText = "";

  renderHands();
}

function createDeck() {
  const suits = ['♠', '♥', '♣', '♦'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  let newDeck = [];
  for (let suit of suits) {
    for (let value of values) {
      newDeck.push({ suit, value });
    }
  }
  return newDeck;
}

function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function renderHands(revealDealer = false) {
  document.getElementById("player1-hand").innerText =
    handToString(player1Hand) + ` (${calculateScore(player1Hand)})`;
  document.getElementById("player2-hand").innerText =
    handToString(player2Hand) + ` (${calculateScore(player2Hand)})`;

  if (revealDealer) {
    document.getElementById("dealer-hand").innerText =
      handToString(dealerHand) + ` (${calculateScore(dealerHand)})`;
  } else {
    document.getElementById("dealer-hand").innerText =
      `${dealerHand[0].value}${dealerHand[0].suit} [?]`;
  }
}

function handToString(hand) {
  return hand.map(card => `${card.value}${card.suit}`).join(" ");
}

function calculateScore(hand) {
  let score = 0;
  let aces = 0;
  for (let card of hand) {
    if (['J', 'Q', 'K'].includes(card.value)) {
      score += 10;
    } else if (card.value === 'A') {
      score += 11;
      aces++;
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

function player1Hit() {
  player1Hand.push(deck.pop());
  renderHands();
  if (calculateScore(player1Hand) > 21) {
    document.getElementById("player1-controls").style.display = "none";
    document.getElementById("player2-controls").style.display = "block";
  }
}

function endPlayer1Turn() {
  document.getElementById("player1-controls").style.display = "none";
  document.getElementById("player2-controls").style.display = "block";
}

function player2Hit() {
  player2Hand.push(deck.pop());
  renderHands();
  if (calculateScore(player2Hand) > 21) {
    dealerTurn();
  }
}

function dealerTurn() {
  document.getElementById("player2-controls").style.display = "none";
  while (calculateScore(dealerHand) < 17) {
    dealerHand.push(deck.pop());
  }
  renderHands(true);
  evaluateGame();
}

function evaluateGame() {
  const player1Score = calculateScore(player1Hand);
  const player2Score = calculateScore(player2Hand);
  const dealerScore = calculateScore(dealerHand);

  let resultText = '';

  function outcome(playerScore) {
    if (playerScore > 21) return "Bust!";
    if (dealerScore > 21 || playerScore > dealerScore) return "Win!";
    if (playerScore === dealerScore) return "Tie!";
    return "Lose.";
  }

  resultText += `Player 1: ${outcome(player1Score)}<br>`;
  resultText += `Player 2: ${outcome(player2Score)}`;

  document.getElementById("results").innerHTML = resultText;
}

startGame();
