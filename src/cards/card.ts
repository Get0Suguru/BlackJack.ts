
export const cards = {
  suits: ['♥', '♣', '♠', '♦'],
  values: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
  getDeck: function () {
    const deck: string[] = []; // assign an empty array to hold the deck of cards
    for (const suit of this.suits) {
      for (const value of this.values) {
        deck.push(`${value}${suit}`); // push each card to the deck array
      }
    }
    return deck;
  }
}
