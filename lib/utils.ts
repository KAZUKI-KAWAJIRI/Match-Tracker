import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { CoinResult, DuelRecord, MatchResult, Stats, TurnOrder, TRANSLATIONS } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// パーセンテージを計算する関数
export const calculatePercentage = (part: number, total: number): number => {
  return total > 0 ? Math.round((part / total) * 100) : 0;
};

// デュエル記録から統計を計算する関数
export const calculateStatsFromRecords = (records: DuelRecord[]): Stats => {
  const totalMatches = records.length;
  
  if (totalMatches === 0) {
    return {
      totalMatches: 0,
      coinStats: {
        heads: 0,
        tails: 0,
        headsPercentage: 0,
        tailsPercentage: 0
      },
      turnStats: {
        first: 0,
        second: 0,
        firstPercentage: 0,
        secondPercentage: 0
      },
      resultStats: {
        wins: 0,
        losses: 0,
        winPercentage: 0
      }
    };
  }

  const heads = records.filter(r => r.coin === 'heads').length;
  const tails = records.filter(r => r.coin === 'tails').length;
  
  const first = records.filter(r => r.turnOrder === 'first').length;
  const second = records.filter(r => r.turnOrder === 'second').length;
  
  const wins = records.filter(r => r.result === 'win').length;
  const losses = records.filter(r => r.result === 'lose').length;

  return {
    totalMatches,
    coinStats: {
      heads,
      tails,
      headsPercentage: calculatePercentage(heads, totalMatches),
      tailsPercentage: calculatePercentage(tails, totalMatches)
    },
    turnStats: {
      first,
      second,
      firstPercentage: calculatePercentage(first, totalMatches),
      secondPercentage: calculatePercentage(second, totalMatches)
    },
    resultStats: {
      wins,
      losses,
      winPercentage: calculatePercentage(wins, totalMatches)
    }
  };
};

// 日本語に変換する関数
export const translate = {
  coin: (value: CoinResult): string => value ? TRANSLATIONS.coin[value] : '',
  turn: (value: TurnOrder): string => value ? TRANSLATIONS.turn[value] : '',
  result: (value: MatchResult): string => value ? TRANSLATIONS.result[value] : ''
};

// 日付ごとに記録をグループ化する関数
export const groupRecordsByDate = (records: DuelRecord[]): Record<string, DuelRecord[]> => {
  return records.reduce((acc, record) => {
    const dateStr = new Date(record.date).toLocaleDateString('ja-JP');
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    acc[dateStr].push(record);
    return acc;
  }, {} as Record<string, DuelRecord[]>);
};

// 日付を降順にソートする関数
export const sortDateStrings = (dates: string[]): string[] => {
  return [...dates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
}; 