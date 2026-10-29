//readline wrapper -> for user input asking 
// start 

import * as readline from 'readline/promises';
import { user } from '../data/user.js';

// its a method that creates an interface for reading data from a Readable stream (such as process.stdin) one line at a time.
export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


// ask bet amount from user
export const askBet = async function(): Promise<number> {
  
  const betInput = await rl.question('Enter your bet amount: ');

  const betAmount = parseFloat(betInput);
  if (!isNaN(betAmount) && betAmount > 0) {
    return betAmount;
  } else {
    console.log('Invalid bet amount. Please try again.');
    return askBet();
  }
}