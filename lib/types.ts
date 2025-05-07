export type CoinResult = 'heads' | 'tails' | null;
export type TurnOrder = 'first' | 'second' | null;
export type MatchResult = 'win' | 'lose' | null;

// 翻訳用のマッピングオブジェクト
export const TRANSLATIONS = {
  coin: {
    heads: '表',
    tails: '裏'
  },
  turn: {
    first: '先攻',
    second: '後攻'
  },
  result: {
    win: '勝利',
    lose: '敗北'
  }
} as const;

export interface DuelRecord {
  id: string;
  date: Date;
  coin: CoinResult;
  turnOrder: TurnOrder;
  result: MatchResult;
  myDeck: string;
  opponentDeck: string;
}

export interface KnownDecks {
  myDecks: string[];
  opponentDecks: string[];
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