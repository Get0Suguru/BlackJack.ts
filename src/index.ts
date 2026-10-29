// this is the entry point of the application. It imports the necessary modules and starts the game.
// more lika a tape that connect all the modules together
import {rl, askBet} from './logic/input.js';
import {user} from './data/user.js';
import {dealCards} from './logic/game.js';  

async function main() {
    console.log('Welcome to the Blackjack game!');

    // 1. Wait for the user's name
    const name: string | void = await rl.question('What is your name? ');

    if (name) {
        user.name = name;
        console.log(`Hello, ${user.name}! Your starting balance is $${user.balance}\n`);
    } 
    // 2. Wait for a valid bet amount
    const betAmount = await askBet();

    console.log(`Successfully placed a bet of: $${betAmount}`);

    // 3. Deal the cards
    dealCards();
    console.log(`Player's hand: ${user.cards.player.hand.join(', ')}, value: ${user.cards.player.score}`);
    console.log(`Dealer's hand: ${user.cards.dealer.hand[0]}, [hidden]`);

    rl.close();
}

main();