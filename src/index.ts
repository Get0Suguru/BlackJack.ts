// this is the entry point of the application. It imports the necessary modules and starts the game.
// more lika a tape that connect all the modules together
import {rl, askBet} from './logic/input.js';
import {user, resetCards} from './data/user.js';
import {dealCards, hit, stand} from './logic/game.js';  
import {setTimeout} from 'timers/promises';

async function main() {
    console.log('Welcome to the Blackjack game!');

    // 1. Wait for the user's name
    const name: string | void = await rl.question('What is your name? ');

    if (name) {
        user.name = name;
        console.log(`Hello, ${user.name}! Your starting balance is $${user.balance}\n`);
    } 

    
    await playGame();
    
    

    rl.close();
}

main();

const playGame = async () => {
    // 2. Wait for a valid bet amount
    const betAmount = await askBet();
    console.log(`Successfully placed a bet of: $${betAmount}`);

    // 3. Deal the cards
    dealCards();
    console.log(`Player's hand: ${user.cards.player.hand.join(', ')}, value: ${user.cards.player.score}`);
    console.log(`Dealer's hand: ${user.cards.dealer.hand[0]}, [hidden]`);


    // 4. Play the game --------------------------------------------------------------------------------------------------------------
    let hitOrStand = 'N';
    while(user.cards.player.score < 21 && hitOrStand !== 'S') {
        hitOrStand = await rl.question('Do you want to hit or stand? (H/S) ');
        hitOrStand.toUpperCase();
        if(hitOrStand !== 'H' && hitOrStand !== 'S') {
            console.log('Invalid input. Please try again.');
            continue;
        }
        if(hitOrStand === 'H') {        // logic for hit
            const score = hit('player');
            console.log(`Player's hand: ${user.cards.player.hand.join(', ')}, value: ${user.cards.player.score}`);
        }
    }

    // handling after player's turn gone through
    if(user.cards.player.score > 21) {              // player bursted
        console.log('Player burst. Game over. You lose $' + betAmount + '!');
        user.balance -= betAmount;
    }else{                  // logic for stand
        console.log(`Dealer's hand: ${user.cards.dealer.hand.join(', ')}, value: ${user.cards.dealer.score}`);
        await setTimeout(1500);
        const score = stand();


        while(user.cards.dealer.score < 17) {   // logic for dealer
            const score = hit('dealer');
            console.log("Dealer Hit");
            console.log(`Dealer's hand: ${user.cards.dealer.hand.join(', ')}, value: ${user.cards.dealer.score}`);
            console.log("dealer thinking....");
            await setTimeout(1500);
        }

        if(user.cards.dealer.score > 21 || user.cards.dealer.score < user.cards.player.score) {              // dealer bursted
            console.log('Dealer burst. You win $' + (betAmount * 2) + '! on ur bet of $' + betAmount + '!');
            user.balance += (betAmount * 2);
        }else if(user.cards.dealer.score > user.cards.player.score) {                                       // dealer won
            console.log('Dealer wins. You lose $' + (betAmount) +'!');
            user.balance -= (betAmount );
        }else{                                             // draw
            console.log('Draw.');

        }
    }

    const askPlayMore = await rl.question('Do you want to play More? (Y/N) ');
    if (user.balance <= 0 || askPlayMore.toUpperCase() !== 'Y') {
        console.log('Goodbye!');
        return;
    }else{
        console.log('Starting a new game...');
        console.log(`Your starting balance is $${user.balance}\n`);

        // reset the game 
        resetCards();
        await playGame();
    }
}