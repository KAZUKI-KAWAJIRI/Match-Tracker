// テスト用モジュール宣言

declare module '@testing-library/react' {
  export const render: any;
  export const screen: any;
  export const fireEvent: any;
  export const waitFor: any;
  export const act: any;
  export const cleanup: any;
  export const within: any;
}

declare module '@/components/ImportButton' {
  import type React from 'react';
  export const ImportButton: React.FC<any>;
}

declare module '@/lib/context' {
  export const useDuel: () => any;
  export const DuelProvider: React.FC<{ children: React.ReactNode }>;
}

declare module '@/lib/hooks/useAuth' {
  export const useAuth: () => any;
}

declare module '@/lib/services/duelService' {
  export const duelService: {
    getUserRecords: (userId: string) => Promise<any[]>;
    addRecord: (userId: string, record: any) => Promise<any>;
    importRecords: (userId: string, records: any[]) => Promise<void>;
    clearRecords: (userId: string) => Promise<void>;
    getKnownDecks: (userId: string) => Promise<any>;
    updateKnownDecks: (userId: string, decks: any) => Promise<void>;
  };
}

declare module '@/lib/utils' {
  import type { ClassValue } from 'clsx';
  import type {
    CoinResult,
    DuelRecord,
    MatchResult,
    Stats,
    TurnOrder,
  } from '@/lib/types';

  export function cn(...inputs: ClassValue[]): string;
  export const calculatePercentage: (part: number, total: number) => number;
  export const calculateStatsFromRecords: (records: DuelRecord[]) => Stats;

  export const translate: {
    coin: (value: CoinResult) => string;
    turn: (value: TurnOrder) => string;
    result: (value: MatchResult) => string;
  };

  export const groupRecordsByDate: (
    records: DuelRecord[],
  ) => Record<string, DuelRecord[]>;
  export const sortDateStrings: (dates: string[]) => string[];
}
