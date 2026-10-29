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
    const cardVal = parseInt(card.charAt(0)); // at this point its either no or face card

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
