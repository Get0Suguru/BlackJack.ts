// game state + rules (score, hit, stand)

import { user } from "../data/user.js";
import { cards } from "../cards/card.js";

// to write a random no generator
function helperGetRandomInt(min: number, max: number): number {
  // Math.random(); // generates a random number between 0 (inclusive) and 1 (exclusive)
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomCard(): string | undefined {
  if (user.deck.length === 0) {
    console.log("Deck is empty");
    return undefined; // if deck is empty return undefined
  }
  const randomIndex = helperGetRandomInt(0, user.deck.length - 1);

  // it return deleted item in a list or if not remove anything it returns empty list
  return user.deck.splice(randomIndex, 1)[0]; // remove the card from the deck to avoid duplicates
}

export function dealCards(): void {
  // get the deck of cards
  user.deck = cards.getDeck();
  console.log(user.deck.length);

  // deal cards to the player and dealer
  let con = 4;
  while (con > 0) {
    const card = getRandomCard()!;
    let cardVal = Number.parseInt(card, 10);
    if(Number.isNaN(cardVal)) cardVal = 10;

    if (con % 2 === 0) {
      // even -> player
      user.cards.player.hand.push(card!);
      if (card.charAt(0) === "A") {
        user.cards.player.aceCount++;
        user.cards.player.score += 11;
      } else {
        cardVal
          ? (user.cards.player.score += cardVal)
          : (user.cards.player.score += 10);
      }
    } else {
      // odd -> dealer
      user.cards.dealer.hand.push(card!);
      if (card.charAt(0) === "A") {
        user.cards.dealer.aceCount++;
        user.cards.dealer.score += 11;
      }else{
        cardVal
          ? (user.cards.dealer.score += cardVal)
          : (user.cards.dealer.score += 10);
      }
    }
    con--;
  }
}

// logic for hit & score resolver for 'A'
export function hit<T extends keyof typeof user.cards>(
  participant: T,
): number {
  const card = getRandomCard();
  if (!card) {
    throw new Error("Cannot draw a card: the deck is empty.");
  }

  const hand = user.cards[participant];
  const cardValue = Number.parseInt(card, 10);
  hand.hand.push(card);

  if (card.startsWith("A")) {
    hand.aceCount++;
    hand.score += 11;
  } else {
    hand.score += cardValue || 10;
  }

  while (hand.score > 21 && hand.aceCount > 0) {
    hand.score -= 10;
    hand.aceCount--;
  }

  return hand.score;
}

// logic for stand
export function stand(): number {
  return user.cards.player.score;
}