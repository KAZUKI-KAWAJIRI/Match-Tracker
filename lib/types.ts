export type CoinResult = 'heads' | 'tails' | null;
export type TurnOrder = 'first' | 'second' | null;
export type MatchResult = 'win' | 'lose' | null;

export interface DuelRecord {
  id: string;
  date: Date;
  coin: CoinResult;
  turnOrder: TurnOrder;
  result: MatchResult;
  myDeck: string;
  opponentDeck: string;
}

export interface Stats {
  totalMatches: number;
  coinStats: {
    heads: number;
    tails: number;
    headsPercentage: number;
    tailsPercentage: number;
  };
  turnStats: {
    first: number;
    second: number;
    firstPercentage: number;
    secondPercentage: number;
  };
  resultStats: {
    wins: number;
    losses: number;
    winPercentage: number;
  };
} 