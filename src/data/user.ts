export const user: { name: string | null , 
  balance: number, 
  cards: { 
    player: { hand: string[], aceCount: number, score: number }, 
    dealer: { hand: string[], aceCount: number, score: number } 
  },
  deck: string[], 

} = {
  name: null,
  balance: 100,

  cards: {
    player: {
      hand: [],
      aceCount: 0,
      score: 0,
    },
    dealer: {
      hand: [],
      aceCount: 0,
      score: 0,
    }
  },

  deck: [],
}


